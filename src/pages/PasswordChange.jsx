

import { useContext, useState } from "react";
import BaseUrl from "../service/BaseUrl";
import { AuthContext } from "../Context/AuthProvider";
import toast from "react-hot-toast";

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const {accessToken}=useContext(AuthContext)

  const handleChangePassword =async (e) => {
    e.preventDefault();
    const PasswordData = {
      current_password: currentPassword,
      new_password: newPassword,
    };
    console.log({currentPassword,newPassword,});
    const rsc=await fetch(`${BaseUrl}/passwordchange`,{
        method:"PUT",
       headers:{
        Authorization:`Bearer ${accessToken}`,
        "Content-type":"application/json"
      },
      body: JSON.stringify(PasswordData)  
    })
    const data=await rsc.json();
    console.log(data)
    toast.success(data.message)
   
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">🔐 Change Password</h2>

            <p className="text-base-content/60 mb-5">
              Update your password to keep your account secure.
            </p>

            <form onSubmit={handleChangePassword} className="space-y-5">
              {/* Current Password */}
              <fieldset className="fieldset">
                <label className="label font-semibold">Current Password</label>

                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="input input-bordered w-full"
                  required
                />
              </fieldset>

              {/* New Password */}
              <fieldset className="fieldset">
                <label className="label font-semibold">New Password</label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="input input-bordered w-full"
                  required
                />
              </fieldset>

              {/* Button */}
              <div className="flex justify-end pt-3">
                <button type="submit" className="btn btn-primary px-8">
                  🔒 Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange ;