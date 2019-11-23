import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Row, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Map from '../Map/Map';

const styles = {
  mainContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '3rem'
  },
  uniInfo: {
    padding: '2rem'
  },
  uniImg: {
    height: '15rem'
  },
  uniStatCard: {
    backgroundColor: 'inherit',
    textAlign: 'center'
  },
  dsptContainer: {
    marginTop: '3rem',
    display: 'flex',
    flexWrap: 'wrap'
  },
  paragraph: {
    lineHeight: '30px',
    minWidth: '15rem',
    flex: 1
  },
  contactContainer: {
    margin: '0 2rem'
  },
  map: {
    width: '15rem',
    height: '15rem'
  }
};

function University(props) {
  const [university, setUniversity] = useState({});

  const uid = useParams().uid || props.uid;

  useEffect(() => {
    axios
      .get(`/api/super-admin/university/${uid}`)
      .then(result => setUniversity(result.data))
      .catch(err => console.log(err));
  }, [uid]);

  return (
    <Container>
      <div style={styles.mainContainer}>
        <Image src={university.picture} roundedCircle style={styles.uniImg} />
        <div style={styles.uniInfo}>
          <h3>{university.name}</h3>
          <Row>
            <Card style={styles.uniStatCard}>
              <Card.Body>
                <Card.Title>
                  <h3>{university.student_count}+</h3>
                </Card.Title>
                <Card.Text>Students</Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </div>
      </div>

      <>
        <Container>
          <div style={styles.dsptContainer}>
            <div style={styles.paragraph}>
              <span
                style={{ whiteSpace: 'pre-line', fontSize: '1.1rem' }}
                dangerouslySetInnerHTML={{ __html: university.description }}
              />
            </div>
            <div style={styles.contactContainer}>
              <h5>Location:</h5>
              <Map
                lat={university.latitude}
                lng={university.longtitude}
                style={styles.map}
              />
              <br />
            </div>
          </div>
        </Container>
      </>
    </Container>
  );
}

export default University;
