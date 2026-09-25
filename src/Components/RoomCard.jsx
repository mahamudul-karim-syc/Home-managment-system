
import { Link } from "react-router";

const RoomCard = ({ room }) => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">

      {/* Cover Image / First Letter */}
      <figure className="h-56 bg-base-200 flex items-center justify-center">
        {room.cover_image ? (
          <img
            src={room.cover_image}
            alt={room.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-8xl font-bold">
            {room.title?.charAt(0)}
          </div>
        )}
      </figure>

      <div className="card-body">

        {/* Title + Category */}
        <div className="flex justify-between items-start gap-2">
          <h2 className="card-title">{room.title}</h2>

          <span className="badge badge-primary">
            {room.category}
          </span>
        </div>

        {/* Address */}
        <p className="text-sm text-base-content/70">
          📍 {room.address}
        </p>
        {/* Details Button */}
        <div className="flex card-actions justify-end mt-2">
          <Link to={`/details/${room.id}`}>
            <button className="btn btn-primary">
              Details
            </button>
            </Link>
            <button className="btn btn-primary">
              
                 <Link to={'/reviemy'}>Review</Link>
            </button>
         
        </div>

      </div>
    </div>
  );
};

export default RoomCard;

