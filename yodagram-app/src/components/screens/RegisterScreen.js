import React, { useState, useEffect } from "react";
import {
  useAuthDispatch,
  useAuthState,
  registerUser,
} from "../../context/index";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";
const RegisterScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [birth, setBirth] = useState("");
  const [profilePic, setPic] = useState({ name: "" });
  const [imagePath, setImage] = useState(null);

  const dispatch = useAuthDispatch();

  const { userInfo, error, loading } = useAuthState();
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
  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(dispatch, {
      username,
      email,
      profilePic: imagePath || null,
      password,
      birth,
    });
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo]);
  return (
    <div className='container mx-auto'>
      {loading && <Spinner />}
      <div className='shadow border md:w-2/5 w-4/5 mx-auto bg-white mt-20  text-center'>
        <h1 className='text-3xl m-10 font-semibold text-gray-600'>Register </h1>
        <form onSubmit={submitHandler}>
          <input
            required
            type='email'
            placeholder='enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='block mx-auto outline-none p-2 border lg:w-96 w-4/5 m-3 focus:border-black'
          />
          <input
            type='text'
            placeholder='enter username'
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className='block mx-auto outline-none p-2 border lg:w-96 w-4/5 m-3 focus:border-black'
          />
          <input
            type='date'
            required
            placeholder='enter your birth Date'
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            className='block mx-auto outline-none p-2 border lg:w-96 w-4/5 m-3 focus:border-black'
          />
          <input
            type='text '
            defaultValue={profilePic.name}
            placeholder='Profile pic '
            className=' mx-auto outline-none p-2 border lg:w-72 w-2/5 m-3 focus:border-black'
          />
          <button
            className=' bg-black text-white md:w-20 w-2/5 p-2 relative cursor-pointer'
            type='button'
          >
            <input
              type='file'
              onChange={onChange}
              className='cursor-pointer absolute w-full opacity-0 '
            />
            uplaod
          </button>

          <input
            type='password'
            required
            placeholder='enter your password'
            onChange={(e) => setPassword(e.target.value)}
            className='block mx-auto outline-none p-2 border lg:w-96  w-4/5 m-3 focus:border-black'
          />
          <input
            type='submit'
            value='Login'
            className='block mx-auto m-5 p-3 lg:w-96 w-4/5 bg-black text-white cursor-pointer'
          />
        </form>
        <p className='m-4'>
          already have account ?{" "}
          <Link to='/login' className='hover:underline'>
            Login
          </Link>
        </p>
      </div>

      {error && (
        <div className='bg-red-300 md:w-2/5 w-4/5 mx-auto my-5 text-center rounded p-3 text-gray-600 font-semibold'>
          {error}
        </div>
      )}
    </div>
  );
};

export default RegisterScreen;
