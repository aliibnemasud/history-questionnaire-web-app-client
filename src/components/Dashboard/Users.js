import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const Users = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user`, {
        headers: {
          authorization: `Barer ${token}`,
        },
      })
      .then((data) => {
        setUsers(data?.data?.data);
      });
  }, []);

  const makeValidator = (id) => {
    const makeValidator = window.confirm("Are you sure want to make him validator?");
    if (makeValidator) {
      axios.patch(
        `http://localhost:5000/user?userId=${id}`,
        { role: "validator" },
        {
          headers: {
            authorization: `Barer ${token}`,
          },
        }
      );
    }

  };

  return (
    <Table responsive="sm">
      <thead>
        <tr>
          <th>#ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>
                <span class="badge text-bg-success">{user?.role}</span>
              </td>
              <td>
                <button onClick={() => makeValidator(user?._id)} className="btn btn-success fw-bold mx-2">
                  Make Validator
                </button>
                <button className="btn btn-danger fw-bold">Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Users;
