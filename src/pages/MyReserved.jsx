import { useContext, useEffect, useState } from "react";
import BaseUrl from "../service/BaseUrl";
import { AuthContext } from "../Context/AuthProvider";
import toast from "react-hot-toast";

const MyReserved = () => {
  const [myReserved, setMyReserved] = useState([]);
  const { accessToken } = useContext(AuthContext);
  const  handleCancel=async(id)=>{
    const res=await fetch(`${BaseUrl}/reservation/cancelled/${id}`,{
      method:"DELETE",
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
    })
    const data=await res.json()
     toast.success(data.message,'Here is your toast.');
     fachReserve()
   

  }
  const fachReserve=async()=>{
 await fetch(`${BaseUrl}/reservation/my`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMyReserved(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (!accessToken) return;
    fachReserve();
   
  }, [accessToken]);
  console.log(myReserved);
  return (
    <div className="min-h-screen bg-base-200 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Reserved Rooms
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track your reserved Rooms
          </p>
        </div>

        {/* Empty State */}
        {myReserved.length === 0 ? (
          <div className="card bg-base-100 shadow-md">
            <div className="card-body items-center text-center py-12">
              <div className="text-6xl mb-3">📚</div>

              <h2 className="text-xl font-bold text-gray-700">
                No Reservations Found
              </h2>

              <p className="text-gray-500">
                You haven't reserved any Rooms yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {myReserved.map((reservation) => (
              <div
                key={reservation.id}
                className="card bg-base-100 shadow-md border border-base-200 hover:shadow-xl transition duration-300"
              >
                <div className="card-body">
                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                        📖
                      </div>

                      <div>
                        <h2 className="font-bold text-lg">
                          Room #{reservation.room_id}
                        </h2>

                        <p className="text-sm text-gray-500">
                          Reservation #{reservation.id}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <span
                      className={`badge ${
                        reservation.status === "pending"
                          ? "badge-warning"
                          : reservation.status === "approved"
                            ? "badge-success"
                            : reservation.status === "rejected"
                              ? "badge-error"
                              : "badge-ghost"
                      }`}
                    >
                      {reservation.status}
                    </span>
                    <button
                      className="btn btn-error btn-sm text-white"
                      onClick={() => handleCancel(reservation.id)}
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="divider my-2"></div>

                  {/* Reservation Info */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500"> Room ID</span>
                      <span className="font-semibold">
                        {reservation.room_id}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">👤 User ID</span>
                      <span className="font-semibold">
                        {reservation.user_id}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">📅 Reserved Date</span>
                      <span className="font-medium text-sm">
                        {new Date(
                          reservation.reservation_date,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4">
                    {reservation.status === "pending" && (
                      <div className="alert alert-warning py-2">
                        <span className="text-sm">
                          ⏳ Your reservation is waiting for approval.
                        </span>
                      </div>
                    )}

                    {reservation.status === "rejected" && (
                      <div className="alert alert-error py-2">
                        <span className="text-sm">
                          ❌ Your reservation was rejected.
                        </span>
                      </div>
                    )}
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

export default MyReserved;