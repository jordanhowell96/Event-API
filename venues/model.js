const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();

const EVENT = "event";
const VENUE = "venue";

//////////////////////////////////////////////////////////////////////////////

async function venueFromDatastore(venue, baseUrl) {
    venue.id = parseInt(venue[Datastore.KEY].id);
    venue.events = [];
    for (const eventId of venue.eventIds) {
        let event = await getEventById(baseUrl, eventId);
        if (event != undefined) {
            venue.events.push({ 'id': parseInt(event.id), 'name': event.name, 'self': event.self });
        } 
    }
    delete venue.eventIds;
    venue.self = baseUrl + venue.id;
    return venue;
}

async function eventFromDatastore(event, baseUrl) {
    event.id = parseInt(event[Datastore.KEY].id);
    delete event.venueId;
    event.self = baseUrl + event.id;
    return event;
}

async function getEventById(baseUrl, eventId) {
    const key = datastore.key([EVENT, parseInt(eventId)]);
    const [event] = await datastore.get(key);
    
    if (event == undefined) return;

    return await eventFromDatastore(event, baseUrl);
}

// Venue CRUD /////////////////////////////////////////////////////////////////

async function postVenue(baseUrl, name, city, type) {
    var key = datastore.key(VENUE);
    const newVenue = { "name": name, "city": city, "type": type, "eventIds": [] };
    await datastore.save({ "key": key, "data": newVenue });

    newVenue.events = [];
    delete newVenue.eventIds;

    return { "id": parseInt(key.id), ...newVenue, "self": baseUrl + key.id };
}

async function getAllVenues(req) {
    let query = datastore.createQuery(VENUE).limit(5);
    const result = {};
    let prev;
    if (req.query.cursor !== undefined) {
        prev = "https://" + req.get("host") + req.baseUrl + "?cursor=" + req.query.cursor.replace(/\+/g, "%2B");
        query = query.start(req.query.cursor);
    }

    const [venues, queryResult] = await datastore.runQuery(query);
    let url = "https://" + req.get("host") + req.baseUrl + "/";
    result.venues = await Promise.all(venues.map(venue => venueFromDatastore(venue, url)));

    if (prev !== undefined) {
        result.previous = prev;
    }
    if (queryResult.moreResults !== Datastore.NO_MORE_RESULTS ) {
        result.next = "https://" + req.get("host") + req.baseUrl + "?cursor=" + queryResult.endCursor.replace(/\+/g, "%2B");
    }

    return result;
}

async function getVenueById(baseUrl, venueId) {
    const key = datastore.key([VENUE, parseInt(venueId)]);
    const [venue] = await datastore.get(key);

    if (venue == undefined) return 404;

    return await venueFromDatastore(venue, baseUrl);
}

async function getEventsByVenue(baseUrl, venueId) {
    const { getEventById } = require('../events/model.js');
    const key = datastore.key([VENUE, parseInt(venueId)]);
    const [venue] = await datastore.get(key);

    if (venue == undefined)  return 404;

    const events = [];
    for (const eventId of venue.eventIds) {
        let event = await getEventById(baseUrl, eventId);
        events.push(event);
    }
    return events;
}

async function putVenue(baseUrl, venueId, name, city, type) {
    const key = datastore.key([VENUE, parseInt(venueId)]);
    const [venue] = await datastore.get(key);

    if (venue == undefined) return 404;

    const updatedVenue = { "name": name, "city": city, "type": type, "eventIds": venue.eventIds, [Datastore.KEY]: key };
    await datastore.save({ "key": key, "data": updatedVenue });

    return await venueFromDatastore(updatedVenue, baseUrl)
}

async function patchVenue(baseUrl, venueId, name, city, type) {
    const key = datastore.key([VENUE, parseInt(venueId)]);
    const [venue] = await datastore.get(key);

    if (venue == undefined) return 404;

    const updatedVenue = { ...venue, [Datastore.KEY]: key }; 

    if (name !== undefined) updatedVenue.name = name;
    if (city !== undefined) updatedVenue.city = city;
    if (type !== undefined) updatedVenue.type = type;
    await datastore.save({ "key": key, "data": updatedVenue });

    return await venueFromDatastore(updatedVenue, baseUrl);
}

async function deleteVenue(venueId) {
    const key = datastore.key([VENUE, parseInt(venueId)]);
    const [venue] = await datastore.get(key);

    if (venue == undefined) return 404;

    for (const eventId of venue.eventIds) {
        await removeEventFromVenue(eventId, venueId, "internal");
    }

    await datastore.delete(key);
    return 204;
}

// Event-Venue Relationships //////////////////////////////////////////////////

async function addEventToVenue(venueId, eventId, user) {
    const eventKey = datastore.key([EVENT, parseInt(eventId)]);
    const venueKey = datastore.key([VENUE, parseInt(venueId)]);

    const [event] = await datastore.get(eventKey);
    const [venue] = await datastore.get(venueKey);
 
    if (event == undefined) return 404;
    if (venue == undefined) return 404;
    if (event.host !== user) return 403;

    const updatedEvent = { ...event };
    const updatedVenue = { ...venue };

    updatedEvent.venueId = venueKey.id;
    updatedVenue.eventIds.push(eventKey.id);

    await datastore.save({ "key": eventKey, "data": updatedEvent });
    await datastore.save({ "key": venueKey, "data": updatedVenue });

    return 204;
}

async function removeEventFromVenue(venueId, eventId, user) {
    const eventKey = datastore.key([EVENT, parseInt(eventId)]);
    const venueKey = datastore.key([VENUE, parseInt(venueId)]);

    const [event] = await datastore.get(eventKey);
    const [venue] = await datastore.get(venueKey);
    
    if (event == undefined) return 404;
    if (venue == undefined) return 404;
    if (user !== "internal" && event.host !== user) return 403;

    const updatedEvent = { ...event };
    const updatedVenue = { ...venue };

    updatedEvent.venueId = null;
    updatedVenue.eventIds = updatedVenue.eventIds.filter(event => event !== parseInt(eventId));

    await datastore.save({ "key": eventKey, "data": updatedEvent });
    await datastore.save({ "key": venueKey, "data": updatedVenue });

    return 204;
}

module.exports = { postVenue, getAllVenues, getVenueById, getEventsByVenue, putVenue, patchVenue, 
    deleteVenue, addEventToVenue, removeEventFromVenue };
