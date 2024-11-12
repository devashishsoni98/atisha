import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <header>
        <div className="flex justify-between py-4 px-6 bg-slate-50 items-center nav">
          <Link to="/">
            <div className="left flex items-center">
              <img src="logo.jpg" alt="logo" className="w-12 cursor-pointer" />
              <p className="pl-4 cursor-pointer logo-text text-2xl">
                <span className="text-[#ffbb39]">ATI</span>
                <span className="text-[#65db82]">SHA</span>
              </p>
            </div>
          </Link>
          <div className="center flex space-around ">
            <Link to="/carrer/roadmaps/explore">
              <p className="px-12 cursor-pointer">ROADMAP</p>
            </Link>
            <Link to="/">
              <p className="px-12 cursor-pointer">RESOURCE</p>
            </Link>
            <Link to="/sessions/explore">
              <p className="px-12 cursor-pointer">SESSIONS</p>
            </Link>
          </div>
          <div className="right flex">
            <div className="bell flex items-center justify-center">
              <FaBell className="w-12 mx-1" />
            </div>
            <Link to="/signup">
              <div className="signup ml-4">
                <button className="signup-btn ">SIGNUP</button>
              </div>
            </Link>
          </div>
        </div>
        <hr />
        <hr />
        <hr />
      </header>
    </>
  );
};

export default Navbar;
