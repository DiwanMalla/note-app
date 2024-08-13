import React from "react";
import { getInitials } from "../../utilis/helper";

interface ProfileInfoProps {
  userInfo: { fullName: string };
  onLogout: () => void;
}
const ProfileInfo: React.FC<ProfileInfoProps> = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className="flex justify-center items-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-500 font-medium bg-slate-100">
          {getInitials(userInfo.fullName)}
        </div>
        <div>
          <p className="text-sm font-medium">{userInfo.fullName}</p>
          <button
            className="text-sm text-slate-700 underline"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;
