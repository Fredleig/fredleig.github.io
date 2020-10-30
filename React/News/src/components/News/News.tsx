import * as React from "react";
import moment from "moment";
import { withRouter } from "react-router";
//my import
import Icon, { EIdIcon } from "../icons/Icons";
import { NavLink } from "react-router-dom";
import "./news.sass";
import { noImg } from "../../helpers/configsHelper";
import Interweave from "interweave";
import { rootAllNews as pathAllNews } from "../../routes/path";
import { INewsProps } from "./News.type";
import { TDataPosts } from "../../containers/Content/AllNews/AllNews.type";
import { TDataPost } from "../../containers/Content/ReadMore/ReadMore.type";

class News extends React.PureComponent<INewsProps> {
  public static defaultProps = { footer: true };

  private mathPath: string = "";

  public componentDidMount(): void {
    const { match } = this.props;
    this.mathPath = match.path !== pathAllNews ? match.path : "";
  }

  private getNews(value: TDataPosts | TDataPost) {
    const { footer } = this.props;

    return (
      <div key={value.id} className="home-news">
        <h2 className="home-news-title">{value.title}</h2>
        <div className="home-news-info">
          <Icon className="icon-news" idIcon={EIdIcon.user}>
            <span>{value.user?.name}</span>
          </Icon>
          <Icon className="icon-news" idIcon={EIdIcon.averageTime}>
            <span>{moment(value.updatedAt).format("MMMM Do YYYY, h:mm")}</span>
          </Icon>
        </div>
        <div className="home-news-img-wrap">
          <img
            className="home-news-img"
            src={value.image ? value.image : noImg}
            alt={value.title}
          />
        </div>
        <div className="home-news-text">
          <Interweave content={value.text} />
        </div>
        {footer && (
          <div className="home-news-footer">
            <NavLink className="home-news-button" to={this.mathPath + "/news/" + value.id}>
              Read more
            </NavLink>
          </div>
        )}
      </div>
    );
  }

  public render() {
    const { data } = this.props;

    if (Array.isArray(data)) {
      return data.map((value) => this.getNews(value));
    } else {
      return this.getNews(data);
    }
  }
}

export default withRouter(News);
