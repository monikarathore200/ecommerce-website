import React, { useEffect, useState, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../config/FireBase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CommonContext } from "../ContextApi/Context";
       
export default function LoginRegister() {
  const [registerLoading, setRegisterLoding] = useState("Register");
  const [loginLoding, setIsLoginLoding] = useState("Login");
  const [googleLoding, setGoogleLoding] = useState("Login with google");



    
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(CommonContext);

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, []);

  const register = (event) => {
    event.preventDefault();
    setRegisterLoding("Loading...");
    var email = event.target.email.value;
    var password = event.target.password.value;

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user_uid", user.uid);
        setIsLogin(user.uid);
        toast.success("Account registered successfully");
        setRegisterLoding("Register");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setRegisterLoding("Register");
        event.target.reset();
      });
  };

  const login = (event) => {
    event.preventDefault();
    setIsLoginLoding("Loading...");
    var email = event.target.email.value;
    var password = event.target.password.value;

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user_uid", user.uid);
        setIsLogin(user.uid);
        toast.success("Login successfully");
        setIsLoginLoding("Login");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setIsLoginLoding("Login");
        event.target.reset();
      });
  };

  const googlelogin = () => {
    setGoogleLoding("Loading...");
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem("user_uid", user.uid);
        setIsLogin(user.uid);
        toast.success("Login successfully");
        setGoogleLoding("Login with google");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setGoogleLoding("Login with google");
        toast.error(errorMessage);
      });
  };

  return (
    <>
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div>
                <h2>Login</h2>
              </div>
              <div className="border p-3 rounded-3">
                <form onSubmit={login}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      name="email"
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Check me out
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {loginLoding}
                  </button>

                  <button
                    onClick={googlelogin}
                    type="button"
                    className="btn btn-primary ms-3"
                  >
                    {googleLoding}
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <h2>Register</h2>
              </div>
              <div className="border p-3 rounded-3">
                <form onSubmit={register}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail2" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail2"
                      name="email"
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="exampleInputPassword2"
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck2"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck2">
                      Check me out
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {registerLoading}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
