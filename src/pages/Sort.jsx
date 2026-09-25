import { useState } from "react";
import BaseUrl from "../service/BaseUrl";
import toast from "react-hot-toast";

const Sort = () => {
  const [sortedBy, setSortedBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSort = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${BaseUrl}/rooms/sort?sorted_by=${sortedBy}&order=${order}`
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.detail || "Failed to sort rooms");
        return;
      }

      setRooms(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Sort Rooms
          </h1>

          <p className="text-gray-500 mt-1">
            Sort available rooms by rent, title, date or available seats.
          </p>
        </div>

        {/* Sort Box */}
        <div className="card bg-base-100 shadow-md mb-8">
          <div className="card-body">

            <h2 className="card-title mb-4">
              🔽 Sort Options
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Sort By */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Sort By
                  </span>
                </label>

                <select
                  value={sortedBy}
                  onChange={(e) => setSortedBy(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="created_at">
                    Created Date
                  </option>

                  <option value="rent">
                    Rent
                  </option>

                  <option value="title">
                    Title
                  </option>

                  <option value="available_seats">
                    Available Seats
                  </option>
                </select>
              </div>

              {/* Order */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Order
                  </span>
                </label>

                <select
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="asc">
                    Ascending
                  </option>

                  <option value="desc">
                    Descending
                  </option>
                </select>
              </div>

              {/* Button */}
              <div className="flex items-end">
                <button
                  onClick={handleSort}
                  disabled={loading}
                  className="btn btn-primary w-full"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Sorting...
                    </>
                  ) : (
                    "🔍 Sort Rooms"
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Result */}
        {rooms.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">
                Room Results
              </h2>

              <span className="badge badge-primary">
                {rooms.length} Rooms
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="card bg-base-100 shadow-md hover:shadow-xl transition"
                >

                  {/* Image */}
                  {room.cover_image ? (
                    <figure>
                      <img
                        src={room.cover_image}
                        alt={room.title}
                        className="w-full h-48 object-cover"
                      />
                    </figure>
                  ) : (
                    <div className="h-48 bg-base-300 flex items-center justify-center text-5xl">
                      🏠
                    </div>
                  )}

                  <div className="card-body">

                    {/* Title */}
                    <div className="flex justify-between items-start gap-2">
                      <h2 className="card-title">
                        {room.title}
                      </h2>

                      <span className="badge badge-outline">
                        {room.category}
                      </span>
                    </div>

                    {/* Address */}
                    <p className="text-sm text-gray-500">
                      📍 {room.address}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {room.description}
                    </p>

                    <div className="divider my-1"></div>

                    {/* Rent */}
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Monthly Rent
                      </span>

                      <span className="font-bold text-primary">
                        ৳{room.rent}
                      </span>
                    </div>

                    {/* Seats */}
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Available Seats
                      </span>

                      <span className="font-semibold">
                        {room.available_seats}
                      </span>
                    </div>

                    {/* Room Size */}
                    {room.room_size && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Room Size
                        </span>

                        <span>
                          {room.room_size}
                        </span>
                      </div>
                    )}

                  </div>
                </div>
              ))}

            </div>
          </div>
        )}

        {/* No result */}
        {!loading && rooms.length === 0 && (
          <div className="card bg-base-100 shadow-md">
            <div className="card-body text-center py-12">

              <div className="text-5xl mb-3">
                🏠
              </div>

              <h2 className="text-xl font-bold">
                No Rooms Found
              </h2>

              <p className="text-gray-500">
                Select a sorting option and click "Sort Rooms".
              </p>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Sort;