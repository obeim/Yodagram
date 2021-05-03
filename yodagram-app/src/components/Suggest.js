import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthDispatch, followUser } from "../context";
import { Link } from "react-router-dom";
const Suggest = ({ userInfo }) => {
  const [users, setUsers] = useState([]);
  const dispatch = useAuthDispatch();

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/users/suggest", {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    fetchUsers();
  }, [userInfo]);
  return (
    <div>
      {userInfo && users.length > 0 ? (
        <div>
          {users.map(
            (user) =>
              user._id !== userInfo._id && (
                <div
                  key={user._id}
                  className='my-3 mx-10 flex justify-around items-center'
                >
                  <h1 className=''>
                    <img
                      src={user.profilePic}
                      alt=''
                      className='ml-7 w-10 h-10 rounded-full inline-block object-cover'
                    />
                    <Link
                      to={`/users/${user._id}`}
                      className='inline-block font-bold mx-6 text-gray-500'
                    >
                      {user.username}{" "}
                    </Link>
                  </h1>
                  <button
                    className='text-blue-500 outline-none border-none'
                    onClick={() =>
                      followUser(dispatch, user._id, userInfo.token)
                    }
                  >
                    {user.followers.indexOf(userInfo._id) === -1 ? (
                      <>follow</>
                    ) : (
                      <>unfollow</>
                    )}
                  </button>
                </div>
              )
          )}
        </div>
      ) : (
        <div className='text-center text-gray-400 font-bold'>no suggest</div>
      )}
    </div>
  );
};

export default Suggest;
