import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/login`;
      const result = await axios.post(url, user);
      setUser(result.data);
      Navigate("/");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="form-container-wrapper"> {/* Add this wrapper */}
      <div className="auth-form-box"> {/* Add this class for box styling */}
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Added class for error message styling */}
        <p>
          <input
            type="email" // Use type="email" for consistency
            placeholder="Email Address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </p>
        <button onClick={handleSubmit}>Submit</button>
        <hr />
        <Link to="/register" className="auth-link">Create Account</Link> {/* Added class for consistent link styling */}
      </div>
    </div>
  );
}