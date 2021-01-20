import React, { useState } from "react";
import { Collapse as BootstrapCollapse } from "react-bootstrap";
import "./Collapse.css";

interface ICollapseProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const Collapse: React.FC<ICollapseProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { title, children } = props;
  const handleClickToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="collapse-header" onClick={handleClickToggleOpen}>
        <span>{title}</span>
        <div className={`${isOpen ? "collapse-up" : "collapse-down"}`}>^</div>
      </div>
      <BootstrapCollapse in={isOpen} timeout={0}>
        <div className="collapse-text">{children}</div>
      </BootstrapCollapse>
    </>
  );
};

export default React.memo(Collapse);
