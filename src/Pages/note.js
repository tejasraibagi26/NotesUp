import axios from "axios";
import React, { useEffect } from "react";

export default function NoteData() {
  useEffect(() => {
    getDataById();
  });

  const getDataById = async () => {
    const id = window.location.pathname.split("/")[2];
    const { data } = await axios.get(`localhost:5000/notes/${id}`);
    console.log(data);
  };

  return (
    <div>
      <h1>Note</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
  );
}
