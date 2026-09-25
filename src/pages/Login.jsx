
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import BaseUrl from "../service/BaseUrl";
import { AuthContext } from "../Context/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { authuser, setAuthuser } = useContext(AuthContext);

  const navigate = useNavigate();

  const LoginHendel = async (e) => {
    e.preventDefault();

    try {
      // Login form data
      const formdata = new URLSearchParams();

      formdata.append("username", username);
      formdata.append("password", password);

      // Login API
      const res = await fetch(`${BaseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formdata,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Login failed");
      }

      const accessToken = data?.access_token;

      if (!accessToken) {
        throw new Error("Access token not found");
      }

      // IMPORTANT: Same token key everywhere
      localStorage.setItem("hossing_tocken", accessToken);

      // Get logged-in user
      const userRes = await fetch(`${BaseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userData = await userRes.json();

      if (!userRes.ok) {
        throw new Error(userData.detail || "Failed to get user information");
      }

      if (userData?.id) {
        setAuthuser(userData);

        toast.success("Login successful!");

        console.log("Logged in user:", userData);

        navigate("/Home");
      } else {
        toast.error("User information not found");
      }

    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.message || "Username or password incorrect");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">

        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>

          <p className="py-6 w-96">
            Please enter your credentials
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={LoginHendel} className="card-body">
            <fieldset className="fieldset">

              {/* Username */}
              <label className="label">Username</label>

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="input"
                placeholder="Username"
                required
              />

              {/* Password */}
              <label className="label">Password</label>

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="input"
                placeholder="Password"
                required
              />

              {/* Signup */}
              <div>
                <Link to="/singup" className="link link-hover">
                  Don't have an account?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-neutral mt-4"
              >
                Login
              </button>

            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

