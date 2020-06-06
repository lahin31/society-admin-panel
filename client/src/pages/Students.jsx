import React, { useEffect, useState } from "react";
import { Table } from "element-react";
import Loader from "../components/loader/Loader";
import "./Students.scss";

const Students = (props) => {
  const [students, setStudents] = useState([]);
  const [columns, setColumns] = useState([
    { label: "Name", prop: "name" },
    { label: "Username", prop: "username" },
    { label: "Email", prop: "email" },
    { label: "Batch", prop: "batch" },
    { label: "ID", prop: "std_id" },
    { label: "Department", prop: "department" },
  ]);
  useEffect(() => {
    fetch("/student/fetch_students")
      .then((res) => res.json())
      .then((res) => {
        setStudents(res.students);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCellClick = (val) => {
    console.log(val);
  };
  return (
    <div className="students_wrapper">
      <h1>Registered Students</h1>
      {students.length === 0 ? (
        <div className="loader_wrap">
          <Loader />
        </div>
      ) : (
        <Table
          style={{ width: "100%" }}
          columns={columns}
          data={students}
          onCellClick={handleCellClick}
        />
      )}
    </div>
  );
};

export default Students;
