
import BaseUrl from "../service/BaseUrl";
import toast from "react-hot-toast";

const DeleteRoom = ({ roomId, onDelete }) => {

  const handleDelete = async () => {
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

      toast.success("Room deleted successfully!");

      // Parent component থেকে room remove করার জন্য
      if (onDelete) {
        onDelete(roomId);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-sm btn-error"
    >
      Delete
    </button>
  );
};

export default DeleteRoom;

