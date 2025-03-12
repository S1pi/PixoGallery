import {Link, Outlet, useNavigate} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';
import {useEffect} from 'react';

const Layout = () => {
  // jos käyttäjää ei ole, kutsu handleAutoLogin()
  const {user, handleAutoLogin} = useUserContext();
  const navigation = useNavigate();

  useEffect(() => {
    if (!user) {
      handleAutoLogin();
    }
  }, []);

  return (
    <>
      <div className="text-center">
        <nav className="flex items-center justify-between rounded-b-md bg-midgrey p-2">
          <div className="flex items-center rounded-sm p-2">
            <img
              src="./img/pixo-pixo-kalmar-01-rf-01.jpg"
              alt="pixo logo"
              className="h-16 w-16 cursor-pointer rounded-full"
              onClick={() => navigation('/')}
            />
            <h1
              className="cursor-pointer p-2 pl-20 text-h1 font-extrabold"
              onClick={() => navigation('/')}
            >
              PIXO GALLERY
            </h1>
          </div>
          <ul className="m-0 flex list-none justify-end p-2">
            <li>
              <Link
                className="block cursor-pointer p-4 text-center transition-all duration-500 ease-in-out hover:rounded-lg hover:bg-lightgrey"
                to="/"
              >
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    className="block cursor-pointer p-4 text-center transition-all duration-500 ease-in-out hover:rounded-lg hover:bg-lightgrey"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="block cursor-pointer p-4 text-center transition-all duration-500 ease-in-out hover:rounded-lg hover:bg-lightgrey"
                    to="/upload"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className="block cursor-pointer p-4 text-center transition-all duration-500 ease-in-out hover:rounded-lg hover:bg-lightgrey"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="block cursor-pointer p-4 text-center transition-all duration-500 ease-in-out hover:rounded-lg hover:bg-lightgrey"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <main className="px-6">
          <Outlet />
        </main>
        <footer></footer>
      </div>
    </>
  );
};

export default Layout;
