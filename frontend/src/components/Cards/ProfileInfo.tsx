import React from "react";
import { getInitials } from "../../utilis/helper";

interface ProfileInfoProps {
  onLogout: () => void;
}
const ProfileInfo: React.FC<ProfileInfoProps> = ({ onLogout }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-500 font-medium bg-slate-100">
        {getInitials("Diwan Malla")}
      </div>
      <div>
        <p className="text-sm font-medium">Diwan Malla</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
