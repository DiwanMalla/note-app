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
    <div className="bg-white shadow-md flex flex-col md:flex-row md:justify-between px-4 md:px-6 py-3 md:py-5 items-center">
      <h2 className="text-xl font-semibold">Notes</h2>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mt-3 md:mt-0">
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
