import React from 'react';
import { useState, useEffect } from 'react';
import data from '../data/db.json';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import StudySet from './StudySet';

import styles from './Dashboard.module.css';

export default function Dashboard() {
    const [studySets, setStudySets] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // @todo - switch to fetch call to get study sets from db
        setStudySets(data);
    }, [])

    const handleDelete = (id) => {
        let updatedCardSets = studySets.cardSets.filter(set => set.id !== id);
        let updatedStudySets = {
            cardSets: updatedCardSets
        }
        setStudySets(updatedStudySets);
    }

    const filterCourses = (e) => {
        // let studySetsCopy = { ...studySets };
        // let updatedCardSets = studySetsCopy.cardSets.filter(set => set.course.toLowerCase() === e.target.value);
        // let updatedStudySets = { ...studySetsCopy, cardSets: updatedCardSets }
    }

    return (
        <Container>
            <header className={styles.header}>
                <h1>Recent</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Filter by Course</Form.Label>
                        <Form.Select aria-label="Filter by Course" onChange={(e) => filterCourses(e)}>
                            <option value="all">All</option>
                            <option value="medical">Medical</option>
                            <option value="dental">Dental</option>
                            <option value="coding">Coding</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </header>
            <Row>
                {studySets.cardSets && studySets.cardSets.map((set, index) => (
                    <Col key={index} md={6} lg={4}>
                        <StudySet setInfo={set} handleDelete={handleDelete} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}