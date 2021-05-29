import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "../../context";

const PostScreen = ({ match }) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const { userInfo } = useAuthState();
  useEffect(() => {
    fetchPost();
  }, []);

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
  return (
    <div className='container mx-auto  my-5'>
      {post && (
        <div
          className='w-8/12 border   bg-white mx-auto grid md:grid-cols-2 shadow '
          style={{ maxHeight: "500px" }}
        >
          <img
            src={`${post.image}`}
            alt=''
            className='md:w-500 md:h-500 md:w-full object-cover'
            style={{ maxHeight: "500px" }}
          />
          <div className='border  relative' style={{ maxHeight: "500px" }}>
            <h1 className='text-gray-400 font-bold text-center border-b my-2 p-2 absolute w-full'>
              Comments
            </h1>

            <div
              className='mt-20  overflow-y-scroll scrollbar'
              style={{ maxHeight: "300px", height: "300px" }}
            >
              {post.comments.length > 0 ? (
                post.comments.map((comm) => (
                  <div className='flex items-center'>
                    <div className=' text-sm  p-2' key={comm._id}>
                      <span className='font-semibold mx-2'>
                        {comm.user_name}
                      </span>{" "}
                      {comm.comment}
                    </div>
                    <button className='text-xs text-blue-500 mx-2'>edit</button>
                    <button className='text-xs text-red-500'>del</button>
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
  );
};

export default PostScreen;
