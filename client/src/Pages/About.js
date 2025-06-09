import { CUSTOM_STYLES } from "../Utils/data";

const About = () => {
  return (
    <div className="flex flex-col bg-cream/60 backdrop-blur-md shadow-lg p-5 w-screen h-screen text-lg overflow-y-auto overflow-x-hidden">
      <h1 className="font-bold">{"Dumb Catan - Version 2.0 - "}<a className="cursor-pointer hover:underline text-blue-600 font-bold" href='https://github.com/rmatusza/dumbcatan-v2-public' target="_blank">Source Code</a></h1>
      <div className="flex">
        
      </div>
      <br></br>
      <div>
        <p>
          This application is a work in progress and is an improved version of my completed original implementation found on my Github: <a className="cursor-pointer hover:underline text-blue-600 font-bold" href='https://github.com/rmatusza/DumbCatanClient-Public' target="_blank">{`Front End `}</a> ----- <a className="cursor-pointer hover:underline text-blue-600 font-bold" href='https://github.com/rmatusza/DumbCatanServer-Public' target="_blank">{` Back End`}</a>.
          While this version is not yet fully complete, I decided to make the app available in its current state to showcase my skills in full-stack development, real-time multiplayer logic, and modern UI design. The goal is to present clean, production-style code and architecture in a more polished package that 
          can be explored to get a meaningful sense of my technical abilities. As my work on this app continues, this demo will evolve and new features will be made available, so feel free to check back at a later date to see any updates that have been made.
        </p>
        <br></br>
        <p>
          You can see a list of the version 2 specific enhancements <a href="#version-2-enhancements" className="cursor-pointer hover:underline text-blue-600 font-bold">HERE</a>
        </p>
        <p>
          You can see a list of the currently implemented features along with features that are set to be implemented next <a href="#version-2-current-features" className="cursor-pointer hover:underline text-blue-600 font-bold">HERE</a>
        </p>
      </div>
      <br></br>
      <div>
        <br></br>
        <p className={`text-catanRed font-yatra text-4xl underline`}>Gameplay Features</p>
        <br></br>
        <p className="text-xl font-bold">Real-Time Multiplayer:</p>
        <ul class="list-disc list-inside">
          <li>Up to 4 players per game</li>
          <li>Lobby system: create or join a new game</li>
          <li>Real-time board and turn synchronization across all clients</li>
        </ul>

        <p className="text-xl font-bold">Full Game Logic Implementation:</p>
        <ul class="list-disc list-inside">
          <li>Follows official Settlers of Catan rules</li>
          <li>Dice rolling, resource distribution, building (roads, settlements, cities)</li>
          <li>Longest road, largest army, and victory point tracking</li>
          <li>Full support for development cards and robber mechanics</li>
        </ul>

        <p className="text-xl font-bold">Board Interaction Design:</p>
        <ul class="list-disc list-inside">
          <li>Action-first input model: players choose an action (e.g., build road) from a menu, then click on the board to execute</li>
          <li>Turn-based flow enforced by the server</li>
          <li>Trade system: player-to-player trades with UI prompts and validation</li>
        </ul>
        <br></br>
        <p className={`text-catanRed font-yatra text-4xl underline`}>User Features</p>
        <br></br>
        <p className="text-xl font-bold">Authentication & Security:</p>
        <ul class="list-disc list-inside">
          <li>Secure user authentication and request validation using JWT and Spring Security filter chain</li>
          <li>Secure user credential storage with password hashing</li>
        </ul>

        <p className="text-xl font-bold">Game Navigation:</p>
        <ul class="list-disc list-inside">
          <li>React Router for routing between the various pages of the application</li>
          <li>UI state managed with Redux for consistency across components</li>
        </ul>

        <p className="text-xl font-bold">UI/UX:</p>
        <ul class="list-disc list-inside">
          <li>Tailwind CSS for rapid layout and styling</li>
          <li>Modal handling via React Portals</li>
          <li>Designed for desktop/laptop resolutions (mobile support not yet implemented)</li>
        </ul>
        <br></br>
        <p className={`text-catanRed font-yatra text-4xl underline`}>Technical Architecture</p>
        <br></br>
        <p className="text-xl font-bold">Front-End Stack:</p>
        <ul class="list-disc list-inside">
          <li>React (functional components + hooks)</li>
          <li>Redux for global state management</li>
          <li>React Hook Form for input validation</li>
          <li>React Portals for modal layers</li>
        </ul>

        <p className="text-xl font-bold">Back-End Stack:</p>
        <ul class="list-disc list-inside">
          <li>Java with Spring Boot</li>
          <li>Hibernate and Spring Data JPA for persistence</li>
          <li>Spring Security and JWT for authentication</li>
        </ul>

        <p className="text-xl font-bold">Real-Time Communication:</p>
        <ul class="list-disc list-inside">
          <li>Websockets (STOMP + SockJS)</li>
          <li>Efficient event broadcasting for turn changes, trades, actions</li>
        </ul>

        <p className="text-xl font-bold">Database:</p>
        <ul class="list-disc list-inside">
          <li>MySQL in order to support relationships between tables</li>
          <li>Hibernate and Spring Data JPA as ORM</li>
        </ul>

        <p className="text-xl font-bold">Deployment:</p>
        <ul class="list-disc list-inside">
          <li>Docker for app containerization</li>
          <li>AWS for cloud hosting</li>
        </ul>
        <br></br>
        <p className={`text-catanRed font-yatra text-4xl underline`}>Current Limitations</p>
        <ul class="list-disc list-inside">
          <li>Not optimized for mobile</li>
          <li>No automated testing (manual QA only)</li>
        </ul>
        <br></br>
        <p className={`text-catanRed font-yatra text-4xl underline`}>Future Plans</p>
        <ul class="list-disc list-inside">
          <li>Migration to TypeScript for improved type safety and maintainability</li>
          <li>Mobile compatibility either through mobile specific styling or through React Native</li>
          <li>AI opponents</li>
        </ul>

        <br></br>

        <section id="version-2-enhancements">
          <p className={`text-catanRed font-yatra text-4xl underline`}>Version 2 Specific Enhancements</p>
          <br></br>
          <p className="text-xl font-bold">Front End:</p>
          <ul class="list-disc list-inside">
            <li>Redux for cleaner and more performant global state management</li>
            <li>Tailwind for easier and cleaner styling</li>
            <li>React portals for easier and more logical modal management</li>
            <li>React Hook Form for easier and cleaner form management</li>
            <li>Cleaner / more consistent code design</li>
            <li>Greater modularity - increased amount of component reuse</li>
            <li>Greater maintainability through data utility files which store static data and app-wide constants (image URLs, custom tailwind class names, default values, game data mappings, etc.) - also avoids hardcoding repeated values and reduces the risk of typos during development</li>
          </ul>

          <p className="text-xl font-bold">Back End:</p>
          <ul class="list-disc list-inside">
            <li>Full rather than partial use of Spring Security - enforcing JWT validation for each request through restricting client accessible endpoints and the implementation of a JWT authorization filter</li>
            <li>Cleaner and more reusable code through implementing Global Exception Handling and the usage of Data Transfer Objects</li>
            <li>Better adherence to best practices - using properties file to inject sensitive data into app, moving all logic out of controller methods and into service methods, implementation of server side validations for incoming request data</li>
          </ul>
        </section>

        <br></br>

        <section id="version-2-current-features">
          <p className={`text-catanRed font-yatra text-4xl underline`}>Feature Progress Log</p>

          <br></br>

          <p className="text-xl font-bold">Implemented:</p>
          <ul class="list-disc list-inside">
            <li>Auto signin with valid JWT</li>
            <li>Sign in with credentials</li>
            <li>Sign up</li>
            <li>Sign out</li>
            <li>Home Page: root of the application after authentication</li>
            <li>Banner component: contains user's avatar, username, and signout button</li>
            <li>Main Menu: drawer component that provides the user with a variety of options, including creating a game, checking invites, accessing the official rules, etc.</li>
            <li>User Profile: allows user to view and edit their avatar, username, and password</li>
            <li>Background / Ambient music</li>
          </ul>

          <p className="text-xl font-bold">In Progress:</p>
          <ul class="list-disc list-inside">
            <li>Adding user interaction sound effects</li>
            <li>Configuring Websockets</li>
            <li>Creating a Game</li>
            <li>Viewing Active Games</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default About;