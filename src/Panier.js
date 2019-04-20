import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Commande from "./modules/components/Commande";

class Panier extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      commande: [],
      commandePlat: []
    };
  }

  supprimerPlat(index) {
    console.log("hehe");
    const copiePlat = [...JSON.parse(localStorage.getItem("plat"))];
    delete copiePlat[index];
    let commandePlat = copiePlat;
    commandePlat = commandePlat.filter(function() {
      return true;
    });
    localStorage.setItem("plat", JSON.stringify(commandePlat));
    this.setState({ commandePlat });
  }
  supprimerMenu(index) {
    const copieMenu = [...JSON.parse(localStorage.getItem("menu"))];
    delete copieMenu[index];
    let commande = copieMenu;
    commande = commande.filter(function() {
      return true;
    });
    localStorage.setItem("menu", JSON.stringify(commande));
    this.setState({ commande });
  }
  componentWillMount() {
    this.setState({
      commande: [...JSON.parse(localStorage.getItem("menu"))]
    });
    this.setState({
      commandePlat: [...JSON.parse(localStorage.getItem("plat"))]
    });
  }
  Init() {
    alert("Votre commande a été validé");
    localStorage.setItem("menu", JSON.stringify([]));
    localStorage.setItem("plat", JSON.stringify([]));
    this.setState({
      commande: [...JSON.parse(localStorage.getItem("menu"))]
    });
    this.setState({
      commandePlat: [...JSON.parse(localStorage.getItem("plat"))]
    });
  }
  render() {
    let listeCommande = (
      <Commande
        menu={this.state.commande}
        plat={this.state.commandePlat}
        supprimerPlat={this.supprimerPlat.bind(this)}
        supprimerMenu={this.supprimerMenu.bind(this)}
        show={"block"}
      >
        {1}
      </Commande>
    );

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
                      <h1>Mon panier</h1>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <Container>
          <div className="themenu plat">
            <Card style={{ width: "100%", margin: "25px" }}>
              <Card.Body>
                <Card.Title>Mes commandes</Card.Title>
                {listeCommande}
                <hr />
                <Button variant="info" onClick={this.Init.bind(this)}>
                  Passez ma commande
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    );
  }
}
export default Panier;
