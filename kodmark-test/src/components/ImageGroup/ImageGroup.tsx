import React from "react";
import { Row } from "react-bootstrap";
import ImageItem from "../ImageItem/ImageItem";
import "./ImageGroup.sass";

interface IImageGroupProps {
  tagName: string;
  images: { url: string; tag: string }[];
  onClickImage: (tagName: string) => void;
}

const ImageGroup: React.FC<IImageGroupProps> = (props) => {
  const { tagName, images, onClickImage } = props;

  return (
    <div className="box-group">
      <h5>{tagName}</h5>
      <Row>
        {images.map((item, index) => {
          if (item.tag === tagName) {
            return <ImageItem key={index} onClickImage={onClickImage} tagName={tagName} urlImage={item.url} />;
          }
          return null;
        })}
      </Row>
    </div>
  );
};

export default ImageGroup;
