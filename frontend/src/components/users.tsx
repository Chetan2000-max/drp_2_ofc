import { useEffect, useState } from "react";

type User = {
  id: number;
  username: string;
  role: string;
};

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    fetch("http://127.0.0.1:8000/api/new/users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("API Error:", data);
        }
      });
  }, []);

  return (
    <div>
      <h2>All Users</h2>

      {users.map((u) => (
        <div key={u.id}>
          <p>
            {u.username} - {u.role}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Users;