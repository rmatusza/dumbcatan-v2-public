import Button from "../UI/Button";
import { CUSTOM_STYLES } from "../Utils/data";

const CreateGame = ({ setCreateGameModalActive }) => {
  const S = CUSTOM_STYLES;

  return (
    <div className="flex flex-col h-full">
      <div className='rounded-xl bg-cream/60 mb-5 flex justify-center mt-10'>
        <h1 className={`text-3xl font-yatra font-bold`}>In Development</h1>
      </div>
      <div className="mt-auto">
        <Button name={"Close"} callBack={setCreateGameModalActive} args={[false]} namedStyles={[S.redAndYellowButtonSingle, S.goldYellowBorder]} namedStyleAsAddOn={true}/>
      </div>
    </div>
  )
}

export default CreateGame;