import React from "react";
import { Col, Row,Button } from "react-bootstrap";

function Menu(props) {
  let content = props.plat.map(key => <li>{key.nom} <span style={{float:'right'}}>{key.type}</span></li>);
  return (
    <Col sm={12}>
      <div className="sig_dish">
        <Row className="row-eq-height">
          <Col className="sig_col d-flex flex-column align-items-start justify-content-center">
            <div className="sig_content">
              <div className="sig_name_container d-flex flex-row align-items-start justify-content-start">
                <div className="sig_name">{props.menu.nom}</div>
                <div className="sig_price ml-auto">
                  {props.menu.prix.toLocaleString()} Ariary
                </div>
              </div>
              <div>
                <ul>{content}</ul>
              </div>
              <Button
                className="button sig_button trans_200"
                onClick={() => props.commandMenu(props.menu)}
              >
                Commander
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
}
export default Menu;
