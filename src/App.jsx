import Axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [listofUsers, setListofUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    Axios.get("https://mern-backend-zccl.onrender.com/getUsers")
      .then((res) => {
        setListofUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const createUser = () => {
    Axios.post("https://mern-backend-zccl.onrender.com/createUser", {
      name,
      age,
      username,
    }).then(() => {
      setListofUsers([
        ...listofUsers,
        {
          name,
          age,
          username,
        },
      ]);
    });
  };

  console.log(listofUsers);

  return (
    <>
      <div className="">
        <div className="">
          {listofUsers.map((user) => (
            <div className="" key={user.id}>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>UserName: {user.username}</h1>
            </div>
          ))}
        </div>

        <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button onClick={createUser}> Create User </button>
      </div>
      </div>
    </>
  );
}

export default App;
