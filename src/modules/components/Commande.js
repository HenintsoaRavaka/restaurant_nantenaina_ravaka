import React from "react";
import { Row, ListGroup, Col, Button } from "react-bootstrap";

function Commande(props) {
  let prixTotal = 0;
  let plat = props.plat.map((p, index) => {
	prixTotal += p.prix;
    return (
      <ListGroup key={index}>
        <ListGroup.Item>
          {p.nom} : {p.prix.toLocaleString()} Ariary{" "}
          <Button
            variant="danger"
            style={{ float: "right" }}
            size="sm"
            onClick={() => props.supprimerPlat(index)}
          >
            Supprimer
          </Button>
        </ListGroup.Item>
      </ListGroup>
    );
  });
  let menu = props.menu.map((p, index) => {
	prixTotal += p.prix;
    return (
      <ListGroup key={index}>
        <ListGroup.Item>
          {p.nom} : {p.prix.toLocaleString()} Ariary{" "}
          <Button
            variant="danger"
            style={{ float: "right" }}
            size="sm"
            onClick={() => props.supprimerMenu(index)}
          >
            Supprimer
          </Button>
        </ListGroup.Item>
      </ListGroup>
    );
  });
  return (
    <div>
      <Row>
        <Col>
          <h2>Plat</h2>
          {plat}
        </Col>
        <Col>
          <h2>Menu</h2>
          {menu}
        </Col>
      </Row>
	  <Row>
		<Col>
			Prix total : {prixTotal.toLocaleString()} Ariary
		</Col>
	  </Row>
    </div>
  );
}
export default Commande;
