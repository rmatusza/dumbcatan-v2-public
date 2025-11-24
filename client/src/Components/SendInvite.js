import { useDispatch, useSelector } from "react-redux"
import { createGameInvite } from "../Functions/game"
import { APP_ALERT_TYPE, APP_CONTEXT, CUSTOM_STYLES as S } from "../Utils/constants"
import { getToken } from "../Functions/utility"
import { applicationAlertActions } from "../Redux/Slices/ApplicationAlertSlice"
import { useWebsocket } from "../Context/WebsocketProvider";
import Form from "../UI/Form"


export const SendInvite = ({ closeModal, gameId }) => {
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const ws = useWebsocket();

  const sendInviteHandler = (recipientUsername) => {
    ws.send(`/invite/${recipientUsername}/to/game/${gameId}`);
  }

  const createInviteHandler = async (data) => {
    try {
      await createGameInvite(data.recipientUsername, gameId, getToken());
      sendInviteHandler(data.recipientUsername);
      dispatch(applicationAlertActions.setApplicationAlert({
        message: "Invite Sent!",
        status: 200,
        type: APP_ALERT_TYPE.success,
        context: APP_CONTEXT.sendInvite,
        alertAsPopup: false
      }));
    }
    catch (e) {
      dispatch(applicationAlertActions.setApplicationAlert({
        message: e.message,
        status: e.status,
        type: APP_ALERT_TYPE.failure,
        context: APP_CONTEXT.sendInvite,
        alertAsPopup: false
      }));
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Form
        fields={[
          {
            headingName: "Enter Recipient's Username",
            labelKey: 'recipientUsername',
            type: 'text',
            inputName: 'recipientUsername',
            getValidation: (getValues, setTopLevelFormError) => ({
              validate: (recipientUsername) => {
                if(recipientUsername.toLowerCase() == userData.username.toLowerCase()){
                  setTopLevelFormError("You cannot send an invite to yourself");
                  return false;
                }
                else if(!recipientUsername){
                  setTopLevelFormError("Recipient's username is required");
                  return false;
                }
              }
            })
          },
        ]}
        buttons={
          [
            {
              type: 'button',
              name: 'Close',
              namedStyles: [S.button.redAndYellowButtonSingle, S.border.goldYellowBorder],
              callBack: closeModal
            },
            {
              type: 'submit',
              name: 'Send Invite',
              namedStyles: [S.button.classicCatanButtonSingle, S.border.lightRedBorder],
            },
          ]
        }
        styles={
          {
            form: "flex flex-col space-y-4 h-full",
            input: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400",
            fieldHeading: `font-yatra text-2xl text-center ${S.text.modalTextYellow}`,
            validationError: "text-red-500 text-center text-lg font-bold",
            buttonArea: "h-full",
            buttonContainer: "mt-auto"

          }
        }
        currentContext={APP_CONTEXT.sendInvite}
        formSubmitHandler={createInviteHandler}
      />
    </div>
  )
}