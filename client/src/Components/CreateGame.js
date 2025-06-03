import Button from "../UI/Button";

const CreateGame = ({ setCreateGameModalActive }) => {

  return (
    <>
      <h1> CREATE GAME</h1>
      <Button name={"Close"} callBack={setCreateGameModalActive} args={[false]}/>
    </>
  )
}

export default CreateGame;