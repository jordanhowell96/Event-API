# <span id="_Toc84856244">Create a</span>n Event

```json
POST /events
```

Allows you to create a new event.

## Request

### Path Parameters

None

### Request Body

Required

### Request Body Format

JSON

### Authentication

Required

### Request JSON Attributes

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Type</strong></p></td>
<td><p><strong>Description</strong></p></td>
<td><p><strong>Required?</strong></p></td>
</tr>
<tr class="even">
<td><p>name</p></td>
<td><p>string</p></td>
<td><p>Name of the event</p></td>
<td><p>Yes</p></td>
</tr>
<tr class="odd">
<td><p>date</p></td>
<td><p>string</p></td>
<td><p>Date of the event</p></td>
<td><p>Yes</p></td>
</tr>
<tr class="even">
<td><p>description</p></td>
<td><p>string</p></td>
<td><p>Description of the event</p></td>
<td><p>No</p></td>
</tr>
</tbody>
</table>

### Request Body Example

```json
{
    "name": "Trivia Night",
    "date": "02/17/2023",
    "description": "Trivia night at Paddy's Pub"
}
```

## Response

### Response Body Format

JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>201 Created</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>400 Bad Request</p></td>
<td><p>The request is missing one of the required attributes, or they
are not the correct type, the event will not be created</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>401 Unauthorized</p></td>
<td><p>The request does not have a valid JWT, i.e. the user is not
authenticated</p></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>406 Not Acceptable</p></td>
<td><p>The request Accept header does not contain application/json, the
event will not be created</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>415 Unsupported Media Type</p></td>
<td><p>The request Content-Type header is not application/json, the
event will not be created</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td></td>
</tbody>
</table>

### Response Examples

#### Success
```json
Status: 201 Created
{
    "id": 123,
    "name": "Trivia Night",
    "date": "02/17/2023",
    "description": "Trivia night at Paddy’s Pub",
    "host": "auth0|123456789",
    "venue": null,
    "self": "https://example.com/events/123"
}
```

#### Failure
```json
Status: 400 Bad Request
{
    "error": "The request object is missing at least one of the required attributes"
}
```
```json
Status: 400 Bad Request
{
    "error": "One of the attributes has an incorrect type"
}
```
```json
Status: 401 Unauthorized
{
    "error": "Unauthorized"
}
```
```json
Status: 406 Not Acceptable
{
    "error": "Unsupported MIME Accept type. Valid type: application/json"
}
```
```json
Status: 415 Unsupported Media Type
{
    "error": "Unsupported MIME Content-Type. Valid type: application/json"
}
```

# <span id="_Toc84856245">Get</span><span id="_Toc84856245"> </span>Events

Allows you to get all existing events if unauthorized, or your own
events if authorized. Paginated to 5 events per page.

```json
GET /events
```

## Request

## Path Parameters

None

### <span id="_Hlk153121438">Request Body</span>

None

### Authentication

Optional

## Response

### Response Body Format

JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>200 OK</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>406 Not Acceptable</p></td>
<td><p>The request Accept header does not contain application/json or
text/html.</p></td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Response Examples

#### Success

```json
Status: 200 OK
{
"events": [
    {
        "id": 123,
        "name": "Trivia Night",
        "date": "02/17/2023",
        "description": "Trivia night at Paddy’s Pub",
        "host": "auth0|123456789",
        "venue": {
           "id": 789,
           "name": "Paddy’s Pub",
           "self": "https://example.com/venues/789"
        },
        "self": "https://example.com/events/123"
    },
    {
        "id": 321,
        "name": "Karaoke Night",
        "date": "02/25/2023",
        "description": "Karaoke night at Moe’s Tavern",
        "host": "auth0|987654321",
        "venue": {
           "id": 987,
           "name": "Moe’s Tavern",
           "self": "https://example.com/venues/987"
        },
        "self": "https://example.com/events/321"
    },
...
],
"next": "www.example.com/events/?cursor=ABCdef123=="
}
```

#### Failure

```json
Status: 406 Not Acceptable
{
    "error": "Unsupported MIME Accept type. Valid types: application/json"
}
```

# Get an Event

Allows you to get an existing event.

```json
GET /events/:event_id
```

## Request

## Path Parameters

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Description</strong></p></td>
</tr>
<tr class="even">
<td><p>event_id</p></td>
<td><p>ID of the event</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body

None

### Authentication

None

## Response

### Response Body Format

JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>200 OK</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>404 Not Found</p></td>
<td><p>No event with this event_id exists</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>406 Not Acceptable</p></td>
<td><p>The request Accept header does not contain
application/json.</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Response Examples

#### Success

```json
Status: 200 OK
{
    "id": 123,
    "name": "Trivia Night",
    "date": "02/17/2023",
    "description": "Trivia night at Paddy’s Pub",
    "host": "auth0|123456789",
    "venue": {
        "id": 789,
        "name": "Paddy’s Pub",
        "self": "https://example.com/venues/789"
    },
    "self": "https://example.com/events/123"
}
```

#### Failure

```json
Status: 404 Not Found
{
    "error": "No event with this event_id exists"
}
```
```json
Status: 406 Not Acceptable
{
    "error": "Unsupported MIME Accept type. Valid type: application/json"
}
```

# Edit an Event

Allows you to edit an existing event.

```json
PATCH /events/:event_id
```

## Request

### Path Parameters

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Description</strong></p></td>
</tr>
<tr class="even">
<td><p>event_id</p></td>
<td><p>ID of the event</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body

Required

### Request Body Format

JSON

### Authentication

Required

### Request JSON Attributes

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Type</strong></p></td>
<td><p><strong>Description</strong></p></td>
<td><p><strong>Required</strong></p></td>
</tr>
<tr class="even">
<td><p>name</p></td>
<td><p>string</p></td>
<td><p>Name of the event</p></td>
<td><p>No</p></td>
</tr>
<tr class="odd">
<td><p>date</p></td>
<td><p>string</p></td>
<td><p>Date of the event</p></td>
<td><p>No</p></td>
</tr>
<tr class="even">
<td><p>description</p></td>
<td><p>string</p></td>
<td><p>Description of the event</p></td>
<td><p>No</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body Example

```json
{
    "description": "Trivia night at Paddy’s Pub"
}
```

## Response

### Response Body Format

JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>200 OK</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>400 Bad Request</p></td>
<td><p>One of the attributes is the incorrect type, the event will not
be edited</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>401 Unauthorized</p></td>
<td><p>The request does not have a valid JWT, i.e. the user is not
authenticated</p></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>403 Forbidden</p></td>
<td><p>The user is not authorized to edit this event</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>404 Not Found</p></td>
<td><p>No event with this event_id exists</p></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>406 Not Acceptable</p></td>
<td><p>The request Accept header does not contain application/json, the
event will not be edited</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>415 Unsupported Media Type</p></td>
<td><p>The request Content-Type header is not application/json, the
event will not be edited</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Response Examples

#### Success

```json
Status: 200 OK
{
    "id": 123,
    "name": "Trivia Night",
    "date": "02/17/2023",
    "description": "Trivia night at Paddy’s Pub",
    "host": "auth0|123456789",
    "venue": null,
    "self": "https://example.com/events/123"
}
```

#### Failure

```json
Status: 400 Bad Request
{
    "error": "One of the attributes has an incorrect type"
}
```
```json
Status: 401 Unauthorized
{
    "error": "Unauthorized"
}
```
```json
Status: 403 Forbidden
{
    "error": "Forbidden"
}
```
```json
Status: 404 Not Found
{
    "error": "No event with this event_id exists"
}
```
```json
Status: 406 Not Acceptable
{
    "error": "Unsupported MIME Accept type. Valid type: application/json"
}
```
```json
Status: 415 Unsupported Media Type
{
    "error": "Unsupported MIME Content-Type. Valid type: application/json"
}
```

# Replace an Event

Allows you to replace an existing event (the ID and venue remains
unchanged).

```json
PUT /events/:event_id
```

## Request

### Path Parameters

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Description</strong></p></td>
</tr>
<tr class="even">
<td><p>event_id</p></td>
<td><p>ID of the event</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body

Required

### Request Body Format

JSON

### Authentication

Required

### Request JSON Attributes

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Type</strong></p></td>
<td><p><strong>Description</strong></p></td>
<td><p><strong>Required?</strong></p></td>
</tr>
<tr class="even">
<td><p>name</p></td>
<td><p>string</p></td>
<td><p>Name of the event</p></td>
<td><p>Yes</p></td>
</tr>
<tr class="odd">
<td><p>date</p></td>
<td><p>string</p></td>
<td><p>Date of the event</p></td>
<td><p>Yes</p></td>
</tr>
<tr class="even">
<td><p>description</p></td>
<td><p>string</p></td>
<td><p>Description of the event</p></td>
<td><p>No</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body Example

```json
{
    "name": "Trivia Night",
    "date": "02/17/2023",
    "description": "Trivia night at Paddy’s Pub"
}
```

## Response

### Response Body Format

JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>201 Created</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>400 Bad Request</p></td>
<td><p>The request is missing one of the required attributes or they are
not the correct type, the event will not be replaced</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>401 Unauthorized</p></td>
<td><p>The request does not have a valid JWT, i.e. the user is not
authenticated</p></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>403 Forbidden</p></td>
<td><p>The user is not authorized to edit this event</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>404 Not Found</p></td>
<td><p>No event with this event_id exists</p></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>406 Not Acceptable</p></td>
<td><p>The request Accept header does not contain application/json, the
event will not be replaced</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>415 Unsupported Media Type</p></td>
<td><p>The request Content-Type header is not application/json, the
event will not be replaced</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Response Examples

#### Success

```json
Status: 201 Created
{
    "id": 123,
    "name": "Trivia Night",
    "date": "02/17/2023",
    "description": "Trivia night at Paddy’s Pub",
    "host": "auth0|123456789",
    "venue": {
        "id": 789,
        "name": "Paddy’s Pub",
        "self": "https://example.com/venues/789"
  },
  "self": "https://example.com/events/123"
}
```

#### Failure

```json
Status: 400 Bad Request
{
    "error": "One of the attributes has an incorrect type"
}
```
```json
Status: 401 Unauthorized
{
    "error": "Unauthorized"
}
```
```json
Status: 403 Forbidden
{
    "error": "Forbidden"
}
```
```json
Status: 404 Not Found
{
    "error": "No event with this event_id exists"
}
```
```json
Status: 406 Not Acceptable
{
    "error": "Unsupported MIME Accept type. Valid type: application/json"
}
```
```json
Status: 415 Unsupported Media Type
{
    "error": "Unsupported MIME Content-Type. Valid type: application/json"
}
```

# <span id="_Toc84856248">Delete a</span>n Event

Allows you to delete an existing event.

```json
DELETE /events/:event_id
```

## Request

### Path Parameters

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Description</strong></p></td>
</tr>
<tr class="even">
<td><p>event_id</p></td>
<td><p>ID of the event</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body

None

## Response

No body

### Authentication

Required

### Response Body Format

Success: No body

Failure: JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>204 No Content</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>401 Unauthorized</p></td>
<td><p>The request does not have a valid JWT, i.e. the user is not
authenticated</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>403 Forbidden</p></td>
<td><p>The user is not authorized to delete this event</p></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>404 Not Found</p></td>
<td><p>No event with this event_id exists</p></td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Response Examples

#### Success

```json
Status: 204 No Content
```

#### Failure

```json
Status: 401 Unauthorized
{
    "error": "Unauthorized"
}
```
```json
Status: 403 Forbidden
{
    "error": "Forbidden"
}
```
```json
Status: 404 Not Found
{
    "error": "No event with this event_id exists"
}
```

# Create a Venue

Allows you to create a new venue.

```json
POST /venues
```

## Request

### Path Parameters

None

### Request Body

Required

### Request Body Format

JSON

### Authentication

None

### Request JSON Attributes


<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Type</strong></p></td>
<td><p><strong>Description</strong></p></td>
<td><p><strong>Required?</strong></p></td>
</tr>
<tr class="even">
<td><p>name</p></td>
<td><p>string</p></td>
<td><p>Name of the venue</p></td>
<td><p>Yes</p></td>
</tr>
<tr class="odd">
<td><p>city</p></td>
<td><p>string</p></td>
<td><p>City the venue is in</p></td>
<td><p>Yes</p></td>
</tr>
<tr class="even">
<td><p>type</p></td>
<td><p>string</p></td>
<td><p>Type of venue</p></td>
<td><p>Yes</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body Example

```json
{
    "name": "Paddy’s Pub",
    "city": "Philadelphia",
    "type": "Bar"
}
```

## Response

### Response Body Format

JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>201 Created</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>400 Bad Request</p></td>
<td><p>The request is missing one of the required attributes, or they
are not the correct type, the venue will not be created</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>406 Not Acceptable</p></td>
<td><p>The request Accept header does not contain application/json, the
venue will not be created</p></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>415 Unsupported Media Type</p></td>
<td><p>The request Content-Type header is not application/json, the
venue will not be created</p></td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Response Examples

#### Success

```json
Status: 201 Created
{
    "id": 789,
    "name": "Paddy’s Pub",
    "city": "Philadelphia",
    "type": "Bar",
    "events": [],
    "self": "https://example.com/venues/789"
}
```

#### Failure

```json
Status: 400 Bad Request
{
    "error": "The request object is missing at least one of the required attributes"
}
```
```json
Status: 400 Bad Request
{
    "error": "One of the attributes has an incorrect type"
}
```
```json
Status: 406 Not Acceptable
{
    "error": "Unsupported MIME Accept type. Valid type: application/json"
}
```
```json
Status: 415 Unsupported Media Type
{
    "error": "Unsupported MIME Content-Type. Valid type: application/json"
}
```

# Get Venues

Allows you to get all existing venues. Paginated to 5 venues per page.

```json
GET /venues
```

## Request

## Path Parameters

None

### Request Body

None

### Authentication

None

## Response

### Response Body Format

JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>200 OK</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>406 Not Acceptable</p></td>
<td><p>The request Accept header does not contain application/json or
text/html.</p></td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Response Examples

#### Success

```json
Status: 200 OK
{
"venues": [
    {
        "id": 789,
        "name": "Paddy’s Pub",
        "city": "Philadelphia",
        "type": "Bar",
        "events": [
            {
                "id": 123,
                "name": "Trivia Night",
                "self": "https://example.com/events/123"
            },
            {
                "id": 456,
                "name": "Karaoke Night",
                "self": "https://example.com/events/456"
            },
        ],
        "self": "https://example.com/venues/789"
    },
    {
        "id": 987,
        "name": "Moe’s Tavern",
        "city": "Springfield",
        "type": "Bar",
        "events": [
            {
                "id": 321,
                "name": "Karaoke Night",
                "self": "https://example.com/events/321"
            },
            {
                "id": 654,
                "name": "Trivia Night",
                "self": "https://example.com/events/654"
            },
        ],
        "self": "https://example.com/venues/987"
    },
...
],
"next": "www.example.com/events/?cursor=ABCdef123=="
}
```

#### Failure

```json
Status: 406 Not Acceptable
{
"error": "Unsupported MIME Accept type. Valid types: application/json"
}
```

# Get a Venue

Allows you to get an existing venue.

```json
GET /venues/:venues_id
```

## Request

## Path Parameters

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Description</strong></p></td>
</tr>
<tr class="even">
<td><p>venue_id</p></td>
<td><p>ID of the venue</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body

None

### Authentication

None

## Response

### Response Body Format

JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>200 OK</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>404 Not Found</p></td>
<td><p>No venues with this venue_id exists</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>406 Not Acceptable</p></td>
<td><p>The request Accept header does not contain
application/json.</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Response Examples

#### Success

```json
Status: 200 OK
{
    "id": 789,
    "name": "Paddy’s Pub",
    "city": "Philadelphia",
    "type": "Bar",
    "events": [
        {
            "id": 123,
            "name": "Trivia Night",
            "self": "https://example.com/events/123"
        },
        {
            "id": 456,
            "name": "Karaoke Night",
            "self": "https://example.com/events/456"
        },
    ],
    "self": "https://example.com/venues/789"
}
```

#### Failure

```json
Status: 404 Not Found
{
    "error": "No venue with this venue_id exists"
}
```
```json
Status: 406 Not Acceptable
{
    "error": "Unsupported MIME Accept type. Valid type: application/json"
}
```

# Edit a Venue

Allows you to edit an existing venue.

```json
PATCH /venues/:venue_id
```

## Request

### Path Parameters

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Description</strong></p></td>
</tr>
<tr class="even">
<td><p>venue_id</p></td>
<td><p>ID of the venue</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body

Required

### Request Body Format

JSON

### Authentication

None

### Request JSON Attributes

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Type</strong></p></td>
<td><p><strong>Description</strong></p></td>
<td><p><strong>Required</strong></p></td>
</tr>
<tr class="even">
<td><p>name</p></td>
<td><p>string</p></td>
<td><p>Name of the venue</p></td>
<td><p>No</p></td>
</tr>
<tr class="odd">
<td><p>city</p></td>
<td><p>string</p></td>
<td><p>City the venue is in</p></td>
<td><p>No</p></td>
</tr>
<tr class="even">
<td><p>type</p></td>
<td><p>string</p></td>
<td><p>Type of venue</p></td>
<td><p>No</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body Example

```json
{
    "city": "Philadelphia"
}
```

## Response

### Response Body Format

JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>200 OK</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>400 Bad Request</p></td>
<td><p>One of the attributes is the incorrect type, the venue will not
be edited</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>404 Not Found</p></td>
<td><p>No venue with this venue_id exists</p></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>406 Not Acceptable</p></td>
<td><p>The request Accept header does not contain application/json, the
venue will not be edited</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>415 Unsupported Media Type</p></td>
<td><p>The request Content-Type header is not application/json, the
venue will not be edited</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Response Examples

#### Success

```json
Status: 200 OK
{
    "id": 789,
    "name": "Paddy’s Pub",
    "city": "Philadelphia",
    "type": "Bar",
    "events": [
        {
            "id": 123,
            "name": "Trivia Night",
            "self": "https://example.com/events/123"
        },
        {
            "id": 456,
            "name": "Karaoke Night",
            "self": "https://example.com/events/456"
        },
    ],
    "self": "https://example.com/venues/789"
}
```

#### Failure

```json
Status: 400 Bad Request
{
    "error": "One of the attributes has an incorrect type"
}
```
```json
Status: 404 Not Found
{
    "error": "No venue with this venue_id exists"
}
```
```json
Status: 406 Not Acceptable
{
    "error": "Unsupported MIME Accept type. Valid type: application/json"
}
```
```json
Status: 415 Unsupported Media Type
{
    "error": "Unsupported MIME Content-Type. Valid type: application/json"
}
```

# Replace a Venue

Allows you to replace an existing venue (the ID and events remain
unchanged).

```json
PUT /venues/:venue_id
```

## Request

### Path Parameters

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Description</strong></p></td>
</tr>
<tr class="even">
<td><p>venue_id</p></td>
<td><p>ID of the venue</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body

Required

### Request Body Format

JSON

### Authentication

None

### Request JSON Attributes

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Type</strong></p></td>
<td><p><strong>Description</strong></p></td>
<td><p><strong>Required?</strong></p></td>
</tr>
<tr class="even">
<td><p>name</p></td>
<td><p>string</p></td>
<td><p>Name of the venue</p></td>
<td><p>Yes</p></td>
</tr>
<tr class="odd">
<td><p>city</p></td>
<td><p>string</p></td>
<td><p>City the venue is in</p></td>
<td><p>Yes</p></td>
</tr>
<tr class="even">
<td><p>type</p></td>
<td><p>string</p></td>
<td><p>Type of venue</p></td>
<td><p>Yes</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body Example

```json
{
    "name": "Paddy’s Pub",
    "city": "Philadelphia",
    "type": "Bar"
}
```

## Response

### Response Body Format

JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>201 Created</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>400 Bad Request</p></td>
<td><p>The request is missing one of the required attributes or they are
not the correct type, the venue will not be replaced</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>404 Not Found</p></td>
<td><p>No event with this venue _id exists</p></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>406 Not Acceptable</p></td>
<td><p>The request Accept header does not contain application/json, the
venue will not be replaced</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>415 Unsupported Media Type</p></td>
<td><p>The request Content-Type header is not application/json, the
venue will not be replaced</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Response Examples

#### Success

```json
Status: 201 Created
{
    "id": 789,
    "name": "Paddy’s Pub",
    "city": "Philadelphia",
    "type": "Bar",
    "events": [
        {
            "id": 123,
            "name": "Trivia Night",
            "self": "https://example.com/events/123"
        },
        {
            "id": 456,
            "name": "Karaoke Night",
            "self": "https://example.com/events/456"
        },
    ],
    "self": "https://example.com/venues/789"
}
```

#### Failure

```json
Status: 400 Bad Request
{
    "error": "One of the attributes has an incorrect type"
}
```
```json
Status: 404 Not Found
{
    "error": "No venue with this venue_id exists"
}
```
```json
Status: 406 Not Acceptable
{
    "error": "Unsupported MIME Accept type. Valid type: application/json"
}
```
```json
Status: 415 Unsupported Media Type
{
    "error": "Unsupported MIME Content-Type. Valid type: application/json"
}
```

# Delete a Venue

Allows you to delete an existing venue.

```json
DELETE /venue /:venue _id
```

## Request

### Path Parameters

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Description</strong></p></td>
</tr>
<tr class="even">
<td><p>venue _id</p></td>
<td><p>ID of the venue</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body

None

## Response

No body

### Authentication

None

### Response Body Format

Success: No body

Failure: JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>204 No Content</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>404 Not Found</p></td>
<td><p>No venue with this venue_id exists</p></td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Response Examples

#### Success

```json
Status: 204 No Content
```

#### Failure

```json
Status: 404 Not Found
{
    "error": "No venue with this venue_id exists"
}
```

# Get Events by Venue

Allows you to get all events for a venue.

```json
GET /venues/:venues_id/events
```

## Request

## Path Parameters

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Description</strong></p></td>
</tr>
<tr class="even">
<td><p>venue_id</p></td>
<td><p>ID of the venue</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body

None

### Authentication

None

## Response

### Response Body Format

JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>200 OK</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>404 Not Found</p></td>
<td><p>No venues with this venue_id exists</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>406 Not Acceptable</p></td>
<td><p>The request Accept header does not contain
application/json.</p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Response Examples

#### Success

```json
Status: 200 OK
[
    {
        "id": 123,
        "name": "Trivia Night",
        "self": "https://example.com/events/123"
    },
    {
        "id": 456,
        "name": "Karaoke Night",
        "self": "https://example.com/events/456"
    },
]
```

#### Failure

```json
Status: 404 Not Found
{
    "error": "No venue with this venue_id exists"
}
```
```json
Status: 406 Not Acceptable
{
    "error": "Unsupported MIME Accept type. Valid type: application/json"
}
```

# Add an Event to a Venue

Allows you to add an event to a venue.

```json
PUT /:venue_id/events/:event_id
```

## Request

### Path Parameters

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Description</strong></p></td>
</tr>
<tr class="even">
<td><p>venue _id</p></td>
<td><p>ID of the venue</p></td>
</tr>
<tr class="odd">
<td><p>event_id</p></td>
<td><p>ID of the event</p></td>
</tr>
<tr class="even">
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body

None

## Response

No body

### Authentication

Required

### Response Body Format

Success: No body

Failure: JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>204 No Content</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>401 Unauthorized</p></td>
<td><p>The request does not have a valid JWT, i.e. the user is not
authenticated</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>403 Forbidden</p></td>
<td><p>The user is not authorized to edit this event</p></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>404 Not Found</p></td>
<td><p>No venue with this venue_id exists or no event with this event_id
exists</p></td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Response Examples

#### Success

```json
Status: 204 No Content
```

#### Failure

```json
Status: 401 Unauthorized
{
    "error": "Unauthorized"
}
```
```json
Status: 403 Forbidden
{
    "error": "Forbidden"
}
```
```json
Status: 404 Not Found
{
    "error": "The specified event and/or venue does not exist"
}
```

# Remove an Event from a Venue

Allows you to add an event to a venue.

```json
DELETE /:venue_id/events/:event_id
```

## Request

### Path Parameters

<table>
<tbody>
<tr class="odd">
<td><p><strong>Name</strong></p></td>
<td><p><strong>Description</strong></p></td>
</tr>
<tr class="even">
<td><p>venue _id</p></td>
<td><p>ID of the venue</p></td>
</tr>
<tr class="odd">
<td><p>event_id</p></td>
<td><p>ID of the event</p></td>
</tr>
<tr class="even">
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body

None

## Response

No body

### Authentication

Required

### Response Body Format

Success: No body

Failure: JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>204 No Content</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>401 Unauthorized</p></td>
<td><p>The request does not have a valid JWT, i.e. the user is not
authenticated</p></td>
</tr>
<tr class="even">
<td><p>Failure</p></td>
<td><p>403 Forbidden</p></td>
<td><p>The user is not authorized to edit this event</p></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>404 Not Found</p></td>
<td><p>No venue with this venue_id exists or no event with this event_id
exists</p></td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Response Examples

#### Success

```json
Status: 204 No Content
```

#### Failure

```json
Status: 401 Unauthorized
{
    "error": "Unauthorized"
}
```
```json
Status: 403 Forbidden
{
    "error": "Forbidden"
}
```
```json
Status: 404 Not Found
{
    "error": "The specified event and/or venue does not exist"
}
```

# Get Users

Allows you to get all existing users.

```json
GET /users
```

## Request

## Path Parameters

None

### Request Body

None

### Authentication

None

## Response

### Response Body Format

JSON

### Response Statuses

<table>
<tbody>
<tr class="odd">
<td><p><strong>Outcome</strong></p></td>
<td><p><strong>Status Code</strong></p></td>
<td><p><strong>Notes</strong></p></td>
</tr>
<tr class="even">
<td><p>Success</p></td>
<td><p>200 OK</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>Failure</p></td>
<td><p>406 Not Acceptable</p></td>
<td><p>The request Accept header does not contain application/json or
text/html.</p></td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Response Examples

#### Success

```json
Status: 200 OK
[
    {
        "sub": "auth0|123456789",
        "name": "Frank Reynolds",
        "email": "trashman@oregonstate.edu",
        "id": "123"
    },
    {
        "sub": "auth0|987654321",
        "name": "Dee Reynolds",
        "email": "dee.r@gmail.com",
        "id": "321"
    }
]
```

#### Failure

```json
Status: 406 Not Acceptable
{
    "error": "Unsupported MIME Accept type. Valid types: application/json"
}
```
