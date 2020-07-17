import React, { useEffect, useState } from "react";
import { Card } from "element-react";
import "./Dashboard.scss";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [societies, setSociety] = useState([]);

  useEffect(() => {
    fetch("/student/fetch_students")
      .then((res) => res.json())
      .then((res) => {
        setStudents(res.students);
      })
      .catch((err) => console.log(err));

    fetch("/society/fetch_societies")
      .then((res) => res.json())
      .then((res) => {
        setSociety(res.societies);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard_wrapper">
      <div className="main_content">
        <Card
          className="box-card"
          header={
            <div className="clearfix">
              <h1>{students.length} Students</h1>
            </div>
          }
        ></Card>
        <Card
          className="box-card"
          header={
            <div className="clearfix">
              <h1>{societies.length} Societies</h1>
            </div>
          }
        ></Card>
      </div>
    </div>
  );
};

export default Dashboard;
