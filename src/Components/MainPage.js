import React, { useState, useEffect } from "react";
import "../CSS/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCog,
  faInfoCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import Note from "./Note";

export default function MainPage() {
  const [notes, setNotes] = useState([]);
  const [err, setErr] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setNotes([]);
    try {
      const { data } = await axios.get(
        "https://note-up-server.herokuapp.com/notes"
      );
      console.log(data);
      if (data === null) {
        setErr("No notes found");
        return;
      }
      data.forEach((note) => {
        console.log(note);
        setNotes((arr) => [...arr, note]);
      });
      console.log(notes);
    } catch (error) {
      console.log(error);
    }
  }

  const onHandleTextChange = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "content":
        setContent(e.target.value);
        break;
      default:
        break;
    }
  };

  const addNote = (e) => {
    console.log("Hey");
    if (title === "" || content === "") {
      setErr("Title and content are required");
      return;
    }
    console.log(title, content);
    axios
      .post("http://localhost:5000/notes/add", {
        title: title,
        content: content,
      })
      .then((res) => {
        console.log(res);
        fetchData();
        showAddNote();
        setTitle("");
        setContent("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showAddNote = () => {
    console.log("add note");
    const addBtn = document.getElementById("addBtn");
    const addNote = document.getElementById("addNote");
    const addBtnAlt = document.getElementById("addBtn-alt");
    if (addNote.classList.contains("hide")) {
      console.log("hide");
      addNote.classList.remove("hide");
      addBtn.classList.add("iconRotate");
      addBtnAlt.classList.add("iconRotate");
      addNote.classList.add("note-anim");
    } else {
      addNote.classList.add("hide");
      addBtn.classList.remove("iconRotate");
      addBtnAlt.classList.remove("iconRotate");
      addNote.classList.remove("note-anim");
    }
  };

  // const searchNote = (e) => {
  //   setSearch(e.target.value);
  //   //console.log(search);

  //   const results = notes.filter((note) =>
  //     note.title.includes(search.toLowerCase())
  //   );

  //   console.log(results);

  //   return setNotes((arr) => [...arr, results]);
  // };

  return (
    <section id="main-page">
      <div className="container">
        <div className="left-container">
          <div className="left-container-header">
            <h1>NotesUp!</h1>
          </div>
          <div className="center-body">
            <div className="left-container-body">
              <span className="circle" id="addBtn" onClick={showAddNote}>
                <FontAwesomeIcon
                  className="icon"
                  id="addIcon"
                  icon={faPlus}
                  size="lg"
                />
              </span>
              <div className="setting">
                <FontAwesomeIcon className="nav-btns" icon={faCog} size="lg" />{" "}
                {/* <span className="nav-btns">Settings</span> */}
              </div>
              <div className="about">
                <FontAwesomeIcon
                  className="nav-btns"
                  icon={faInfoCircle}
                  size="lg"
                />{" "}
                {/* <span className="nav-btns">About</span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="right-container">
          <div className="notes-add-container hide" id="addNote">
            <div className="notes-add-header">
              <h1>Add Notes</h1>
            </div>
            <div className="notes-add-body">
              <input
                type="text"
                placeholder="Title"
                className="header-note"
                name="title"
                onChange={onHandleTextChange}
                value={title}
              />
              <textarea
                className="notes-add-textarea"
                placeholder="Enter Notes"
                rows="10"
                name="content"
                onChange={onHandleTextChange}
                value={content}
              ></textarea>
              <div className="addButton" onClick={addNote}>
                Add Note
              </div>
            </div>
          </div>
          <div className="alt-web-name">NotesUp!</div>
          {/* <div className="searchbox">
            <input
              type="text"
              placeholder="Search"
              className="searchbox-input"
              onChange={searchNote}
            />
            <FontAwesomeIcon icon={faSearch} className="search-btn" />
          </div> */}
          <div className="right-container-header">
            <h1>Your Notes</h1>
          </div>
          {notes.length === 0 ? (
            <div className="errMsg">{err}</div>
          ) : (
            <div className="right-container-body">
              {notes.map((note) => {
                return (
                  <Note
                    _id={note._id}
                    title={note.title}
                    content={note.content}
                    date={note.date}
                    key={note._id}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className="alt-add" id="addBtn-alt">
          <span className="circle" onClick={showAddNote}>
            <FontAwesomeIcon
              className="icon"
              id="addIcon"
              icon={faPlus}
              size="lg"
            />
          </span>
        </div>
      </div>
    </section>
  );
}
