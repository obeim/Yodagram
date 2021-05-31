import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState, useAuthDispatch } from "../../context";
import { BsThreeDots } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
const PostScreen = ({ match, history }) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [avatar, setAvatar] = useState({ username: "", profilePic: "" });
  const { userInfo } = useAuthState();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    fetchPost();
  }, []);
  useEffect(() => {
    getAvatar();
  }, [post]);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);
  const handleClick = () => {
    const menu = document.querySelector("#post");
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
      history.push("/");
    } catch (err) {
      history.push("/");
    }
  };
  const onDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/posts/${post._id}/comments/${id}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setPost(data);
    } catch (err) {}
  };
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
  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/api/posts/${match.params.id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setPost(data);
    } catch (err) {
      setError(err.message);
    }
  };
  const showImage = () => {
    const imagebg = document.querySelector("#imagebg");
    const image = document.querySelector("#image");
    if (
      imagebg.classList.contains("hidden") &&
      image.classList.contains("hidden")
    ) {
      imagebg.classList.remove("hidden");
      image.classList.remove("hidden");
    }
  };
  const closeImage = () => {
    const imagebg = document.querySelector("#imagebg");
    const image = document.querySelector("#image");

    imagebg.classList.add("hidden");
    image.classList.add("hidden");
  };
  return (
    <div className='w-full'>
      <div
        onClick={closeImage}
        id='imagebg'
        className=' w-full bg-black cursor-pointer fixed opacity-70 hidden top-0 h-full z-20 '
      ></div>
      <img
        id='image'
        src={post && post.image}
        className='md:w-8/12 md:h-8/12 w-10/12 h-10/12 md:left-40 left-10  mt-10 absolute hidden z-30 top-10'
      />
      <div className='container mx-auto  my-5'>
        {post && (
          <div
            className='w-8/12 border   bg-white mx-auto grid md:grid-cols-2 shadow '
            style={{ maxHeight: "500px" }}
          >
            <div className='relative'>
              <img
                onClick={showImage}
                src={post && `${post.image}`}
                className='md:w-500 md:h-500 cursor-pointer h-full md:w-full object-cover'
                style={{ maxHeight: "500px" }}
              />
              {post && userInfo && post.user === userInfo._id && (
                <BsThreeDots
                  onClick={handleClick}
                  className='absolute top-2 left-3 cursor-pointer bg-white rounded-full w-10'
                />
              )}
              <ul
                id='post'
                className='border absolute shadow-lg z-20 rounded bg-white top-5   w-24  hidden '
                style={{ left: -20 }}
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
                    document.querySelector("#post").classList.add("hidden")
                  }
                  className='p-3  hover:bg-gray-200 flex cursor-pointer items-center justify-evenly font-bold text-gray-700'
                >
                  Cancel
                </li>
              </ul>
            </div>
            <div className='border  relative' style={{ maxHeight: "500px" }}>
              <h1 className='   border-b my-2 p-2 absolute w-full'>
                <Link to={`/users/${post.user}`}>
                  <img
                    src={avatar && avatar.profilePic}
                    alt=''
                    className='w-8 h-8 rounded-full inline-block'
                  />
                  <span className='text-sm font-semibold text-gray-600'>
                    {" "}
                    {avatar.username}
                  </span>{" "}
                </Link>
                <span className='text-xs text-gray-600'>{post.info}</span>
              </h1>

              <div
                className='mt-20  overflow-y-scroll scrollbar'
                style={{ maxHeight: "300px", height: "300px" }}
              >
                {post && post.comments.length > 0 ? (
                  post.comments.map((comm) => (
                    <div key={comm._id} className='flex items-center'>
                      <div className=' text-sm  p-2'>
                        <span className='font-semibold mx-2'>
                          {comm.user_name}
                        </span>{" "}
                        {comm.comment}
                      </div>
                      {userInfo && comm.user_id === userInfo._id && (
                        <AiFillDelete
                          className='text-sm ml-4 text-red-500 cursor-pointer '
                          onClick={() => onDelete(comm._id)}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <h1 className='text-center text-gray-300 font-bold'>
                    no comments
                  </h1>
                )}
              </div>

              <form
                onSubmit={handleAddComment}
                className='border-t p-2 flex justify-around absolute h-20 md:bottom-0 bottom-01 w-full'
              >
                <textarea
                  type='text'
                  placeholder='Add a comment'
                  className='outline-none w-full  p-3 resize-none	'
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
        )}
      </div>
    </div>
  );
};

export default PostScreen;
