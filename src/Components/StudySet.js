import React from "react";
import { Link } from "react-router-dom";

import EditCard from "./EditCard";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./StudySet.css";

const StudySet = ({
  // From Dashboard
  setInfo,
  handleDelete,
  handleUpdateStudySets,
}) => {
  return (
    <Card className="card-study-set">
      <Link to={`/flashcards/${setInfo.set_id}`}>
        <Card.Body>
          <Card.Title>{setInfo.set_name}</Card.Title>
        </Card.Body>
      </Link>
      <Card.Footer>
        <EditCard
          studySetInfo={setInfo}
          handleUpdateStudySets={handleUpdateStudySets}
        />
        <Button
          className="btn-delete"
          onClick={() => handleDelete(setInfo.set_id)}
        >
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default StudySet;
