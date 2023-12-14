const { getVenueById, removeEventFromVenue } = require('../venues/model.js');
const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();

const EVENT = "event";

// Clear out existing events
async function deleteAllEvents() {
    const query = datastore.createQuery(EVENT);
    const [events] = await datastore.runQuery(query);
  
    const keys = events.map((event) => event[datastore.KEY]);
    await datastore.delete(keys);
}
  
deleteAllEvents()
    .then(() => console.log('All events have been deleted'))
    .catch((error) => console.error('Error deleting events:', error));

//////////////////////////////////////////////////////////////////////////////

async function eventFromDatastore(event, baseUrl) {
    event.id = parseInt(event[Datastore.KEY].id);
    if (event.venueId != null) {
        const venue = await getVenueById(baseUrl, event.venueId);
        event.venue = { 'id': parseInt(venue.id), 'name': venue.name, 'self': venue.self } 
    } else {
        event.venue = null;
    }
    delete event.venueId;
    event.self = baseUrl + event.id;
    return event;
}

// CRUD Operations ////////////////////////////////////////////////////////////////////////////

async function postEvent(baseUrl, name, date, description, user) {
    var key = datastore.key(EVENT);

    const newEvent = { "name": name, "date": date, "description": description, "host": user, "venueId": null };
    await datastore.save({ "key": key, "data": newEvent });

    newEvent.venue = null;
    delete newEvent.venueId;

    return { "id": parseInt(key.id), ...newEvent, "self": baseUrl + key.id };
}

async function getAllEvents(req) {
    let query = datastore.createQuery(EVENT).limit(5);
    const result = {};
    let prev;
    if (req.query.cursor !== undefined){
        prev = "https://" + req.get("host") + req.baseUrl + "?cursor=" + req.query.cursor.replace(/\+/g, "%2B");
        query = query.start(req.query.cursor);
    }

    const [events, queryResult] = await datastore.runQuery(query);
    let url = "https://" + req.get("host") + req.baseUrl + "/";
    result.events = await Promise.all(events.map(event => eventFromDatastore(event, url)));

    if (prev !== undefined) {
        result.previous = prev;
    }
    if (queryResult.moreResults !== Datastore.NO_MORE_RESULTS ) {
        result.next = "https://" + req.get("host") + req.baseUrl + "?cursor=" + queryResult.endCursor.replace(/\+/g, "%2B");
    }

    return result;
}   

async function getEventsByHost(req, user) {
    let query = datastore.createQuery(EVENT).filter('host', '=', user).limit(5);
    const result = {};
    let prev;
    if (req.query.cursor !== undefined) {
        prev = "https://" + req.get("host") + req.baseUrl + "?cursor=" + req.query.cursor.replace(/\+/g, "%2B");
        query = query.start(req.query.cursor);
    }

    const [events, queryResult] = await datastore.runQuery(query);
    let url = "https://" + req.get("host") + req.baseUrl + "/";
    result.events = await Promise.all(events.map(event => eventFromDatastore(event, url)));

    if (prev !== undefined) {
        result.previous = prev;
    }
    if (queryResult.moreResults !== Datastore.NO_MORE_RESULTS ) {
        result.next = "https://" + req.get("host") + req.baseUrl + "?cursor=" + queryResult.endCursor.replace(/\+/g, "%2B");
    }

    return result;
}

async function getEventById(baseUrl, eventId) {
    const key = datastore.key([EVENT, parseInt(eventId)]);
    const [event] = await datastore.get(key);
    
    if (event == undefined) return 404;
    
    return await eventFromDatastore(event, baseUrl);
}

async function putEvent(baseUrl, eventId, name, date, description, user) {
    const key = datastore.key([EVENT, parseInt(eventId)]);
    const [event] = await datastore.get(key);

    if (event.host !== user) return 403;
    if (event == undefined) return 404;
    
    const updatedEvent = { "name": name, "date": date, "description": description, "host": user, "venueId": event.venueId, [Datastore.KEY]: key };
    await datastore.save({ "key": key, "data": updatedEvent });

    return eventFromDatastore(updatedEvent, baseUrl);
}   

async function patchEvent(baseUrl, eventId, name, date, description, user) {
    const key = datastore.key([EVENT, parseInt(eventId)]);
    const [event] = await datastore.get(key);
    
    if (event.host !== user) return 403;
    if (event == undefined) return 404;
    
    const updatedEvent = { ...event, [Datastore.KEY]: key };
    if (name !== undefined) updatedEvent.name = name;
    if (date !== undefined) updatedEvent.date = date;
    if (description !== undefined) updatedEvent.description = description;

    await datastore.save({ "key": key, "data": updatedEvent });

    return await eventFromDatastore(updatedEvent, baseUrl);
}

async function deleteEvent(eventId, user) {
    const key = datastore.key([EVENT, parseInt(eventId)]);
    const [event] = await datastore.get(key);

    if (event == undefined) return 404;
    if (event.host !== user) return 403;

    if (event.venueId !== null) {
        await removeEventFromVenue(event.venueId, eventId, user)
    }

    await datastore.delete(key);
    return 204;
}

module.exports = { postEvent, getAllEvents, getEventsByHost, getEventById, putEvent, patchEvent, deleteEvent };