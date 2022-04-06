import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
// import data from '../data/db.json';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import StudySet from "./StudySet"
import Container from "react-bootstrap/Container"
import styles from "./Dashboard.module.css"

const STUDYSET_API = "https://flipcardzdb.herokuapp.com/cardset/all-sets-flashcards"

const FILTER_MAP = {
  All: () => true,
  Medical: (set) => set.course === "Medical",
  Dental: (set) => set.course === "Dental",
  Coding: (set) => set.course === "Coding",
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function Dashboard() {
  const [studySets, setStudySets] = useState([])
  const [filter, setFilter] = useState("All")

  useEffect(() => {
    fetch(STUDYSET_API)
      .then((res) => res.json())
      .then((data) => setStudySets(data))
      .catch((error) => console.log(error))
  }, [])

  const handleDelete = async (id) => {
    await axios
      .delete(`https://flipcardzdb.herokuapp.com/cardset/${id}`)
      .catch((e) => console.log("delete set error", e))
    let updatedCardSets = studySets.filter((set) => set.set_id !== id)
    // let updatedStudySets = { cardSets: updatedCardSets };
    setStudySets(updatedCardSets)
  }

  const handleUpdateStudySets = (updatedSet) => {
    let newStudySets = [...studySets]
    let foundSetIndex = newStudySets.findIndex(
      (set) => Number(set.set_id) === Number(updatedSet.set_id)
    )
    newStudySets.splice(foundSetIndex, 1, updatedSet)
    setStudySets(newStudySets)
  }

  const filterCourses = (e) => setFilter(e.target.value)

  return (
    <Container>
      <header className={styles.header}>
        <h1>Recent</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Filter by Course</Form.Label>
            <Form.Select aria-label="Filter by Course" onChange={(e) => filterCourses(e)}>
              {FILTER_NAMES.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </header>
      <div className={styles.createButton}>
        <Link className="btn btn-primary" to="/createcards">
          Create Study Set
        </Link>
      </div>
      <br />
      <Row>
        {studySets &&
          studySets.filter(FILTER_MAP[filter]).map((set, index) => (
            <Col key={index} md={6} lg={4}>
              <StudySet
                setInfo={set}
                handleDelete={handleDelete}
                handleUpdateStudySets={handleUpdateStudySets}
              />
            </Col>
          ))}
      </Row>
    </Container>
  )
}
