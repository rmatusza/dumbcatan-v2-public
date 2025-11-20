## Password Hashing
- this project uses `bcrypt password encoder` which `always has an output length of 60 characters no matter how long the input password is`
- for storage in mysql use either: 
  - `CHAR(60)` - slightly more efficient because the size is fixed
  - `VARCHAR(60)` - more flexible if you ever migrate to a slightly longer algorithm
- anatomy of a password hashed by bcrypt:
  - `$2b$<cost>$<22-char-salt><31-char-hash>`
    - 4 chars for $2b$
    - 2 digits for cost (e.g., 12)
    - 22 chars (salt)
    - 31 chars (hash)
    - 60 chars overall

## Password Minimums
