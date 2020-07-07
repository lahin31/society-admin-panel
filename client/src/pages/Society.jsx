import React, { useEffect, useState } from "react";
import { withRouter, useParams } from 'react-router-dom';
import { Button, Dialog, Input, DatePicker, TimeSelect, Select } from "element-react";
import "./Society.scss";
import DialogComponent from "../components/dialog/Dialog";

const createdByOptions = [
  { value: 'cse', label: 'Computer Science and Engineering' },
  { value: 'eee', label: 'Electrical and Electronics Engineering' },
  { value: 'bba', label: 'Business Administration' },
  { value: 'eco', label: 'Economics' },
  { value: 'eng', label: 'English' },
  { value: 'jms', label: 'Journalism and Media Studies' }
]

const Society = (props) => {
  const [society, setSociety] = useState({});
  const [eventDialogVisible, setEventDialogVisible] = useState(false);
  const [noticeDialogVisible, setNoticeDialogVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [event_date, setEventDate] = useState(null);
  const [event_time, setEventTime] = useState(null);
  const [createBy, setCreatedBy] = useState(null)
  const { society_id } = useParams();
  const [dept] = useState({
    cse: "Computer Science and Engineering",
    eee: "Electrical and Electronics Engineering",
    bba: "Business Administration",
    eco: "Economics",
    eng: "English",
    jms: "Journalism and Media Studies"
  });

  useEffect(() => {
    fetch(`/society/get_society/${society_id}`)
      .then(res => res.json())
      .then(res => {
        setSociety(res.society)
      })
  }, [society_id])

  const handleAddEvent = () => {
    const newEvent = {
      title: eventTitle,
      description: eventDesc,
      date: event_date,
      time: event_time,
      createBy
    }
    fetch('/society/add_event', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newEvent,
        society_id
      }),
    })
      .then(res => res.json())
      .then(res => {
        setEventDialogVisible(false);
        fetch(`/society/get_society/${society_id}`)
          .then(res => res.json())
          .then(res => {
            setSociety(res.society)
            setEventTitle("");
            setEventDesc("");
            setEventDate(null);
            setEventTime(null);
            setCreatedBy(null);
          })
      })
      .catch(err => console.log(err))
  }

  const handleDeleteEvent = id => {
    fetch('/society/delete_socity_event', {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: id,
        society_id
      }),
    })
      .then(res => res.json())
      .then(res => {
        if(res.message === "Deleted") {
          fetch(`/society/get_society/${society_id}`)
            .then(res => res.json())
            .then(res => {
              setSociety(res.society)
            })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleAddNotice = () => {}

  return (
    <div className="society_wrap">
      <h1 className="society_title">{society.name}</h1>
      <div className="events_wrap">
        <h2>Events <span className="add_event_btn" onClick={() => setEventDialogVisible(true)}>Add New</span></h2>
        <div className="events">
          {society.events && society.events.length === 0 && <p>No events for this society</p>}
          {society.events && society.events.map(ev => {
            return (
              <div className="event" key={ev._id}>
                <div className="event_title">{ev.title}<span className="delete_icon" onClick={() => handleDeleteEvent(ev._id)}>X</span></div>
                <span className="event_date_time">{ev.date.substr(0, 10)}, {ev.time.substr(11, 8)}</span><br />
                <span className="event_dept">{dept[ev.createBy]}</span>
                <p className="event_description">{ev.description}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="notices_wrap">
        <h2>Notices <span className="add_notice_btn" onClick={() => setNoticeDialogVisible(true)}>Add New</span></h2>
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
      <DialogComponent title="Add Event" dialogVisible={eventDialogVisible} setDialogVisible={setEventDialogVisible}>
        <Dialog.Body className="dialog_body">
          <div className="form_group">
            <label htmlFor="event_title">Event Title</label>
            <Input 
              placeholder="Event Title" 
              id="event_title" 
              className="form_control"
              value={eventTitle}
              onChange={e => setEventTitle(e)} />
          </div>
          <div className="form_group">
            <label htmlFor="event_desciption">Event Description</label>
            <Input 
              type="textarea" 
              placeholder="Event Description" 
              id="event_desciption"
              value={eventDesc}
              onChange={e => setEventDesc(e)} />
          </div>
          <div className="form_group date_time_picker">
            <div className="date_picker">
              <label htmlFor="event_date">Date</label><br/>
              <DatePicker
                value={event_date}
                placeholder="Pick a date"
                onChange={date=> setEventDate(date)}
                disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
              />
            </div>
            <div className="time_picker">
              <label htmlFor="event_time">Time</label><br />
              <TimeSelect
                start="08:30"
                step="00:15"
                end="18:30"
                maxTime="12:30"
                onChange={time => setEventTime(time)}
                value={event_time}
                placeholder="Select time"
              />
            </div>
            <div className="event_created_by_wrap">
              <label htmlFor="created_by">Created By</label><br />
              <Select value={createBy} placeholder="Created by" onChange={e => setCreatedBy(e)}>
                {
                  createdByOptions.map(el => {
                    return <Select.Option key={el.value} label={el.label} value={el.value} />
                  })
                }
              </Select>
            </div>
          </div>
        </Dialog.Body>
        <Dialog.Footer className="dialog-footer">
          <Button onClick={ () => setEventDialogVisible(false) }>Cancel</Button>
          <Button type="primary" onClick={ handleAddEvent }>Add</Button>
        </Dialog.Footer>
      </DialogComponent>
      <DialogComponent title="Add Notice" dialogVisible={noticeDialogVisible} setDialogVisible={setNoticeDialogVisible}>
        <Dialog.Body>
          <div className="form_group">
            <label htmlFor="notice_title">Notice Title</label>
            <Input placeholder="Notice Title" id="notice_title" className="form_control" required />
          </div>
          <div className="form_group">
            <label htmlFor="notice_desciption">Notice Description</label>
            <Input type="textarea" placeholder="Notice Description" id="notice_desciption" required />
          </div>
          <div className="event_created_by_wrap notice_created_by">
            <label htmlFor="created_by">Created By</label><br />
            <Select value={createBy} placeholder="Created by">
              { createdByOptions.map(el =>  <Select.Option key={el.value} label={el.label} value={el.value} />) }
            </Select>
          </div>
        </Dialog.Body>
        <Dialog.Footer className="dialog-footer">
          <Button onClick={ () => setNoticeDialogVisible(false) }>Cancel</Button>
          <Button type="primary" onClick={ () => setNoticeDialogVisible(false) }>Add</Button>
        </Dialog.Footer>
      </DialogComponent>
    </div>
  );
};

export default Society;
