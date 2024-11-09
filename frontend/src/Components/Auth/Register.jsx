import styled, { keyframes } from "styled-components";
import React, { useState } from "react";
//import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import image from "../../img/image.png";

const Navbar = () => {
  return (
    <NavbarStyled>
      <div className="navbar-container">
        <div className="logo">
          <img src={image} alt="App Logo" />
          <span className="app-title">Expense Tracker</span>
        </div>
        <div className="auth-buttons">
          <a href="https://mr-expense-tracker.vercel.app/">
            <button className="signup-btn">Login</button>{" "}
          </a>
          <button className="login-btn">Sign Up</button>
        </div>
      </div>
    </NavbarStyled>
  );
};

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
          "https://expense-tracker-1-itao.onrender.com/api/v1/data-api",
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }
        );

        console.log("Successfully sent !!!", response);
        toast.success("Successfully Registered!");
        //navigate("/"); // Redirect to login page after successful registration
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  return (
    <>
      <Navbar />
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
            <ToastContainer />
            <a
              href="https://mr-expense-tracker.vercel.app/"
              style={{
                textDecoration: "none",
                color: "white",
                paddingLeft: "10px",
                fontSize: "18px",
              }}
            >
              Have an account?{" "}
              <span className="f" style={{ fontWeight: "bold" }}>
                Log In
              </span>
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

const NavbarStyled = styled.nav`
  width: 100%;
  background: #333;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 25px;
      }

      .app-title {
        font-size: 1.5rem;
        font-weight: bold;
        color: #fff;
      }
    }

    .auth-buttons {
      display: flex;
      gap: 1rem;

      .login-btn,
      .signup-btn {
        background-color: transparent;
        border: 1px solid #fff;
        border-radius: 20px;
        color: #fff;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;

        &:hover {
          background-color: #fff;
          color: #333;
        }
      }
    }
  }
`;

const RegisterStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f2f2;

  .f {
    &:hover {
      color: black;
    }
  }

  .Register {
    padding: 2rem;
    width: 400px;
    background: linear-gradient(145deg, #f7d4e6, #faafd5);
    box-shadow: 0 0 15px 4px;
    border-radius: 25px;
    animation: ${fadeIn} 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    margin-top: -60px;

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
