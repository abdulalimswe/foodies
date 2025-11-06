import React, {useContext} from "react";
import "./Login.css";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../../service/authService.js";
import {toast} from "react-toastify";
import {StoreContext} from "../../context/StoreContext.jsx";

const Login = () => {
    const navigate = useNavigate();

    const {setToken} = useContext(StoreContext);

    const [data, setData] = React.useState({
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(data => ({
            ...data,
            [name]: value
        }));    
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        try{
            const res = await loginUser(data);
            if(res.status === 200){
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token);
                navigate("/");
                toast.success("Login Successful.");
            } else{
                toast.error("Login Failed. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    }


  return (
      <div className="container login-container">
          <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                  <div className="card border-0 shadow rounded-3 my-5">
                      <div className="card-body p-4 p-sm-5">
                          <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                          <form onSubmit={onSubmitHandler}>
                              <div className="form-floating mb-3">
                                  <input type="email" className="form-control" id="floatingInput"
                                         placeholder="name@example.com" name="email" onChange={onChangeHandler} value={data.email}/>
                                  <label htmlFor="floatingInput">Email address</label>
                              </div>
                              <div className="form-floating mb-3">
                                  <input type="password" className="form-control" id="floatingPassword"
                                         placeholder="Password" name="password" onChange={onChangeHandler} value={data.password}/>
                                  <label htmlFor="floatingPassword">Password</label>
                              </div>

        
                              <div className="d-grid">
                                  <button className="btn  btn-primary btn-login text-uppercase "
                                          type="submit">Sign in
                                  </button>
                              </div>
                              <div className='mt-4'>
                                  Already have an account? <Link to="/register">Sign Up</Link>
                              </div>

                              <div className='mt-4 text-danger'>
                                  Reset Password? <Link to="/reset">Reset</Link>
                              </div>

                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}
export default Login;