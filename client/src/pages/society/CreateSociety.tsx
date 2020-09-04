import React, { useContext, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import AuthContext from "../../contexts/auth-context";
import "./CreateSociety.scss";

interface CreateSocietyProps extends RouteComponentProps<any> {}

const CreateSociety: React.FC<CreateSocietyProps> = ({ history }) => {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const context = useContext(AuthContext);

  const handleAddSociety = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch("/society/add_society", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      body: JSON.stringify({
        name,
        desc,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Added Successfully") {
          history.push("/societies");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create_society_wrapper">
      <div className="create_society_field">
        <h2>Create a new society</h2>
        <form onSubmit={handleAddSociety}>
          <TextField
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            fullWidth
            rows={3}
            value={desc}
            onChange={(ev) => setDesc(ev.target.value)}
            variant="outlined"
            required
          />
          <button type="submit" className="create_action_btn">
            Create New Society
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSociety;
