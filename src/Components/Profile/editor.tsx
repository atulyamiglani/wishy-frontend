import React from "react";
import { CurrentUserContext, User } from "../../App";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const Editor: React.FC = () => {
  const { user, setUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(user?.firstName || "");
  const [username, setUsername] = useState("huntergroff");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("1234567890");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="container bg-pink m-auto ps-8 pe-8 pt-8 mb-8 max-w-4xl">
        {/*Header*/}
        <div className="flex justify-between items-start">
          <div>
            <input
              className="text-4xl font-medium border border-gray-300 rounded-md p-2 leading-tight focus:outline-none focus:border-blue-500 mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
              className="text-xl text-gray-500 font-medium border border-gray-300 rounded-md p-2 leading-tight focus:outline-none focus:border-blue-500 mb-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-8">
          <p className="w-20 inline-block font-bold">Email:</p>
          <input
            className="border border-gray-300 rounded-md p-2 leading-tight focus:outline-none focus:border-blue-500 w-96 mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <p className="w-20 inline-block font-bold">Phone #:</p>
          <input
            className="border border-gray-300 rounded-md p-2 leading-tight focus:outline-none focus:border-blue-500 w-96 mb-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
        </div>
        <Link
          className="justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 me-2"
          to="/profile"
          onClick={() => {
            setUser({
              firstName: "",
              lastName: "",
              username: "",
              email: "",
              phone: "",
              role: "GIFTER",
            });
          }}
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
