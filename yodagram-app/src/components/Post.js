import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState, followUser } from "../context";
import axios from "axios";

const Post = ({ post, index, history }) => {
  const [comment, setComment] = useState("");
  const [avatar, setAvatar] = useState({ username: "", profilePic: "" });
  const [thisPost, setPost] = useState(post);
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
  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `/api/posts/${post._id}/comments`,
        { comment },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      setPost(data);
      setComment("");
    } catch (err) {}
  };
  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <div className='border   xl:w-4/5 lg:w-4/5 w-full xl:m-5 lg:m-3 lg:my-10 my-2 rounded bg-white'>
      <div className='flex justify-between p-4 mx-auto items-center  border-b'>
        <Link
          to={`/users/${thisPost.user}`}
          className='flex items-center gap-3'
        >
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
            {userInfo && userInfo._id === post.user ? (
              <li
                onClick={handleDelete}
                className='p-3 hover:bg-gray-200 cursor-pointer flex items-center justify-evenly font-bold text-red-700'
              >
                Delete
              </li>
            ) : (
              <li
                onClick={() => {
                  followUser(dispatch, post.user, userInfo.token);
                }}
                className='p-3 hover:bg-gray-200 cursor-pointer flex items-center justify-evenly font-bold text-blue-700'
              >
                unfollow
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
      <Link to={`/posts/${thisPost._id}`}>
        {" "}
        <img
          src={thisPost.image}
          alt=''
          className='w-full max-h-full	min-h-96'
        />
      </Link>
      <div>
        <div className=' text-gray-600  mx-5 my-5 '>
          <p className='cursor-pointer  my-3   '>
            {" "}
            <span className='font-bold mx-2'>{avatar.username} :</span>{" "}
            {thisPost.info && post.info}
          </p>

          {thisPost.comments.length > 3 && (
            <p className='cursor-pointer  my-3 mx-2 text-lg text-gray-400'>
              View all {thisPost.comments.length} comments
            </p>
          )}
          {thisPost.comments &&
            thisPost.comments.map(
              (comment, index) =>
                index < 3 && (
                  <div className='my-1 text-xs' key={comment._id}>
                    <span className='font-bold mx-2'>{comment.user_name}</span>{" "}
                    {comment.comment}
                  </div>
                )
            )}
        </div>
        <form
          onSubmit={handleAddComment}
          className='border-t p-2 flex justify-around'
        >
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
