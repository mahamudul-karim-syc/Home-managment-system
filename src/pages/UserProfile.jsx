import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import BaseUrl from "../service/BaseUrl";
import toast from "react-hot-toast";
import { Link } from "react-router";

const UserProfile = () => {
  const { authuser, accessToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    if (authuser) {
      setEmail(authuser.email || "");
      setUsername(authuser.username || "");
      setFirstname(authuser.firstname || "");
      setLastname(authuser.lastname || "");
      setPhone(authuser.phone || "");
    }
  }, [authuser]);
  const HendelUpdateUser = async (e) => {
    e.preventDefault();
    const FromData = {
      firstname,
      lastname,
      username,
      email,
      phone,
    };
    console.log(FromData);
    const res = await fetch(`${BaseUrl}/Edituser`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(FromData),
    });
    const data = await res.json();
    console.log(data);
    toast.success(data.message);
  };
  if (!authuser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 ">
      <div className="max-w-4xl mx-auto ">
        {/* Profile Header */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Avatar */}
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content w-24 h-24 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold">
                    {authuser.firstname?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold">
                  {authuser.firstname} {authuser.lastname}
                </h1>

                <p className="text-base-content/60">@{authuser.username}</p>

                <div className="flex gap-2 justify-center sm:justify-start mt-3">
                  <span className="badge badge-primary">{authuser.role}</span>

                  <span className="badge badge-success">
                    {authuser.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Edit Profile */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">Edit Profile</h2>

            <p className="text-base-content/60 mb-5">
              Update your personal information below.
            </p>

            <form onSubmit={HendelUpdateUser}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* First Name */}
                <fieldset className="fieldset">
                  <label className="label font-semibold">First Name</label>

                  <input
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    className="input input-bordered w-full"
                  />
                </fieldset>
                {/* Last Name */}
                <fieldset className="fieldset">
                  <label className="label font-semibold">Last Name</label>

                  <input
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                    className="input input-bordered w-full"
                  />
                </fieldset>
                {/* Username */}
                <fieldset className="fieldset">
                  <label className="label font-semibold">Username</label>

                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="input input-bordered w-full"
                  />
                </fieldset>
                {/* Email */}
                <fieldset className="fieldset">
                  <label className="label font-semibold">Email</label>

                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <label className="label font-semibold">Phone</label>

                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    name="phone"
                    placeholder="01712345678"
                    className="input input-bordered w-full"
                  />
                </fieldset>
              </div>

              {/* Account Information */}
              <div className="divider"></div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-base-200 rounded-lg p-4">
                  <p className="text-sm text-base-content/60">User ID</p>
                  <p className="font-bold text-lg">#{authuser.id}</p>
                </div>

                <div className="bg-base-200 rounded-lg p-4">
                  <p className="text-sm text-base-content/60">Role</p>
                  <p className="font-bold text-lg capitalize">
                    {authuser.role}
                  </p>
                </div>

                <div className="bg-base-200 rounded-lg p-4">
                  <p className="text-sm text-base-content/60">Status</p>
                  <p className="font-bold text-lg">
                    {authuser.is_active ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>

              {/* Save */}
              <div className="flex gap-5  justify-end">
                
                  <Link to={'/password'} type="submit" className="btn btn-primary px-8">
                   Password Change
                  </Link>
                    <button type="submit" className="btn btn-primary px-8">
                    💾 Save Changes
                  </button>
                </div>
               
           
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
