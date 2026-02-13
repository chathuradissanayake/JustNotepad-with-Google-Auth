import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

const Home = ({ setUser }) => {
  const handleLoginSuccess = (credentialResponse) => {
    // credentialResponse.credential is the JWT token
    const decoded = jwtDecode(credentialResponse.credential);

    // decoded contains { email, name, picture, sub (id) }
    console.log(decoded);
    setUser(decoded); // store user in state
    localStorage.setItem("user", JSON.stringify(decoded));
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-cyan-50 via-teal-50 to-blue-50">
      <h1 className="text-4xl font-bold mb-8">Welcome to Just Notepad</h1>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </div>
  );
};

export default Home;
