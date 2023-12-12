import React from "react";
import { Link } from "react-router-dom";

interface FollowProps {
  follows: string[];
}

const FollowDetails: React.FC<FollowProps> = ({ follows }) => {
  console.log(follows);
  return (
    <div>
      {follows.map((follow) => (
        <Link key={follow} to={`/profile/${follow}`}>
          <p className="mt-3 hover:underline hover:text-purple-700">
            @{follow}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default FollowDetails;
