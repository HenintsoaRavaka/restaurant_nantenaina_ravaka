import React, { Component } from "react";
import base from "./Base";
import Restaurant from "./modules/components/Restaurants";
import {
  Pagination,
  Container,
  Row,
  Col,
  FormControl,
  Form
} from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nbreRestaurantParPage: 2,
      restaurantsInit: [],
      restaurants: [],
      service: [],
      specialite: [],
      type: [],
      currentPage: 1,
      RestoPerPage: 10
    };
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  componentWillMount() {
    this.ref = base.syncState("service", {
      context: this,
      state: "service"
    });
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
    this.ref = base.bindToState("restaurants", {
      context: this,
      state: "restaurants"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  filterRestaurant() {
    let restaurants = [...this.state.restaurantsInit];
    let value = this.input.value.trim().toLowerCase();
    restaurants = restaurants.filter(d => d.nom.toLowerCase().includes(value));
    this.setState({ restaurants });
  }

  sortData() {
    let typesort = this.selectvalue.value;
    this.setState({
      restaurants: this.state.restaurants.sort(function(obj1, obj2) {
        switch (typesort) {
          case "ASC":
            if (obj1.nom.toLowerCase() < obj2.nom.toLowerCase()) return 1;
            else return -1;
          case "DESC":
            if (obj1.nom.toLowerCase() < obj2.nom.toLowerCase()) return -1;
            else return 1;
          default:
            break;
        }
      })
    });
  }

  render() {
    let { restaurants, currentPage, RestoPerPage, service } = this.state;
    let indexOfLastRest = currentPage * RestoPerPage;
    let indexOfFirstRest = indexOfLastRest - RestoPerPage;
    let currentRest = restaurants.slice(indexOfFirstRest, indexOfLastRest);
    let listeRestaurants = Object.keys(currentRest).map((key, index) => {
      let el = currentRest[key];
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

    let pageNumbers = [];
    let nbrePage = Math.ceil(restaurants.length / RestoPerPage);
    for (let i = 1; i <= nbrePage; i++) {
      pageNumbers.push(i);
    }

    let renderPageNumbers = pageNumbers.map(number => {
      return (
        <Pagination.Item
          key={number}
          id={number}
          onClick={this.handleClick.bind(this)}
          active={number === currentPage}
        >
          {number}
        </Pagination.Item>
      );
    });
    return (
      <div className="App">
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
            <Row className="filter">
              <Col sm={3}>
                <FormControl
                  ref={input => (this.input = input)}
                  type="text"
                  placeholder="Rechercher .."
                  onKeyUp={() => this.filterRestaurant()}
                  aria-label="Rechercher"
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  as="select"
                  onChange={() => this.sortData()}
                  ref={selectvalue => (this.selectvalue = selectvalue)}
                >
                  <option value="D">Trier par nom restaurant</option>
                  <option value="ASC">Nom restaurant ASC</option>
                  <option value="DESC">Nom restaurant DESC</option>
                </Form.Control>
              </Col>
              <Col sm={3}>
                <p> {this.state.restaurants.length} restaurant(s) trouvé(s)</p>
              </Col>
            </Row>

            <Row className="themenu_row">{listeRestaurants}</Row>
            <Row>
              <Col sm={12}>
                <ul id="page-numbers">{renderPageNumbers}</ul>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default App;
