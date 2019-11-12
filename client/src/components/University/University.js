import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Row, Image } from "react-bootstrap";

import Map from "../Map/Map";

const styles = {
  mainContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "3rem"
  },
  uniInfo: {
    padding: "2rem"
  },
  uniImg: {
    height: "15rem"
  },
  uniStatCard: {
    backgroundColor: "inherit",
    textAlign: "center"
  },
  dsptContainer: {
    marginTop: "3rem",
    display: "flex",
    flexWrap: "wrap"
  },
  paragraph: {
    lineHeight: "30px",
    minWidth: "15rem",
    flex: 1
  },
  contactContainer: {
    margin: "0 2rem"
  },
  map: {
    width: "15rem",
    height: "15rem"
  }
};

function University({ uid }) {
  const [university, setUniversity] = useState({});

  useEffect(() => {
    axios
      .get(`/api/super-admin/university/${uid}`)
      .then(result => setUniversity(result.data))
      .catch(err => console.log(err));
  }, [uid]);

  return (
    <Container>
      <div style={styles.mainContainer}>
        <Image
          src={
            "https://pbs.twimg.com/profile_images/914280010764230656/FUV7_3r9.jpg"
          }
          roundedCircle
          style={styles.uniImg}
        />
        <div style={styles.uniInfo}>
          <h3>University of Central Florida</h3>
          <Row>
            <Card style={styles.uniStatCard}>
              <Card.Body>
                <Card.Title>
                  <h3>55000+</h3>
                </Card.Title>
                <Card.Text>Students</Card.Text>
              </Card.Body>
            </Card>
            <Card style={styles.uniStatCard}>
              <Card.Body>
                <Card.Title>
                  <h3>12000+</h3>
                </Card.Title>
                <Card.Text>Staffs</Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </div>
      </div>

      <>
        <Container>
          <div style={styles.dsptContainer}>
            <div style={styles.paragraph}>
              <p>
                University of Central Florida is a public institution that was
                founded in 1963. It has a total undergraduate enrollment of
                58,913, its setting is suburban, and the campus size is 1,415
                acres. It utilizes a semester-based academic calendar.
                University of Central Florida's ranking in the 2020 edition of
                Best Colleges is National Universities, #166. Its in-state
                tuition and fees are $6,368; out-of-state tuition and fees are
                $22,467.
              </p>
              <p>
                The University of Central Florida is, fittingly, a school that's
                spread across the middle of the state. UCF is based in Orlando
                and has more than 10 regional campuses in locations including
                Daytona Beach, Ocala and South Lake. Freshmen at the Orlando
                campus are not required to live on campus and, because of
                limited space, those who hope to are encouraged to apply early
                for housing. There are more than 40 fraternities and sororities
                in the school's large Greek system, as well as more than 300
                other student organizations to consider joining. The UCF Knights
                compete in the NCAA Division I American Athletic Conference.
              </p>
              <p>
                The University of Central Florida has many programs for graduate
                students, too, including those through the College of Business
                Administration, College of Engineering and Computer Science and
                College of Education. Notable alumni of the University of
                Central Florida include Cheryl Hines, an actress who starred in
                HBO's "Curb Your Enthusiasm"; comedian Daniel Tosh, star of
                Comedy Central’s "Tosh.0"; and former soccer player Michelle
                Akers, a member of the National Soccer Hall of Fame.
              </p>
            </div>
            <div style={styles.contactContainer}>
              <h5>Location:</h5>
              <Map
                lat={university.latitude}
                lng={university.longtitude}
                style={styles.map}
              />
              <br />
              <h5>Contact:</h5>
              <p>407-823-2000</p>
            </div>
          </div>
        </Container>
      </>
    </Container>
  );
}

export default University;
