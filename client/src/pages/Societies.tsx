import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Society } from '../types/society';
import Loader from '../components/loader/Loader';
import './Societies.scss'

interface SocietiesProps extends RouteComponentProps<any> {}


const Societies: React.FC<SocietiesProps> = ({ history }) => {
	const [societies, setSociety] = useState<Society[]>([]);

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
	
	return (
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
								<h2 onClick={() => goToSocietyDetails(society._id)}>{society.name}</h2>
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