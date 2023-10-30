import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const CardItem = ({ front, back }) => {
  const [isFront, setIsFront] = useState(true);

  const speakText = (e) => {
    e.stopPropagation();
    console.log("play speech");
  };

  return (
    <div className="Card" onClick={() => setIsFront(!isFront)}>
      <Button variant="link" onClick={speakText}>
        <FontAwesomeIcon icon={faVolumeHigh} />
      </Button>
      {isFront ? front : back}
    </div>
  );
};

export default CardItem;
