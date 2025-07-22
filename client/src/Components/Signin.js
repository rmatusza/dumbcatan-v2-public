import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signinUser } from '../Redux/ActionCreators/UserActions';
import { APP_CONTEXT, CUSTOM_STYLES as S} from '../Utils/constants';
import Form from '../UI/Form';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // react hook form automatically prevents form submission if validation errors exist, so no need to add any checks in the submit handler
    dispatch(signinUser(
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
          validation: { required: "Username is required" }
        },
        {
          headingName: 'Password',
          labelKey: 'password',
          type: 'password',
          inputName: 'password',
          validation: { required: "Password is required" }
        },
      ]}
      buttons={
        [
          {
            type: 'submit', 
            name: 'Sign In', 
            namedStyles: [S.button.classicCatanButtonSingle],
          }
        ]
      }
      styles={
        {
          form: "flex flex-col space-y-4",
          input: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400",
          fieldHeading: 'font-yatra text-2xl text-center',
          validationError: "text-red-500 text-center font-bold"
        }
      }
      currentContext={APP_CONTEXT.signin}
      formSubmitHandler={onSubmit}
    />
  )
}

export default Signin;