import React, { useState, useEffect } from "react";
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
                <h2>{society.name}</h2>
                <p>{society.description}</p>
              </Card>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Societies;
