import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {NavigateFunction, useLocation, useNavigate} from 'react-router';
import Likes from '../components/Likes';
import {useUserContext} from '../hooks/ContextHooks';
import {useMedia} from '../hooks/apiHooks';
import {RiArrowGoBackFill} from 'react-icons/ri';
import {Comments} from '../components/Comments';
import {Ratings} from '../components/Ratings';

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
    <div className="container mx-auto mt-20 flex min-h-[600px] flex-col rounded-md bg-lightgrey px-4 py-8 shadow-sidebar">
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

      <div className="flex flex-col gap-10 md:flex-row">
        {/* Vasen sarake: Kuva ja Media-informaatio */}
        <div className="flex flex-col gap-6 md:w-1/2">
          {item.media_type.includes('image') ? (
            <img
              className="h-full self-center rounded-md object-cover"
              src={item.filename}
              alt={item.title}
            />
          ) : (
            <video
              className="h-full w-full rounded-md object-contain"
              src={item.filename}
              controls
            />
          )}
          <div className="flex flex-col items-center gap-4 rounded-md border-2 border-darkgrey p-4">
            <h3 className="text-gold-accent drop-shadow-text">
              Media Information:
            </h3>
            <div className="flex flex-row items-center gap-4">
              <p className="text-h5">Uploaded on:</p>
              <span>{new Date(item.created_at).toLocaleString('fi-FI')}</span>
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
            {(user?.user_id === item.user_id ||
              user?.level_name === 'Admin') && (
              <div className="flex flex-row gap-4">
                <button
                  onClick={() => navigate(`/modify`, {state: {item}})}
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
        </div>

        {/* Oikea sarake: Description ja Kommentit */}
        <div className="flex flex-col gap-6 md:w-1/2">
          <div className="rounded-md border-2 border-darkgrey p-4">
            <p className="mb-4 text-center text-2xl text-h5 font-bold">
              Description:
            </p>
            <p>{item.description}</p>
            <Ratings item={item} />
          </div>
          <Comments item={item} />
        </div>
      </div>
    </div>
  );
};

export default Single;
