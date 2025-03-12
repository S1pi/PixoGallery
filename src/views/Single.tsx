import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {NavigateFunction, useLocation, useNavigate} from 'react-router';
import Likes from '../components/Likes';
import {useUserContext} from '../hooks/ContextHooks';
import {useMedia} from '../hooks/apiHooks';

const Single = () => {
  const navigate: NavigateFunction = useNavigate();
  const {state} = useLocation();
  const item: MediaItemWithOwner = state.item;
  const {user} = useUserContext();
  const {deleteMedia} = useMedia();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token missing');
        return;
      }

      console.log('token: ', token);
      console.log('item', item);
      const deleteResponse = await deleteMedia(item.media_id, token);
      console.log('Delete: ', deleteResponse);
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto mt-20 flex h-full min-h-[600px] flex-col rounded-md bg-lightgrey px-4 py-8 shadow-sidebar">
      <h1 className="mb-6 text-center text-3xl font-bold">{item.title}</h1>
      <div className="flex flex-grow flex-col justify-center md:flex-row md:gap-8">
        {/* Vasen: Media */}
        <div className="mb-6 flex flex-col items-center justify-center md:mb-0 md:w-1/2">
          {item.media_type.includes('image') ? (
            <img
              className="h-64 w-96 rounded-md object-contain"
              src={item.filename}
              alt={item.title}
            />
          ) : (
            <video
              className="h-64 w-96 rounded-md object-contain"
              src={item.filename}
              controls
            />
          )}
          {(user?.user_id === item.user_id || user?.level_name === 'Admin') && (
            <div className="flex flex-row gap-4">
              <button
                onClick={() => {
                  console.log('Modify painettu', item.media_id);
                }}
                className="my-2 block w-full cursor-pointer rounded-md bg-modify p-2 text-center transition-all duration-500 ease-in-out hover:cursor-pointer hover:text-green-accent"
              >
                Modify
              </button>
              <button
                onClick={handleDelete}
                className="my-2 block w-full cursor-pointer rounded-md bg-delete p-2 text-center transition-all duration-500 ease-in-out hover:cursor-pointer hover:text-gold-accent"
              >
                Delete
              </button>
            </div>
          )}
          <Likes item={item} />
        </div>

        {/* Oikee: Media Informaatio */}
        <div className="flex flex-col items-center justify-center gap-4 md:w-1/2">
          <h3 className="text-gold-accent drop-shadow-text">
            Media Information:{' '}
          </h3>
          <div className="flex flex-row items-center gap-4">
            <p className="text-h5">Uploaded on:</p>
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </div>
          <p>
            {item.user_id === user?.user_id ? (
              <span>
                <strong>Owner:</strong> You are the owner
              </span>
            ) : (
              <span>
                <strong>Owner:</strong> {item.username}
              </span>
            )}
          </p>
          <p>
            <strong>Type:</strong> {item.media_type}
          </p>
          <p>
            <strong>Size:</strong> {Math.round(item.filesize / 1024)} kB
          </p>
          <div className="flex flex-col items-center gap-4 rounded-md border-2 border-darkgrey p-4">
            <p className="text-h5">Description:</p>
            <p>{item.description}</p>
          </div>
          <button
            className="mt-4 cursor-pointer rounded-md bg-gradient-to-r from-blueg1 to-blueg2 p-2 text-center transition-all duration-500 ease-in-out hover:from-blueg2 hover:to-blueg1 hover:text-gold-accent"
            onClick={() => navigate(-1)}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Single;
