import {useCommentsStore} from '../store';
import {useComments} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useForm} from '../hooks/formHooks';
import {useEffect, useRef} from 'react';

export const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const user = useUserContext();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const {comments, setComments} = useCommentsStore();
  const {postComment, getCommentsByMediaId} = useComments();

  const initValues = {comment_text: ''};

  const doComment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("User's token not found.");
      return;
    }

    await postComment(inputs.comment_text, item.media_id, token);
    getComments();
    setInputs(initValues);
  };

  const getComments = async () => {
    try {
      const comments = await getCommentsByMediaId(item.media_id);
      console.log('Comments: ', comments);
      setComments(comments);
    } catch (err) {
      setComments([]);
      console.error((err as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doComment,
    initValues,
  );

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg border p-4 shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-bold">Comments</h2>
      <div className="flex max-h-[30vh] flex-col overflow-y-auto md:max-h-[70vh]">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="border-b px-4 py-6 last:border-none">
              <p className="mb-2 font-light text-gold-accent">
                @{comment.username}:
              </p>
              <p>{comment.comment_text}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Be first to comment on this nice piece of media!
          </p>
        )}
      </div>
      {user && (
        <form
          className="mt-4 flex flex-col items-center gap-3"
          onSubmit={handleSubmit}
        >
          <textarea
            ref={inputRef}
            className="w-full rounded-md border p-2"
            name="comment_text"
            placeholder="Write your comment here..."
            onChange={handleInputChange}
            autoComplete="off"
          />
          <button
            className="w-1/2 cursor-pointer rounded-md bg-gradient-to-l from-blueg1 to-blueg2 p-2 text-center transition-all duration-500 ease-in-out hover:from-blueg2 hover:to-blueg1 hover:text-gold-accent"
            type="submit"
          >
            Send it and bend it!
          </button>
        </form>
      )}
    </div>
  );
};
