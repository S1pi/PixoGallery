import {useEffect} from 'react';
import {useUserContext} from '../hooks/ContextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();
  // kutsu handleLogout useEffectin sisällä
  useEffect(() => {
    handleLogout();
  }, []);
  return <div>Logout</div>;
};

export default Logout;
