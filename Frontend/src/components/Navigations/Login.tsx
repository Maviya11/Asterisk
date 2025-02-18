import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoEyeOffOutline } from "react-icons/io5";
import { signInUser } from "@/services/login-service";
import { isAuthenticatedFunctionContext, loadingBarContext } from "@/App";
import logo from "../../assets/logo.webp";
import "./Login.css";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email or phone is required*" })
    .email({ message: "Enter a valid email or phone*" }),
  password: z.string().min(1, { message: "Password is required*" }),
});

export type FormData = z.infer<typeof schema>;

const Login = () => {
  const setIsAuthenticated = useContext(isAuthenticatedFunctionContext);
  const setIsAuthenticating = useContext(loadingBarContext);

  const [wrongCredentials, setWrongCredentials] = useState(false);

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [hasValueEmail, setHasValueEmail] = useState(false);

  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [hasValuePassword, setHasValuePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocusEmail = () => setIsFocusedEmail(true);
  const handleBlurEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocusedEmail(false);
    setHasValueEmail(e.target.value !== "");
  };

  const handleFocusPassword = () => setIsFocusedPassword(true);
  const handleBlurPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocusedPassword(false);
    setHasValuePassword(e.target.value !== "");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    if (setIsAuthenticating) setIsAuthenticating(true);
    signInUser(data.email, data.password).then((res) => {
      if (res !== false) {
        localStorage.setItem("isAuthenticated", "true");
        document.cookie = `uid=${res}; path=/; max-age=3600; Secure; SameSite=Strict`;
        if (setIsAuthenticated) setIsAuthenticated(true);
      } else {
        setWrongCredentials(true);
      }
      if (setIsAuthenticating) setIsAuthenticating(false);
    });
  };

  return (
    <div className="h-screen">
      {/* <LoadingBar /> */}
      <div className="flex items-center p-5">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg" />
        <h1 className="text-2xl ml-2 text-cyan-700 font-leckerli">Asterisk</h1>
      </div>

      {wrongCredentials && (
        <div className="box-content bg-red-600/50 text-white w-max mx-auto px-10 py-2 border-2 border-red-600 border-dashed rounded-md">
          Wrong email or password !
        </div>
      )}

      <div className="box-content mt-10 w-2/3 mx-auto min-[770px]:w-96 min-[770px]:bg-white min-[770px]:px-10 min-[770px]:py-6 min-[770px]:shadow-xl min-[770px]:rounded-lg min-[770px]:my-32">
        <h2 className="text-4xl font-serif">Sign in</h2>
        <p className="mt-1 font-light">Track your growth towards success</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="custom-input-container mt-6">
            <input
              id="userId"
              {...register("email")}
              type="text"
              className={`custom-input ${isFocusedEmail ? "focused" : ""} ${
                hasValueEmail ? "has-value" : ""
              }`}
              onFocus={handleFocusEmail}
              onBlur={handleBlurEmail}
            />
            <label htmlFor="userId" className="custom-label">
              Email or phone
            </label>
          </div>
          {errors.email && (
            <p className="text-red-500 pl-1 text-sm mt-1">
              {errors.email.message}
            </p>
          )}

          {/* Password Field */}
          <div className="custom-input-container mt-6">
            <input
              id="password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className={`custom-input ${isFocusedPassword ? "focused" : ""} ${
                hasValuePassword ? "has-value" : ""
              }`}
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
            />
            <label htmlFor="password" className="custom-label">
              Password
            </label>
            {showPassword ? (
              <FaRegEye
                onClick={() => setShowPassword(false)}
                size={22}
                className="box-content absolute top-1/2 transform -translate-y-1/2 right-2 bg-[#f3f3f3] px-1 min-[770px]:bg-white"
              />
            ) : (
              <IoEyeOffOutline
                onClick={() => setShowPassword(true)}
                size={22}
                className="box-content absolute top-1/2 transform -translate-y-1/2 right-2 bg-[#f3f3f3] px-1 min-[770px]:bg-white"
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 pl-1 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          <button className="w-full py-2 bg-cyan-700 text-white rounded-full mt-4 mx-auto block transition-colors hover:bg-cyan-600">
            Sign in
          </button>
        </form>
        <p className="mt-4 text-center">
          New to Habitica?{" "}
          <Link to="register">
            <span className="text-cyan-700 font-medium cursor-pointer hover:underline">
              Join now
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
