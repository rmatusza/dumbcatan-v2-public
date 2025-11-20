import Modal from "./Modal";
import Button from "./Button";
import { CUSTOM_STYLES as S } from "../Utils/constants";

// popup message is a special type of modal - can see that its content is inside of the modal component
// only purpose is to display an informative message to the user
// only button is a close button to remove the message
const PopupMessage = ({ background, lines, closePopup }) => {
  return (
    <Modal background={background}>
      <div className="flex flex-col h-full">
        <div className='rounded-xl bg-black/50 mb-5'>
          {
            lines.map((line, i) => {
              return (
                <>
                  <p key={i} className={`${S.text.headingTextYellow} text-center`}>{line}</p>
                  <br></br>
                </>
              )
            })
          }
        </div>
        <div className="mt-auto">
          <Button type={"Close"} name={"Close"} callBack={closePopup} namedStyles={[S.button.redAndYellowButtonSingle, S.border.goldYellowBorder]} />
        </div>
      </div>
    </Modal>
  )
}

export default PopupMessage;