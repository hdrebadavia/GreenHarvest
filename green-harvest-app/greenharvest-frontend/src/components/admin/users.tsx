import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  // Add other user properties as needed
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        // Replace this with your actual API call
        const response = await new Promise<User[]>((resolve) => {
          setTimeout(() => {
            resolve([
              { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
              { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
              { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com' },
            ]);
          }, 1000); // Simulate 1 second delay
        });

        setUsers(response);
      } catch (err) {
        setError('Failed to fetch users.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleView = (userId: number) => {
    console.log(`View user with ID: ${userId}`);
    // Implement view logic here (e.g., navigate to a user details page)
  };

  const handleEdit = (userId: number) => {
    console.log(`Edit user with ID: ${userId}`);
    // Implement edit logic here (e.g., open a modal for editing)
  };

  const handleDelete = (userId: number) => {
    console.log(`Delete user with ID: ${userId}`);
    // Implement delete logic here (e.g., show a confirmation dialog)
    setUsers(users.filter((user) => user.id !== userId));
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Users</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleView(user.id)}
                >
                  View
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;