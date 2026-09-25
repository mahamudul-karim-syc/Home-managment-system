import { useEffect, useState } from "react";
import BaseUrl from "../service/BaseUrl";
import RoomCard from "../Components/RoomCard";


const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    fetch(`${BaseUrl}/rooms/all`)
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 px-8 gap-12 py-3 m-5">
        {
        rooms.map((room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;