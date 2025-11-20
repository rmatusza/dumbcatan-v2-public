## ResponseEntity
- when writing to the database use `ResponseEntity.status(HttpStatus.CREATED).body(your-response);` - has a status of `201`
  - was previously just using ResponseEntity.ok(your-response);
- when deleting from the db use `ResponseEntity.noContent().build();` as a response - has a status of `204`
  - 204 means that the request was successful and that there is no content to be returned
- one thing that CGPT mentioned was to include a location header for 201 responses
  - the location is just the endpoint so if a user created a new game and the game id was 10 then location might look like
    /game/create-new/10
  - to add the location as a header can do the following:
    `URI location = URI.create("/invite/" + res.getId());`
    `return ResponseEntity.created(location).body(res);`