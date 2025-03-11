import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <div className="container mx-auto mt-20 flex h-full min-h-[600px] max-w-2xl flex-col rounded-md bg-lightgrey px-4 py-8 shadow-sidebar">
      <h1 className="mb-6 text-center text-3xl font-bold">Profile</h1>
      {user ? (
        <div className="flex flex-col items-center justify-center">
          <div className="flex h-64 w-full max-w-md flex-col justify-center gap-6 rounded-md bg-secondary p-6 text-primary shadow-md">
            <p className="mb-2 text-lg font-semibold">
              {user.username}{' '}
              <span className="text-base text-primary">({user.email})</span>
            </p>
            <p className="mb-2 font-semibold">User Level: {user.level_name}</p>
            <p className="mb-2">
              <strong>Registered:</strong>{' '}
              {new Date(user.created_at).toLocaleString('fi-FI')}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center">No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
