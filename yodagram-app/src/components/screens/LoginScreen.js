import React, { useState, useEffect } from "react";
import { useAuthDispatch, useAuthState, loginUser } from "../../context/index";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAuthDispatch();

  const { userInfo, error, loading } = useAuthState();

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(dispatch, { email, password });
  };
  return (
    <div className='container mx-auto'>
      {loading && <Spinner />}
      <div className='shadow border md:w-2/5 w-4/5 mx-auto bg-white mt-20  text-center'>
        <h1 className='text-3xl m-10 font-semibold text-gray-600'>Login </h1>
        <form onSubmit={submitHandler}>
          <input
            type='email'
            required
            placeholder='enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='block mx-auto outline-none p-2 border lg:w-96 w-4/5 m-3 focus:border-black'
          />
          <input
            type='password'
            required
            placeholder='enter your password'
            onChange={(e) => setPassword(e.target.value)}
            className='block mx-auto outline-none p-2 border lg:w-96 w-4/5 m-3 focus:border-black'
          />
          <input
            type='submit'
            value='Login'
            className=' block mx-auto m-5 p-3 lg:w-96 w-4/5 bg-black text-white cursor-pointer'
          />
        </form>
        <p className='m-4'>
          Dont have account ?{" "}
          <Link to='/register' className='hover:underline'>
            Register
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

export default LoginScreen;
