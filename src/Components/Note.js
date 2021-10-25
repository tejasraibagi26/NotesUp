import React from "react";
import { Link } from "react-router-dom";
export default function Note(props) {
  return (
    <Link to={`notes/${props._id}`} className="note-card">
      <div className="note-card">
        <div className="note-card-header">{props.title}</div>
        <div className="note-card-body">{props.content}</div>
        <div className="note-card-footer">{props.date}</div>
      </div>
    </Link>
  );
}
