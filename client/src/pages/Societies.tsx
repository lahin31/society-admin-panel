import React, { useState, useEffect, useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import { Society } from '../types/society';
import Loader from '../components/loader/Loader';
import AuthContext from '../contexts/auth-context';
import './Societies.scss'

interface SocietiesProps extends RouteComponentProps<any> {}


const Societies: React.FC<SocietiesProps> = ({ history }) => {
	const [societies, setSociety] = useState<Society[]>([]);
	const [selectedSocietyId, setSelectedSocietyId] = useState<string>("");
	const [openDialogForDelete, setOpenDialogForDelete] = useState<boolean>(false);
	const context = useContext(AuthContext);

  useEffect(() => {
		let isMounted = true;
    fetch("/society/fetch_societies")
      .then((res) => res.json())
      .then((res) => {
				if(isMounted) {
					setSociety(res.societies);
				}
      })
			.catch((err) => console.log(err));
		return () => {
			isMounted = false;
		}
	}, []);

	const goToSocietyDetails = (society_id: string) => {
    history.push('society/' + society_id);
	}
	
	const deleteSociety = (): void => {
		fetch("/society/delete_society", {
			method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      body: JSON.stringify({
        society_id: selectedSocietyId,
      }),
		})
			.then(res => res.json())
			.then(res => {
				if(res.successMsg === "Successfully deleted") {
					setOpenDialogForDelete(false);
					setSelectedSocietyId("");
					setSociety(res.societies)
				}
			})
			.catch(err => console.log(err))
	}
	
	return (
		<>
			<div className="societies_wrapper">
				<h1>Societies</h1>
				{societies && societies.length === 0 ? (
					<div className="loader_wrap">
						<Loader width="80px" height="80px" />
					</div>
				) : (
					<>
						{ societies.map((society: Society) => (
							<Card variant="outlined" className="card society_card" key={society._id}>
								<CardContent>
									<div className="society_title">
										<h2 onClick={() => goToSocietyDetails(society._id)}>{society.name}</h2>
										<span
											className="delete_icon"
											onClick={() => {
												setOpenDialogForDelete(true)
												setSelectedSocietyId(society._id)
											}}
										>
											<DeleteIcon />
										</span>
									</div>
									<p>{society.description}</p>
								</CardContent>
							</Card>
						))}
					</>
				)}
			</div>
			<Dialog onClose={() => {
				setOpenDialogForDelete(false);
				setSelectedSocietyId("");
			}} aria-labelledby="simple-dialog-title" open={openDialogForDelete}>
				<DialogTitle id="simple-dialog-title">Are you sure you want to delete?</DialogTitle>
				<DialogActions>
					<Button variant="contained" color="primary" onClick={() => {
						setOpenDialogForDelete(false);
						setSelectedSocietyId("");
					}}>
						Cancel
					</Button>
					<Button variant="contained" color="secondary" onClick={deleteSociety}>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default Societies;