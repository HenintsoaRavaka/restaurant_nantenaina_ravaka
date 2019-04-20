import React from "react";
import { Link } from "react-router-dom";
import { Col, Image } from "react-bootstrap";
import Icon from "@material-ui/core/Icon";

function Restaurants(props) {
  let restaurant = props.restaurant;
  let name = restaurant.nom.replace(/\s/g, "-");
  return (
    <Col className="themenu_column" sm={12}>
      <Col sm={3} className="no-padding image">
        <Image src={props.img} fluid />
      </Col>
      <Col sm={6} className="description">
        <h3>{restaurant.nom}</h3>
        <p>
          <Icon>place</Icon> {restaurant.adresse}
          <br />
          Spécialité {props.specialite}
        </p>
        <p>{restaurant.description.substring(0, 200) + "..."} </p>
      </Col>
      <Col sm={3} className="details">
        <p>Ouvert de</p>
        <h5>
          {restaurant.horaire.ouverture + " - " + restaurant.horaire.fermeture}
        </h5>
        <Link
          className="btn-details btn"
          to={{
            pathname: `/restaurants/${name}`,
            query: {
              obj: JSON.stringify(restaurant),
              type: props.type,
              specialite: props.specialite,
              service: props.service
            }
          }}
        >
          Voir details
        </Link>
      </Col>
    </Col>
  );
}

export default Restaurants;
