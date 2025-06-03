const About = () => {
  return (
    <div className="flex flex-col bg-cream/60 backdrop-blur-md shadow-lg p-5 w-screen h-screen text-lg overflow-y-auto overflow-x-hidden">
      <h1 className="font-bold">Dumb Catan - Version 1.0</h1>
      <div className="flex">
        <a className="cursor-pointer hover:underline text-blue-600 font-bold" href='https://github.com/rmatusza/DumbCatanClient-Public' target="_blank">Client Application Github Repository</a>
        <h3 className="ml-3 mr-3">|</h3>
        <a className="cursor-pointer hover:underline text-blue-600 font-bold" href='https://github.com/rmatusza/DumbCatanServer-Public' target="_blank">Server Application Github Repository</a>
      </div>
      <h2 className="font-bold underline">Included Features:</h2>
      <div id='feature-list'>
        <h4>1. Ability to create and edit a profile with avatar, username, and password</h4>
        <h4>2. User password encryption</h4>
        <h4>3. Authentication via JWT token and Spring Security</h4>
        <h4>4. Ability to create and delete games</h4>
        <h4>5. Ability to invite friends to your game and accept/decline invitations from others</h4>
        <h4>6. Online realtime multiplayer via WebSocket - SockJS & STOMP messaging protocol</h4>
        <h4>7. All gameplay features associated with the base version of Catan. Such as the following:</h4>
        <ul className="pl-10">
          <li>Dice rolling</li>
          <li>Trading</li>
          <li>Building</li>
          <li>Purchasing and playing development cards</li>
          <li>Moving/using the robber</li>
        </ul>
      </div>
      <h2 className="font-bold underline">Future Plans:</h2>
      <div id='feature-list'>
        <h4>1. Improved UI appearance</h4>
        <h4>2. Responsive UI for better user experience across different device sizes</h4>
        <h4>3. Transition to Redux for global application state management - currently using React Context</h4>
      </div>
      <h2 className="font-bold underline">Stretch Goals:</h2>
      <div id='feature-list'>
        <h4>1. Addition of animations and sounds</h4>
        <h4>2. Addition of extra game modes - there are various interesting Catan expansion packs</h4>
        <h4>3. "AI" opponents</h4>
      </div>
    </div>
  )
}

export default About;