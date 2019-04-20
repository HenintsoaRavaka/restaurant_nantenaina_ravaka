import React from "react";
import { Container, Row, Col } from "react-bootstrap";

class Contact extends React.Component {
  render() {
    return (
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
                    N'hésitez pas nous
                  </div>
                  <div className="home_title">
                    <h1>Contactez</h1>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default Contact;
