# <span id="_Toc84856244">Create a</span>n Event

Allows you to create a new event.

<table>
<tbody>
<tr class="odd">
<td><p>POST /events</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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
<tr class="odd">
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

### Request Body Example

<table>
<tbody>
<tr class="odd">
<td><p>{</p>
<p><code>"name": "</code><code>Trivia Night</code><code>",</code></p>
<p><code>  "</code><code>date</code><code>": "</code><code>02/17/2023</code><code>",</code></p>
<p><code>"</code><code>description</code><code>": </code><code>"</code><code>Trivia night at Paddy</code><code>’</code><code>s Pub</code><code>"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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
</tr>
</tbody>
</table>

### Response Examples

#### Success

<table>
<tbody>
<tr class="odd">
<td><p>Status: 201 Created</p>
<p>{</p>
<p><code>"id": 123,</code></p>
<p><code>"name": "Trivia Night",</code></p>
<p><code>  </code><code>"date": "02/17/2023",</code></p>
<p><code>"description": "Trivia night at Paddy</code><code>’</code><code>s Pub"</code></p>
<p><code>  </code><code>"</code><code>host</code><code>"</code><code>: </code><code>"</code><code>auth0|</code><code>123456789</code><code>",</code></p>
<p><code>  </code><code>"</code><code>venue</code><code>": </code><code>null</code><code>,</code></p>
<p><code>  "self": "https://example.com/</code><code>events</code><code>/123"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 400 Bad Request</p>
<p>{</p>
<p><code>"error": "The request object is missing at least one of the required attributes"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 400 Bad Request</p>
<p>{</p>
<p><code>"error": "One of the attributes has an incorrect type"</code></p>
<p>}</p></td>
</tr>
<tr class="odd">
<td><p>Status: 401 Unauthorized</p>
<p>{</p>
<p><code>"error": "Unauthorized"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 406 Not Acceptable</p>
<p>{</p>
<p><code>"error": "Unsupported MIME Accept type. Valid type: application/json"</code></p>
<p>}</p></td>
</tr>
<tr class="odd">
<td><p>Status: 415 Unsupported Media Type</p>
<p>{</p>
<p><code>"error": "Unsupported MIME Content-Type. Valid type: application/json"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

# <span id="_Toc84856245">Get</span><span id="_Toc84856245"> </span>Events

Allows you to get all existing events if unauthorized, or your own
events if authorized. Paginated to 5 events per page.

<table>
<tbody>
<tr class="odd">
<td><p>GET /events</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>Status: 200 OK</p>
<p>{</p>
<p><code>"</code><code>events</code><code>": </code><code>[</code></p>
<p><code>    </code><code>{</code></p>
<p><code>        </code><code>"id": 123,</code></p>
<p><code>       </code><code>"name": "Trivia Night",</code></p>
<p><code> </code><code>      </code><code>"date": "02/17/2023",</code></p>
<p><code>"description": "Trivia night at Paddy</code><code>’</code><code>s Pub"</code></p>
<p><code>        </code><code>"host": "</code><code>auth0|</code><code>123456789",</code></p>
<p><code>  </code><code>      </code><code>"venue": </code><code>{</code></p>
<p><code>           "id": </code><code>789</code><code>,</code></p>
<p><code>           "name": "</code><code>Paddy</code><code>’</code><code>s</code><code> </code><code>Pub</code><code>"</code></p>
<p><code>           "self": "https://example.com/venues/</code><code>789</code><code>"</code></p>
<p><code>        </code><code>}</code><code>,</code></p>
<p><code>  </code><code>      </code><code>"self": "https://example.com/events/123"</code></p>
<p><code>    </code><code>}</code><code>,</code></p>
<p><code>    </code><code>{</code></p>
<p><code>        "id": </code><code>321</code><code>,</code></p>
<p><code>       </code><code>"name": "</code><code>Karaoke</code><code> Night",</code></p>
<p><code> </code><code>      </code><code>"date": "02/</code><code>25</code><code>/2023",</code></p>
<p><code>"description": "Karaoke </code><code>n</code><code>ight</code><code> </code><code>at </code><code>Moe</code><code>’</code><code>s Tavern</code><code>"</code></p>
<p><code>        "host": "</code><code>auth0|</code><code>987654321</code><code>",</code></p>
<p><code>        "venue":</code><code> </code><code>{</code></p>
<p><code>           </code><code>"id"</code><code>:</code><code> 987,</code></p>
<p><code>           "name</code><code>"</code><code>: </code><code>"Moe</code><code>’</code><code>s Tavern"</code></p>
<p><code>           </code><code>"</code><code>self</code><code>": "https://example.com/</code><code>venues</code><code>/</code><code>987</code><code>"</code></p>
<p><code>        </code><code>}</code><code>,</code></p>
<p><code>        "self": "https://example.com/events/</code><code>321</code><code>"</code></p>
<p><code>    </code><code>}</code><code>,</code></p>
<p><code>…</code><code>…</code><code>…</code><code>…</code><code>…</code><code>…</code><code>…</code><code>…</code><code>…</code><code>…</code></p>
<p><code>  ]</code><code>,</code></p>
<p><code>"</code><code>next</code><code>": "</code><code>www.example.com/events/?cursor=ABCdef123==</code><code>"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 406 Not Acceptable</p>
<p>{</p>
<p><code>"</code><code>e</code><code>rror": "Unsupported MIME Accept type. </code><code>Valid types: application/json</code><code> </code><code>"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

# Get an Event

Allows you to get an existing event.

<table>
<tbody>
<tr class="odd">
<td><p>GET /events/:event_id</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>Status: 200 OK</p>
<p>{</p>
<p><code>    </code><code>"id": 123,</code></p>
<p><code>    </code><code>"name": "Trivia Night",</code></p>
<p><code> </code><code>   </code><code>"date": "02/17/2023",</code></p>
<p><code>"description": "Trivia night at Paddy</code><code>’</code><code>s Pub"</code></p>
<p><code>    </code><code> </code><code>"host": "</code><code>auth0|</code><code>123456789",</code></p>
<p><code>     "venue": </code><code>{</code></p>
<p><code>     </code><code>    </code><code>"id": 789,</code></p>
<p><code>     </code><code>    </code><code>"name": "Paddy</code><code>’</code><code>s Pub"</code></p>
<p><code>     </code><code>    </code><code>"self": "https://example.com/venues/789"</code></p>
<p><code>     </code><code>}</code><code>,</code></p>
<p><code>     "self": "https://example.com/events/123"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 404 Not Found</p>
<p>{</p>
<p><code>"error": "No event with this event_id exists"</code><code>"</code><code> </code></p>
<p><code>}</code></p></td>
</tr>
<tr class="even">
<td><p>Status: 406 Not Acceptable</p>
<p>{</p>
<p><code>"</code><code>e</code><code>rror": "Unsupported MIME Accept type. </code><code>Valid type: application/json</code><code> </code><code>"</code></p>
<p>}</p></td>
</tr>
<tr class="odd">
<td></td>
</tr>
</tbody>
</table>

# Edit an Event

Allows you to edit an existing event.

<table>
<tbody>
<tr class="odd">
<td><p>PATCH /events/:event_id</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>{</p>
<p><code>"description": "Trivia night at Paddy</code><code>’</code><code>s Pub"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>Status: 200 OK</p>
<p>{</p>
<p><code>"id": 123,</code></p>
<p><code>"name": "Trivia Night",</code></p>
<p><code>  "date": "02/17/2023",</code></p>
<p><code>"description": "Trivia night at Paddy</code><code>’</code><code>s Pub"</code></p>
<p><code>  "host": "</code><code>auth0|</code><code>123456789",</code></p>
<p><code>  "venue": null,</code></p>
<p><code>  "self": "https://example.com/events/123"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 400 Bad Request</p>
<p>{</p>
<p><code>"error": "One of the attributes has an incorrect type"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 401 Unauthorized</p>
<p>{</p>
<p><code>"error": "Unauthorized"</code></p>
<p>}</p></td>
</tr>
<tr class="odd">
<td><p>Status: 403 Forbidden</p>
<p>{</p>
<p><code>"error": "Forbidden"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 404 Not Found</p>
<p>{</p>
<p><code>"error": "No event with this event_id exists"</code></p>
<p><code>}</code></p></td>
</tr>
<tr class="odd">
<td><p>Status: 406 Not Acceptable</p>
<p>{</p>
<p><code>"error": "Unsupported MIME Accept type. Valid type: application/json"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 415 Unsupported Media Type</p>
<p>{</p>
<p><code>"error": "Unsupported MIME Content-Type. Valid type: application/json"</code></p>
<p>}</p></td>
</tr>
<tr class="odd">
<td></td>
</tr>
</tbody>
</table>

# Replace an Event

Allows you to replace an existing event (the ID and venue remains
unchanged).

<table>
<tbody>
<tr class="odd">
<td><p>PUT /events/:event_id</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>{</p>
<p><code>"name": "Trivia Night",</code></p>
<p><code>  "date": "02/17/2023",</code></p>
<p><code>"description": "Trivia night at Paddy</code><code>’</code><code>s Pub"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>Status: 201 Created</p>
<p>{</p>
<p><code>"id": 123,</code></p>
<p><code>"name": "Trivia Night",</code></p>
<p><code>  "date": "02/17/2023",</code></p>
<p><code>"description": "Trivia night at Paddy</code><code>’</code><code>s Pub"</code></p>
<p><code>  "host": "</code><code>auth0|</code><code>123456789",</code></p>
<p><code>  </code><code>"venue": </code><code>{</code></p>
<p><code>     "id": 789,</code></p>
<p><code>     "name": "Paddy</code><code>’</code><code>s Pub"</code></p>
<p><code>     "self": "https://example.com/venues/789"</code></p>
<p><code>  </code><code>}</code><code>,</code></p>
<p><code>  "self": "https://example.com/events/123"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 400 Bad Request</p>
<p>{</p>
<p><code>"error": "One of the attributes has an incorrect type"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 401 Unauthorized</p>
<p>{</p>
<p><code>"error": "Unauthorized"</code></p>
<p>}</p></td>
</tr>
<tr class="odd">
<td><p>Status: 403 Forbidden</p>
<p>{</p>
<p><code>"error": "Forbidden"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 404 Not Found</p>
<p>{</p>
<p><code>"error": "No event with this event_id exists"</code></p>
<p><code>}</code></p></td>
</tr>
<tr class="odd">
<td><p>Status: 406 Not Acceptable</p>
<p>{</p>
<p><code>"error": "Unsupported MIME Accept type. Valid type: application/json"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 415 Unsupported Media Type</p>
<p>{</p>
<p><code>"error": "Unsupported MIME Content-Type. Valid type: application/json"</code></p>
<p>}</p></td>
</tr>
<tr class="odd">
<td></td>
</tr>
</tbody>
</table>

# <span id="_Toc84856248">Delete a</span>n Event

Allows you to delete an existing event.

<table>
<tbody>
<tr class="odd">
<td><p>DELETE /events/:event_id</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>Status: 204 No Content</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 401 Unauthorized</p>
<p>{</p>
<p><code>"error": "Unauthorized"</code></p>
<p><code>}</code></p></td>
</tr>
<tr class="even">
<td><p>Status: 403 Forbidden</p>
<p>{</p>
<p><code>"error": "Forbidden"</code></p>
<p><code>}</code></p></td>
</tr>
<tr class="odd">
<td><p>Status: 404 Not Found</p>
<p>{</p>
<p><code>"error": "No event with this event_id exists"</code></p>
<p><code>}</code></p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

# Create a Venue

Allows you to create a new venue.

<table>
<tbody>
<tr class="odd">
<td><p>POST /venues</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>{</p>
<p><code>"name": "</code><code>Paddy</code><code>’</code><code>s Pub</code><code>",</code></p>
<p><code>  "</code><code>city</code><code>": "</code><code>Philadelphia</code><code>",</code></p>
<p><code>"</code><code>type</code><code>": "</code><code>Bar</code><code>"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>Status: 201 Created</p>
<p>{</p>
<p><code>"id": </code><code>789</code><code>,</code></p>
<p><code>"name": "Paddy</code><code>’</code><code>s Pub",</code></p>
<p><code>  "city": "Philadelphia",</code></p>
<p><code>"type": "Bar"</code></p>
<p><code>  "</code><code>events</code><code>":</code><code> []</code><code>,</code></p>
<p><code>  "self": "https://example.com/</code><code>venues</code><code>/</code><code>789</code><code>"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 400 Bad Request</p>
<p>{</p>
<p><code>"error": "The request object is missing at least one of the required attributes"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 400 Bad Request</p>
<p>{</p>
<p><code>"error": "One of the attributes has an incorrect type"</code></p>
<p>}</p></td>
</tr>
<tr class="odd">
<td><p>Status: 406 Not Acceptable</p>
<p>{</p>
<p><code>"error": "Unsupported MIME Accept type. Valid type: application/json"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 415 Unsupported Media Type</p>
<p>{</p>
<p><code>"error": "Unsupported MIME Content-Type. Valid type: application/json"</code></p>
<p>}</p></td>
</tr>
<tr class="odd">
<td></td>
</tr>
</tbody>
</table>

# Get Venues

Allows you to get all existing venues. Paginated to 5 venues per page.

<table>
<tbody>
<tr class="odd">
<td><p>GET /venues</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>Status: 200 OK</p>
<p>{</p>
<p><code>"</code><code>venues</code><code>": [</code></p>
<p><code>    </code><code>{</code></p>
<p><code>"id": 789,</code></p>
<p><code>"name": "Paddy</code><code>’</code><code>s Pub",</code></p>
<p><code>        "city": "Philadelphia",</code></p>
<p><code>"type": "Bar"</code></p>
<p><code>        "events": [</code></p>
<p><code>            </code><code>{</code></p>
<p><code>                "id": 123,</code></p>
<p><code>"name": "Trivia Night",</code></p>
<p><code>                "self": "https://example.com/events/123"</code></p>
<p><code>            </code><code>}</code><code>,</code></p>
<p><code>            </code><code>{</code></p>
<p><code>                "id": 456,</code></p>
<p><code>"name": "Karaoke Night",</code></p>
<p><code>                "self": "https://example.com/events/456"</code></p>
<p><code>            </code><code>}</code><code>,</code></p>
<p><code>        ],</code></p>
<p><code>        "self": "https://example.com/venues/789"</code></p>
<p><code>    </code><code>}</code><code>,</code></p>
<p><code>    </code><code>{</code></p>
<p><code>"id": </code><code>987</code><code>,</code></p>
<p><code>"name": "</code><code>Moe</code><code>’</code><code>s </code><code>Tavern</code><code>",</code></p>
<p><code>        "city": "</code><code>Springfield</code><code>",</code></p>
<p><code>"type": "Bar"</code></p>
<p><code>        "events": [</code></p>
<p><code>            </code><code>{</code></p>
<p><code>                "id": </code><code>321</code><code>,</code></p>
<p><code>"name": "Karaoke Night",</code></p>
<p><code>                "self": "https://example.com/events/</code><code>321</code><code>"</code></p>
<p><code>            </code><code>}</code><code>,</code></p>
<p><code>            </code><code>{</code></p>
<p><code>                "id": 654,</code></p>
<p><code>"name": "</code><code>Trivia</code><code> Night",</code></p>
<p><code>                "self": "https://example.com/events/</code><code>654</code><code>"</code></p>
<p><code>            </code><code>}</code><code>,</code></p>
<p><code>        ],</code></p>
<p><code>        "self": "https://example.com/venues/</code><code>987</code><code>"</code></p>
<p><code>    </code><code>}</code><code>,</code></p>
<p><code>…</code><code>…</code><code>…</code><code>…</code><code>…</code><code>…</code><code>…</code><code>…</code><code>…</code><code>…</code></p>
<p><code>  ],</code></p>
<p><code>"next": "www.example.com/events/?cursor=ABCdef123=="</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 406 Not Acceptable</p>
<p>{</p>
<p><code>"</code><code>e</code><code>rror": "Unsupported MIME Accept type. </code><code>Valid types: application/json</code><code> "</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

# Get a Venue

Allows you to get an existing venue.

<table>
<tbody>
<tr class="odd">
<td><p>GET /venues/:venues_id</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>Status: 200 OK</p>
<p><code>{</code></p>
<p><code>"id": 789,</code></p>
<p><code>"name": "Paddy</code><code>’</code><code>s Pub",</code></p>
<p><code>    </code><code>"city": "Philadelphia",</code></p>
<p><code>"type": "Bar"</code></p>
<p><code>    </code><code> </code><code>"events": [</code></p>
<p><code>        </code><code>{</code></p>
<p><code>            "id": 123,</code></p>
<p><code>"name": "Trivia Night",</code></p>
<p><code>            "self": "https://example.com/events/123"</code></p>
<p><code>        </code><code>}</code><code>,</code></p>
<p><code>        </code><code>{</code></p>
<p><code>            "id": 456,</code></p>
<p><code>"name": "Karaoke Night",</code></p>
<p><code>            "self": "https://example.com/events/456"</code></p>
<p><code>        </code><code>}</code><code>,</code></p>
<p><code>    ],</code></p>
<p><code>    "self": "https://example.com/venues/789"</code></p>
<p><code>}</code></p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 404 Not Found</p>
<p>{</p>
<p><code>"error": "No </code><code>venue</code><code> with this </code><code>venue</code><code>_id exists"</code><code>" </code></p>
<p><code>}</code></p></td>
</tr>
<tr class="even">
<td><p>Status: 406 Not Acceptable</p>
<p>{</p>
<p><code>"</code><code>e</code><code>rror": "Unsupported MIME Accept type. </code><code>Valid type: application/json</code><code> "</code></p>
<p>}</p></td>
</tr>
<tr class="odd">
<td></td>
</tr>
</tbody>
</table>

# Edit a Venue

Allows you to edit an existing venue.

<table>
<tbody>
<tr class="odd">
<td><p>PATCH /venues/:venue_id</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>{</p>
<p><code>"city": "Philadelphia"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>Status: 200 OK</p>
<p>{</p>
<p><code>    </code><code>"id": 789,</code></p>
<p><code>"name": "Paddy</code><code>’</code><code>s Pub",</code></p>
<p><code>    "city": "Philadelphia",</code></p>
<p><code>"type": "Bar"</code></p>
<p><code>     "events": [</code></p>
<p><code>        </code><code>{</code></p>
<p><code>            "id": 123,</code></p>
<p><code>"name": "Trivia Night",</code></p>
<p><code>            "self": "https://example.com/events/123"</code></p>
<p><code>        </code><code>}</code><code>,</code></p>
<p><code>        </code><code>{</code></p>
<p><code>            "id": 456,</code></p>
<p><code>"name": "Karaoke Night",</code></p>
<p><code>            "self": "https://example.com/events/456"</code></p>
<p><code>        </code><code>}</code><code>,</code></p>
<p><code>    ],</code></p>
<p><code>    "self": "https://example.com/venues/789"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 400 Bad Request</p>
<p>{</p>
<p><code>"error": "One of the attributes has an incorrect type"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 404 Not Found</p>
<p>{</p>
<p><code>"error": "No </code><code>venue</code><code> with this </code><code>venue</code><code>_id exists"</code></p>
<p><code>}</code></p></td>
</tr>
<tr class="odd">
<td><p>Status: 406 Not Acceptable</p>
<p>{</p>
<p><code>"error": "Unsupported MIME Accept type. Valid type: application/json"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 415 Unsupported Media Type</p>
<p>{</p>
<p><code>"error": "Unsupported MIME Content-Type. Valid type: application/json"</code></p>
<p>}</p></td>
</tr>
<tr class="odd">
<td></td>
</tr>
</tbody>
</table>

# Replace a Venue

Allows you to replace an existing venue (the ID and events remain
unchanged).

<table>
<tbody>
<tr class="odd">
<td><p>PUT /venues/:venue_id</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>{</p>
<p><code>"name": "Paddy</code><code>’</code><code>s Pub",</code></p>
<p><code>  "city": "Philadelphia",</code></p>
<p><code>"type": "Bar"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>Status: 201 Created</p>
<p><code>{</code></p>
<p><code>"id": 789,</code></p>
<p><code>"name": "Paddy</code><code>’</code><code>s Pub",</code></p>
<p><code>    "city": "Philadelphia",</code></p>
<p><code>"type": "Bar"</code></p>
<p><code>     "events": [</code></p>
<p><code>        </code><code>{</code></p>
<p><code>            "id": 123,</code></p>
<p><code>"name": "Trivia Night",</code></p>
<p><code>            "self": "https://example.com/events/123"</code></p>
<p><code>        </code><code>}</code><code>,</code></p>
<p><code>        </code><code>{</code></p>
<p><code>            "id": 456,</code></p>
<p><code>"name": "Karaoke Night",</code></p>
<p><code>            "self": "https://example.com/events/456"</code></p>
<p><code>        </code><code>}</code><code>,</code></p>
<p><code>    ],</code></p>
<p><code>    "self": "https://example.com/venues/789"</code></p>
<p><code>}</code></p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 400 Bad Request</p>
<p>{</p>
<p><code>"error": "One of the attributes has an incorrect type"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 404 Not Found</p>
<p>{</p>
<p><code>"error": "No </code><code>venue</code><code> with this </code><code>venue</code><code>_id exists"</code></p>
<p><code>}</code></p></td>
</tr>
<tr class="odd">
<td><p>Status: 406 Not Acceptable</p>
<p>{</p>
<p><code>"error": "Unsupported MIME Accept type. Valid type: application/json"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 415 Unsupported Media Type</p>
<p>{</p>
<p><code>"error": "Unsupported MIME Content-Type. Valid type: application/json"</code></p>
<p>}</p></td>
</tr>
<tr class="odd">
<td></td>
</tr>
</tbody>
</table>

# Delete a Venue

Allows you to delete an existing venue.

<table>
<tbody>
<tr class="odd">
<td><p>DELETE /venue /:venue _id</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>Status: 204 No Content</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 404 Not Found</p>
<p>{</p>
<p><code>"error": "No </code><code>venue</code><code> with this </code><code>venue</code><code>_id exists"</code></p>
<p><code>}</code></p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

# Get Events by Venue

Allows you to get all events for a venue.

<table>
<tbody>
<tr class="odd">
<td><p>GET /venues/:venues_id/events</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>Status: 200 OK</p>
<p><code>[</code></p>
<p><code>    </code><code>{</code></p>
<p><code>        "id": 123,</code></p>
<p><code>"name": "Trivia Night",</code></p>
<p><code>        "self": "https://example.com/events/123"</code></p>
<p><code>    </code><code>}</code><code>,</code></p>
<p><code>    </code><code>{</code></p>
<p><code>        "id": 456,</code></p>
<p><code>"name": "Karaoke Night",</code></p>
<p><code>        "self": "https://example.com/events/456"</code></p>
<p><code>    </code><code>}</code><code>,</code></p>
<p><code>]</code></p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 404 Not Found</p>
<p>{</p>
<p><code>"error": "No </code><code>venue</code><code> with this </code><code>venue</code><code>_id exists"</code><code>" </code></p>
<p><code>}</code></p></td>
</tr>
<tr class="even">
<td><p>Status: 406 Not Acceptable</p>
<p>{</p>
<p><code>"</code><code>e</code><code>rror": "Unsupported MIME Accept type. </code><code>Valid type: application/json</code><code> "</code></p>
<p>}</p></td>
</tr>
<tr class="odd">
<td></td>
</tr>
</tbody>
</table>

# Add an Event to a Venue

Allows you to add an event to a venue.

<table>
<tbody>
<tr class="odd">
<td><p>PUT /:venue_id/events/:event_id</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>Status: 204 No Content</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 401 Unauthorized</p>
<p>{</p>
<p><code>"error": "Unauthorized"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 403 Forbidden</p>
<p>{</p>
<p><code>"error": "Forbidden"</code></p>
<p>}</p></td>
</tr>
<tr class="odd">
<td><p>Status: 404 Not Found</p>
<p>{</p>
<p><code>"error": "The specified event and/or venue does not exist"</code></p>
<p><code>}</code></p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

# Remove an Event from a Venue

Allows you to add an event to a venue.

<table>
<tbody>
<tr class="odd">
<td><p>DELETE /:venue_id/events/:event_id</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>Status: 204 No Content</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 401 Unauthorized</p>
<p>{</p>
<p><code>"error": "Unauthorized"</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td><p>Status: 403 Forbidden</p>
<p>{</p>
<p><code>"error": "Forbidden"</code></p>
<p>}</p></td>
</tr>
<tr class="odd">
<td><p>Status: 404 Not Found</p>
<p>{</p>
<p><code>"error": "The specified event and/or venue does not exist"</code></p>
<p><code>}</code></p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

# Get Users

Allows you to get all existing users.

<table>
<tbody>
<tr class="odd">
<td><p>GET /users</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

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

<table>
<tbody>
<tr class="odd">
<td><p>Status: 200 OK</p>
<p>[</p>
<p><code>    </code><code>{</code></p>
<p><code>        "sub": "auth0|</code><code>123456789</code><code>",</code></p>
<p><code>        "name": "</code><code>Frank Reynolds</code><code>",</code></p>
<p><code>        "email": "</code><code>trashman</code><code>@oregonstate.edu",</code></p>
<p><code>        "id": "</code><code>123</code><code>"</code></p>
<p><code>    </code><code>}</code><code>,</code></p>
<p><code>    </code><code>{</code></p>
<p><code>        "sub": "auth0|</code><code>987654321</code><code>",</code></p>
<p><code>        "name": "</code><code>Dee Reynolds</code><code>",</code></p>
<p><code>        "email": "</code><code>dee.r</code><code>@gmail.com",</code></p>
<p><code>        "id": "</code><code>321</code><code>"</code></p>
<p><code>    </code><code>}</code></p>
<p>]</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>

#### Failure

<table>
<tbody>
<tr class="odd">
<td><p>Status: 406 Not Acceptable</p>
<p>{</p>
<p><code>"</code><code>e</code><code>rror": "Unsupported MIME Accept type. </code><code>Valid types: application/json</code><code> "</code></p>
<p>}</p></td>
</tr>
<tr class="even">
<td></td>
</tr>
</tbody>
</table>
