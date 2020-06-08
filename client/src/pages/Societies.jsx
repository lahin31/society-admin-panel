import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { Card, Button } from "element-react";
import Loader from "../components/loader/Loader";
import "./Societies.scss";

const Societies = (props) => {
  const [societies, setSociety] = useState([]);

  useEffect(() => {
    fetch("/society/fetch_societies")
      .then((res) => res.json())
      .then((res) => {
        setSociety(res.societies);
      })
      .catch((err) => console.log(err));
  }, []);

  const goToSocietyDetails = society_id => {
    props.history.push('society/' + society_id);
  }

  return (
    <div className="societies_wrapper">
      <h1>Societies</h1>
      {societies.length === 0 ? (
        <div className="loader_wrap">
          <Loader />
        </div>
      ) : (
        <>
          {societies.map((society) => {
            return (
              <Card className="box-card" key={society._id}>
                <h2 onClick={() => goToSocietyDetails(society._id)}>{society.name}</h2>
                <p>{society.description}</p>
              </Card>
            );
          })}
        </>
      )}
    </div>
  );
};

export default withRouter(Societies);
