import React, { useState, useEffect, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import { Society } from "../types/society";
import Loader from "../components/loader/Loader";
import AuthContext from "../contexts/auth-context";
import "./Societies.scss";

interface SocietiesProps extends RouteComponentProps<any> {}

const Societies: React.FC<SocietiesProps> = ({ history }) => {
  const [societies, setSocieties] = useState<Society[]>([]);
  const [society_name, setSocietyName] = useState<string>("");
  const [society_description, setSocietyDescription] = useState<string>("");
  const [selectedSocietyId, setSelectedSocietyId] = useState<string>("");
  const [openDialogForDelete, setOpenDialogForDelete] = useState<boolean>(
    false
  );
  const [openDialogForEdit, setOpenDialogForEdit] = useState<boolean>(false);
  const context = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    fetch("/society/fetch_societies")
      .then((res) => res.json())
      .then((res) => {
        if (isMounted) {
          setSocieties(res.societies);
        }
      })
      .catch((err) => console.log(err));
    return () => {
      isMounted = false;
    };
  }, []);

  const goToSocietyDetails = (society_id: string) => {
    history.push("society/" + society_id);
  };

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
      .then((res) => res.json())
      .then((res) => {
        if (res.successMsg === "Successfully deleted") {
          setOpenDialogForDelete(false);
          setSelectedSocietyId("");
          setSocieties(res.societies);
        }
      })
      .catch((err) => console.log(err));
  };

  const updateSociety = (): void => {
    setOpenDialogForEdit(false);
    fetch("/society/update_society", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      body: JSON.stringify({
        society_id: selectedSocietyId,
        society_name,
        society_description,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Updated") {
          fetch("/society/fetch_societies")
            .then((res) => res.json())
            .then((res) => {
              setSocieties(res.societies);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchSocietyForEdit = (society_id: string): void => {
    setOpenDialogForEdit(true);
    setSelectedSocietyId(society_id);
    setSocietyName("");
    setSocietyDescription("");
    fetch("/society/fetch_society_for_edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      body: JSON.stringify({
        society_id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setSocietyName(res.society.name);
        setSocietyDescription(res.society.description);
      })
      .catch((err) => console.log(err));
  };

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
            {societies.map((society: Society) => (
              <Card
                variant="outlined"
                className="card society_card"
                key={society._id}
              >
                <CardContent>
                  <div className="society_title">
                    <h2 onClick={() => goToSocietyDetails(society._id)}>
                      {society.name}
                    </h2>
                    <div className="society_actions">
                      <span
                        className="edit_icon"
                        onClick={() => fetchSocietyForEdit(society._id)}
                      >
                        <EditIcon />
                      </span>
                      <span
                        className="delete_icon"
                        onClick={() => {
                          setOpenDialogForDelete(true);
                          setSelectedSocietyId(society._id);
                        }}
                      >
                        <DeleteIcon />
                      </span>
                    </div>
                  </div>
                  <p>{society.description}</p>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
      <Dialog
        onClose={() => {
          setOpenDialogForDelete(false);
          setSelectedSocietyId("");
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
              setSelectedSocietyId("");
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="secondary" onClick={deleteSociety}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={() => {
          setOpenDialogForEdit(false);
        }}
        open={openDialogForEdit}
      >
        <DialogTitle id="simple-dialog-title">Edit Society</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="society_title"
            label="Society Title"
            value={society_name}
            onChange={(ev) => setSocietyName(ev.target.value)}
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="event_description"
            label="Event Description"
            value={society_description}
            onChange={(ev) => setSocietyDescription(ev.target.value)}
            multiline
            rows={4}
            variant="outlined"
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDialogForEdit(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={updateSociety}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Societies;
