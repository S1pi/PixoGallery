import {ChangeEvent, useRef, useState} from 'react';
import {useForm} from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
//import {useNavigate} from 'react-router';

const Upload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  //const navigate = useNavigate();
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const initValues = {
    title: '',
    description: '',
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    setUploading(true);

    console.log(inputs);
    try {
      const token = localStorage.getItem('token');
      if (!file || !token) {
        return;
      }
      // upload the file to fileserver and post metadata to media api server
      const fileResult = await postFile(file, token);
      await postMedia(fileResult, inputs, token);

      // redirect to Home if you want
      //navigate('/');

      // OR notify user & clear inputs
      setUploadResult('Media file uploaded!');
      resetForm();
    } catch (e) {
      console.log((e as Error).message);
      setUploadResult((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doUpload,
    initValues,
  );

  const resetForm = () => {
    setInputs(initValues);
    setFile(null);
    // use fileRef to clear file input field after upload
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <>
      <h1 className="my-10 text-center text-3xl font-bold">Upload</h1>
      <div className="flex flex-col md:flex-row md:gap-8">
        {/* Vasen puoli: File */}
        <div className="mb-6 flex flex-col items-center justify-center gap-4 rounded-md bg-gradient-to-br from-lightblue to-lightgrey shadow-custom md:mb-2 md:w-1/2">
          {file?.type.includes('video') ? (
            <video
              controls
              className="h-64 w-96 rounded-md object-cover"
              src={file ? URL.createObjectURL(file) : ''}
            ></video>
          ) : (
            <img
              className="h-64 w-96 rounded-md object-cover"
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://place-hold.it/384?text=Choose+image+or+video'
              }
              alt="preview"
            />
          )}
          <div className="flex flex-col">
            <label htmlFor="file" className="text-h3">
              File
            </label>
            <input
              className="mt-2 cursor-pointer rounded-md border file:mr-2.5 file:cursor-pointer file:bg-gradient-to-l file:from-blueg1 file:to-blueg2 file:p-2 hover:text-gold-accent hover:file:from-blueg2 hover:file:to-blueg1"
              name="file"
              type="file"
              id="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
              ref={fileRef}
            />
          </div>
        </div>
        {/* Oikee puoli: Formi */}
        <div className="rounded-md bg-gradient-to-br from-lightblue to-lightgrey p-8 shadow-custom md:w-1/2">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="title" className="text-h3">
                Title
              </label>
              <input
                className="mt-2 rounded-md border p-2"
                name="title"
                type="text"
                id="title"
                onChange={handleInputChange}
                value={inputs.title}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="text-h3">
                Description
              </label>
              <textarea
                className="mt-2 rounded-md border p-2"
                name="description"
                rows={5}
                id="description"
                onChange={handleInputChange}
                value={inputs.description}
              ></textarea>
            </div>
            <button
              className="mt-4 block w-full cursor-pointer rounded-md bg-gradient-to-l from-blueg1 to-blueg2 p-2 text-center transition-all duration-500 ease-in-out hover:from-blueg2 hover:to-blueg1 hover:text-gold-accent"
              type="submit"
              disabled={
                file && inputs.title.length > 3 && inputs.description.length > 0
                  ? false
                  : true
              }
            >
              {uploading ? 'Uploading..' : 'Upload'}
            </button>
            <button
              className="mt-2 w-full cursor-pointer rounded-md bg-delete p-2 text-center transition duration-500 ease-in-out hover:text-gold-accent"
              onClick={resetForm}
            >
              Reset
            </button>
            <p className="mt-2 text-center">{uploadResult}</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;
