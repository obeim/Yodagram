import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className='container mx-auto w-full my-20 text-center'>
      <h1 className='text-4xl '>404 Page Not Found</h1>
      <Link to='/' className='underline block m-2'>
        Go To Home
      </Link>
    </div>
  );
};

export default NotFound;
