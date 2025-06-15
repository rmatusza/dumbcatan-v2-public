# <u>HOME PAGE DOCUMENTATION</u>

## CLIENT PAGES
- `Home:` placeholder component for the /home route - doesn't render anything but serves as the entrypoint to the application after authentication is complete

## CLIENT COMPONENTS
- `Banner:` banner located at the top of the screen that is visible across all pages when the user is authenticated - contains the user avatar, username, sign out button, and application name / logo
- `MainMenu:` component which contains the main menu options 
  - rendered in the Banner component since the MainMenu is triggered from the Banner - and is nested within a reusable Drawer component

## CLIENT ROUTING
- /home 

## STATE SLICES
- `UserSlice:` 
  1. accessed to reset user data to its initial state when user signs out 
- `MetaDataSlice:` 
  1. accessed to reset meta data to its initial state when user signs out
  2. accessed to toggle music and sound effects from the main menu
  
## REQUIREMENTS / USER EXPERIENCE
- when user lands on home page a random music track from the home theme tracklist should be playing
- user can sign out by clicking the sign out button located on the right side of the banner which will also navigate them to the authentication page
- user can click on their avatar located on the left side of the banner to open the main menu 
- if the main menu is open, user can click anywhere outside of the main menu to close it
- when the main menu is open, user can click on the following menu options:
  - `home` - navigates user to the `Home` page
  - `profile` - reveals a modal containing the `Profile` component which allows user to view and edit their username, password, and avatar
  - `create game` - reveals a modal containing the `CreateGame` component allowing user to create a new game
  - `your games` - navigates user to `Games` page where user can see a list of their games, resume playing an existing game by clicking on a game icon, and also invite other users to their games by clicking on "invite players" within a game icon
  - `your invites` - navigates user to `Invites` page where user can see and interact with game invitations that the user has received
  - `official rules` - opens a new tab that contains the official rules for catan
  - `about this app` - navigates user to `About` page that contains a variety of technical and non-technical information about the project and links to the project github pages
  - `enable/disable music` - allows the user to enable/disable the game music  
  - `enable/disable sound effects` - allows the user to enable/diable sound effects