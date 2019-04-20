import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import { Container, Row, Col, Image, Media } from "react-bootstrap";
import Icon from "@material-ui/core/Icon";
import "./about.css";
import { Link } from "react-router-dom";
import base from "./Base";

class Restaurant extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      img: "/restaurant.jpg"
    };
    this.restaurant = {};
    this.type = "";
    this.specialite = "";
    this.service = "";
    this.storage = "";
  }

  componentWillMount() {
    this.storageRef = base.storage().ref();
    this.restaurant = JSON.parse(this.props.location.query.obj);
    this.type = this.props.location.query.type;
    this.specialite = this.props.location.query.specialite;
    this.service = this.props.location.query.service;
    let name =
      "restaurants/" +
      this.restaurant.nom.toLowerCase().replace(/\s/g, "-") +
      ".jpg";
    this.getImage(name);
  }

  getImage = image => {
    this.storageRef
      .child(image)
      .getDownloadURL()
      .then(
        function(url) {
          this.setState({ img: url });
        }.bind(this)
      )
      .catch(
        function(error) {
          console.log(error);
          this.setState({ img: "/restaurant.jpg" });
        }.bind(this)
      );
  };

  render() {
    let listeService = this.service.map(service => {
      return (
        <Media as="li">
          <Media.Body>
            <h6>{service}</h6>
          </Media.Body>
        </Media>
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
                    <div className="home_subtitle page_subtitle">
                      Restaurants
                    </div>
                    <div className="home_title">
                      <h1>{this.restaurant.nom}</h1>
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
        <Col sm={12} className="intro">
          <Container>
            <Row>
              <Col>
                <div className="intro_content">
                  <div className="intro_title">
                    <h2>{this.restaurant.nom}</h2>
                  </div>
                  <p>{this.type}</p>
                  <p>Spécialité : {this.specialite}</p>
                  <p>
                    <Icon>place</Icon> {this.restaurant.adresse}{" "}
                    <a href="#map">Voir sur la carte</a>
                  </p>
                  <p>
                    <Icon>access_time</Icon> Ouvert de{" "}
                    {this.restaurant.horaire.ouverture +
                      " à " +
                      this.restaurant.horaire.fermeture}{" "}
                  </p>
                  <p>
                    <Icon>local_phone</Icon>
                    {this.restaurant.telephone}
                  </p>
                  <div className="intro_text">
                    <p>{this.restaurant.description}</p>
                  </div>
                  <div className="intro_text">
                    <div className="intro_subtitle page_subtitle">Autres</div>
                    <br />
                    <ul className="list-unstyled">{listeService}</ul>
                  </div>
                  <br />
                  <Link
                    className="btn-details btn"
                    to={{
                      pathname: `/menu`,
                      query: {
                        restaurant: this.restaurant.nom,
                        menu: JSON.stringify(this.restaurant.menu),
                        plat: JSON.stringify(this.restaurant.plat)
                      }
                    }}
                  >
                    Voir le menu du restaurants
                  </Link>
                </div>
                <Row>
                  <Container sm={8}>
                    <div className="intro_image">
                      <Image src={this.state.img} fluid />
                    </div>
                  </Container>
                </Row>
              </Col>
            </Row>
          </Container>
        </Col>

        <LeafletMap
          center={[this.restaurant.latitude, this.restaurant.longitude]}
          zoom={17}
          maxZoom={18}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
          id={"map"}
        >
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <Marker
            position={[this.restaurant.latitude, this.restaurant.longitude]}
          >
            <Popup>{"Restaurant " + this.restaurant.nom}</Popup>
          </Marker>
        </LeafletMap>
      </div>
    );
  }
}
export default Restaurant;
