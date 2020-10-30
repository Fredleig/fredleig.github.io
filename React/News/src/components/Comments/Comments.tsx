import * as React from "react";
import moment from "moment";
// my import
import { noAvatar } from "../../helpers/configsHelper";
import "./comments.sass";
import { ICommentsProps } from "./Comments.type";

const Comments: React.FC<ICommentsProps> = ({ data }) => {
  return (
    <div key="comments" className="comments-wrap">
      <div className="comments">
        <span className="comments-quantity">{data._commentsMeta.count} comments</span>
        {data.comments.map((value) => (
          <div key={value.id} className="comment">
            <img src={value.avatar ? value.avatar : noAvatar} alt="avatar" />
            <div className="comment-content">
              <div className="comment-user">
                <span className="user">{value.user ? value.user.name : "no User"} </span>
                <span className="data">/ {moment(value.updatedAt).fromNow()}</span>
              </div>
              <div className="comment-text">{value.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Comments);
