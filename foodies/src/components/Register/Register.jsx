import React, {useState} from "react";
import "./Register.css";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../../service/authService.js";

const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({
            ...data,
            [name]: value
        }));
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try{
            const res = await registerUser(data);
            if(res.status === 201){
                navigate("/login");
                toast.success("Registration Successful. Please Login.");
            } else{
                toast.error("Registration Failed. Please try again.");
            }
        } catch (error){
            toast.error('Unable to Register. Please try again.');
        }
    }
  return (
      <div className="container">
          <div className="row">
              <div className="col-lg-10 col-xl-9 mx-auto">
                  <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                      <div className="card-body p-4 p-sm-5">
                          <h5 className="card-title text-center mb-5 fw-light fs-5">Register</h5>
                          <form onSubmit={onSubmitHandler}>

                              <div className="form-floating mb-3">
                                  <input type="text" className="form-control" id="floatingInputUsername"
                                         placeholder="myusername" required name="name" onChange={onChangeHandler} value={data.name}
                                         autoFocus/>
                                  <label htmlFor="floatingInputUsername">Full Name</label>
                              </div>

                              <div className="form-floating mb-3">
                                  <input type="email" className="form-control" id="floatingInputEmail"
                                         placeholder="name@example.com" required name="email" onChange={onChangeHandler} value={data.email}/>
                                  <label htmlFor="floatingInputEmail">Email address</label>
                              </div>

                              <hr/>

                              <div className="form-floating mb-3">
                                  <input type="password" className="form-control" id="floatingPassword"
                                         placeholder="Password" name="password" onChange={onChangeHandler} value={data.password} required/>
                                  <label htmlFor="floatingPassword">Password</label>
                              </div>

                              <div className="d-grid mb-2">
                                  <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                                          type="submit">Register
                                  </button>
                              </div>

                              <div className="d-block text-center mt-2 small" href="#">Have an account? <a href="/login"> Sign In </a> </div>

                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Register;