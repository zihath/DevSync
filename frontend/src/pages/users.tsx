import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.log("Error fetching users :", error));
  }, []);

  return (
    <div>
      <ul className="list-disc list-inside text-lg text-gray-700">
        {users.map((user) => (
          <li className="text-red-600" key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
