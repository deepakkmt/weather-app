import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  let handlechange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...FormData,
      [name]: value,
    });
  };

  let handlesubmit = async (e) => {
    e.preventDefault();

    // validation
    if (
      !FormData.name ||
      !FormData.email ||
      !FormData.password ||
      !FormData.confirmpassword
    ) {
      setError("All fields are required");
      return;
    }

    if (FormData.password !== FormData.confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        {
          name: FormData.name,
          email: FormData.email,
          password: FormData.password,
          confirmpassword: FormData.confirmpassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Signup successful! Redirecting...");
      setError("");

      setTimeout(() => {
        navigate("/signin");
      }, 1500);

    } catch (error) {
      setError(
        error.response?.data?.message || "Signup Failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row vh-100">
        <div className="col-6">
          <img
            src="/images/image.png"
            alt="weather-pic"
            className="left_img"
          />
        </div>

        <div className="col-6">
          <div className="container scale-container">
            <div className="row justify-content-center align-items-center vh-100">
              <div>
                <div className="card shadow-lg border-0 rounded-4">
                  <div className="card-body p-4">

                    <h3 className="text-center mb-4">
                      Create Account
                    </h3>

                    {error && (
                      <div className="alert alert-danger">
                        {error}
                      </div>
                    )}

                    {success && (
                      <div className="alert alert-success">
                        {success}
                      </div>
                    )}

                    <form onSubmit={handlesubmit}>

                      <div className="mb-3">
                        <label className="form-label">
                          Full Name
                        </label>
                        <input
                          name="name"
                          type="text"
                          className="form-control"
                          onChange={handlechange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Email address
                        </label>
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          onChange={handlechange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          onChange={handlechange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="confirmpassword"
                          className="form-control"
                          onChange={handlechange}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                      >
                        Sign Up
                      </button>

                      <p className="text-center mt-3">
                        Already have an account?{" "}
                        <Link
                          to="/signin"
                          className="text-decoration-none"
                        >
                          Login
                        </Link>
                      </p>

                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;
