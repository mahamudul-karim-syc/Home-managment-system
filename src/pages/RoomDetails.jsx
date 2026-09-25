import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import BaseUrl from "../service/BaseUrl";
import { AuthContext } from "../Context/AuthProvider";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roomdetails, setRoomdetails] = useState(null);
  const { accessToken } = useContext(AuthContext);

  // Get Room Details
  useEffect(() => {
    if (!id) return;

    const fetchRoomDetails = async () => {
      try {
        const res = await fetch(`${BaseUrl}/room/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.detail || "Room not found");
          return;
        }

        setRoomdetails(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load room details");
      }
    };

    fetchRoomDetails();
  }, [id, accessToken]);

  // Reserve Room
  const handleReserve = async () => {
    if (!accessToken) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await fetch(`${BaseUrl}/reserved/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Room reserved successfully");

        navigate("/myreserved");
      } else {
        toast.error(data.detail || "Reservation failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100 mt-6">
      <div className="flex flex-col gap-4">
        {/* Room Image */}
        <figure className="h-56 bg-base-200 flex items-center justify-center rounded-lg overflow-hidden">
          {roomdetails?.cover_image ? (
            <img
              src={roomdetails.cover_image}
              alt={roomdetails.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-8xl font-bold text-gray-400">
              {roomdetails?.title?.charAt(0) || "R"}
            </div>
          )}
        </figure>

        {/* Title & Category */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              {roomdetails?.category || "Loading..."}
            </span>

            <h1 className="text-2xl font-bold text-gray-900 mt-2">
              {roomdetails?.title || "Loading title..."}
            </h1>

            <p className="text-sm text-gray-600 mt-1">
              📍 {roomdetails?.address || "Unknown address"}
            </p>
          </div>

          {/* Rent */}
          <div className="text-right">
            <span className="text-xl font-bold text-gray-900">
              ৳{roomdetails?.rent ?? 0}
            </span>

            <p className="text-xs text-gray-500">per month</p>
          </div>
        </div>

        <hr className="border-gray-100 my-2" />

        {/* Description */}
        <div>
          <h3 className="text-sm font-medium text-gray-700">Description</h3>

          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
            {roomdetails?.description || "Loading description..."}
          </p>
        </div>

        {/* Room Information */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          {/* Room Size */}
          <div>
            <span className="text-xs text-gray-500 block">Room Size</span>

            <span className="text-lg font-semibold text-gray-800">
              {roomdetails?.room_size || "N/A"}
            </span>
          </div>

          {/* Available Seats */}
          <div>
            <span className="text-xs text-gray-500 block">Available Seats</span>

            <span className="text-lg font-semibold text-gray-800">
              {roomdetails?.available_seats ?? 0}

              <span className="text-xs text-gray-400 font-normal">
                {" "}
                / {roomdetails?.total_seats ?? 0}
              </span>
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="text-xs text-gray-500 block">Status</span>

          <span
            className={`text-sm font-semibold ${
              roomdetails?.available_seats > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {roomdetails?.available_seats > 0
              ? "Available"
              : "No Seat Available"}
          </span>
        </div>
    
        {/* Reserve Button */}
        <div className="pt-4">
          <Link
            to={"/reserved"}
            onClick={handleReserve}
            disabled={!roomdetails || roomdetails.available_seats <= 0}
            className="btn btn-primary w-full text-white font-semibold rounded-lg shadow-sm hover:scale-[1.02] transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🏠 Reserve Room
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
