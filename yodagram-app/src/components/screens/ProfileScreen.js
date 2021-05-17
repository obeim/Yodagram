import React, { useEffect, useState } from "react";
import { useAuthDispatch, useAuthState, followUser } from "../../context";
import { Link } from "react-router-dom";
import axios from "axios";
const ProfileScreen = ({ history, match }) => {
  const { userInfo } = useAuthState();
  const dispatch = useAuthDispatch();
  const [user, setUser] = useState({});
  const followHandler = () => {
    followUser(dispatch, match.params.id, userInfo.token);
  };
  const getProfile = async () => {
    try {
      const { data } = await axios.get(`/api/users/${match.params.id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setUser(data);
      console.log(data);
    } catch (err) {}
  };
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    getProfile();
  });
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    getProfile();
  }, [userInfo, match.params.id]);
  return (
    <div className='container mx-auto flex flex-col justify-between items-center w-full'>
      <div className='flex lg:gap-48 md:gap-32 gap-12 justify-center mx-48 my-10  items-center  w-full'>
        <img
          src={user.profilePic}
          alt=''
          className='rounded-full lg:w-48 lg:h-48 md:w-32 md:h-32  border object-cover w-24 h-24'
        />
        <div>
          <div className='flex justify-center lg:text-lg text-sm'>
            <span className='lg:text-4xl   md:text-2xl text-lg font-light	'>
              {user.username}
            </span>
            {userInfo && match.params.id === userInfo._id ? (
              <button className='border border-gray-400 px-2 py-1 w-f   mx-5  rounded font-semibold'>
                Edit Profile
              </button>
            ) : (
              <button
                onClick={followHandler}
                className='border bg-blue-500 text-white px-2 py-1 lg:w-32 w-20   h-10 mx-5  rounded font-semibold'
              >
                {userInfo &&
                userInfo.following.indexOf(match.params.id) === -1 ? (
                  <span> follow</span>
                ) : (
                  <span> unfollow</span>
                )}
              </button>
            )}
          </div>
          <div className='flex my-5 md:justify-between justify-around lg:text-xl md:text-md text-sm 	'>
            <h1>
              <span className='font-bold'>
                {user.posts && user.posts.length}
              </span>{" "}
              <span>posts</span>
            </h1>
            <h1>
              <span className='font-bold'>
                {user.followers && user.followers.length - 1}
              </span>{" "}
              followers
            </h1>
            <h1>
              <span className='font-bold'>
                {user.following && user.following.length - 1}
              </span>{" "}
              following
            </h1>
          </div>

          <p className='m-2 lg:text-xl text-sm'>{user.bio}</p>
        </div>
      </div>

      <div className='  grid md:grid-cols-3 grid-cols-2  mx-auto justify-items-center lg:gap-16 gap-10 border-t pt-20	'>
        {user.posts && user.posts.length > 0 ? (
          user.posts.map((post) => (
            <Link
              key={post._id}
              to={`/posts/${post._id}`}
              className='lg:w-80 lg:h-80 md:w-60 md:h-60 w-40 h-40 overflow-hidden  relative  cursor-pointer'
            >
              <img className='object-cover  w-full h-full' src={post.image} />
              <div className='absolute   w-full h-full hover:block hover:bg-black hover:opacity-50  top-0'></div>
            </Link>
          ))
        ) : (
          <div className='text-center col-span-3  text-gray-700 font-light'>
            you havent posted anything yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
