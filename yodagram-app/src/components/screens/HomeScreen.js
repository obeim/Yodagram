import React, { useEffect } from "react";
import Post from "../Post";
import axios from "axios";
import { useAuthState, useAuthDispatch, logout } from "../../context";
import Suggest from "../Suggest";
import Spinner from "../Spinner";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
const HomeScreen = ({ history }) => {
  const { userInfo, loading, error, posts } = useAuthState();
  const dispatch = useAuthDispatch();

  const fetchPosts = async () => {
    if (userInfo) {
      try {
        dispatch({ type: "POSTS_REQUEST" });
        const { data } = await axios.get("/api/posts", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "POSTS_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "POSTS_FAIL", payload: err.message });
      }
    }
  };
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      fetchPosts();
    }
  }, []);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    fetchPosts();
  }, [userInfo]);

  return (
    <div className='container mx-auto select-none	'>
      <Link
        to='/createpost'
        className='lg:hidden mx-auto m-2 w-full border bg-white p-2 block'
      >
        <AiOutlinePlus className='w-full text-2xl' />
      </Link>
      <div className=' grid grid-cols-5 lg:my-5 my-1 lg:mx-16  mx-2 '>
        <div className='xl:col-span-3 col-span-5'>
          {loading && <Spinner />}
          {error && <div>{error}</div>}
          {posts && posts.length > 0 ? (
            posts.map((post, index) => {
              return <Post key={post._id} index={index} post={post} />;
            })
          ) : (
            <h1 className='text-2xl text-gray-400 font-semibold text-center m-10'>
              there no posts follow some one{" "}
            </h1>
          )}
        </div>
        <div className='xl:col-span-2 hidden  xl:block '>
          <div className='fixed right-0  my-5 z-10  xl:w-700   border-l '>
            <div className='m-10 flex justify-around items-center'>
              <h1 className=''>
                <img
                  src={userInfo ? userInfo.profilePic : ""}
                  alt=''
                  className='w-20 h-20 scale-50	rounded-full inline-block object-cover'
                />
                <span className='inline-block font-bold mx-6 text-gray-500 '>
                  {userInfo ? userInfo.username : ""}
                </span>
              </h1>
              <button
                onClick={() => {
                  logout(dispatch);
                }}
                className='text-blue-500'
              >
                logout
              </button>
            </div>
            <div className='m-10 flex justify-around items-center'>
              <h1 className='text-gray-400 font-semibold text-xl'>
                Suggestions For You
              </h1>
            </div>

            <Suggest userInfo={userInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
