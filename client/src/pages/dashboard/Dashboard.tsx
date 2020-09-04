import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Society } from "../../types/society";
import { Student } from "../../types/student";
import "./Dashboard.scss";

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [societies, setSociety] = useState<Society[]>([]);

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
        <Card variant="outlined" className="card student_card">
          <CardContent>
            <h2>{students.length} students</h2>
          </CardContent>
        </Card>
        <Card variant="outlined" className="card student_card">
          <CardContent>
            <h2>{societies.length} society</h2>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
