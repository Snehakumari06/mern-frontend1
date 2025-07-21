import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import "./Register.css"; // Ensure this line is removed as we're using style.css

export default function Register() {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/register`;
      const result = await axios.post(url, user);
      setError("Data saved successfully");
      Navigate("/login");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="form-container-wrapper"> {/* This wrapper helps center the entire box on the page */}
      <div className="auth-form-box"> {/* This is the main class for the box styling */}
        <h2>Registration Form</h2>
        {error && <p className="error-message">{error}</p>} {/* Added class for error message styling */}
        <p>
          <input
            type="text"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            placeholder="Enter First Name"
            required
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Enter Last Name"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            required
          />
        </p>
        <p>
          <input
            type="email" // Use type="email" for better validation
            placeholder="Enter Email Address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </p>
        {/* The button styling will be applied via the general 'form button' rule in style.css */}
        <button onClick={handleSubmit}>Register</button>
        <hr />
        <Link to="/login" className="auth-link">Already a member? Login Here...</Link> {/* Added class for consistent link styling */}
      </div>
    </div>
  );
}

// export default function Register() {
//   const firstName = useRef();
//   const lastName = useRef();
//   const email = useRef();
//   const password = useRef();
//   const handleSubmit = () => {
//     const user = {
//       firstName: firstName.current.value,
//       lastName: lastName.current.value,
//       email: email.current.value,
//       password: password.current.value,
//     };
//     console.log(user);
//   };
//   return (
//     <div className="App-Register-Row">
//       <div style={{ backgroundColor: "white" }}>
//         <h2>Registration Form</h2>
//         <p>
//           <input type="text" placeholder="Enter First Name" ref={firstName} />
//         </p>
//         <p>
//           <input type="text" placeholder="Enter Last Name" ref={lastName} />
//         </p>
//         <p>
//           <input type="text" placeholder="Enter Email Address" ref={email} />
//         </p>
//         <p>
//           <input type="password" placeholder="Enter Password" ref={password} />
//         </p>
//         <p>
//           <button onClick={handleSubmit}>Submit</button>
//         </p>
//       </div>
//     </div>
//   );
// }
