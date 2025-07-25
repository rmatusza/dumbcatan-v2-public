import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../Redux/ActionCreators/UserActions';
import { APP_CONTEXT, CUSTOM_STYLES as S} from '../Utils/constants';
import Form from '../UI/Form';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    // react hook form automatically prevents form submission if validation errors exist, so no need to add any checks in the submit handler
    dispatch(signupUser(
      {
        username: data.username,
        password: data.password
      },
      navigate
    ));
  };

  return (
    <Form
      fields={[
        {
          headingName: 'Username',
          labelKey: 'username',
          type: 'text',
          inputName: 'username',
          validation: {
            required: "Username is required",
            maxLength: {
              value: 15,
              message: "Username can't contain more than 15 characters",
            },
            minLength: {
              value: 1,
              message: "Username must contain at least 1 character",
            }
          }
        },
        {
          headingName: 'Password',
          labelKey: 'password',
          type: 'password',
          inputName: 'password',
          validation: {
            required: "Password is required",
            maxLength: {
              value: 15,
              message: "Password can't contain more than 15 characters",
            },
            minLength: {
              value: 1,
              message: "Password must contain at least 1 character",
            }
          }
        },
        {
          headingName: 'Confirm Password',
          labelKey: 'confirmPassword',
          type: 'password',
          inputName: 'confirmPassword',
          getValidation: (getValues) => ({
            required: "You must confirm your password",
            validate: (value) =>
              value === getValues("password") || "Passwords must match"
          })
        },
      ]}
      buttons={
        [
          {
            type: 'submit',
            name: 'Sign Up',
            namedStyles: [S.button.classicCatanButtonSingle],
          }
        ]
      }
      styles={{
        form: "flex flex-col space-y-4",
        input: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400",
        fieldHeading: 'font-yatra text-2xl text-center',
        validationError: "text-red-500 text-center font-bold"
      }}
      currentContext={APP_CONTEXT.signup}
      formSubmitHandler={onSubmit}
    />
  )
}

export default Signup;