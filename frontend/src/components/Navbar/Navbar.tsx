import ProfileInfo from "../Cards/ProfileInfo";

const Navbar = () => {
  return (
    <div>
      <div className="bg-white drop-shadow flex justify-between px-6 py-5 items-center">
        <h2 className="text-xl font-medium">Notes</h2>
        <ProfileInfo />
      </div>
      <p className="text-center text-3xl py-6">
        Page is under development. Keep checking for an update.
        <br />
        Thanks
      </p>
    </div>
  );
};

export default Navbar;
