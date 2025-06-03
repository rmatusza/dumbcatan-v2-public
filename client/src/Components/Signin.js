import { signinUser } from '../Redux/ActionCreators/UserActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CUSTOM_STYLES, ERROR_CONTEXTS } from '../Utils/data';
import Form from '../UI/Form';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // react hook form automatically prevents form submission if errors exist
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
      styles={{
        form: "flex flex-col space-y-4",
        input: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400",
        fieldHeading: 'font-yatra text-2xl text-center',
        appError: "text-red-500 text-center font-bold mb-10",
        validationError: "text-red-500 text-center font-bold"
      }}
      formSubmitHandler={onSubmit}
      buttons={
        [
          {
            type: 'submit', 
            name: 'Sign In', 
            namedStyles: [CUSTOM_STYLES.classicCatanButtonSingle],
            namedStyleAsAddOn: true,
          }
        ]
      }
      currentContext={ERROR_CONTEXTS.signin}
    />
  )
}

export default Signin;