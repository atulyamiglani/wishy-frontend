import React from "react";
import mockFollows from "../../MockDB/follows.json";
import { Link } from "react-router-dom";
import { useState } from "react";

interface FollowProps {
  follows: string[];
}

const FollowDetails: React.FC<FollowProps> = ({ follows }) => {
  return (
    <div>
      {follows.map((follow) => (
        <Link to={`/profile/${follow}`}>
          <p className="mt-3 hover:underline hover:text-purple-700">
            @{follow}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default FollowDetails;
