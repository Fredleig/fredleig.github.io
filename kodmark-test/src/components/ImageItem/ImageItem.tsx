import React from "react";
import "./ImageItem.sass";
import { Col } from "react-bootstrap";

interface IImageItemProps {
  urlImage: string;
}

const ImageItem: React.FC<IImageItemProps> = (props) => {
  const { urlImage } = props;

  return (
    <Col md={4}>
      <div className="image-box">
        <img src={urlImage} />
      </div>
    </Col>
  );
};

export default ImageItem;
