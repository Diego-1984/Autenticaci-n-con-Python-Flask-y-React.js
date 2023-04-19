import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(process.env.BACKEND_URL + "/api/private", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((res) =>
        res.json.then((data) => {
          if (data.users) {
            setUsers(data.users);
          }
        })
      );
    } else{
		navigate("/singup");
	}
  }, []);

  return (
	<>
	<h1>USUARIOS:</h1>
      {users &&
        users.map((user) => {
          return <p key={user.id}>{user.email}</p>;
        })}
	</>
  )
  
};
export default Private;
