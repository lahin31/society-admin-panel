import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Student } from '../types/student';
import Loader from '../components/loader/Loader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Students.scss'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Students = () => {
	const [students, setStudents] = useState<Student[]>([]);
  const [columns] = useState([
    { label: "Name", prop: "name" },
    { label: "Username", prop: "username" },
    { label: "Email", prop: "email" },
    { label: "Batch", prop: "batch" },
    { label: "ID", prop: "std_id" },
    { label: "Department", prop: "department" },
	]);
	const classes = useStyles();
	
	useEffect(() => {
    fetch("/student/fetch_students")
      .then((res) => res.json())
      .then((res) => {
				console.log(res.students)
        setStudents(res.students);
      })
      .catch((err) => {
        console.log(err);
      });
	}, []);
	
	return (
		<div className="students_wrapper">
			<h1>Registered Students</h1>
			{students.length === 0 ? <div className="loader_wrap">
				<Loader width="80px" height="80px" />
			</div> : (
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
							</TableRow>
						</TableHead>
						<TableBody>
							{students.map((student) => (
								<TableRow key={student.name}>
									<TableCell component="th" scope="student">
										{student.name}
									</TableCell>
									<TableCell align="left">{student.username}</TableCell>
									<TableCell align="left">{student.email}</TableCell>
									<TableCell align="left">{student.batch}</TableCell>
									<TableCell align="left">{student.std_id}</TableCell>
									<TableCell align="left">{student.department}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</div>
	)

}

export default Students;