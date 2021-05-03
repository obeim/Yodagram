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
    <div className='container mx-auto flex flex-col'>
      <div className='flex gap-48 mx-48 my-10  items-center  '>
        <img
          src={user.profilePic}
          alt=''
          className='rounded-full w-48 h-48 border object-cover'
        />
        <div>
          <div className='flex justify-center'>
            <span className='text-4xl font-light	'>{user.username}</span>
            {match.params.id === userInfo._id ? (
              <button className='border border-gray-400 px-2 py-1 w-32 h-10 mx-5  rounded font-semibold'>
                Edit Profile
              </button>
            ) : (
              <button
                onClick={followHandler}
                className='border bg-blue-500 text-white px-2 py-1 w-32 h-10 mx-5  rounded font-semibold'
              >
                {userInfo.following.indexOf(match.params.id) === -1
                  ? "follow"
                  : "unfollow"}
              </button>
            )}
          </div>
          <div className='flex my-5 justify-between text-xl font-normal	'>
            <h1>
              <span className='font-bold'>
                {user.posts && user.posts.length}
              </span>{" "}
              posts
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

          <p className='m-2 text-xl'>{user.bio}</p>
        </div>
      </div>

      <div className='grid grid-cols-3 mx-auto justify-items-center gap-16 border-t pt-20	'>
        {user.posts && user.posts.length > 0 ? (
          user.posts.map((post) => (
            <Link
              key={post._id}
              to={`/post/${post._id}`}
              className='w-80 h-auto overflow-hidden  relative  cursor-pointer'
            >
              <img className='object-cover w-full h-full ' src={post.image} />
              <div className='absolute   w-full h-full hover:block hover:bg-black hover:opacity-50  top-0'></div>
            </Link>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
