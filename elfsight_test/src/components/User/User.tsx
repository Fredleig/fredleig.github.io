import React from "react";
import "./User.sass";

interface IUserProps {
  image: string;
  className?: string;
  children: React.ReactNode;
}

const User: React.FC<IUserProps> = (props) => {
  const { image, className, children } = props;

  return (
    <div className={`card-user ${className || ""}`}>
      <div className="card-user_avatar">
        <img src={image} alt="user avatar" height="100%" />
      </div>
      <div className="card-user_user-name">{children}</div>
    </div>
  );
};

export default React.memo(User);
