import React from "react";
import { AiFillHome, AiFillPlusSquare } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { RiLogoutBoxFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { logout, useAuthDispatch, useAuthState } from "../context";
const Header = () => {
  const dispatch = useAuthDispatch();
  const { userInfo } = useAuthState();
  const menuHandler = () => {
    const menu = document.querySelector("#menu");
    const avatar = document.querySelector("#avatar");
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
      avatar.classList.add("border");
      avatar.classList.add("border-black");
    } else {
      menu.classList.add("hidden");
      avatar.classList.remove("border");
      avatar.classList.remove("border-black");
    }
  };
  const modalHandler = () => {};
  return (
    <header className='border-b fixed top-0 bg-white w-full z-20'>
      <nav className='flex justify-around items-center p-4'>
        <Link to='/' className='md:block hidden'>
          <img src='/yodagram.png' className='w-28' alt='logo' />
        </Link>
        {userInfo ? (
          <>
            {" "}
            <form
              className='relative'
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type='search'
                className='px-4 py-2 w-full  border rounded outline-none bg-gray-100 focus:border-gray-300'
                placeholder='search'
              />
            </form>
            <ul className='flex items-center gap-10'>
              <li className='cursor-pointer hidden md:block rounded-full p-1 hover:bg-gray-200'>
                <Link to='/'>
                  <AiFillHome className='text-3xl ' />
                </Link>
              </li>
              <li className='cursor-pointer hidden md:block rounded-full p-1 hover:bg-gray-200'>
                <Link to='/createpost'>
                  <AiFillPlusSquare
                    className='text-3xl '
                    onClick={modalHandler}
                  />
                </Link>
              </li>
              <li
                className='w-8 cursor-pointer relative '
                onClick={menuHandler}
              >
                <img
                  src={userInfo.profilePic}
                  alt=''
                  className='rounded-full w-8 h-8 object-cover'
                  id='avatar'
                />
                <ul
                  id='menu'
                  className='border absolute shadow-lg rounded bg-white top-10 right-0 lg:left-0 w-32  hidden '
                >
                  <Link to={`/users/${userInfo._id}`}>
                    <li className='p-3 hover:bg-gray-200 flex items-center justify-evenly font-bold text-gray-700'>
                      <GoPerson className='inline text-xl ' /> profile
                    </li>
                  </Link>
                  <button
                    className='block w-full'
                    onClick={() => {
                      logout(dispatch);
                    }}
                  >
                    <li className='p-3  hover:bg-gray-200 flex items-center justify-evenly font-bold text-gray-700'>
                      <RiLogoutBoxFill className='inline text-xl ' />
                      logout
                    </li>
                  </button>
                </ul>
              </li>
            </ul>
          </>
        ) : (
          <div className='flex gap-10'>
            <NavLink activeClassName='underline' to='/login'>
              Login
            </NavLink>
            <NavLink activeClassName='underline' to='/register'>
              Register
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
