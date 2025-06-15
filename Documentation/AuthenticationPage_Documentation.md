# <u>AUTHENTICATION DOCUMENTATION</u>

## RELEVANT DATABASE TABLES AND COLUMNS
- Tables:
  - users
    - Columns:
      - userID
      - username
      - password
      - role
      - avatarURL
      - activeGames

## API
- `Endpoint:` /api/auth/authenticate
- `Request Type:` GET
- `Purpose:` attempts to authenticate a user with the jwt provided in the request headers
- `Controller:` AuthController
- `Request Data:` JWT token in "Authorization" request header
- `Response Data:` [ResponseEntity\<UserDataResponse\>](#server-dtos)

<br></br>

- `Endpoint:` /api/auth/signin
- `Request Type:` POST
- `Purpose:` allows a user to sign in with their username and password
- `Controller:` AuthController
- `Request Data:` [AuthRequest](#server-dtos)
- `Response Data:` [ResponseEntity\<UserDataResponse\>](#server-dtos)

<br></br>

- `Endpoint:` /api/auth/signup
- `Request Type:` POST
- `Purpose:` allows a user to make an account by providing a unique username and a password
- `Controller:` AuthController
- `Request Data:` [AuthRequest](#server-dtos) 
- `Response Data:` [ResponseEntity\<UserDataResponse\>](#server-dtos)

## CLIENT ROUTING
- /authentication 

## CLIENT VALIDATIONS 
- ensure that user provides data to all fields
- ensure that confirmation password matches password for signup
- limit username length - 1-15
- limit password length - 1-15

## CLIENT ERROR HANDLING
- handle following errors and display a message to user if:
  - username is not unique during signup
  - username and/or password are invalid during sign in
  - http request fails / server error is encountered

## CLIENT PAGES
- `Authentication:` page that contains the signin and signup components and represents the authentication page when user is at /authentication

## CLIENT COMPONENTS
- `Signin:` component that contains the signin logic
- `Signup:` component that contains the signup logic

## CLIENT ACTION CREATOR THUNKS
- `UserActions:`
  - `authenticateJwt:` action creator thunk that sends a request to /api/auth/authenticate using jwt, and updates the user slice upon successful response
  - `signin:` action creator thunk that sends a request to /api/auth/signin, and updates the user slice upon successful response in addition to storing jwt in cookies
  - `signup:` action creator thunk that sends a request to /api/auth/signup, and updates the user slice upon successful response in addition to storing jwt in cookies
  - if an error occurs during the execution of any of the above action creator thunks, ApplicationAlertSlice is updated with the error info so that a message can be displayed to the user

## STATE SLICES
- `UserSlice:` 
  1. updated with user's account info and authentication flag set to true after sign in, sign up, or authentication via jwt
- `MetaDataSlice:` 
  1. accessed to toggle application loading state when http request to sign in or sign up is sent and after response is received
  2. accessed to update the application background to the home page background when user is authenticated
  3. accessed to update the music state in order to play a random track from the home theme tracklist
- `ApplicationAlertSlice:`
  1. accessed to set application alerts in the event of a request error or server failure so that a related message can be displayed to the user
  
## SERVER VALIDATIONS
- DTO: `AuthRequest`
  - field: `username` -- validation annotations: `@NotNull`, `@Size(1, 15)`
  - field: `password` -- validation annotations: `@NotNull`, `@Size(1, 15)`

## SERVER CUSTOM ERROR HANDLING 
- `InvalidLoginException:` - gets thrown when username and/or password provided by user are invalid
- `InvalidUsernameException:` - gets thrown when username provided by user on signup has already been taken by another user

## SERVER ENTITIES
- `User` 

## SERVER CONTROLLERS
- `AuthController` - only handles the http routing and calls the AuthService object to perform logic and database interactions

## SERVER SERVICES
- `AuthService` - helper class - called by controller to perform logic and then utilizes the UserRepository object to interact with the database

## SERVER REPOs
- `UserRepository` - this is the DAO (data access object), called by the AuthService, and performs operations on the users table in the database through spring data jpa

## SERVER DTOs
- `AuthRequest` - used for both signin and signup requests - contains username and password fields
- `UserDataResponse` - contains JWT and all user account info (userID, username, role, avatarURL, activeGames) except for the password which the client does not need

## REQUIREMENTS / USER EXPERIENCE
- `Normal Scenarios:`
  - user lands on authentication page with signin component displayed by default
  - user can navigate between the signin and signup component by clicking the link within the card component that contains the sign in / sign up form
  - user is automatically signed in if they have a valid jwt in cookies
  - user can sign in with username and password if jwt is absent or invalid
  - user can create an account by providing a unique username and a password that must be re-entered to ensure correctness
  - once user is authenticated by any of the methods mentioned above, they are navigated to the home page
- `Negative Scenarios:`
  - appropriate error message is shown to the user in the following scenarios:
    - if username and/or password are invalid upon login 
    - if user does not enter data into any of the fields - all fields are required
    - if the passwords do not match on the signup page
    - if network request fails for either signin or signup
    - if a server error occurs
