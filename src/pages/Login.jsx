import React, { useContext, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLoginButton = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          title: "Login Successfully",
          icon: "success",
          draggable: true,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          title: error.message,
          icon: "error",
          draggable: true,
        });
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  })
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        console.log(res.user);
        navigate(location?.state || "/");
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

  return (
    <div className="w-full  flex flex-col justify-center items-center">
      <div className="min-w-[30%] my-10">
        <div className="text-center space-y-5">
          <p className="text-blue-400">Welcome Back!</p>
          <div>
            <h1 className="font-bold text-4xl mb-2">Member Login</h1>
            <p className="text-gray-600">
              Access to all features. No credit card required.
            </p>
          </div>
          <button onClick={handleGoogleLogin} className="btn w-full">
            {" "}
            <FcGoogle />
            Sign in With Google
          </button>
          <div className="divider">Or continue with</div>
        </div>

        <div className="w-full ">
          <form onSubmit={handleLoginButton} className="fieldset space-y-2">
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              name="email"
              placeholder="Email"
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              name="password"
              required
            />

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn bg-blue-500 text-white font-semibold mt-4">
              Log in
            </button>
          </form>
          <div>
            <p className="text-center">
              Don't have an account?
              <Link
                className="mx-2 text-blue-500 cursor-pointer underline"
                to="/register"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
