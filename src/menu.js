import React from "react";
import { Container, Row, Col, Card, Button,Image } from "react-bootstrap";
import base from "./Base";
import MenuItem from "./modules/components/Menu";
import PlatRestaurant from "./modules/components/Plat";
import Commande from "./modules/components/Commande";

class Menu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      plat: [],
      commande: [],
      commandePlat: []
    };
    this.menu = {};
    this.restaurant = "";
    this.plat = [];
  }

  componentWillMount() {
    this.ref = base.syncState("plat", {
      context: this,
      state: "plat"
    });
    this.restaurant = this.props.location.query.restaurant;
    this.menu = JSON.parse(this.props.location.query.menu);
    this.plat = JSON.parse(this.props.location.query.plat);
    this.setState({
      commande: [...JSON.parse(localStorage.getItem("menu"))]
    });
    this.setState({
      commandePlat: [...JSON.parse(localStorage.getItem("plat"))]
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  commandMenu(menu) {
    let commande = [];
    commande = [...JSON.parse(localStorage.getItem("menu"))];
    commande.push(menu);
    localStorage.setItem("menu", JSON.stringify(commande));
    this.setState({ commande });
  }
  commandPlat(plat) {
    let commandePlat = [];
    commandePlat = [...JSON.parse(localStorage.getItem("plat"))];
    commandePlat.push(plat);
    localStorage.setItem("plat", JSON.stringify(commandePlat));
    this.setState({ commandePlat });
  }
  supprimerPlat(index) {
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
    let { plat, commandePlat, commande } = this.state;
    let platCopie = [...this.plat];
    let Aperitif = platCopie.filter(d =>
      d.type.toLowerCase().includes("aperitif")
    );
    let listeAperitif = (
      <PlatRestaurant
        plat={Aperitif}
        commandPlat={this.commandPlat.bind(this)}
      />
    );

    platCopie = [...this.plat];
    let Entre = platCopie.filter(d => d.type.toLowerCase().includes("entree"));
    let listeEntre = (
      <PlatRestaurant plat={Entre} commandPlat={this.commandPlat.bind(this)} />
    );

    platCopie = [...this.plat];
    let Plats = platCopie.filter(d => d.type.toLowerCase().includes("plat"));
    let listePlat = (
      <PlatRestaurant plat={Plats} commandPlat={this.commandPlat.bind(this)} />
    );
	
	platCopie = [...this.plat];
    let boissons = platCopie.filter(d => d.type.toLowerCase().includes("boisson"));
    let listeBoissons = (
      <PlatRestaurant plat={boissons} commandPlat={this.commandPlat.bind(this)} />
    );
	

    platCopie = [...this.plat];
    let Dessert = platCopie.filter(d =>
      d.type.toLowerCase().includes("dessert")
    );
    let listeDessert = (
      <PlatRestaurant plat={Dessert} commandPlat={this.commandPlat.bind(this)}>
        {1}
      </PlatRestaurant>
    );

    let listeCommande = (
      <Commande
        plat={commandePlat}
        menu={commande}
        supprimerPlat={this.supprimerPlat.bind(this)}
        supprimerMenu={this.supprimerMenu.bind(this)}
        show={"none"}
      >
        {1}
      </Commande>
    );

    let listeMenu = this.menu.map(elmnt => {
      let liste_plat = elmnt.plat;
      let menuplat = [];
      if (plat.length !== 0) {
        liste_plat.forEach(function(element) {
          menuplat.push(plat[element]);
        });
      }

      return (
        <MenuItem
          key={elmnt._id}
          id={elmnt._id}
          menu={elmnt}
          plat={menuplat}
          commandMenu={this.commandMenu.bind(this)}
        >
          {elmnt._id}
        </MenuItem>
      );
    });

    return (
      <div className="app">
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
                    <div className="home_subtitle page_subtitle">Menu</div>
                    <div className="home_title">
                      <h1>{this.restaurant}</h1>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div className="themenu plat">
          <Col sm={12} style={{ padding: "5% 15%" }}>
            <Row>
              <Col>
                <div className="section_title_container text-center">
                  <div className="section_subtitle page_subtitle">
                    Notre carte
                  </div>
                  <div className="section_title">
                    <h1>Découvrez notre carte</h1>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
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
            </Row>
            <Row className="thememenu-row">
              <Col sm={4}>
                <div className="themenu_column">
                  <div className="themenu_image" />
                  <div className="padding themenu_col trans_400 dish">
                    <div className="themenu_col_title">Apéritif</div>
                    <div className="dish_list">{listeAperitif}</div>
                  </div>
                </div>
              </Col>
              <Col sm={4}>
                <div className="themenu_column">
                  <div className="themenu_image" />
                  <div className="padding themenu_col trans_400 dish">
                    <div className="themenu_col_title">Entrée</div>
                    <div className="dish_list">{listeEntre}</div>
                  </div>
                </div>
              </Col>
              <Col sm={4}>
                <div className="themenu_column">
                  <div className="themenu_image" />
                  <div className="padding themenu_col trans_400 dish">
                    <div className="themenu_col_title">Plat</div>
                    <div className="dish_list">{listePlat}</div>
                  </div>
                </div>
              </Col>
              <Col sm={4}>
                <div className="themenu_column">
                  <div className="themenu_image" />
                  <div className="padding themenu_col trans_400 dish">
                    <div className="themenu_col_title">Dessert</div>
                    <div className="dish_list">{listeDessert}</div>
                  </div>
                </div>
              </Col>
			  
			  <Col sm={4}>
                <div className="themenu_column">
                  <div className="themenu_image" />
                  <div className="padding themenu_col trans_400 dish">
                    <div className="themenu_col_title">Boisson</div>
                    <div className="dish_list">{listeBoissons}</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </div>
        <div className="sig">
          <Container>
            <Row>
			<Col>
				<Image src="https://codex-themes.com/thegem/wp-content/uploads/2016/06/24.png" fluid/>
			</Col>
			<Col>
			<Col>
                <div className="section_title_container">
                  <div className="menuitem section_subtitle page_subtitle" >
                    Nos menus
                  </div>
                </div>
              </Col>
			{listeMenu}
			</Col>
			</Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default Menu;
