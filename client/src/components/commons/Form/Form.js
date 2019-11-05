import React from 'react';
import { Link } from 'react-router-dom';

import './Form.css';

function Form(props) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-8 bg-primary">
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
              <ul className="nav nav-pills mb-3" role="tablist">
                <li className="nav-item pill-register">
                  <Link to="/student/register" className="nav-link text-white">
                    REGISTER
                  </Link>
                </li>
                <li className="nav-item pill-login">
                  <Link to="/student/login" className="nav-link text-white">
                    LOGIN
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-4 bg-light">
            <nav className="navbar navbar-light bg-transparent"></nav>
            <div className="tab-content">
              <div className="tab-pane fade show active">
                <nav className="navbar navbar-light bg-transparent"></nav>

                <form className="form-service" onSubmit={props.onSubmit}>
                  {props.children}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
