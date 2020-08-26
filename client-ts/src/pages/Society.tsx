import React, { useEffect, useState, useContext } from 'react'
import { useParams } from "react-router-dom";
import AuthContext from '../contexts/auth-context';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Society, Event } from '../types/society';
import './Society.scss';

interface DeptType {
	"cse": string;
	"eee": string;
	"bba": string;
	"eco": string;
	"eng": string;
	"jms": string;
}

const SocietyPage = () => {
	const [society, setSociety] = useState<Society>({
		description: "",
		events: [],
		name: "",
		notices: [],
		_id: ""
	});
	const { society_id } = useParams();
	const context = useContext(AuthContext);
	const [dept] = useState<DeptType>({
    "cse": "Computer Science and Engineering",
    "eee": "Electrical and Electronics Engineering",
    "bba": "Business Administration",
    "eco": "Economics",
    "eng": "English",
    "jms": "Journalism and Media Studies",
  });

	useEffect(() => {
    let isMounted = true;
    fetch(`/society/get_society/${society_id}`)
      .then((res) => res.json())
      .then((res) => {
        if (isMounted) {
          setSociety(res.society);
        }
      });
    return () => {
      // eslint-disable-next-line
      isMounted = false;
    };
	}, [society_id]);

	const fetchEventForEdit = (id: string) => {
    // setSelectedEventId(id);
    // setEventDialogVisible(true);
    // setEventDialogTitle("Edit Event");
    fetch("/society/fetch_edit_event", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      body: JSON.stringify({
        event_id: id,
        society_id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // setEventTitle(res.event.title);
        // setEventDesc(res.event.description);
        // setCreatedBy(res.event.createBy);
      })
      .catch((err) => console.log(err));
  };

	const handleDeleteEvent = (id: string) => {
    fetch("/society/delete_society_event", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      body: JSON.stringify({
        event_id: id,
        society_id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Deleted") {
          fetch(`/society/get_society/${society_id}`)
            .then((res) => res.json())
            .then((res) => setSociety(res.society))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

	const handleDeleteNotice = (id: string) => {
    fetch("/society/delete_society_notice", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      body: JSON.stringify({
        notice_id: id,
        society_id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Deleted") {
          fetch(`/society/get_society/${society_id}`)
            .then((res) => res.json())
            .then((res) => setSociety(res.society))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
	};
	
	function generateDept<DeptType, K extends keyof DeptType>(dept: DeptType, dept_str: K) {
		return dept[dept_str];	
	}
	
	return (
		<div className="society_wrap">
			<h1 className="society_title">{society.name}</h1>
			<div className="events_wrap">
				<div className="events">
				{society.events && society.events.length === 0 && (
					<p>No events for this society</p>
				)}
				{society.events &&
					society.events.length > 0 &&
					society.events.map((ev: Event) => {
						return (
							<div className="event" key={ev._id}>
								<div className="event_title">
									{ev.title}
									<span
										className="delete_icon"
										onClick={() => handleDeleteEvent(ev._id)}
									>
										<DeleteIcon />
									</span>
									<span
										className="edit_icon"
										onClick={() => fetchEventForEdit(ev._id)}
									>
										<EditIcon />
									</span>
								</div>
								<span className="event_date_time">
									{ev.date.substr(0, 10)}, {ev.time.substr(11, 8)}
								</span>
								<br />
								<span className="event_dept">{generateDept(dept, ev.createBy)}</span>
								<p className="event_description">{ev.description}</p>
							</div>
						);
					})}	
				</div>	
      </div>
		</div>
	)
}

export default SocietyPage;