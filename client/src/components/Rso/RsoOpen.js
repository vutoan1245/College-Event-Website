import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Form, Button, FormControl } from "react-bootstrap";

import RsoPreview from "./RsoPreview";

const styles = {
  formGroup: { display: "flex" }
};

function RsoOpen() {
  const [rsoList, setRsoList] = useState([]);
  const uid = useSelector(state => state.userData.uid);

  useEffect(() => {
    axios
      .get(`/api/student/rso/${uid}/list`)
      .then(result => setRsoList(result.data.data))
      .catch(err => console.log(err));
  }, [uid]);

  return (
    <>
      <Form.Group style={styles.formGroup}>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form.Group>
      {rsoList.map((rso, index) => (
        <RsoPreview
          key={index}
          title={rso.name}
          members={40}
          description={rso.description}
        >
          <Button>Join</Button>
        </RsoPreview>
      ))}
    </>
  );
}

export default RsoOpen;
