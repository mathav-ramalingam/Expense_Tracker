import styled, { keyframes } from "styled-components";
import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

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
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Register</button>
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

  .Register {
    padding: 2rem 1.5rem;
    width: 400px;
    background: rgba(252, 226, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    animation: ${fadeIn} 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    h2 {
      color: rgba(34, 34, 96, 1);
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      label {
        color: rgba(34, 34, 96, 0.8);
      }

      input {
        padding: 0.75rem;
        border-radius: 8px;
        border: 2px solid rgba(34, 34, 96, 0.1);
        outline: none;
        transition: all 0.3s ease;

        &:focus {
          border-color: rgba(34, 34, 96, 0.6);
        }
      }

      .error {
        color: red;
        text-align: center;
        font-weight: bold;
      }

      button {
        padding: 0.75rem;
        background-color: #222260;
        color: #fff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #1a1a50;
        }
      }
    }
  }
`;

export default RegisterForm;
