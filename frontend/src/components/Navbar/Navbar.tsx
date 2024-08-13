import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import React, { useState } from "react";

interface NavbarProp {
  userInfo: { fullName: string } | null;
  onSearchNote: (searchQuery: string) => void;
  AllNotes: () => void;
}
const Navbar: React.FC<NavbarProp> = ({ userInfo, onSearchNote, AllNotes }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };
  const onClearSearch = () => {
    setSearchQuery("");
    AllNotes();
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
        <ProfileInfo onLogout={onLogout} userInfo={userInfo} />
      </div>
    </div>
  );
};

export default Navbar;
