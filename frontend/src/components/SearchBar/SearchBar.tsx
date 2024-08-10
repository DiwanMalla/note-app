import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  onClearSearch: () => void;
}
const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  handleSearch,
  onClearSearch,
}) => {
  return (
    <div className="flex w-80 items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-black"
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass
        className="text-slate-400 hover:text-black cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
