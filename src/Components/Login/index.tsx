import { useContext, useState } from "react";
import { CurrentUserContext, User } from "../../App";
import { Navigate, useNavigate } from "react-router-dom";
import { signIn } from "../../client";
import { Toast } from "flowbite-react";
import { RxCross1 } from "react-icons/rx";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

export interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC<{}> = () => {
  const { user, setUser } = useContext(CurrentUserContext);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [loginValues, setLoginValues] = useState<LoginFormValues>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"></div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login
        </h2>
      </div>
      <div className="container mt-10 mx-auto px-8 max-w-sm">
        {/* TODO: this form thing was adding query params to the url. 
        commented it out for now. Password shouldnt be in the query params lol. */}
        {/* <form className="space-y-6"> */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Username
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="string"
              autoComplete="username"
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => {
                setLoginValues({ ...loginValues, username: e.target.value });
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => {
                setLoginValues({ ...loginValues, password: e.target.value });
              }}
            />
          </div>
        </div>
        <div>
          <button
            className="flex w-full justify-center rounded-md bg-purple-600 mt-5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={async () => {
              console.log(loginValues);
              const loggedIn = signIn(loginValues);
              loggedIn
                .then((loggedIn) => {
                  if (loggedIn === null) {
                    setShowErrorToast(true);
                  } else {
                    setUser(loggedIn);
                    navigate("/profile");
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            Log In
          </button>
          {showErrorToast && (
            <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-100 dark:text-red-500">
                <Toast.Toggle
                  onClick={() => setShowErrorToast(!showErrorToast)}
                >
                  <HiX className="h-5 w-5" />
                </Toast.Toggle>
              </div>
              <div
                className="ml-3 text-sm font-normal"
                style={{ color: "black" }}
              >
                Bad username or password
              </div>
            </Toast>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
