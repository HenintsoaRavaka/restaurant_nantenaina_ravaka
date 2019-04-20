import React from 'react'
import {Container,Row,Col} from 'react-bootstrap';

class Notfound extends React.Component {
  render() {
    return( 
	<div className="home">
            <div className="parallax_background parallax-window" data-parallax="scroll" data-image-src="menu.jpg" data-speed="0.8"></div>
            <div className="home_container">
               <Container>
                  <Row>
                     <Col>
                        <div className="home_content text-center">
                           <div className="home_subtitle page_subtitle">Erreur 404</div>
                           <div className="home_title">
                              <h1>Page introuvable</h1>
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
export default Notfound