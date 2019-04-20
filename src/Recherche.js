import React from "react";
import Specialite from "./modules/components/specialite";
import Type from "./modules/components/type";
import base from "./Base";
import Restaurant from "./modules/components/Restaurants";
import { Col, Container, Row, Button, Card } from "react-bootstrap";

class Recherche extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      specialite: [],
      type: [],
      restaurantsInit: [],
      service: []
    };
    this.listeSpecialite = [];
    this.listeType = [];
  }
  componentWillMount() {
    this.ref = base.syncState("specialite", {
      context: this,
      state: "specialite"
    });
    this.ref = base.syncState("type", {
      context: this,
      state: "type"
    });
    this.ref = base.syncState("restaurants", {
      context: this,
      state: "restaurantsInit"
    });
    this.ref = base.syncState("service", {
      context: this,
      state: "service"
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  handleChange(e) {
    let type = e.target.name;
    let valuecheck = Number(e.target.value);
    switch (type) {
      case "specialite":
        let filtered = this.listeSpecialite;
        if (this.listeSpecialite.includes(valuecheck)) {
          filtered = this.listeSpecialite.filter(function(value, index, arr) {
            return value !== valuecheck;
          });
        } else {
          this.listeSpecialite.push(valuecheck);
        }
        this.listeSpecialite = filtered;
        break;
      case "type":
        filtered = this.listeType;
        if (this.listeType.includes(valuecheck)) {
          filtered = this.listeType.filter(function(value, index, arr) {
            return value !== valuecheck;
          });
        } else {
          this.listeType.push(valuecheck);
        }
        this.listeType = filtered;
        break;
      default:
        break;
    }
  }
  rechercher() {
    this.setState({ restaurants: [] });
    let listeresto = [...this.state.restaurantsInit];
    let result = [];

    if (this.listeSpecialite.length === 0 && this.listeType.length !== 0) {
      this.listeSpecialite = Object.keys(this.state.specialite);
    } else if (
      this.listeSpecialite.length !== 0 &&
      this.listeType.length === 0
    ) {
      this.listeType = Object.keys(this.state.type);
    }

    this.listeSpecialite.forEach(
      function(element) {
        listeresto = listeresto.filter(d => d.specialite === Number(element));
        Object.keys(listeresto).map((key, index) => {
          result.push(listeresto[key]);
        });
        listeresto = [...this.state.restaurantsInit];
      }.bind(this)
    );

    let copieResult = [...result];
    let restaurants = [];

    this.listeType.forEach(function(element) {
      copieResult = copieResult.filter(d => d.type === Number(element));
      Object.keys(copieResult).map((key, index) => {
        restaurants.push(copieResult[key]);
      });
      copieResult = [...result];
    });

    this.listeSpecialite = [];
    this.listeType = [];
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach(el => (el.checked = false));
    this.setState({ restaurants });
  }
  render() {
    let { specialite, type, restaurants, service } = this.state;
    let listeSpecialite = Object.keys(specialite).map((key, index) => {
      let el = specialite[key];
      return (
        <Specialite
          key={index}
          cle={key}
          nom={el.nom}
          handleChange={this.handleChange.bind(this)}
        >
          {el}
        </Specialite>
      );
    });
    let listeType = Object.keys(type).map((key, index) => {
      let el = type[key];
      return (
        <Type
          key={index}
          cle={key}
          nom={el.nom}
          handleChange={this.handleChange.bind(this)}
        >
          {el}
        </Type>
      );
    });

    let listeRestaurants = Object.keys(restaurants).map((key, index) => {
      let el = restaurants[key];
      let specialiteRestaurant = this.state.specialite[el.specialite].nom;
      let typeRestaurant = this.state.type[el.type].nom;
      let serviceRestaurant = "Pas de service supplémentaire";
      let indice = 0;
      if (el.services != null) {
        serviceRestaurant = [];
        el.services.forEach(function(element) {
          serviceRestaurant[indice] = service[element].libelle;
          indice++;
        });
      }

      return (
        <Restaurant
          key={index}
          cle={key}
          restaurant={el}
          specialite={specialiteRestaurant}
          type={typeRestaurant}
          service={serviceRestaurant}
          img={"restaurant.jpg"}
        >
          {el}
        </Restaurant>
      );
    });
    return (
      <div>
        <div className="home">
          <div
            className="parallax_background parallax-window"
            data-parallax="scroll"
            data-image-src="menu.jpg"
            data-speed="0.8"
          />
          <div className="home_container">
            <Container>
              <Row>
                <Col>
                  <div className="home_content text-center">
                    <div className="home_subtitle page_subtitle">Retrouvez</div>
                    <div className="home_title">
                      <h1>les restaurants</h1>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div
          className="elementor-shape elementor-shape-bottom"
          data-negative="false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            <path className="elementor-shape-fill" d="M0,6V0h1000v100L0,6z" />
          </svg>
        </div>
        <div className="themenu">
          <Container>
            <Card>
              <Card.Body>
                <Card.Title>Recherche</Card.Title>
                <Row>
                  <Col sm={6}>
                    <Card.Subtitle className="mb-2 text-muted">
                      Specialite
                    </Card.Subtitle>
                    {listeSpecialite}
                  </Col>
                  <Col sm={6}>
                    <Card.Subtitle className="mb-2 text-muted">
                      Type
                    </Card.Subtitle>
                    {listeType}
                  </Col>
                </Row>
                <br />
                <Button onClick={() => this.rechercher()} variant="info">
                  Rechercher
                </Button>
              </Card.Body>
            </Card>
            <Row className="themenu_row">{listeRestaurants}</Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default Recherche;
