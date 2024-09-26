import React, { useState } from "react";
import { employeeData } from "../../constants/employeeData";
import { useUser } from "../../context/userContext";
import { Logo } from "../../assets";
import { LogoIcon } from "../../assets";

const Signin = () => {
  const { handleSignin } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    const user = employeeData.find(
      (employee) => employee.empEmail === email && employee.empRole === password
    );
    if (user) {
      handleSignin(user);
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-[1rem]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${Logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
          zIndex: -1,
        }}
      ></div>

      <div className="bg-transparent w-full max-w-md mx-auto rounded-xl p-4">
        <div className="flex justify-center mb-4 font-title text-xl text-[#EDF6FF]">
          <h2>Signin</h2>
        </div>

        <div className="flex flex-col gap-4 text-[#EDF6FF]">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-md border-2 border-[#555555] bg-transparent focus:border-[#D7AE83] outline-none placeholder-[#999999]"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-md border-2 border-[#555555] bg-transparent focus:border-[#D7AE83] outline-none placeholder-[#999999]"
          />
        </div>
        <button
          onClick={handleSignIn}
          className="mt-6 px-4 py-2  bg-transparent border-2 border-[#555555] hover:border-[#D7AE83] w-full rounded-md text-[#EDF6FF]"
        >
          Signin
        </button>
      </div>
    </div>
  );
};

export default Signin;
