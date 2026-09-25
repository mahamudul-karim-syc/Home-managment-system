
const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside>
          <div className="text-3xl">🏠</div>

          <p className="text-xl font-bold">
            HousingMate
          </p>

          <p>
            Find your perfect room and roommate.
            <br />
            Comfortable living made simple.
          </p>
        </aside>

        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Browse Rooms</a>
          <a className="link link-hover">Find Roommate</a>
          <a className="link link-hover">My Bookings</a>
          <a className="link link-hover">Rent Payment</a>
        </nav>

        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms & Conditions</a>
        </nav>

        <nav>
          <h6 className="footer-title">Contact</h6>
          <p>📍 Dhaka, Bangladesh</p>
          <p>📧 support@housingmate.com</p>
          <p>📞 +880 1712-345678</p>
        </nav>
      </footer>

      <footer className="footer bg-base-300 text-base-content border-base-300 border-t px-10 py-4">
        <aside className="grid-flow-col items-center">
          <p>
            © {new Date().getFullYear()} HousingMate. All rights reserved.
          </p>
        </aside>

        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a className="link link-hover">Facebook</a>
            <a className="link link-hover">Instagram</a>
            <a className="link link-hover">GitHub</a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;

