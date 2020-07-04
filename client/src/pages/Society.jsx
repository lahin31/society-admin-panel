import React, { useEffect, useState } from "react";
import { withRouter, useParams } from 'react-router-dom';
import "./Society.scss";

const Society = (props) => {
  const [society, setSociety] = useState({});
  const { society_id } = useParams();

  useEffect(() => {
    fetch(`/society/get_society/${society_id}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setSociety(res.society)
      })
  }, [])

  return (
    <div className="society_wrap">
      <h1 className="society_title">{society.name}</h1>
      <div className="events_wrap">
        <h2>Events <span className="add_event_btn">Add</span></h2>
        <div className="events">
          {society.events && society.events.length === 0 && <p>No events for this society</p>}
        </div>
      </div>
      <div className="notices_wrap">
        <h2>Notices <span className="add_notice_btn">Add</span></h2>
        <div className="events">
          {society.notice && society.notice.length === 0 && <p>No notices for this society</p>}
        </div>
      </div>
      <div className="members_wrap">
        <h2>Members</h2>
        <div className="members">
          {society.members && society.members.length === 0 && <p>No member for this society</p>}
        </div>
      </div>
    </div>
  );
};

export default Society;
