import { ChangeEvent, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface PasswordInput {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
const PasswordInput: React.FC<PasswordInput> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        className="w-full text-sm py-3 mr-3 rounded outline-none"
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
      />
      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-primary cursor-pointer"
          onClick={() => togglePassword()}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={() => togglePassword()}
        />
      )}
    </div>
  );
};

export default PasswordInput;
