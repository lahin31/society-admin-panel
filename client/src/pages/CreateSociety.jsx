import React, { useContext, useState } from "react";
import "./CreateSociety.scss";
import { Input } from "element-react";
import AuthContext from "../contexts/auth-context";

const CreateSociety = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const context = useContext(AuthContext);

  const handleAddSociety = (e) => {
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
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create_society_wrapper">
      <div className="create_society_field">
        <h2>Create a new society</h2>
        <form onSubmit={handleAddSociety}>
          <div className="form-group">
            <Input
              type="text"
              placeholder="Society Name"
              id="name"
              value={name}
              onChange={(e) => setName(e)}
            />
          </div>
          <div className="form-group">
            <Input
              type="textarea"
              autosize={{ minRows: 2, maxRows: 4 }}
              placeholder="Society Description"
              value={desc}
              onChange={(e) => setDesc(e)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="create_action_btn">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSociety;
