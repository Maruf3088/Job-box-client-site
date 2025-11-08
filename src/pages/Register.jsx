import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { creatUser, logOut, signInWithGoogle, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [role, setRole] = useState("jobSeeker");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        console.log(res.user);
        navigate("/");
        Swal.fire({
          title: "Login Successfully",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          title: error.message,
          icon: "error",
          draggable: true,
        });
      });
  };

  const handleRegisterButton = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const userName = form.username.value;
    const password = form.password.value;
    const photoUrl = form.photoUrl.value;
    const rePassword = form.repassword.value;

    if (password !== rePassword) {
      alert("Password not match");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        title:
          "Password must be at least 8 characters long and contain at least one letter and one number",
        icon: "error",
      });
      return;
    }

    creatUser(email, password)
      .then((res) => {
        console.log(res);
        updateUserProfile(userName, photoUrl);
        logOut();
        Swal.fire({
          title: "Registered Successfully",
          icon: "success",
        });
        navigate("/login");
      })

      .catch((error) => {
        Swal.fire({
          title: error.message,
          icon: "error",
        });
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="max-w-[400px] my-10">
        <div className="text-center space-y-5">
          <p className="text-blue-400">Register</p>
          <h1 className="font-bold text-4xl mb-2">Start for free Today</h1>
          <button onClick={handleGoogleLogin} className="btn w-full">
            <FcGoogle /> Sign in With Google
          </button>
          <div className="divider">Or continue with</div>
        </div>

        <form onSubmit={handleRegisterButton} className="space-y-2">
          <label className="label">Full Name</label>
          <input
            type="text"
            name="name"
            className="input w-full"
            placeholder="Steven Job"
            required
          />

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input w-full"
            placeholder="Email"
            required
          />

          <label className="label">UserName</label>
          <input
            type="text"
            name="username"
            className="input w-full"
            placeholder="Username"
            required
          />

          <label className="label">Photo URL</label>
          <input
            type="url"
            name="photoUrl"
            className="input w-full"
            placeholder="https://example.com/profile.jpg"
            required
          />

          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input w-full"
              placeholder="Password"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <label className="label">Re-Password</label>
          <div className="relative">
            <input
              type={showRePassword ? "text" : "password"}
              name="repassword"
              className="input w-full"
              placeholder="Re-enter Password"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowRePassword(!showRePassword)}
            >
              {showRePassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="btn bg-green-500 text-white mt-4 w-full">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?
          <Link className="mx-2 text-blue-500 underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
