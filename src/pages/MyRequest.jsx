import { useContext, useEffect, useState } from "react";
import BaseUrl from "../service/BaseUrl";
import { AuthContext } from "../Context/AuthProvider";
import toast from "react-hot-toast";

const MyRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const { accessToken } = useContext(AuthContext);

  const fetchMyRequests = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BaseUrl}/roommate/my`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.detail || "Failed to load roommate requests");
        return;
      }

      setRequests(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchMyRequests();
    }
  }, [accessToken]);

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary text-primary-content flex items-center justify-center text-2xl">
              👥
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                My Roommate Requests
              </h1>

              <p className="text-gray-500 mt-1">
                Manage your roommate searching requests
              </p>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* Empty */}
        {!loading && requests.length === 0 && (
          <div className="card bg-base-100 shadow-md">
            <div className="card-body items-center text-center py-16">

              <div className="text-6xl mb-4">
                👥
              </div>

              <h2 className="text-2xl font-bold">
                No Roommate Requests
              </h2>

              <p className="text-gray-500 max-w-md">
                You haven't created any roommate request yet.
                Create a request to find a suitable roommate.
              </p>

              <button
                className="btn btn-primary mt-4"
                onClick={() =>
                  window.location.href = "/roommate/request"
                }
              >
                + Create Request
              </button>

            </div>
          </div>
        )}

        {/* Request Cards */}
        {!loading && requests.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {requests.map((request) => (
              <div
                key={request.id}
                className="card bg-base-100 shadow-md hover:shadow-xl transition"
              >
                <div className="card-body">

                  {/* Top */}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">
                        Request ID
                      </p>

                      <h2 className="text-xl font-bold">
                        #{request.id}
                      </h2>
                    </div>

                    <span
                      className={`badge ${
                        request.status === "active"
                          ? "badge-success"
                          : request.status === "matched"
                          ? "badge-info"
                          : "badge-error"
                      }`}
                    >
                      {request.status || "active"}
                    </span>
                  </div>

                  <div className="divider my-2"></div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="text-xl">📍</div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Preferred Location
                      </p>

                      <p className="font-semibold">
                        {request.preferred_location}
                      </p>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="flex items-start gap-3 mt-4">
                    <div className="text-xl">💰</div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Monthly Budget
                      </p>

                      <p className="font-semibold">
                        ৳{request.budget_min} - ৳{request.budget_max}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex items-start gap-3 mt-4">
                    <div className="text-xl">🏠</div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Preferred Category
                      </p>

                      <span className="badge badge-outline mt-1">
                        {request.preferred_category}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-5">
                    <p className="text-xs text-gray-500 mb-1">
                      Description
                    </p>

                    <p className="text-sm text-gray-600 line-clamp-3">
                      {request.description || "No description provided"}
                    </p>
                  </div>

                  {/* Date */}
                  {request.created_at && (
                    <div className="mt-4 text-xs text-gray-400">
                      Created:{" "}
                      {new Date(
                        request.created_at
                      ).toLocaleDateString()}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="card-actions justify-end mt-5">

                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() =>
                        window.location.href =
                          `/roommate/edit/${request.id}`
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button className="btn btn-primary btn-sm">
                      View
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyRequest;