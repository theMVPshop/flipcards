import React from 'react';
import { useState, useEffect } from 'react';
import data from '../data/db.json';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StudySet from './StudySet';

export default function Dashboard() {
    const [studySets, setStudySets] = useState([]);

    useEffect(() => {
        // @todo - switch to fetch call to get study sets from db
        setStudySets(data);
    })

    return (
        <Container>
            <h1>Recent</h1>
            <Row>
                {studySets.cardSets && studySets.cardSets.map((set, index) => (
                    <Col key={index} md={6} lg={4}>
                        <StudySet setInfo={set} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}