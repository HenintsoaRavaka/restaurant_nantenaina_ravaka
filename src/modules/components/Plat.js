import React from "react";
import { Image, Button } from "react-bootstrap";

function Plat(props) {
  let content = props.plat.map(p => (
    <div className="dish" key={p._id}>
      <div className="dish_title_container d-flex flex-xl-row flex-column align-items-start justify-content-start">
        <div className="dish_title">{p.nom}</div>
        <div className="dish_price">{p.prix.toLocaleString()} Ar</div>
      </div>
      <Image src={"plats/" + p.photo} fluid />
      <div className="dish_contents">
        <p>{p.description}</p>
      </div>
      <div className="dish_order">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => props.commandPlat(p)}
        >
          Commander
        </Button>
      </div>
    </div>
  ));
  return <div>{content}</div>;
}
export default Plat;
