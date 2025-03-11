import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [displayRegister, setDisplayRegister] = useState(false);

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };

  return (
    <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-center">
      <h1>{displayRegister ? 'Register' : 'Login'}</h1>
      {displayRegister ? <RegisterForm /> : <LoginForm />}
      <div className="flex flex-col items-center justify-center">
        <button
          className="my-2.5 block cursor-pointer rounded-md bg-gold-accent p-2 text-center transition-all duration-500 ease-in-out hover:bg-gold-dark"
          onClick={toggleRegister}
        >
          or {displayRegister ? 'login' : 'register'}?
        </button>
      </div>
    </div>
  );
};

export default Login;
