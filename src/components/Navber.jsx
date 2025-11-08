import React, { useContext } from "react";
import logo from "../assets/jobhub-logo.svg";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";

const Navber = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="navbar lg:px-10 bg-base-100 shadow-sm py-5  fixed w-full z-50">
      {/* Left section */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/my-applications">My Job Applications</Link>
            </li>
            <li>
              <Link to="/add-job-post">Add Job Post</Link>
            </li>
            <li>
              <Link to="/my-posted-jobs">My Posted Jobs</Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost px-0">
          <img src={logo} alt="JobHub Logo" className="w-32 sm:w-36 md:w-40" />
        </Link>
      </div>

      {/* Center section - desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold space-x-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/my-applications">My Job Applications</Link>
          </li>
          <li>
            <Link to="/add-job-post">Add Job Post</Link>
          </li>
          <li>
            <Link to="/my-posted-jobs">My Posted Jobs</Link>
          </li>
        </ul>
      </div>

      {/* Right section */}
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
              />
            </Link>
            <button
              onClick={logOut}
              className="text-blue-500 hover:text-blue-600 text-2xl md:text-3xl"
              title="Log Out"
            >
              <IoLogOutOutline />
            </button>
          </div>
        ) : (
          <div className="flex gap-2 sm:gap-3">
            <Link to="/login">
              <button className="btn bg-blue-500 text-white hover:bg-blue-600">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="btn bg-green-500 text-white hover:bg-green-600">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navber;
