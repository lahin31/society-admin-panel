import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import DialogActions from "@material-ui/core/DialogActions";
import { Society, Event, Notice } from "../../types/society";
import { tConvert } from "../../helpers/TimeConvert";
import "./Society.scss";

interface DeptType {
  cse: string;
  eee: string;
  bba: string;
  eco: string;
  eng: string;
  jms: string;
}

const createdByOptions = [
  { value: "cse", label: "Computer Science and Engineering" },
  { value: "eee", label: "Electrical and Electronics Engineering" },
  { value: "bba", label: "Business Administration" },
  { value: "eco", label: "Economics" },
  { value: "eng", label: "English" },
  { value: "jms", label: "Journalism and Media Studies" },
];

const SocietyPage = () => {
  const [society, setSociety] = useState<Society>({
    description: "",
    events: [],
    name: "",
    notices: [],
    _id: "",
  });
  const { society_id } = useParams();
  const context = useContext(AuthContext);
  const [dept] = useState<DeptType>({
    cse: "Computer Science and Engineering",
    eee: "Electrical and Electronics Engineering",
    bba: "Business Administration",
    eco: "Economics",
    eng: "English",
    jms: "Journalism and Media Studies",
  });
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [eventDialogVisible, setEventDialogVisible] = useState<boolean>(false);
  const [noticeDialogVisible, setNoticeDialogVisible] = useState<boolean>(
    false
  );
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventDesc, setEventDesc] = useState<string>("");
  const [event_date, setEventDate] = useState<string>("");
  const [event_time, setEventTime] = useState<string>("");
  const [createBy, setCreatedBy] = useState<any>("");
  const [noticeTitle, setNoticeTitle] = useState<string>("");
  const [noticeDescription, setNoticeDescription] = useState<string>("");
  const [eventDialogTitle, setEventDialogTitle] = useState<string>("");
  const [noticeDialogTitle, setNoticeDialogTitle] = useState<string>("");
  const [noticeCreatedBy, setNoticeCreatedBy] = useState<any>("");
  const [selectedNoticeId, setSelectedNoticeId] = useState<string>("");

  useEffect(() => {
    document.title = 'Society';
    let isMounted = true;
    fetch(`/society/get_society/${society_id}`)
      .then((res) => res.json())
      .then((res) => {
        if (isMounted) {
          setSociety(res.society);
          document.title = res.society.name;
        }
      });
    return () => {
      // eslint-disable-next-line
      isMounted = false;
    };
  }, [society_id]);

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
            makeEventPropertyEmpty();
          });
      })
      .catch((err) => console.log(err));
  };

  const fetchEventForEdit = (id: string) => {
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
        const { title, description, date, time, createBy } = res.event;
        setEventTitle(title);
        setEventDesc(description);
        setEventDate(date);
        setEventTime(time);
        setCreatedBy(createBy);
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
          // setSelectedEventId(null);
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

  const fetchNoticeForEdit = (id: string) => {
    setNoticeDialogTitle("Edit Notice");
    setNoticeDialogVisible(true);
    setSelectedNoticeId(id);
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
            setNoticeCreatedBy("");
          });
      })
      .catch((err) => console.log(err));
  };

  const updateNotice = () => {
    const updatedNotice = {
      title: noticeTitle,
      description: noticeDescription,
      createdBy: noticeCreatedBy,
    };

    fetch("/society/update_notice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      body: JSON.stringify({
        notice_id: selectedNoticeId,
        society_id,
        updatedNotice,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Updated") {
          setSelectedNoticeId("");
          setNoticeDialogVisible(false);
          makeNoticePropertyEmpty();
          fetch(`/society/get_society/${society_id}`)
            .then((res) => res.json())
            .then((res) => {
              setSociety(res.society);
            });
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

  const makeEventPropertyEmpty = (): void => {
    setEventTitle("");
    setEventDesc("");
    setEventDate("");
    setEventTime("");
    setCreatedBy("");
  };

  const makeNoticePropertyEmpty = (): void => {
    setNoticeTitle("");
    setNoticeDescription("");
    setNoticeCreatedBy("");
  };

  function generateDept<DeptType, K extends keyof DeptType>(
    dept: DeptType,
    dept_str: K
  ) {
    return dept[dept_str];
  }

  const handleDialogForEditEvent = () => {
    setEventDialogVisible(false);
  };

  const handleDialogForEditNotice = () => {
    setNoticeDialogVisible(false);
  };

  const openDialogForAddEvent = () => {
    setEventDialogVisible(true);
    setEventDialogTitle("Add Event");
    makeEventPropertyEmpty();
  };

  const openDialogForNotice = () => {
    makeNoticePropertyEmpty();
    setNoticeDialogVisible(true);
    setNoticeDialogTitle("Add Notice");
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
            // tabIndex="0"
          >
            Add New
          </span>
        </h2>
        <div className="events">
          {society?.events && society.events.length === 0 && (
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
                    {ev.date.substr(0, 10)}, {tConvert(ev.time)}
                  </span>
                  <br />
                  <span className="event_dept">
                    {generateDept(dept, ev.createBy)}
                  </span>
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
            onClick={openDialogForNotice}
            // tabIndex="0"
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
            society.notices.map((nt: Notice) => {
              return (
                <div className="notice" key={nt._id}>
                  <div className="event_title">
                    {nt.title}
                    <span
                      className="delete_icon"
                      onClick={() => handleDeleteNotice(nt._id)}
                    >
                      <DeleteIcon />
                    </span>
                    <span
                      className="edit_icon"
                      onClick={() => fetchNoticeForEdit(nt._id)}
                    >
                      <EditIcon />
                    </span>
                  </div>
                  <span className="event_dept">
                    {generateDept(dept, nt.createdBy)}
                  </span>
                  <p className="event_description">{nt.description}</p>
                </div>
              );
            })}
        </div>
      </div>
      <Dialog
        open={eventDialogVisible}
        onClose={handleDialogForEditEvent}
        aria-labelledby="form-dialog-title"
        className="dialog_box event_dialog_box"
      >
        <DialogTitle id="form-dialog-title">{eventDialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            id="eventTitle"
            label="Event Title"
            value={eventTitle}
            onChange={(ev) => setEventTitle(ev.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            className="event_field desc"
            id="outlined-multiline-static"
            label="Event Description"
            multiline
            rows={4}
            value={eventDesc}
            onChange={(ev) => setEventDesc(ev.target.value)}
            variant="outlined"
            fullWidth
          />
          <div className="time_and_date_wrapper">
            <TextField
              id="date"
              label="Event Date"
              type="date"
              value={event_date}
              className="event_date_time"
              onChange={(ev) => setEventDate(ev.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="time"
              label="Event Time"
              type="time"
              value={event_time}
              className="event_date_time time_picker"
              onChange={(ev) => setEventTime(ev.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="created_by_wrapper">
            <InputLabel id="demo-simple-select-label">Created By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={createBy}
              onChange={(ev) => setCreatedBy(ev.target.value)}
            >
              {createdByOptions.map((createBy) => (
                <MenuItem value={createBy.value} key={createBy.value}>
                  {createBy.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEventDialogVisible(false)}>Cancel</Button>
          <Button
            onClick={
              eventDialogTitle === "Add Event"
                ? handleAddEvent
                : handleEditEvent
            }
          >
            {eventDialogTitle}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={noticeDialogVisible}
        onClose={handleDialogForEditNotice}
        aria-labelledby="form-dialog-title"
        className="dialog_box event_dialog_box"
      >
        <DialogTitle id="form-dialog-title">{noticeDialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            id="noticeTitle"
            label="Notice Title"
            value={noticeTitle}
            onChange={(ev) => setNoticeTitle(ev.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            className="notice_field desc"
            id="outlined-multiline-static"
            label="Notice Description"
            multiline
            rows={4}
            value={noticeDescription}
            onChange={(ev) => setNoticeDescription(ev.target.value)}
            variant="outlined"
            fullWidth
          />
          <div className="created_by_wrapper">
            <InputLabel id="demo-simple-select-label">Created By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={noticeCreatedBy}
              onChange={(ev) => setNoticeCreatedBy(ev.target.value)}
            >
              {createdByOptions.map((createBy) => (
                <MenuItem value={createBy.value} key={createBy.value}>
                  {createBy.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoticeDialogVisible(false)}>Cancel</Button>
          <Button
            onClick={
              noticeDialogTitle === "Add Notice"
                ? handleAddNotice
                : updateNotice
            }
          >
            {noticeDialogTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SocietyPage;
