import { useEffect, useState } from "react";
import { User } from "../../App";
import { searchForPeople } from "../../client";
import { Link, useSearchParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const PeopleList: React.FC = () => {
  const [searchParams, _] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const [results, setResults] = useState<User[]>([]);

  //get products based on search term
  const fetchPeopleFromSearchQuery = async (
    searchTerm: string
  ): Promise<User[]> => {
    return searchForPeople(searchTerm);
  };

  useEffect(() => {
    if (searchTerm) {
      fetchPeopleFromSearchQuery(searchTerm).then((res) => {
        setResults(res);
      });
    }
  }, [searchTerm]);
  return (
    <>
      {!results && <FaSpinner></FaSpinner>}
      <ul className="max-w-4 divide-y divide-gray-200 dark:divide-gray-700">
        {results &&
          results.map((result) => (
            <li className="p-4" key={`${result}`}>
              <div className="flex items-center space-x-4 ">
                <div className="flex-1 min-w-0">
                  {result.firstName} {result.lastName}
                </div>
                <div className="flex-shrink-0">
                  {result.role === "WISHER" ? "Wisher" : "Gifter"}
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  {result.email}
                </div>
                <div className="inline-flex items-center text-base font-semibold text-purple-900">
                  <Link to={`/profile/${result.username}`}>
                    @{result.username}
                  </Link>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default PeopleList;
