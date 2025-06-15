# <u>PROFILE COMPONENT DOCUMENTATION</u>

## RELEVANT DATABASE TABLES AND COLUMNS
- Tables:
  - users
    - Columns:
      - userID
      - username
      - password
      - avatarURL

## API
- `Endpoint:` /api/user/update-profile
- `Request Type:` POST
- `Purpose:` updates a user's info with the new data provided in the request body
- `Controller:` UserController
- `Request Data:` [UserDataRequest](#server-dtos)
- `Response Data:` [ResponseEntity\<UserDataResponse\>](#server-dtos)

## CLIENT COMPONENTS
- `Profile:` main profile component that displays the current username and avatar
  - wrapped in a reusable `Modal` component
- `EditAvatar:` child component of Profile that allows user to change their avatar
- `EditCredentials:` child component of Profile that allows user to change their username and/or password
  - wrapped in a reusable `Form` component

## CLIENT ROUTING
- Profile component can be accessed on any client route (from the main menu) except for /authentication

## STATE SLICES:
- `UserSlice:` 
  1. accessed to update username, and avatar url 
- `ApplicationAlertSlice:`
  1. accessed in the event of a request or server error to set error info that is then used to display a related message to the user

## CLIENT VALIDATIONS 
- applicable to the EditCredentials component
  - ensure that user provides data to either username or password + confirm password fields
  - ensure that confirmation password matches password 
  - limit username length - 1-15
  - limit password length - 1-15
- applicable to the EditAvatr component
  - ensure that user selects an avatar before change avatar request is sent

## CLIENT ERROR HANDLING
- following errors handled and message displayed to user if:
  - username is not unique during signup
  - http request fails / server error is encountered

## CLIENT ACTION CREATOR THUNKS
- `UserActions:`
  - `updateUserProfile:` action creator thunk that sends a POST request to /api/user/update-profile and updates UserSlice with the new account info upon successful response or updates ApplicationAlertSlice in the event of an error

## SERVER CUSTOM ERROR HANDLING 
- `InvalidUsernameException:` - gets thrown when username provided by user is not unique

## SERVER ENTITIES
- `User` 

## SERVER CONTROLLERS
- `UserController` 

## SERVER SERVICES
- `UserService` - helper class that is used by the UserController methods to perfrom logic and database operations

## SERVER REPOs
- `UserRepository` - this is the DAO (data access object), called by the UserService methods, and performs operations on the users table in the database through spring data jpa

## SERVER DTOs
- `UserDataRequest` - contains fields for userId, username, passowrd, and avatarURL with the following [validations](#server-dtos) applied 
- `UserDataResponse` - contains JWT and all user account info (userID, username, role, avatarURL, activeGames) except for the password which the client does not need

## SERVER VALIDATIONS
- DTO: `UserDataRequest`
  - field: `userID` -- validation annotation: `@NotNull`
  - field: `username` -- validation annotations: `@NotNull`, `@Size(1, 15)`
  - field: `password` -- validation annotations: `@NotNull`, `@Size(1, 15)`
  - field: `avatarURL` -- validation annotations: `@NotNull`, `@Size(3, 15)`

## REQUIREMENTS / USER EXPERIENCE
- when user opens the profile modal they can see their current avatar and username
- at the bottom of the modal are the close, change avatar, and change credentials buttons
- when user clicks on the change avatar button:
  - user sees the EditAvatar component which displays a list of avatars that they can choose from
  - when user clicks on an avatar, avatar is highlighted so user knows which avatar has been selected
  - user can click change avatar button to update their avatar with the selected avatar
  - user can click the back button to return to the main profile view
  - user can click the close button to close the Profile modal
- when user clicks on the change credentials button:
  - user sees the EditCredentials component which shows a form containing new username, new password, and confirm new password fields
  - user can change username by entering a new username and clicking the update button
  - user can change password by entering a new password, confirming the new password, and clicking the update button
  - user can return to the main profile view by clicking the back button
  - user can close the profile modal by clicking the close button
- validation / request / sever error message is displayed to the user in the following scenarios:
  - new avatar has not been selected before attempting to update the avatar
  - neither a username nor a password have been provided before attempting to update credentials
  - password confirmation does not match password
  - username is not unique
  - network / server error occurred