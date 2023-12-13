import React from "react";
import { CurrentUserContext, User } from "../../App";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { updateUser } from "../../client";
import { useNavigate } from "react-router-dom";

const Editor: React.FC = () => {
  const { user, setUser } = useContext(CurrentUserContext);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (user) {
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        username: user!.username,
        email: email,
        phone: phone,
        password: password,
        role: user!.role,
      };
      await updateUser(newUser).then((res) => {
        if (res) {
          console.log("Setting user: ", res);
          setUser(res);
        }
      });
      navigate("/profile");
    }
  };

  return (
    <div>
      <div className="container bg-pink m-auto ps-8 pe-8 pt-8 mb-8 max-w-4xl">
        {/*Header*/}
        <div className="flex justify-between items-start">
          <div>
            <input
              className="w-72 text-4xl font-medium border border-gray-300 rounded-md p-2 leading-tight focus:outline-none focus:border-blue-500 mb-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <input
              className="w-72 ms-2 text-4xl font-medium border border-gray-300 rounded-md p-2 leading-tight focus:outline-none focus:border-blue-500 mb-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
            <br />
            <h2 className="mb-4 font-bold">@{user!.username}</h2>
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="email" className="w-32 inline-block font-bold">
            Email:
          </label>
          <input
            className="border border-gray-300 rounded-md p-2 leading-tight focus:outline-none focus:border-blue-500 w-96 mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
          <br />
          <label htmlFor="phone" className="w-32 inline-block font-bold">
            Phone #:
          </label>
          <input
            className="border border-gray-300 rounded-md p-2 leading-tight focus:outline-none focus:border-blue-500 w-96 mb-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
          />
          <br />
          <label htmlFor="password" className="w-32 inline-block font-bold">
            New Password:
          </label>
          <input
            className="border border-gray-300 rounded-md p-2 leading-tight focus:outline-none focus:border-blue-500 w-96 mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
          <br />
        </div>
        {/* todo: add safety check for username */}
        <Link
          className="justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 me-2"
          to="/profile"
          onClick={handleSubmit}
        >
          Save Changes
        </Link>
        <Link
          className="justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          to="/profile"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default Editor;
