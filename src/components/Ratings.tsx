import type {
  MediaItemWithOwner,
  Rating as RatingType,
} from 'hybrid-types/DBTypes';
import {useEffect, useState} from 'react';
import {Heart, Rating} from '@smastrom/react-rating';
import {useRating, useUser} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';

const Ratings = ({item}: {item: MediaItemWithOwner}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [userRating, setUserRating] = useState<number>(0);
  const {postRating, getRatingByMediaId, getRatingListByMediaId} = useRating();
  const user = useUserContext();

  const getRating = async () => {
    try {
      const rating = await getRatingByMediaId(item.media_id);
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
    await postRating(userRating, item.media_id, token);
    getRating();
  };

  useEffect(() => {
    getRating();
    getUserRating();
  }, [item]);

  useEffect(() => {
    console.log('User rating changed: ', userRating);
  }, [userRating]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2>Current Rating: </h2>
      <Rating
        style={{color: 'gold'}}
        value={rating}
        readOnly
        itemStyles={{
          itemShapes: Heart,
          activeFillColor: '',
          inactiveFillColor: 'lightgrey',
        }}
      />
      <h3>Your rating: </h3>
      <Rating
        style={{color: 'gold'}}
        value={userRating}
        itemStyles={{
          itemShapes: Heart,
          activeFillColor: 'gold',
          inactiveFillColor: 'lightgrey',
        }}
        onChange={setUserRating}
      />
    </div>
  );
};

export {Ratings};
