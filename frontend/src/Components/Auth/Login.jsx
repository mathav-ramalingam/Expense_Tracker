import styled, { keyframes } from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    // Validate email and password fields
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    try {
      // Send login request
      const response = await axios.post(
        "http://localhost:5050/api/v1/data-login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // Check if login was successful
      if (response.status === 200) {
        console.log("Successfully logged in", response.data);
        navigate("/dashboard", {
          state: {
            username: response.data.username,
            email: response.data.email,
          },
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Failed to log in. Please try again.");
      }
      console.log("Failed to log in", error);
    }
  };

  return (
    <>
    <LoginStyled>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          {error && <p className="error">{error}</p>}
          <button type="submit">Log In</button>
          <a
            href="http://localhost:3000/register"
            style={{
              textDecoration: "none",
              color: "white",
              paddingLeft: "10px",
              fontSize: "18px",
            }}
          >
            Don't have an account?{" "}
            <span className="f" style={{ fontWeight: "bold" }}>Sign Up</span>
          </a>
          <p>or you can sign in with</p>
          <div className="social-login">
            <button className="social-icon google"><i class="fa-brands fa-google"></i></button>
            <button className="social-icon facebook"><i class="fa-brands fa-facebook-f"></i></button>
            <a href="https://github.com/mathav-ramalingam/Expense_Tracker.git" className="social-icon github"><i class="fa-brands fa-github"></i></a>
          </div>
        </form>
      </div>
    </LoginStyled>
    </>
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

const LoginStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f2f2;
  box-shadow:  10px 4px 10px red;
  
  .f{
    &:hover
    {
     color:black;
    }
  }
  
  .login-container {
    width: 400px;
    background: linear-gradient(145deg, #F7D4E6, #FAAFD5);
    padding: 2rem;
    border-radius: 25px;
    box-shadow: 0 0 15px 4px ;
    text-align: center;
    animation: ${fadeIn} 0.5s ease-in-out;

    h2 {
      olor: black;
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      input {
        padding: 1rem;
        border-radius: 50px;
        border: none;
        box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.1);
        font-size: 1rem;
        width: 100%;
      }

      button[type="submit"] {
        padding: 1rem;
        background-color: #27ae60;
        color: white;
        border: none;
        border-radius: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background-color: #2ecc71;
        }
      }

      .error {
        color: red;
        text-align: center;
        font-weight: bold;
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
  }
`;

export default LoginForm;
