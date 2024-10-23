import styled, { keyframes } from "styled-components";
import React, { useState } from "react";
//import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  //const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
    } else {
      setError("");
      try {
        const response = await axios.post(
          "http://localhost:5050/api/v1/data-api",
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }
        );

        console.log("Successfully sent !!!", response);
        toast.success("Successfully Registered!")
        //navigate("/"); // Redirect to login page after successful registration
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  return (
    <RegisterStyled>
      <div className="Register">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Register</button>
          <ToastContainer   />
          <a
            href="http://localhost:3000/"
            style={{
              textDecoration: "none",
              color: "white",
              paddingLeft: "10px",
              fontSize: "18px"
            }}
          >
            Have an account?{" "}
            <span className="f" style={{ fontWeight: "bold" }}>Log In</span>
          </a>
          <p>or you can sign in with</p>
          <div className="social-login">
            <button className="social-icon google">
              <i class="fa-brands fa-google"></i>
            </button>
            <button className="social-icon facebook">
              <i class="fa-brands fa-facebook-f"></i>
            </button>
            <a
              href="https://github.com/mathav-ramalingam/Expense_Tracker.git"
              className="social-icon github"
            >
              <i class="fa-brands fa-github"></i>
            </a>
          </div>
        </form>
      </div>
    </RegisterStyled>
  );
};

// Animation for smooth entrance
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const RegisterStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f2f2;

  .f{
    &:hover
    {
     color:black;
    }
  }

  .Register {
    padding: 2rem;
    width: 400px;
    background: linear-gradient(145deg, #F7D4E6, #FAAFD5);
    box-shadow: 0 0 15px 4px ;
    border-radius: 25px;
    animation: ${fadeIn} 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;

    h2 {
      color: black;
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      input {
        padding: 1rem;
        border-radius: 50px;
        border: none;
        font-size: 1rem;
        width: 100%;
        box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.1);
      }

      .error {
        color: red;
        text-align: center;
        font-weight: bold;
      }

      button {
        padding: 1rem;
        background-color: #27ae60;
        color: white;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.3s ease;

        &:hover {
          background-color: #2ecc71;
        }
      }
    }

    p {
      color: white;
      margin: 0rem 0;
    }

    .social-login {
      display: flex;
      justify-content: center;
      gap: 1rem;

      .social-icon {
        background-color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease;

        &:hover {
          background-color: rgba(255, 255, 255, 0.8);
        }
      }

      .google {
        color: black;
      }

      .facebook {
        color: black;
      }

      .github {
        color: black;
      }
    }
  }
`;

export default RegisterForm;
