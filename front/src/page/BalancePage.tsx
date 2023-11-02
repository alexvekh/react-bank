import React from "react";
import { Link } from "react-router-dom";
import StatusBar from "../component/status-bar";

//На цій сторінці ми створюємо верстку та розміщуємо дві
//кнопки-посилання на сторінку /signup та сторінку /signin
const BalancePage: React.FC = () => {
  return (
    <div className="balance-page">
      <div className="balance-control">
        <StatusBar color="white" />
        <div className="balance__settings">
          <div className="balance__nav-button">
            <img src="./svg/settings.svg" alt="settings-button" />
          </div>
          <h1 className="balance__title">Main wallet</h1>
          <div className="balance__nav-button">
            <img src="./svg/bell.svg" alt="notifications button" />
          </div>
        </div>
        <div className="balance__count"> $ 100.20</div>
        <div className="balance__actions">
          <div className="balance__button">
            <div className="balance__button-icon">
              <img src="./svg/recive.svg" alt="receive-button" />
            </div>
            <p className="balance__button-text">Receive</p>
          </div>

          <div className="balance__button">
            <div className="balance__button-icon">
              <img src="./svg/send.svg" alt="send button" />
            </div>
            <p className="balance__button-text">Send</p>
          </div>
        </div>
      </div>

      <div className="balance__transactions">
        <Link className="balance__transaction" to="/signup">
          Sign Up{" "}
        </Link>
        <Link className="balance__transaction" to="/signin">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default BalancePage;
