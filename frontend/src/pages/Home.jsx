import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const Home = ({ setUser }) => {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleToken }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();

      // store backend JWT
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

    } catch (err) {
      console.error(err);
      alert("Login failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-cyan-50 via-teal-50 to-blue-50">
      <h1 className="text-4xl font-bold mb-8">Welcome to Just Notepad</h1>

      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => alert("Login Failed")}
      />
    </div>
  );
};

export default Home;
