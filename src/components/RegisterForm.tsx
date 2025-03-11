import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import {useForm} from '../hooks/formHooks';
import {RegisterCredentials} from '../types/LocalTypes';

const RegisterForm = () => {
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  const {postRegister, getUserNameAvailable, getEmailAvailable} = useUser();
  const initValues: RegisterCredentials = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    try {
      const registerResult = await postRegister(inputs as RegisterCredentials);
      console.log('doLogin result', registerResult);
    } catch (error) {
      console.error((error as Error).message);
      // Display error to user here(?)
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doRegister,
    initValues,
  );

  useEffect(() => {
    const main = async () => {
      // kutsu getUsernameAvailable apiHooksista
      try {
        if (inputs.username.length > 2) {
          const result = await getUserNameAvailable(inputs.username);
          setUsernameAvailable(result.available);
        } else {
          setUsernameAvailable(true);
        }
      } catch (error) {
        console.error((error as Error).message);
        setUsernameAvailable(true);
      }
    };

    main();
  }, [inputs.username, getUserNameAvailable]);

  useEffect(() => {
    // kutsu getEmailAvailable apiHooksista
    const main = async () => {
      try {
        if (inputs.email.length > 5) {
          const result = await getEmailAvailable(inputs.email);
          setEmailAvailable(result.available);
        } else {
          setEmailAvailable(true);
        }
      } catch (error) {
        console.error((error as Error).message);
        setEmailAvailable(true);
      }
    };
    main();
  }, [inputs.email, getEmailAvailable]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col items-center justify-center"
      >
        <div className="flex w-4/5 flex-col">
          <label htmlFor="regusername">Username</label>
          <input
            className="my-2.5 rounded-md border p-2.5"
            name="username"
            type="text"
            id="regusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
          {!usernameAvailable && (
            <p className="text-right text-red-500">Username not available</p>
          )}
        </div>
        <div className="flex w-4/5 flex-col">
          <label htmlFor="regpassword">Password</label>
          <input
            className="my-2.5 rounded-md border-1 p-2.5"
            name="password"
            type="password"
            id="regpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <div className="flex w-4/5 flex-col">
          <label htmlFor="regemail">Email</label>
          <input
            className="my-2.5 rounded-md border-1 p-2.5"
            name="email"
            type="email"
            id="regemail"
            onChange={handleInputChange}
            autoComplete="email"
          />

          {!emailAvailable && (
            <p className="text-right text-red-500">Email not available</p>
          )}
        </div>
        <button
          className="my-2.5 block w-4/5 rounded-md bg-blue-btn p-2 text-center transition-all duration-500 ease-in-out hover:bg-lightblue"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
