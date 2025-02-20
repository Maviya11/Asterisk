import { createContext, useLayoutEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import NavigationBar from "./components/Navigations/Navigations";
import Chores from "./components/Habits/Chores/Chores";
import DetailsPage from "./components/Expense Tracker/DetailsPage";
import Login from "./components/Navigations/Login";
import HeadBar from "./components/Navigations/HeadBar";
import Signup from "./components/Navigations/Register";
import LoadingBar from "./components/Navigations/LoadingBar";
import ExpenseOverview from "./components/Expense Tracker/Expenses/ExpenseOverview";
import IncomeOverview from "./components/Expense Tracker/Incomes/IncomeOverview";
import Profile from "./components/Profile/Profile";
import "react-toastify/dist/ReactToastify.css";

export const themeSetterContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

export const themeValueContext = createContext<boolean | null>(null);

export const isAuthenticatedFunctionContext = createContext<React.Dispatch<
  React.SetStateAction<string | boolean>
> | null>(null);

export const loadingBarContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") || false
  );
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useLayoutEffect(() => {
    const theme = localStorage.getItem("Theme");
    if (theme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  return (
    <>
      <themeSetterContext.Provider value={setIsDarkMode}>
        <themeValueContext.Provider value={isDarkMode}>
          <isAuthenticatedFunctionContext.Provider value={setIsAuthenticated}>
            <loadingBarContext.Provider value={setIsAuthenticating}>
              {isAuthenticating && <LoadingBar />}
              <Router>
                {isAuthenticated && (
                  <>
                    <HeadBar />
                    <NavigationBar />
                    <Profile />
                  </>
                )}
                <Routes>
                  {/* Public Route */}
                  <Route
                    path="/login"
                    element={
                      !isAuthenticated ? <Login /> : <Navigate to="/" replace />
                    }
                  />
                  <Route
                    path="/login/register"
                    element={
                      !isAuthenticated ? (
                        <Signup />
                      ) : (
                        <Navigate to="/" replace />
                      )
                    }
                  />
                  {/* Private Routes */}
                  <Route
                    path="/"
                    element={
                      isAuthenticated ? (
                        <Chores />
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />
                  <Route
                    path="/expenses"
                    element={
                      isAuthenticated ? (
                        <ExpenseOverview />
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />
                  <Route
                    path="/expenses/:category"
                    element={
                      isAuthenticated ? (
                        <DetailsPage />
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />
                  <Route
                    path="/income"
                    element={
                      isAuthenticated ? (
                        <IncomeOverview />
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      isAuthenticated ? (
                        <div className="dark:bg-[#1e1e22] dark:text-white min-h-[calc(100vh-56px-126px)] min-[400px]:min-h-[calc(100vh-64px-144px)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          The page you are looking for is not ready (has issues)
                          <br />
                          <div className="flex items-center">
                            Report a bug:{" "}
                            <span className="flex items-center ml-3 gap-1">
                              <MdOutlineEmail /> maviyaakhtar8@gmail.com
                            </span>
                          </div>
                        </div>
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />
                  {/* To handle non-existance route */}
                  <Route
                    path="*"
                    element={
                      !isAuthenticated ? (
                        <Navigate to="/login" />
                      ) : (
                        <Navigate to="/" replace />
                      )
                    }
                  />
                </Routes>
                <ToastContainer />
              </Router>
            </loadingBarContext.Provider>
          </isAuthenticatedFunctionContext.Provider>
        </themeValueContext.Provider>
      </themeSetterContext.Provider>
    </>
  );
};

export default App;
