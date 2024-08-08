import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utilis/helper";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name");
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
    }
    if (!password) {
      setError("Please enter the password");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl mb-7">Sign Up</h4>
            <input
              className="input-box"
              value={name}
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input-box"
              value={email}
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error ?? <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button className="w-full btn-primary">Create Account</button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="underline text-primary font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
