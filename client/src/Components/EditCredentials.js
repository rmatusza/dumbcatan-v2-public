import { ERROR_CONTEXTS } from "../Utils/data";
import Form from "../UI/Form";

const EditCredentials = ({ S, viewHandler, setProfileModalActive, updateProfileHandler }) => {
  return (
    <Form
      fields={[
        {
          headingName: 'New Username',
          labelKey: 'username',
          type: 'text',
          inputName: 'username',
          getValidation: (getValues, setTopLevelFormError) => ({
            validate: (username) => {
              const pwd = getValues("password")?.trim();
              const val = username.trim();
              if (!val & !pwd) {
                setTopLevelFormError("Username and/or password required");
                return false;
              }
              if (val.length > 15) {
                return "Username can't contain more than 15 characters";
              }
              return true;
            }
          })
        },
        {
          headingName: 'New Password',
          labelKey: 'password',
          type: 'password',
          inputName: 'password',
          getValidation: (getValues, setTopLevelFormError) => ({
            validate: (password) => {
              const usn = getValues("username")?.trim();
              const val = password.trim();
              if (!val & !usn) {
                setTopLevelFormError("Username and/or password required");
                return false;
              }
              if (val.length > 15) {
                return "Password can't contain more than 15 characters";
              }
              return true;
            }
          })
        },
        {
          headingName: 'Confirm New Password',
          labelKey: 'confirmPassword',
          type: 'password',
          inputName: 'confirmPassword',
          getValidation: (getValues) => ({
            validate: (confirmPassword) => {
              const pwd = getValues("password")?.trim();
              const val = confirmPassword.trim();
              if (pwd && pwd !== val) {
                return "Passwords must match";
              }
              return true;
            }
          })
        },
      ]}
      buttons={
        [
          {
            name: 'Close',
            type: 'button',
            namedStyles: [S.redAndYellowButtonSingle, S.goldYellowBorder],
            namedStyleAsAddOn: true,
            callBack: setProfileModalActive,
            args: [false]
          },
          {
            name: 'Back',
            type: 'button',
            namedStyles: [S.classicCatanButtonSingle, S.lightRedBorder],
            namedStyleAsAddOn: true,
            callBack: viewHandler,
            args: ['main']
          },
          {
            name: 'Update Credentials',
            type: 'submit',
            namedStyles: [S.classicCatanButtonSingle, S.lightRedBorder],
            namedStyleAsAddOn: true,
          },
        ]
      }
      formSubmitHandler={updateProfileHandler}
      formInstructions={"Update username and/or password"}
      currentContext={ERROR_CONTEXTS.profile}
      styles={{
        form: "flex flex-col space-y-4 h-full",
        input: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400",
        fieldHeading: S.modalTextYellow,
        appError: "text-red-500 text-center font-bold mb-10",
        validationError: S.smallErrorMessageShadowed,
        buttonContainer: 'pb-5'
      }}
    />
  )
}

export default EditCredentials;