import styled, { keyframes } from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
          <button className="login-btn">Login</button>
          <a href="/register">
            <button className="signup-btn">Sign UP</button>{" "}
          </a>
        </div>
      </div>
    </NavbarStyled>
  );
};

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

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        "https://expense-tracker-1-itao.onrender.com/api/v1/data-login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 200) {
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
    }
  };

  return (
    <>
      <Navbar />
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
              href="/register"
              style={{
                textDecoration: "none",
                color: "white",
                paddingLeft: "10px",
                fontSize: "18px",
              }}
            >
              Don't have an account?{" "}
              <span className="f" style={{ fontWeight: "bold" }}>
                Sign Up
              </span>
            </a>
            <p>or you can sign in with</p>
            <div className="social-login">
              <button className="social-icon google">
                <i className="fa-brands fa-google"></i>
              </button>
              <button className="social-icon facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </button>
              <a
                href="https://github.com/mathav-ramalingam/Expense_Tracker.git"
                className="social-icon github"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </form>
        </div>
      </LoginStyled>
    </>
  );
};

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

const LoginStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f2f2;
  box-shadow: 10px 4px 10px red;

  .login-container {
    width: 400px;
    background: linear-gradient(145deg, #f7d4e6, #faafd5);
    padding: 2rem;
    border-radius: 25px;
    box-shadow: 0 0 15px 4px;
    text-align: center;
    animation: ${fadeIn} 0.5s ease-in-out;
    margin-top: -70px;

    h2 {
      color: black;
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
        margin: 0;
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
