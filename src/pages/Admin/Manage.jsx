
import { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import BaseUrl from "../../service/BaseUrl";

const Manage = () => {
  const [rooms, setRooms] = useState([]);

  
  const FetchRoom = async () => {
    try {
      const token = localStorage.getItem("hossing_tocken");

      const response = await fetch(`${BaseUrl}/rooms/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to fetch rooms");
      }

      setRooms(
        Array.isArray(data)
          ? data
          : data.rooms || []
      );

    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    FetchRoom();
  }, []);

  // Delete room
  const handleDelete = async (roomId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("hossing_tocken");

      const response = await fetch(
        `${BaseUrl}/admin/delete_room/${roomId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to delete room"
        );
      }

      toast.success(
        data.message || "Room deleted successfully!"
      );

      setRooms((prevRooms) =>
        prevRooms.filter((room) => room.id !== roomId)
      );

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4 md:p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Manage Rooms
          </h1>

          <p className="text-base-content/60">
            Add, update and delete rooms
          </p>
        </div>

        <Link
          to="/admin/addroom"
          className="btn btn-primary"
        >
          + Add Room
        </Link>
      </div>

      {/* Empty State */}
      {rooms.length === 0 ? (
        <div className="card bg-base-100 shadow-md border border-base-300">

          <div className="card-body items-center text-center py-16">

            <h2 className="text-2xl font-semibold">
              No Rooms Found
            </h2>

            <p className="text-base-content/60">
              You haven't added any rooms yet.
            </p>

            <Link
              to="/admin/addroom"
              className="btn btn-primary mt-3"
            >
              Add Your First Room
            </Link>

          </div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-md border border-base-300">

          <table className="table">

            <thead>
              <tr>
                <th>#</th>
                <th>Room</th>
                <th>Category</th>
                <th>Rent</th>
                <th>Seats</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room, index) => (
                <tr key={room.id}>

                  <td>{index + 1}</td>

                  <td>
                    <div className="flex items-center gap-3">

                      <div className="avatar">
                        <div className="w-14 h-14 rounded-lg">

                          {room.cover_image ? (
                            <img
                              src={room.cover_image}
                              alt={room.title}
                            />
                          ) : (
                            <div className="w-full h-full bg-base-200 flex items-center justify-center text-2xl">
                              🏠
                            </div>
                          )}

                        </div>
                      </div>

                      <div>
                        <div className="font-bold">
                          {room.title}
                        </div>

                        <div className="text-sm opacity-60">
                          ID: {room.id}
                        </div>
                      </div>

                    </div>
                  </td>

                  <td>
                    <span className="badge badge-outline">
                      {room.category}
                    </span>
                  </td>

                  <td>
                    <span className="font-semibold">
                      ৳{room.rent}
                    </span>
                  </td>

                  <td>
                    {room.available_seats} / {room.total_seats}
                  </td>

                  <td>
                    {room.address}
                  </td>

                  <td>
                    <div className="flex gap-2">

                      <Link
                        to={`/admin/edit-room/${room.id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(room.id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default Manage;

