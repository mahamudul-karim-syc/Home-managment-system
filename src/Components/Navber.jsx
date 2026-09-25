
import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthProvider";

const Navber = () => {
  const { authuser, logout } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-sm">

      {/* Mobile Menu */}
      <input
        id="navbar-1-toggle"
        className="peer hidden"
        type="checkbox"
      />

      <label
        htmlFor="navbar-1-toggle"
        className="fixed inset-0 hidden max-lg:peer-checked:block"
      ></label>

      <div className="collapse-title navbar">

        {/* Logo + Mobile Button */}
        <div className="navbar-start">

          <label
            htmlFor="navbar-1-toggle"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          <Link to="/Home" className="btn btn-ghost text-xl">
            🏠 HousingMate
          </Link>

        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">

          <ul className="menu menu-horizontal px-1">

            <li>
              <Link to="/Home">
                Home
              </Link>
            </li>

            <li>
              <Link to="/rooms">
                Rooms
              </Link>
            </li>

            {/* Admin Dashboard */}
            {authuser?.role === "admin" && (
              <li>
                <Link to="/admin">
                  Admin Dashboard
                </Link>
              </li>
            )}

            {/* Find Roommate */}
            {authuser && (
              <li>
                <Link to="/RoomtRequest">
                  Find Roommate
                </Link>
              </li>
            )}

            {/* My Activity */}
            {authuser && (
              <li>
                <details>

                  <summary>
                    My Activity
                  </summary>

                  <ul className="p-2 bg-base-100 w-44 z-10">

                    <li>
                      <Link to="/profile">
                        About
                      </Link>
                    </li>

                    <li>
                      <Link to="/reserved">
                        My Bookings
                      </Link>
                    </li>

                    <li>
                      <Link to="/roomentmy">
                        My Requests
                      </Link>
                    </li>

                    <li>
                      <Link to="/payment">
                        My Payments
                      </Link>
                    </li>

                    <li>
                      <Link to="/review">
                        Review
                      </Link>
                    </li>

                  </ul>

                </details>
              </li>
            )}

            <li>
              <Link to="/sort">
                Sort
              </Link>
            </li>

          </ul>

        </div>

        {/* Right Side */}
        <div className="navbar-end gap-2">

          <input
            type="text"
            placeholder="Search rooms..."
            className="input input-bordered w-40 lg:w-52"
          />

          {authuser ? (
            <button
              onClick={logout}
              className="btn btn-primary"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/Login"
              className="btn btn-primary"
            >
              Login
            </Link>
          )}

        </div>

      </div>
    </div>
  );
};

export default Navber;
