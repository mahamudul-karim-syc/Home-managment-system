import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import BaseUrl from "../service/BaseUrl";
import toast from "react-hot-toast";

const RoometRequest = () => {
  const { accessToken } = useContext(AuthContext);

  const [preferredLocation, setPreferredLocation] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [preferredCategory, setPreferredCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Budget validation
    if (Number(budgetMax) < Number(budgetMin)) {
      toast.error("Maximum budget cannot be less than minimum budget");
      return;
    }

    const requestData = {
      preferred_location: preferredLocation,
      budget_min: Number(budgetMin),
      budget_max: Number(budgetMax),
      preferred_category: preferredCategory,
      description: description,
    };

    console.log("Roommate Request:", requestData);

    setLoading(true);

    const res = await fetch(`${BaseUrl}/requests`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await res.json();

    console.log("Response:", data);

    toast.success(data.message || "Roommate request created successfully!");
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary text-primary-content flex items-center justify-center text-3xl shadow-lg">
              👥
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Find a Roommate
              </h1>

              <p className="text-base-content/60 mt-1">
                Tell us what kind of roommate and room you are looking for.
              </p>
            </div>
          </div>
        </div>

        {/* ================= MAIN CARD ================= */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              {/* ================= LOCATION ================= */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">📍</span>

                  <div>
                    <h2 className="text-xl font-bold">Location</h2>

                    <p className="text-sm text-base-content/60">
                      Where do you want to live?
                    </p>
                  </div>
                </div>

                <fieldset className="fieldset">
                  <label className="label font-semibold">
                    Preferred Location
                  </label>

                  <input
                    type="text"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    placeholder="Example: Mirpur, Dhaka"
                    className="input input-bordered w-full"
                    required
                  />
                </fieldset>
              </div>

              <div className="divider"></div>

              {/* ================= BUDGET ================= */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">💰</span>

                  <div>
                    <h2 className="text-xl font-bold">Budget</h2>

                    <p className="text-sm text-base-content/60">
                      Set your monthly rent range.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Minimum */}
                  <fieldset className="fieldset">
                    <label className="label font-semibold">
                      Minimum Budget
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                      <span className="font-bold">৳</span>

                      <input
                        type="number"
                        min="0"
                        value={budgetMin}
                        onChange={(e) => setBudgetMin(e.target.value)}
                        placeholder="4000"
                        className="grow"
                        required
                      />
                    </label>
                  </fieldset>

                  {/* Maximum */}
                  <fieldset className="fieldset">
                    <label className="label font-semibold">
                      Maximum Budget
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                      <span className="font-bold">৳</span>

                      <input
                        type="number"
                        min="0"
                        value={budgetMax}
                        onChange={(e) => setBudgetMax(e.target.value)}
                        placeholder="7000"
                        className="grow"
                        required
                      />
                    </label>
                  </fieldset>
                </div>

                {/* Budget Preview */}
                {budgetMin !== "" && budgetMax !== "" && (
                  <div className="alert alert-info mt-5">
                    <span>💡</span>

                    <div>
                      <p className="font-semibold">Your Budget</p>

                      <p className="text-sm">
                        ৳{budgetMin} - ৳{budgetMax} per month
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="divider"></div>

              {/* ================= ROOM CATEGORY ================= */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">🏠</span>

                  <div>
                    <h2 className="text-xl font-bold">Room Preference</h2>

                    <p className="text-sm text-base-content/60">
                      Choose your preferred room type.
                    </p>
                  </div>
                </div>

                <fieldset className="fieldset">
                  <label className="label font-semibold">
                    Preferred Category
                  </label>

                  <select
                    value={preferredCategory}
                    onChange={(e) => setPreferredCategory(e.target.value)}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select room category</option>

                    <option value="single">🛏️ Single Room</option>

                    <option value="shared">👥 Shared Room</option>

                    <option value="family">🏡 Family Room</option>
                  </select>
                </fieldset>
              </div>

              <div className="divider"></div>

              {/* ================= DESCRIPTION ================= */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">📝</span>

                  <div>
                    <h2 className="text-xl font-bold">
                      About Your Requirement
                    </h2>

                    <p className="text-sm text-base-content/60">
                      Tell potential roommates about yourself and your
                      requirements.
                    </p>
                  </div>
                </div>

                <fieldset className="fieldset">
                  <label className="label font-semibold">Description</label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Example: I am a university student looking for a clean and friendly roommate. I prefer a quiet environment and a shared room near my university."
                    className="textarea textarea-bordered w-full h-40"
                    required
                  />

                  <p className="label text-base-content/50">
                    Be clear about your lifestyle, preferences, and roommate
                    requirements.
                  </p>
                </fieldset>
              </div>

              {/* ================= PREVIEW ================= */}
              <div className="bg-base-200 rounded-2xl p-5 mb-8">
                <h3 className="font-bold text-lg mb-4">📌 Request Summary</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-base-content/60">
                      Preferred Location
                    </p>

                    <p className="font-semibold">
                      {preferredLocation || "Not selected"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-base-content/60">Budget</p>

                    <p className="font-semibold">
                      {budgetMin && budgetMax
                        ? `৳${budgetMin} - ৳${budgetMax}`
                        : "Not selected"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-base-content/60">
                      Room Category
                    </p>

                    <p className="font-semibold capitalize">
                      {preferredCategory || "Not selected"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-base-content/60">
                      Request Status
                    </p>

                    <span className="badge badge-success">Active</span>
                  </div>
                </div>
              </div>

              {/* ================= BUTTONS ================= */}
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPreferredLocation("");
                    setBudgetMin("");
                    setBudgetMax("");
                    setPreferredCategory("");
                    setDescription("");
                  }}
                  className="btn btn-outline"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary px-8"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Submitting...
                    </>
                  ) : (
                    <>👥 Create Roommate Request</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ================= INFO ================= */}
        <div className="alert alert-info mt-6 shadow-sm">
          <span className="text-xl">💡</span>

          <div>
            <h3 className="font-bold">How it works</h3>

            <p className="text-sm">
              Submit your requirements and other users can find your active
              roommate request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoometRequest;
