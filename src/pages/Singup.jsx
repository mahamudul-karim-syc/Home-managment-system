import { useState } from "react";
import { Link,} from "react-router";
import BaseUrl from "../service/BaseUrl";
import toast from "react-hot-toast";
const Singup = () => {
  

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const HendelSignup = async (e) => {
    e.preventDefault();

    const userdata = {
      email,
      username,
      firstname,
      lastname,
      password,
      phone,
      role: "user",
  };
  console.log(userdata);
     const res=await fetch(`${BaseUrl}/create_user`,{
        method:"POST",
        headers:{
            'Content-type':'application/json',
        },
        body:JSON.stringify(userdata),
    })
    const data =await res.json();
    toast.success(data.message)
    console.log(data)
}

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">

        <div className="text-center">
          <h1 className="text-5xl font-bold">Signup now!</h1>
          <p className="py-6 w-96">
            Create your HousingMate account
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <form onSubmit={HendelSignup} className="card-body">
            <fieldset className="fieldset">

              {/* Email */}
              <label className="label">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="input input-bordered"
                placeholder="Email"
                required
              />

              {/* Username */}
              <label className="label">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="input input-bordered"
                placeholder="Username"
                required
              />

              {/* First Name */}
              <label className="label">First Name</label>
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
                className="input input-bordered"
                placeholder="First Name"
                required
              />

              {/* Last Name */}
              <label className="label">Last Name</label>
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
                className="input input-bordered"
                placeholder="Last Name"
                required
              />

              {/* Phone */}
              <label className="label">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                className="input input-bordered"
                placeholder="01712345678"
                required
              />

              {/* Password */}
              <label className="label">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="input input-bordered"
                placeholder="Password"
                required
              />

              {/* Role */}
              <input type="hidden" value="user" />

              <div className="mt-2">
                <Link to="/login" className="link link-hover">
                  Already have an account?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-4"
              >
                Signup
              </button>

            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Singup;