import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../context";
import axios from "axios";

const Post = ({ post, index, history }) => {
  const [comment, setComment] = useState("");
  const [avatar, setAvatar] = useState({ username: "", profilePic: "" });
  const { userInfo } = useAuthState();
  const dispatch = useAuthDispatch();
  const getAvatar = async () => {
    try {
      const { data } = await axios.get(`/api/users/avatar/${post.user}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setAvatar(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = () => {
    const menu = document.querySelector(`#post${index}`);
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "POST_DELETE", payload: post._id });
    } catch (err) {}
  };
  useEffect(() => {
    getAvatar();
  }, []);
  return (
    <div className='border    xl:w-4/5 lg:w-4/5 w-full xl:m-5 lg:m-3 lg:my-10 my-2 rounded bg-white'>
      <div className='flex justify-between p-4 mx-auto items-center  border-b'>
        <Link to='/' className='flex items-center gap-3'>
          <img
            src={avatar.profilePic}
            alt=''
            className='w-10 h-10 rounded-full inline-block border border-gray border-opacity-50 border-semibold'
          />
          <span className='font-bold text-gray-600 hover:underline'>
            {" "}
            {avatar.username}
          </span>
        </Link>
        <div className='relative'>
          <BsThreeDots
            className='text-xl cursor-pointer'
            onClick={handleClick}
          />

          <ul
            id={`post${index}`}
            className='border absolute shadow-lg z-20 rounded bg-white top-5 lg:left-0 right-0 lg:left-0 w-32  hidden '
          >
            {userInfo && userInfo._id === post.user && (
              <li
                onClick={handleDelete}
                className='p-3 hover:bg-gray-200 cursor-pointer flex items-center justify-evenly font-bold text-red-700'
              >
                Delete
              </li>
            )}
            <li
              onClick={() =>
                document.querySelector(`#post${index}`).classList.add("hidden")
              }
              className='p-3  hover:bg-gray-200 flex cursor-pointer items-center justify-evenly font-bold text-gray-700'
            >
              Cancel
            </li>
          </ul>
        </div>
      </div>
      <img src={post.image} alt='' className='w-full max-h-full	min-h-96' />
      <div>
        <div className=' text-gray-600  mx-5 my-5 '>
          {post.info && (
            <p className='cursor-pointer  my-3  text-lg '>
              {" "}
              <span className='font-bold mx-2'>{avatar.username}</span>{" "}
              {post.info}
            </p>
          )}
          {post.comments.length > 3 && (
            <p className='cursor-pointer  my-3 mx-2 text-lg text-gray-400'>
              View all {post.comments.length}
            </p>
          )}
          {post.comments &&
            post.comments.map((comment) => (
              <div className='my-1 ' key={comment._id}>
                <span className='font-bold mx-2'>{comment.user_name}</span>{" "}
                {comment.comment}
              </div>
            ))}
        </div>
        <form className='border-t p-2 flex justify-around'>
          <textarea
            type='text'
            placeholder='Add a comment'
            className='outline-none w-5/6 p-3 resize-none	'
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          {comment.length > 0 ? (
            <button className='text-blue-400 font-bold p-3 outline-none '>
              Post
            </button>
          ) : (
            <button
              className='text-blue-200 font-bold p-3 outline-none  '
              disabled
            >
              Post
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Post;
