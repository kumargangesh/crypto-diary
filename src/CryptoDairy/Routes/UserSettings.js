import React, { useEffect, useState } from 'react';
import "./Style.css"
import { useNavigate } from "react-router-dom";
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import NoUserFound from './NoUserFound';

function UserSettings(props) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [errorVisibility, toggleVisibilty] = useState(false);

  const [isButtonClicked, toggleButtonClicked] = useState(false);

  const [isReadonly, toggleReadonly] = useState(true);
  const [inputType, toggleInputType] = useState("password");

  useEffect(() => {
    setEmail(props.email);
    setPassword(props.password);
    console.log("in the useEffect of UseSettings, " + email, password);
  }, [props.email]);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  }

  const back = () => {
    navigate("/");
  }

  const update = () => {

    toggleButtonClicked(true);

    if (isReadonly === true) {
      toggleReadonly(false);
    } else {
      toggleReadonly(true);
    }

    if (email === "" && password === "") {
      toggleVisibilty(true);
      setErrorMessage("Enter Email and Password");
    } else if (email === "") {
      toggleVisibilty(true);
      setErrorMessage("Enter Email");
    } else if (password === "") {
      toggleVisibilty(true);
      setErrorMessage("Enter Password");
    } else {
      toggleVisibilty(false);
    }
  }

  const confirmUpdate = async () => {
    if (isButtonClicked !== true) {
      toggleVisibilty(true);
      setErrorMessage("First click on Update User");
    } else {
      toggleVisibilty(false);
      toggleReadonly(true);
      toggleButtonClicked(false);

      const auth = getAuth();

      await updatePassword(auth.currentUser, password);
      toggleVisibilty(true);
      setErrorMessage("User updated successfully");

    }
  }

  const deleteuser = async () => {
    if (window.confirm("Are you sure to delete user...") === true) {
      const user = getAuth();
      await user.currentUser.delete();
      toggleVisibilty(true);
      setErrorMessage("User deleted successfully");
    }
  }

  const toggleType = () => {
    if (inputType === "password") {
      toggleInputType("text");
    } else {
      toggleInputType("password");
    }
  }

  return (
    <div>
      {
        props.email === "S" ?
          <NoUserFound />
          :
          <div className="usersettings">

            <input
              type="email"
              className="username"
              value={email}
              onChange={emailHandler}
              readOnly
            />

            <div className="inputandswitch">

              <input
                type={inputType}
                className="form-control password"
                value={password}
                placeholder="Password"
                onChange={passwordHandler}
                aria-describedby="basic-addon1"
                readOnly={isReadonly}
              />

              <div class="form-check form-switch">
                <input
                  class="form-check-input switch"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onClick={toggleType}
                />
              </div>

            </div>

            <center><p style={{
              color: "red",
              visibility: errorVisibility === true ? "visible" : "hidden"
            }}>{errorMessage}</p></center>

            <div className="d-flex justify-content-between buttonsBox">

              <button
                className="btn btn-outline-success"
                onClick={update}>
                UPDATE USER
              </button>

              <button
                className="btn btn-outline-success"
                onClick={confirmUpdate}>
                CONFIRM UPDATE
              </button>

              <button
                className="btn btn-outline-success"
                onClick={deleteuser}>
                DELETE USER
              </button>

            </div>

          </div>
      }
    </div>
  )
}


export default UserSettings;