import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Student } from "../types/student";
import Loader from "../components/loader/Loader";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

import AuthContext from "../contexts/auth-context";
import "./Students.scss";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [openDialogForDelete, setOpenDialogForDelete] = useState<boolean>(
    false
  );
  const classes = useStyles();
  const context = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    fetch("/student/fetch_students")
      .then((res) => res.json())
      .then((res) => {
        if (isMounted) {
          setStudents(res.students);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const removeStudent = () => {
    fetch("/student/remove_student", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      body: JSON.stringify({
        student_id: selectedStudentId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Successfully deleted" && res.students) {
          setOpenDialogForDelete(false);
          setStudents(res.students);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="students_wrapper">
        <h1>Registered Students</h1>
        {students.length === 0 ? (
          <div className="loader_wrap">
            <Loader width="80px" height="80px" />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Batch</TableCell>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Department</TableCell>
                  <TableCell align="left">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell component="th" scope="student">
                      {student.name}
                    </TableCell>
                    <TableCell align="left">{student.username}</TableCell>
                    <TableCell align="left">{student.email}</TableCell>
                    <TableCell align="left">{student.batch}</TableCell>
                    <TableCell align="left">{student.std_id}</TableCell>
                    <TableCell align="left">{student.department}</TableCell>
                    <TableCell align="left" className="delete_icon_wrap">
                      <DeleteIcon
                        onClick={() => {
                          setOpenDialogForDelete(true);
                          setSelectedStudentId(student._id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <Dialog
        onClose={() => {
          setOpenDialogForDelete(false);
          setSelectedStudentId("");
        }}
        aria-labelledby="simple-dialog-title"
        open={openDialogForDelete}
      >
        <DialogTitle id="simple-dialog-title">
          Are you sure you want to delete?
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenDialogForDelete(false);
              setSelectedStudentId("");
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="secondary" onClick={removeStudent}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Students;
