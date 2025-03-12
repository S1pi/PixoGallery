import {useState} from 'react';
import {useForm} from '../hooks/formHooks';
import {useMedia} from '../hooks/apiHooks';
import {MediaItem} from 'hybrid-types/DBTypes';
import {useLocation} from 'react-router';

const Modify = () => {
  const {state} = useLocation();
  const item: MediaItem = state.item;
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<string>('');

  const {modifyMedia} = useMedia();

  const initValues = {
    title: item.title,
    description: item.description || '',
  };

  const doUpload = async () => {
    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No file selected');
      }
      await modifyMedia(item.media_id, inputs, token);
      setUploadResult('Upload successful');
    } catch (e) {
      console.error((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doUpload,
    initValues,
  );

  return (
    <div className="container mx-auto mt-20 flex min-h-[600px] items-center justify-center px-4 py-8">
      {uploadResult ? (
        <div className="w-full max-w-xl text-center">
          <h1 className="text-3xl font-bold">{uploadResult}</h1>
        </div>
      ) : (
        <>
          {uploading ? (
            <div className="w-full max-w-xl text-center">
              <h1 className="text-3xl font-bold">Uploading...</h1>
            </div>
          ) : (
            <div className="w-full max-w-xl rounded-lg bg-secondary p-8 shadow-lg">
              <h1 className="mb-6 text-center text-3xl font-bold text-primary">
                Modify your media
              </h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="title"
                    className="mb-1 text-lg font-medium text-primary"
                  >
                    Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    id="title"
                    onChange={handleInputChange}
                    value={inputs.title}
                    className="rounded border border-gray-300 p-2 text-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="description"
                    className="mb-1 text-lg font-medium text-primary"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={5}
                    id="description"
                    onChange={handleInputChange}
                    value={inputs.description}
                    className="rounded border border-gray-300 p-2 text-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  ></textarea>
                </div>
                <button
                  className="cursor-pointer rounded bg-gradient-to-l from-blueg1 to-blueg2 p-3 text-center text-primary transition-all duration-500 ease-in-out hover:w-[460px] hover:self-center hover:from-blueg2 hover:to-blueg1 hover:text-gold-accent"
                  type="submit"
                  onClick={doUpload}
                >
                  Upload
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Modify;
