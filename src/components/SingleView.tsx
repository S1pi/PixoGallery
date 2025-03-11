import {MediaItemWithOwner} from 'hybrid-types/DBTypes';

const SingleView = (props: {
  item: MediaItemWithOwner | undefined;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  console.log(item);
  return (
    // TODO: Add JSX for displaying a mediafile here
    // - use e.g. a <dialog> element for creating a modal
    // - use item prop to render the media item details
    // - use img tag for displaying images
    // - use video tag for displaying videos
    <dialog open>
      {item && (
        <>
          <button
            onClick={() => {
              setSelectedItem(undefined);
            }}
          >
            Close
          </button>
          <h3>{item.title}</h3>
          <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
          {item.media_type.includes('image') ? (
            <img src={item.filename} alt={item.title} />
          ) : (
            <video src={item.filename} controls />
          )}
          <p>{item.description}</p>
        </>
      )}
    </dialog>
  );
};
export default SingleView;
