import { CUSTOM_STYLES as S } from "../Utils/constants";
import Modal from "./Modal";
import Button from "./Button";

const Confirmation = ({ background, confirmationButtonName, confirmationCallback, cancelCallback, confirmationText=[] }) => {
  return (
    <Modal background={background}>
      <div className="flex flex-col h-full">
        <div className='rounded-xl bg-black/50 mb-5'>
          {
            confirmationText.map((line, i) => {
              return (
                <>
                  <p key={i} className={`${S.text.headingTextYellow} text-center`}>{line}</p>
                  <br></br>
                </>
              )
            })
          }
        </div>
        <div className="flex flex-row justify-between gap-4 mt-auto pb-5">
          <Button type={"button"} name={"Cancel"} callBack={cancelCallback} namedStyles={[S.button.redAndYellowButtonSingle, S.border.goldYellowBorder]} />
          <Button type={"button"} name={confirmationButtonName} callBack={confirmationCallback} namedStyles={[S.button.classicCatanButtonSingle, S.border.lightRedBorder]} />
        </div>
      </div>
    </Modal>
  )
}

export default Confirmation;