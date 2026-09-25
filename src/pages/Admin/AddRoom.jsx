import { useState } from "react";
import BaseUrl from "../../service/BaseUrl";
import toast from "react-hot-toast";

const AddRoom = () => {
  const [room, setRoom] = useState({
    title: "",
    category: "",
    description: "",
    rent: "",
    address: "",
    room_size: "",
    total_seats: 1,
    available_seats: 1,
    cover_image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRoom({
      ...room,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("hossing_tocken");

      const response = await fetch(`${BaseUrl}/admin/create_room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...room,
          rent: Number(room.rent),
          total_seats: Number(room.total_seats),
          available_seats: Number(room.available_seats),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to create room");
      }

      toast.success("Room added successfully!");

      setRoom({
        title: "",
        category: "",
        description: "",
        rent: "",
        address: "",
        room_size: "",
        total_seats: 1,
        available_seats: 1,
        cover_image: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Add New Room
          </h1>
          <p className="text-base-content/60 mt-1">
            Add a new room to the housing system
          </p>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Title + Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Room Title
                    </span>
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={room.title}
                    onChange={handleChange}
                    placeholder="Example: Beautiful Single Room"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Category
                    </span>
                  </label>

                  <select
                    name="category"
                    value={room.category}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="single">Single</option>
                    <option value="shared">Shared</option>
                    <option value="family">Family</option>
                  </select>
                </div>

              </div>

              {/* Description */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Description
                  </span>
                </label>

                <textarea
                  name="description"
                  value={room.description}
                  onChange={handleChange}
                  placeholder="Write details about the room..."
                  className="textarea textarea-bordered w-full h-32"
                  required
                />
              </div>

              {/* Rent + Room Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Monthly Rent
                    </span>
                  </label>

                  <input
                    type="number"
                    name="rent"
                    value={room.rent}
                    onChange={handleChange}
                    placeholder="5000"
                    min="0"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Room Size
                    </span>
                  </label>

                  <input
                    type="text"
                    name="room_size"
                    value={room.room_size}
                    onChange={handleChange}
                    placeholder="Example: 1200 sq ft"
                    className="input input-bordered w-full"
                  />
                </div>

              </div>

              {/* Address */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Address
                  </span>
                </label>

                <input
                  type="text"
                  name="address"
                  value={room.address}
                  onChange={handleChange}
                  placeholder="Example: Mirpur, Dhaka"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Seats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Total Seats
                    </span>
                  </label>

                  <input
                    type="number"
                    name="total_seats"
                    value={room.total_seats}
                    onChange={handleChange}
                    min="1"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Available Seats
                    </span>
                  </label>

                  <input
                    type="number"
                    name="available_seats"
                    value={room.available_seats}
                    onChange={handleChange}
                    min="0"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

              </div>

              {/* Cover Image */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Cover Image URL
                  </span>
                </label>

                <input
                  type="url"
                  name="cover_image"
                  value={room.cover_image}
                  onChange={handleChange}
                  placeholder="https://example.com/room.jpg"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Preview */}
              {room.cover_image && (
                <div className="mt-3">
                  <p className="font-semibold mb-2">
                    Image Preview
                  </p>

                  <img
                    src={room.cover_image}
                    alt="Room Preview"
                    className="w-full h-56 object-cover rounded-xl border"
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={() =>
                    setRoom({
                      title: "",
                      category: "",
                      description: "",
                      rent: "",
                      address: "",
                      room_size: "",
                      total_seats: 1,
                      available_seats: 1,
                      cover_image: "",
                    })
                  }
                  className="btn btn-outline"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  className="btn btn-primary px-8"
                >
                  Add Room
                </button>

              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;

