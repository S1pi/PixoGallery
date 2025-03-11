import {useForm} from '../hooks/formHooks';
import {Credentials} from '../types/LocalTypes';
import {useUserContext} from '../hooks/ContextHooks';

const LoginForm = () => {
  const {handleLogin} = useUserContext();
  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      handleLogin(inputs as Credentials);
    } catch (error) {
      console.error((error as Error).message);
      // Display error to user here(?)
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <form
        className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex w-4/5 flex-col">
          <label htmlFor="loginusername">Username</label>
          <input
            className="my-2.5 rounded-md border p-2.5"
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
            // value={inputs.username}
          />
        </div>
        <div className="flex w-4/5 flex-col">
          <label htmlFor="loginpassword">Password</label>
          <input
            className="my-2.5 rounded-md border p-2.5"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            // value={inputs.password}
          />
        </div>
        <button
          className="my-2.5 block w-4/5 cursor-pointer rounded-md bg-gradient-to-l from-blueg1 to-blueg2 p-2 text-center transition-all duration-500 ease-in-out hover:from-blueg2 hover:to-blueg1 hover:text-gold-accent"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
