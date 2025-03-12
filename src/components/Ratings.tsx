import type {
  MediaItemWithOwner,
  Rating as RatingType,
} from 'hybrid-types/DBTypes';
import {useEffect, useState} from 'react';
import {Heart, Rating} from '@smastrom/react-rating';
import {useRating} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';
import Likes from './Likes';

const Ratings = ({item}: {item: MediaItemWithOwner}) => {
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState<number>(0);
  const {postRating, getRatingByMediaId, getRatingListByMediaId} = useRating();
  const user = useUserContext();

  const getRating = async () => {
    try {
      const rating = await getRatingByMediaId(item.media_id);
      console.log('Rating: ', rating);
      setRating(rating.average);
    } catch (err) {
      console.error("Couldn't get average rating", (err as Error).message);
    }
  };

  const getUserRating = async () => {
    try {
      const ratingList = await getRatingListByMediaId(item.media_id);
      const userRating = ratingList.find(
        (rating: RatingType) => rating.user_id === user.user?.user_id,
      );

      console.log('User rating: ', userRating);
      setUserRating(userRating?.rating_value ?? 0);
    } catch (err) {
      console.error("Couldn't get user rating", (err as Error).message);
    }
  };

  const handleRatingChange = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token missing');
      return;
    }

    console.log("User's rating: ", userRating);
    const response = await postRating(item.media_id, userRating, token);

    console.log('Rating response: ', response);
    getRating();
  };

  useEffect(() => {
    getRating();
    getUserRating();
  }, [item]);

  return (
    <div className="flex flex-row items-center gap-4 rounded-md border-2 border-darkgrey px-10 py-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <h4>Current Rating: </h4>
        <Rating
          style={{maxWidth: 150}}
          value={rating}
          readOnly
          itemStyles={{
            itemShapes: Heart,
            activeFillColor: '#38a2bc',
            inactiveFillColor: '#a8b3c5',
          }}
        />
        <Likes item={item} />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h4>Rate this media: </h4>
        <Rating
          style={{maxWidth: 150}}
          value={userRating}
          itemStyles={{
            itemShapes: Heart,
            activeFillColor: '#38a2bc',
            inactiveFillColor: '#a8b3c5',
          }}
          // onChange={setUserRating}
          onChange={setUserRating}
        />
        <button
          className="block w-full cursor-pointer rounded-md bg-gradient-to-l from-blueg1 to-blueg2 p-2 text-center text-sm transition-all duration-500 ease-in-out hover:from-blueg2 hover:to-blueg1 hover:text-gold-accent"
          onClick={handleRatingChange}
        >
          Submit rating
        </button>
      </div>
    </div>
  );
};

export {Ratings};
