import React, { useEffect } from "react";
import { useAuthState } from "../../context";
const ProfileScreen = ({ history }) => {
  const { userInfo } = useAuthState();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  });
  return <div className='m-10 text-6xl text-center'>ProfileScreen</div>;
};

export default ProfileScreen;
