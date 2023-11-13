import React, { useState, useContext, useReducer, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatusBar from "../component/status-bar/index";
import ArrowBack from "../component/arrow-back/index";
import Alert from "../component/alert/index";
import Page from "../component/page/index";
import Title from "../component/title/index";
import Input from "../component/input/index";
import { useAuth } from "../container/AuthContext";
import { validateEmail } from "../component/Utils";

//Сторінка відновлення акаунту. Після вводу пошти, створюється
//код з підтвердженням відновлення акаунту, переводимо на
//сторінку /recovery-confirm

const RecoveryPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setEmailIsValid] = useState(true);
  const [alert, setAlert] = useState<string>("");
  const { state, dispatch } = useAuth();
  //const { state, dispatch } = useContext(AuthContext);

  //const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newEmail: string = e.target.value;
    setEmail(newEmail);
    setEmailIsValid(validateEmail(newEmail));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("email:", email);
    if (!email) {
      setAlert("Please, enter your email");
    } else {
      setEmailIsValid(validateEmail(email));
      if (isEmailValid) {
        console.log("email is valid");
        try {
          const response = await fetch("http://localhost:4000/recovery", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });

          if (response.status === 409) {
            // 'User not find'
            const responseData = await response.json();
            console.error(responseData.error);

            setAlert(responseData.error);
          }

          if (response.ok) {
            // Code confirmed
            const responseData = await response.json(); // Parse the JSON response
            console.log("Response OK responseData:", responseData);

            navigate(`/recovery-confirm?email=${email}`);
          } else {
            // Handle registration errors
            console.error("Recovery failed");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    }
  };

  return (
    <Page>
      <StatusBar color="black" />
      <ArrowBack />
      <Title title="Recover password" description="Choose a recovery method" />
      <div className="inputs">
        <form className="form" onSubmit={handleSubmit}>
          <Input
            label="Email"
            labelClassName={isEmailValid ? "input" : "input--error"}
            borderClassName={
              isEmailValid ? "input__field" : "input__field--error"
            }
            name={"email"}
            type="text"
            value={email}
            onChange={handleEmailChange}
            notice={isEmailValid ? "" : "Email is not valid"}
            autoFocus
          />
          <button className="button button-primary">Send&nbsp;code</button>
          {alert ? <Alert status="yellow" text={alert} /> : null}
        </form>
      </div>
      <Link to="/signup"></Link>
    </Page>
  );
};

export default RecoveryPage;
