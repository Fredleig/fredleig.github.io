import React from "react";
import { Row } from "react-bootstrap";
import ImageItem from "../ImageItem/ImageItem";
import "./ImageGroup.sass";

interface IImageGroupProps {
  tagName: string;
  children: React.ReactNode;
}

const ImageGroup: React.FC<IImageGroupProps> = (props) => {
  const { tagName, children } = props;

  return (
    <div className="box-group">
      <h5>{tagName}</h5>
      <Row>{children}</Row>
    </div>
  );
};

export default React.memo(ImageGroup);
