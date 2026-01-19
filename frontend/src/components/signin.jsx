import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {

  const navigate = useNavigate();  

  const [Formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  let handlechange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...Formdata,
      [name]: value,
    });
  };

  let handlesubmit = async (e) => {
    e.preventDefault();

    if (!Formdata.email || !Formdata.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          email: Formdata.email,
          password: Formdata.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");   

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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

                    <h3 className="text-center mb-4">Sign In</h3>

                    {error && (
                      <div className="alert alert-danger">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handlesubmit}>

                      <div className="mb-3">
                        <label className="form-label">
                          Email address
                        </label>

                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          onChange={handlechange}
                          required
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
                          placeholder="Enter password"
                          onChange={handlechange}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                      >
                        Sign-in
                      </button>

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

export default Signin;
