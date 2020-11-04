import React, { useCallback } from "react";
import "./ImageItem.sass";
import { Col } from "react-bootstrap";

interface IImageItemProps {
  urlImage: string;
  tagName: string;
  onClickImage: (tagName: string) => void;
}

const ImageItem: React.FC<IImageItemProps> = (props) => {
  const { urlImage, onClickImage, tagName } = props;

  const handleClickImage = useCallback(() => {
    onClickImage(tagName);
  }, [onClickImage, tagName]);

  return (
    <Col md={4}>
      <div className="image-box" onClick={handleClickImage}>
        <img src={urlImage} />
      </div>
    </Col>
  );
};

export default React.memo(ImageItem);
