
import { useEffect, useState } from "react";
import BaseUrl from "../service/BaseUrl";
import RoomCard from "./RoomCard";

const FetchRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`${BaseUrl}/rooms/all`)
      .then((res) => res.json())
       .then((data) => {setRooms(data);
   

      })
      .catch((error) => {
        console.error("Failed to fetch rooms:", error);
      });
  }, []);

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center py-5">
        Featured Rooms
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.slice(0, 6).map((room) => (
          <RoomCard
            room={room}
            key={room.id}
          />
        ))}

      </div>
    </div>
  );
};

export default FetchRooms;

