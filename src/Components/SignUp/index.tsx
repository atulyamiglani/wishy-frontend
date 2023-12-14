import { useContext, useState } from "react";
import { CurrentUserContext, User } from "../../App";
import { Navigate, useNavigate } from "react-router-dom";
import { signUp } from "../../client";
import { Toast } from "flowbite-react";
import { HiX } from "react-icons/hi";

export interface SignUpFormValues extends User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  role: "GIFTER" | "WISHER";
  password: string;
}

const SignUp: React.FC<{}> = () => {
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [signUpFormValues, setSignUpFormValues] = useState<SignUpFormValues>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    role: "GIFTER",
    password: "",
  });
  const { user, setUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  return (
    <>
      {showErrorToast && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-100 dark:text-red-500">
            <Toast.Toggle onClick={() => setShowErrorToast(!showErrorToast)}>
              <HiX className="h-5 w-5" />
            </Toast.Toggle>
          </div>
          <div className="ml-3 text-sm font-normal" style={{ color: "black" }}>
            Complete all the fields and submit the form again
          </div>
        </Toast>
      )}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8"></div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an Account
        </h2>
      </div>
      <div className="mt-10 mx-auto w-full max-w-sm container px-8">
        {/* TODO: this form thing was adding query params to the url. 
        commented it out for now. Password shouldnt be in the query params lol. */}
        {/* <form className="space-y-6"> */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium leading-6 text-gray-900 mt-2"
          >
            First Name
          </label>
          <div>
            <input
              id="firstName"
              name="name"
              type="name"
              autoComplete="firstName"
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => {
                setSignUpFormValues({
                  ...signUpFormValues,
                  firstName: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium leading-6 text-gray-900 mt-2"
          >
            Last name
          </label>
          <div>
            <input
              id="lastName"
              name="name"
              type="name"
              autoComplete="lastName"
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => {
                setSignUpFormValues({
                  ...signUpFormValues,
                  lastName: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900 mt-2"
          >
            username
          </label>
          <div>
            <input
              id="username"
              name="name"
              type="username"
              autoComplete="username"
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => {
                setSignUpFormValues({
                  ...signUpFormValues,
                  username: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 mt-2"
          >
            Email
          </label>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => {
                setSignUpFormValues({
                  ...signUpFormValues,
                  email: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium leading-6 text-gray-900 mt-2"
          >
            Phone Number
          </label>
          <div>
            <input
              id="phone"
              name="phone"
              type="phone"
              autoComplete="phone"
              required={true}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => {
                setSignUpFormValues({
                  ...signUpFormValues,
                  phone: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <label htmlFor="isWishing" className="block text-sm font-medium mt-2">
          I am primarily a...
        </label>
        <select
          id="isWishing"
          className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(e) => {
            setSignUpFormValues({
              ...signUpFormValues,
              role: e.target.value === "wishing" ? "WISHER" : "GIFTER",
            });
          }}
        >
          <option value="wishing">Wisher</option>
          <option value="gifting">Gifter</option>
        </select>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900 mt-2"
            >
              Create Password
            </label>
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => {
                setSignUpFormValues({
                  ...signUpFormValues,
                  password: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div>
          <button
            className="mt-4 mb-5 flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={async () => {
              const signedUpUser = signUp(signUpFormValues);
              console.log("BYEEEEE", signedUpUser);
              signedUpUser
                .then((response) => {
                  console.log("HELLOOOO", response);

                  setUser(response as User);
                  navigate("/profile");
                })
                .catch((error) => {
                  setShowErrorToast(true);
                });
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
