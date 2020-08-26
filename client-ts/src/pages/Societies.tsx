import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Society } from '../types/society';
import Loader from '../components/loader/Loader';
import './Societies.scss'

const Societies: React.FC = () => {
	const [societies, setSociety] = useState<Society[]>([]);

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
					<Loader width="80px" height="80px" />
				</div>
			) : (
				<>
					{ societies.map(society => (
						<Card variant="outlined" className="card society_card" key={society._id}>
							<CardContent>
								<h2>{society.name}</h2>
								<p>{society.description}</p>
							</CardContent>
						</Card>
					))}
				</>
			)}
		</div>
	)
}

export default Societies;