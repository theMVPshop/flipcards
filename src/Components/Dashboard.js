import React from 'react';
import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StudySet from './StudySet';

export default function Dashboard() {
    const [studySets, setStudySets] = useState([]);

    useEffect(() => {
        // pull in all study sets from db
        console.log('working');
    })

    return (
        <Container>
            <Row>
                {/* Foreach studyset create a studyset component and pass it's data to that component */}
                <Col md={6} lg={4}>
                    <StudySet title='Temp Title' />
                </Col>
            </Row>
        </Container>
    )
}