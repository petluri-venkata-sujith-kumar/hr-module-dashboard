/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./login.css";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const { setUserData } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  let { email, password } = login;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleButton = () => {
    console.log(JSON.stringify(login));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = JSON.stringify({
        username: email,
        password: password,
      });

      const { data } = await axios.post(
        `http://106.51.76.167:8080/user/verify?username=${email}&password=${password}`,
        payload
      );

      if (data.statusCode === 200 || data.statusCode === 201) {
        setUserData(data.body);
        // window.localStorage.setItem("userData", JSON.stringify(data.body));
        toast.success("Logged In Successfully", {
          duration: 3000,
          position: "top-center",
        });
        if(data?.body?.userRole === "ADMIN"){
          Navigate("/admin");
        }else if(data?.body?.userRole === "HR"){
          Navigate("/hrdashboard");
        }else if(data?.body?.userRole === "TRAINER"){
          Navigate("/dashboard");
        }

      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("An error occurred while logging in");
    }
  };

  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const handleFocus = (name) => {
    setIsFocused({ ...isFocused, [name]: true });
  };
  const handleBlur = (name) => {
    setIsFocused({ ...isFocused, [name]: false });
  };

  const handleInputChange = (e) => {
    handleChange(e);
    if (e.target.value.length !== 0) {
      handleFocus(e.target.name);
    } else {
      handleBlur(e.target.name);
    }
  };

  return (
    <section className="loginSection">
      {<Toaster />}
      <article className="loginArticle">
        <div className="left-content">
          <div className="conten">
            <h1>Welcome To</h1>
            <div className="img">
              <img src="./alpha-logo-1.png" alt="" />
            </div>
          </div>
        </div>

        <form className="loginForm" onSubmit={(e) => handleFormSubmit(e)}>
          <div className="right-content">
            <div className="login">
              <h1>Login</h1>
            </div>
            <div>
              <div className="form-group">
                <div className="input">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder=""
                    value={email}
                    onChange={handleInputChange}
                    className={isFocused.email ? "focus" : ""}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder=""
                    value={password}
                    onChange={handleInputChange}
                    className={isFocused.password ? "focus" : ""}
                  />
                  <label htmlFor="password">Password</label>
                  <span onClick={handleTogglePassword}>
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </span>
                </div>

                <button type="submit" onClick={handleButton}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </article>
    </section>
  );
};

export default Login;
