import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { IoEyeOffOutline } from "react-icons/io5";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "./Login";
import { createNewUser } from "@/services/login-service";
import { isAuthenticatedFunctionContext, loadingBarContext } from "@/App";
import logo from "../../assets/logo.webp";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required*" })
    .email({ message: "Enter a valid email*" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

const Register = () => {
  const setIsAuthenticating = useContext(loadingBarContext);
  const setIsAuthenticated = useContext(isAuthenticatedFunctionContext);

  const [existingUser, setExistingUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    if (setIsAuthenticating) setIsAuthenticating(true);
    createNewUser(data.email, data.password).then((res) => {
      if (res !== false) {
        localStorage.setItem("isAuthenticated", "true");
        document.cookie = `uid=${res}; path=/; max-age=3600; Secure; SameSite=Strict`;
        if (setIsAuthenticated) setIsAuthenticated(true);
      } else {
        setExistingUser(true);
      }
      if (setIsAuthenticating) setIsAuthenticating(false);
    });
  };

  return (
    <>
      <div className="flex items-center p-5">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg" />
        <h1 className="text-2xl ml-2 text-cyan-700 font-leckerli">Asterisk</h1>
      </div>
      {existingUser && <div className="box-content bg-red-600/50 text-white w-max mx-auto px-10 py-2 border-2 border-red-600 border-dashed rounded-md">Email already Exist! Try signing in</div>}

      <div className="mt-16 w-2/3 mx-auto min-[770px]:w-[500px] min-[770px]:bg-white min-[770px]:px-10 min-[770px]:py-6 min-[770px]:shadow-xl min-[770px]:rounded-lg min-[770px]:my-28">
        <h2 className="text-4xl font-serif text-center">
          Start keeping an eye on your dailies
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mt-3 mb-2 text-lg">
              Email or phone
            </label>
            <input
              id="email"
              {...register("email", { required: true })}
              type="text"
              className="border-2 border-gray-400 py-2 px-3 text-lg rounded  focus:outline-none focus:border-2 focus:border-cyan-700"
            />
            {errors.email && (
              <p className="text-red-500 pl-1 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="mt-3 mb-2 text-lg">
              Password (6+ character)
            </label>
            <input
              id="password"
              {...register("password", { required: true })}
              type={showPassword ? "text" : "password"}
              className="border-2 border-gray-400 py-2 pl-3 pr-10 text-lg rounded  focus:outline-none focus:border-2 focus:border-cyan-700"
            />
            {showPassword ? (
              <FaRegEye
                onClick={() => setShowPassword(false)}
                size={22}
                className="box-content absolute top-3/4 transform -translate-y-1/2 right-2 bg-white px-2"
              />
            ) : (
              <IoEyeOffOutline
                onClick={() => setShowPassword(true)}
                size={22}
                className="box-content absolute top-3/4 transform -translate-y-1/2 right-2 bg-white px-2"
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 pl-1 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          <p className="text-xs text-center mt-3">
            By clicking Agree & Join or Continue, you agree to the Asterisk{" "}
            <br />{" "}
            <span className="text-sky-700 font-medium cursor-pointer">
              User Agreement
            </span>{" "}
            ,{" "}
            <span className="text-sky-700 font-medium cursor-pointer">
              Privacy Policy
            </span>{" "}
            and{" "}
            <span className="text-sky-700 font-medium cursor-pointer">
              Cookie Policy
            </span>
          </p>
          <button className="w-full py-2 bg-cyan-700 text-white rounded-full mt-4 mx-auto block transition-colors hover:bg-cyan-600">
            Agree and Join
          </button>
        </form>
        <p className="mt-4 text-center">
          Already on Asterisk?{" "}
          <Link
            to="login
          "
          >
            <span className="text-cyan-700 font-medium cursor-pointer hover:underline">
              Sign in
            </span>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
