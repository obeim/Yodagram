import React, { useState, useEffect } from "react";
import { useAuthState } from "../../context";
import axios from "axios";
const PostCreate = ({ history }) => {
  const { userInfo } = useAuthState();
  const [pic, setPic] = useState(null);
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const onChange = async (e) => {
    setPic(e.target.files[0]);
    console.log(e.target);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const { data } = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
    setImage(data);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      const { data } = axios.post(
        "/api/posts",
        { image, info },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      console.log(data);
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, []);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);
  return (
    <div className='container mx-auto text-center '>
      {error && <p className='mx-auto w-96'>{error}</p>}
      <form onSubmit={onSubmit}>
        <input
          type='text '
          defaultValue={pic ? pic.name : ""}
          placeholder='post image'
          className=' mx-auto outline-none p-2 border lg:w-72 m-3 w-72 focus:border-black'
        />
        <button
          className=' bg-black text-white md:w-20 w-20  p-2 relative cursor-pointer'
          type='button'
        >
          <input
            type='file'
            required
            className='cursor-pointer absolute w-full opacity-0 '
            onChange={onChange}
          />
          uplaod
        </button>
        <img
          src={image ? image : "/default-image.jpg"}
          alt=''
          className='w-96 mx-auto'
        />
        <textarea
          name='body'
          id='body'
          cols='30'
          rows='5'
          value={info ? info : ""}
          onChange={(e) => setInfo(e.target.value)}
          className='border focus:border-black outline-none my-5 w-96 p-2'
          placeholder='post body here'
        ></textarea>
        <input
          type='submit'
          value='ADD'
          className='block mx-auto border m-3  px-5  py-2  w-96 bg-black  text-white cursor-pointer'
        />
      </form>
    </div>
  );
};

export default PostCreate;
