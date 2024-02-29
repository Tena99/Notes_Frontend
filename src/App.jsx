import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import Note_Card from "./components/Note_Card";
import profile_photo from "./assets/girl_profile_photo.jpg";

const URL = "https://notes-app-gamma-sable.vercel.app";

function App() {
  const [data, setData] = useState();
  const [user, setUser] = useState("");
  const [newNote, setNewNote] = useState("");
  const [usersList, setUsersList] = useState();

  let inputContent = "";

  console.log(data);
  console.log("userlist", usersList);
  console.log(newNote);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`${URL}/${user}`);
      setData(result.data);
    }
    fetchData();

    async function fetchUsers() {
      const result = await axios.get(`${URL}/users`);
      setUsersList(result.data);
    }
    fetchUsers();

    async function addData() {
      if (usersList) {
        let userID = usersList.find((item) => {
          if (item === user) {
            return user.id;
          }
        });

        console.log("userID", userID);

        const result = await axios
          .post(`${URL}`, {
            userID: userID,
            content: newNote,
          })
          .then((response) => {
            // Handle the success response
            console.log("Success! Response:", response.data);
          })
          .catch((error) => {
            // Handle the error
            console.error("Error:", error);
          });
      }
    }
    addData();
  }, [user]);

  return (
    <>
      <div>
        <div className="tmp_wrapper">
          <div>
            {usersList
              ? usersList.map((user) => (
                  <button key={user.id} onClick={() => setUser(user.name)}>
                    {user.name}
                  </button>
                ))
              : undefined}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault(), setNewNote(inputContent);
            }}
          >
            <input
              type="text"
              placeholder="Content of a new note"
              onChange={(event) => (inputContent = event.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="cards_container">
          {data
            ? data.map((item) => {
                return (
                  <Note_Card
                    userName="Sam"
                    src={profile_photo}
                    postedDate="29.02.2024 at 12:54"
                    title={"Cool title"}
                    content={item.content}
                  />
                );
              })
            : undefined}
        </div>
      </div>
    </>
  );
}

export default App;
