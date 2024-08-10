import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const onLogout = () => {
    navigate("/login");
  };

  const handleSearch = () => {};
  const onClearSearch = () => {
    setSearchQuery("");
  };
  return (
    <div>
      <div className="bg-white drop-shadow flex justify-between px-6 py-5 items-center">
        <h2 className="text-xl font-medium">Notes</h2>

        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
        <ProfileInfo onLogout={onLogout} />
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
