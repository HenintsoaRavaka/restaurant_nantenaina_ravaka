import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import App from "./App";
import Contact from "./Contact";
import Restaurant from "./Restaurant";
import * as serviceWorker from "./serviceWorker";
import Notfound from "./Notfound";
import Recherche from "./Recherche";
import Menu from "./menu";
import Panier from "./Panier";
import { Container, Row, Col, Nav } from "react-bootstrap";

localStorage.setItem("menu", JSON.stringify([]));
localStorage.setItem("plat", JSON.stringify([]));

const routing = (
  <Router>
    <header className="header">
      <Container>
        <Row>
          <Col>
            <div className="header_content d-flex flex-row align-items-center justify-content-start">
              <div className="logo">
                <NavLink exact activeClassName="active" to="/">
                  <div>Les Restaurants</div>
                  <div>__</div>
                </NavLink>
              </div>
              <Nav className="main_nav">
                <ul className="d-flex flex-row align-items-center justify-content-start">
                  <li>
                    <NavLink exact activeClassName="active" to="/">
                      Accueil
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/contact">
                      A propos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/contact">
                      Contact
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/recherche">
                      Rechercher
                    </NavLink>
                  </li>
                </ul>
              </Nav>
              <div className="reservations_phone ml-auto">
                <NavLink activeClassName="active" to="/panier">
                  Mon panier
                </NavLink>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/contact" component={Contact} />
      <Route path="/restaurants/:id" component={Restaurant} />
      <Route path="/recherche" component={Recherche} />
      <Route path="/menu" component={Menu} />
      <Route path="/panier" component={Panier} />
      <Route component={Notfound} />
    </Switch>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();
