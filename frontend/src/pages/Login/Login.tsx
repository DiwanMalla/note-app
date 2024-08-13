import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { SetStateAction, useState } from "react";
import { validateEmail } from "../../utilis/helper";
import axiosInstance from "../../utilis/axiosInstance";
import { AxiosError } from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    //Login API call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      //handle succesful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Unexpected error occured. Please try again");
        }
      }
    }
  };
  return (
    <>
      <Navbar userInfo={null} onSearchNote={() => {}} AllNotes={() => {}} />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded px-7 py-10 bg-white">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="email"
              value={email}
              placeholder="Email"
              className="input-box"
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setPassword(e.target.value)
              }
              placeholder={`Password`}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button className="btn-primary">Login</button>
            <p className="text-sm text-center mt-4">
              Not registered yet?
              <Link
                to={"/signup"}
                className="font-medium underline text-primary hover:text-blue-600 mx-2"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
