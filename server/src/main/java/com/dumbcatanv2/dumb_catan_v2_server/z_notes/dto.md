- if the operation - which the dto is a part of - requires the user's id, provide this through the `@AuthenticationPrincipal CustomUserDetails`
  and NOT through an id field in the dto
  - same applies to the username because that can also be extracted from the authentication principal