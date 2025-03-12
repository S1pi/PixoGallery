import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Link} from 'react-router';

type MediaItemProps = {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
};

const MediaRow = (props: MediaItemProps) => {
  const {item} = props;
  return (
    <article className="w-full rounded-md bg-gradient-to-t from-lightblue to-lightgrey shadow-custom">
      <img
        className="h-72 w-full rounded-t-md object-cover"
        src={
          item.thumbnail ||
          (item.screenshots && item.screenshots[2]) ||
          undefined
        }
        alt={item.title}
      />
      <div className="p-6">
        <h3 className="text-center text-secondary drop-shadow-text">
          {item.title}
        </h3>
        <p className="max-w-full overflow-clip font-bold text-nowrap text-ellipsis text-darkgrey">
          {item.description}
        </p>
        <div className="my-2 rounded-md border-1 border-darkgrey p-2 text-darkgrey">
          <p>
            Created at: <br />{' '}
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </p>
          <p>Filesize: {(item.filesize / 1024 / 1024).toFixed(2)} MB</p>
          <p>Mime-type: {item.media_type}</p>
          <p>Owner: {item.username}</p>
        </div>
        <p>
          <Link
            className="block w-full cursor-pointer rounded-md bg-gradient-to-l from-blueg1 to-blueg2 p-2 text-center transition-all duration-500 ease-in-out hover:from-blueg2 hover:to-blueg1 hover:text-gold-accent"
            to="/single"
            state={{item}}
          >
            Show
          </Link>
        </p>
      </div>
    </article>
  );
};

export default MediaRow;
