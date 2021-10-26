import axios from "axios";
import React, { useEffect } from "react";

export default function NoteData() {
  const [note, setNote] = React.useState([]);

  useEffect(() => {
    getDataById();
  });

  const getDataById = async () => {
    const id = window.location.pathname.split("/")[2];
    const { data } = await axios.get(
      `https://note-up-server.herokuapp.com/notes/${id}`
    );
    setNote(data);
  };

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}
