import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {NavigateFunction, useLocation, useNavigate} from 'react-router';
import Likes from '../components/Likes';
import {useUserContext} from '../hooks/ContextHooks';
import {useMedia} from '../hooks/apiHooks';
import {RiArrowGoBackFill} from 'react-icons/ri';

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
      <div className="relative mb-6 flex items-center justify-center">
        <button
          className="absolute left-3 flex cursor-pointer gap-2 rounded-md bg-gradient-to-r from-blueg1 to-blueg2 p-2 text-center transition-all duration-500 ease-in-out hover:from-blueg2 hover:to-blueg1 hover:text-gold-accent"
          onClick={() => navigate(-1)}
        >
          <RiArrowGoBackFill className="text-2xl" />
          Go back
        </button>
        <h1 className="text-center text-3xl font-bold">{item.title}</h1>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-grow flex-col justify-center md:flex-row md:gap-2">
          {/* Vasen: Media */}
          <div className="mb-6 flex flex-col items-center justify-center md:mb-0 md:w-1/2">
            {item.media_type.includes('image') ? (
              <img
                className="mb-6 h-96 w-96 rounded-md object-cover"
                src={item.filename}
                alt={item.title}
              />
            ) : (
              <video
                className="mb-6 h-96 w-96 rounded-md object-contain"
                src={item.filename}
                controls
              />
            )}
            <div className="flex flex-col items-center gap-4 rounded-md border-2 border-darkgrey p-4">
              <p className="text-h5">Description:</p>
              <p>{item.description}</p>
            </div>
            {(user?.user_id === item.user_id ||
              user?.level_name === 'Admin') && (
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
            <Likes item={item} />
          </div>
        </div>
        <div>HERE COMES THE COMMENT SECTION</div>
      </div>
    </div>
  );
};

export default Single;
