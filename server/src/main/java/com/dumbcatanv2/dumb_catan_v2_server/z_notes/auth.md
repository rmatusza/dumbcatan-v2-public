## Auth
- for the auth endpoint instead of doing public ResponseEntity<UserResponse> authenticate(Authentication authentication)
  changed it so that the service accesses it via `SecurityContextHolder` – that keeps controllers very “HTTP-only” and 
  moves security concerns down a layer.
  - see AuthService authenticate() method
- an alternative is to use `@AuthenticationPrincipal CustomUserDetails user`
  - then you can use user.getUserId()
  - This avoids:
    - Trusting the client to send any userId they want 
    - Repeating user info when it’s already in the security context