import { useContext, useState } from "react";
import { CurrentUserContext, User } from "../../App";
import { Navigate, useNavigate } from "react-router-dom";

interface SignUpFormValues extends User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  isWishing: boolean;
  password: string;
}

const SignUp: React.FC<{}> = () => {
  const [signUpFormValues, setSignUpFormValues] = useState<SignUpFormValues>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    isWishing: false,
    password: "",
  });
  const { user, setUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"></div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an Account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* TODO: this form thing was adding query params to the url. 
        commented it out for now. Password shouldnt be in the query params lol. */}
        {/* <form className="space-y-6"> */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="name"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Create Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={async () => {
              const mockReturnValue = new Promise((resolve, reject) => {
                // expect the same value returned without the password
                resolve({
                  firstName: signUpFormValues.firstName,
                  lastName: signUpFormValues.lastName,
                  username: signUpFormValues.username,
                  email: signUpFormValues.email,
                  phone: signUpFormValues.phone,
                  defaultToWishing: signUpFormValues.isWishing,
                });
              });
              mockReturnValue.then((response) => {
                setUser(response as User);
                navigate("/home");
              });
            }}
          >
            Sign up
          </button>
        </div>
        {/* </form> */}
      </div>
    </>
  );
};

export default SignUp;
