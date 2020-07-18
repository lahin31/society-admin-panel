import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  Input,
  DatePicker,
  TimeSelect,
  Select,
} from "element-react";
import "./Society.scss";
import DialogComponent from "../components/dialog/Dialog";
import AuthContext from "../contexts/auth-context";

const createdByOptions = [
  { value: "cse", label: "Computer Science and Engineering" },
  { value: "eee", label: "Electrical and Electronics Engineering" },
  { value: "bba", label: "Business Administration" },
  { value: "eco", label: "Economics" },
  { value: "eng", label: "English" },
  { value: "jms", label: "Journalism and Media Studies" },
];

const Society = (props) => {
  const [society, setSociety] = useState({});
  const [eventDialogVisible, setEventDialogVisible] = useState(false);
  const [noticeDialogVisible, setNoticeDialogVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [event_date, setEventDate] = useState(null);
  const [event_time, setEventTime] = useState(null);
  const [createBy, setCreatedBy] = useState(null);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeDescription, setNoticeDescription] = useState("");
  const [noticeCreatedBy, setNoticeCreatedBy] = useState(null);
  const [eventDialogTitle, setEventDialogTitle] = useState("");
  const [noticeDialogTitle, setNoticeDialogTitle] = useState("");
  const { society_id } = useParams();
  const context = useContext(AuthContext);
  const [dept] = useState({
    cse: "Computer Science and Engineering",
    eee: "Electrical and Electronics Engineering",
    bba: "Business Administration",
    eco: "Economics",
    eng: "English",
    jms: "Journalism and Media Studies",
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

  const openDialogForAddEvent = () => {
    setEventDialogVisible(true);
    setEventDialogTitle("Add Event");
    setEventTitle("");
    setEventDesc("");
    setEventDate(null);
    setEventTime(null);
    setCreatedBy(null);
  };

  const handleAddEvent = () => {
    const newEvent = {
      title: eventTitle,
      description: eventDesc,
      date: event_date,
      time: event_time,
      createBy,
    };
    fetch("/society/add_event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      body: JSON.stringify({
        newEvent,
        society_id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setEventDialogVisible(false);
        fetch(`/society/get_society/${society_id}`)
          .then((res) => res.json())
          .then((res) => {
            setSociety(res.society);
            setEventTitle("");
            setEventDesc("");
            setEventDate(null);
            setEventTime(null);
            setCreatedBy(null);
          });
      })
      .catch((err) => console.log(err));
  };

  const fetchEventForEdit = (id) => {
    setSelectedEventId(id);
    setEventDialogVisible(true);
    setEventDialogTitle("Edit Event");
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
        setEventTitle(res.event.title);
        setEventDesc(res.event.description);
        setCreatedBy(res.event.createBy);
      })
      .catch((err) => console.log(err));
  };

  const handleEditEvent = () => {
    const updatedEvent = {
      title: eventTitle,
      description: eventDesc,
      date: event_date,
      time: event_time,
      createBy,
    };

    fetch("/society/update_event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      body: JSON.stringify({
        event_id: selectedEventId,
        society_id,
        updatedEvent,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Updated") {
          setSelectedEventId(null);
          setEventDialogVisible(false);
          fetch(`/society/get_society/${society_id}`)
            .then((res) => res.json())
            .then((res) => {
              setSociety(res.society);
            });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteEvent = (id) => {
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

  const handleAddNotice = () => {
    const newNotice = {
      title: noticeTitle,
      description: noticeDescription,
      createdBy: noticeCreatedBy,
    };

    fetch("/society/add_notice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      body: JSON.stringify({ newNotice, society_id }),
    })
      .then((res) => res.json())
      .then((res) => {
        setNoticeDialogVisible(false);
        fetch(`/society/get_society/${society_id}`)
          .then((res) => res.json())
          .then((res) => {
            setSociety(res.society);
            setNoticeTitle("");
            setNoticeDescription("");
            setNoticeCreatedBy(null);
          });
      })
      .catch((err) => console.log(err));
  };

  const handleEditNotice = (id) => {
    setNoticeDialogVisible(true);
    setNoticeDialogTitle("Edit Notice");
    fetch("/society/fetch_edit_notice", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      body: JSON.stringify({
        notice_id: id,
        society_id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setNoticeCreatedBy(res.notice.createdBy);
        setNoticeTitle(res.notice.title);
        setNoticeDescription(res.notice.description);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteNotice = (id) => {
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

  return (
    <div className="society_wrap">
      <h1 className="society_title">{society.name}</h1>
      <div className="events_wrap">
        <h2>
          Events{" "}
          <span
            className="add_event_btn"
            onClick={openDialogForAddEvent}
            tabIndex="0"
          >
            Add New
          </span>
        </h2>
        <div className="events">
          {society.events && society.events.length === 0 && (
            <p>No events for this society</p>
          )}
          {society.events &&
            society.events.length > 0 &&
            society.events.map((ev) => {
              return (
                <div className="event" key={ev._id}>
                  <div className="event_title">
                    {ev.title}
                    <span
                      className="delete_icon"
                      onClick={() => handleDeleteEvent(ev._id)}
                    >
                      X
                    </span>
                    <span
                      className="edit_icon"
                      onClick={() => fetchEventForEdit(ev._id)}
                    >
                      <i className="el-icon-edit"></i>
                    </span>
                  </div>
                  <span className="event_date_time">
                    {ev.date.substr(0, 10)}, {ev.time.substr(11, 8)}
                  </span>
                  <br />
                  <span className="event_dept">{dept[ev.createBy]}</span>
                  <p className="event_description">{ev.description}</p>
                </div>
              );
            })}
        </div>
      </div>
      <div className="notices_wrap">
        <h2>
          Notices{" "}
          <span
            className="add_notice_btn"
            onClick={() =>
              setNoticeDialogVisible(true) || setNoticeDialogTitle("Add Notice")
            }
            tabIndex="0"
          >
            Add New
          </span>
        </h2>
        <div className="notices">
          {society.notices && society.notices.length === 0 && (
            <p>No notices for this society</p>
          )}
          {society.notices &&
            society.notices.length > 0 &&
            society.notices.map((nt) => {
              return (
                <div className="notice" key={nt._id}>
                  <div className="event_title">
                    {nt.title}
                    <span
                      className="delete_icon"
                      onClick={() => handleDeleteNotice(nt._id)}
                    >
                      X
                    </span>
                    <span
                      className="edit_icon"
                      onClick={() => handleEditNotice(nt._id)}
                    >
                      <i className="el-icon-edit"></i>
                    </span>
                  </div>
                  <span className="event_dept">{dept[nt.createdBy]}</span>
                  <p className="event_description">{nt.description}</p>
                </div>
              );
            })}
        </div>
      </div>
      <DialogComponent
        title={eventDialogTitle}
        dialogVisible={eventDialogVisible}
        setDialogVisible={setEventDialogVisible}
      >
        <Dialog.Body className="dialog_body">
          <div className="form_group">
            <label htmlFor="event_title">Event Title</label>
            <Input
              placeholder="Event Title"
              id="event_title"
              className="form_control"
              value={eventTitle}
              onChange={(e) => setEventTitle(e)}
            />
          </div>
          <div className="form_group">
            <label htmlFor="event_desciption">Event Description</label>
            <Input
              type="textarea"
              placeholder="Event Description"
              id="event_desciption"
              value={eventDesc}
              onChange={(e) => setEventDesc(e)}
            />
          </div>
          <div className="form_group date_time_picker">
            <div className="date_picker">
              <label htmlFor="event_date">Date</label>
              <br />
              <DatePicker
                value={event_date}
                placeholder="Pick a date"
                onChange={(date) => setEventDate(date)}
                disabledDate={(time) => time.getTime() < Date.now() - 8.64e7}
              />
            </div>
            <div className="time_picker">
              <label htmlFor="event_time">Time</label>
              <br />
              <TimeSelect
                start="08:30"
                step="00:15"
                end="18:30"
                maxTime="12:30"
                onChange={(time) => setEventTime(time)}
                value={event_time}
                placeholder="Select time"
              />
            </div>
            <div className="event_created_by_wrap">
              <label htmlFor="created_by">Created By</label>
              <br />
              <Select
                value={createBy}
                placeholder="Created by"
                onChange={(e) => setCreatedBy(e)}
              >
                {createdByOptions.map((el) => {
                  return (
                    <Select.Option
                      key={el.value}
                      label={el.label}
                      value={el.value}
                    />
                  );
                })}
              </Select>
            </div>
          </div>
        </Dialog.Body>
        <Dialog.Footer className="dialog-footer">
          <Button onClick={() => setEventDialogVisible(false)}>Cancel</Button>
          <Button
            type="primary"
            onClick={
              eventDialogTitle === "Add Event"
                ? handleAddEvent
                : handleEditEvent
            }
          >
            {eventDialogTitle}
          </Button>
        </Dialog.Footer>
      </DialogComponent>
      <DialogComponent
        title={noticeDialogTitle}
        dialogVisible={noticeDialogVisible}
        setDialogVisible={setNoticeDialogVisible}
      >
        <Dialog.Body>
          <div className="form_group">
            <label htmlFor="notice_title">Notice Title</label>
            <Input
              placeholder="Notice Title"
              id="notice_title"
              className="form_control"
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e)}
            />
          </div>
          <div className="form_group">
            <label htmlFor="notice_desciption">Notice Description</label>
            <Input
              type="textarea"
              placeholder="Notice Description"
              id="notice_desciption"
              value={noticeDescription}
              onChange={(e) => setNoticeDescription(e)}
            />
          </div>
          <div className="event_created_by_wrap notice_created_by">
            <label htmlFor="created_by">Created By</label>
            <br />
            <Select
              value={noticeCreatedBy}
              onChange={(e) => setNoticeCreatedBy(e)}
              placeholder="Created by"
            >
              {createdByOptions.map((el) => (
                <Select.Option
                  key={el.value}
                  label={el.label}
                  value={el.value}
                />
              ))}
            </Select>
          </div>
        </Dialog.Body>
        <Dialog.Footer className="dialog-footer">
          <Button onClick={() => setNoticeDialogVisible(false)}>Cancel</Button>
          <Button type="primary" onClick={handleAddNotice}>
            Add
          </Button>
        </Dialog.Footer>
      </DialogComponent>
    </div>
  );
};

export default Society;
