import * as React from "react";
import { boundMethod } from "autobind-decorator";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { connect } from "react-redux";
// my import
import Preloader from "../../../components/Preloader/Preloader";
import withApollo from "../../../helpers/Hocs/withApollo/withApollo";
import News from "../../../components/News/News";
import { getOneNews } from "../../../dataBase/readMore/readMoreQuery";
import { addComment } from "../../../dataBase/readMore/readMoreMutation";
import Comments from "../../../components/Comments/Comments";
import ButtonShowMore from "../../../components/ButtonShowMore/ButtonShowMore";
import { paginationNum } from "../../../helpers/configsHelper";
import pagination from "../../../services/pagination/pagination";
import textArea from "../../../components/Fields/TextArea/TextArea";
import "./readMore.sass";
import ButtonSubmit from "../../../components/ButtonSubmit/ButtonSubmit";
import { IReadMoreProps, IStateToPropsReadMore, TDataPost } from "./ReadMore.type";
import withError from "../../../helpers/Hocs/withError/withError";

enum ENameField {
  comment= "comment"
}

class ReadMore extends React.PureComponent<IReadMoreProps> {
  public componentDidMount() {
    const { match, query } = this.props;
    const variables = { id: match.params.id, commentsFirst: paginationNum };

    query(getOneNews, variables);
    document.title = "...loading";
  }

  public componentDidUpdate(prevProps: Readonly<IReadMoreProps>): void {
    const { data } = this.props;
    if (data?.Post) {
      document.title = `News - ${data.Post.title}`;
    }
  }

  public componentWillUnmount() {
    this.props.removeData();
  }

  @boundMethod
  private handleButtonShowMore() {
    const { match, query } = this.props;

    const variables = { id: match.params.id, commentsFirst: pagination.first(paginationNum) };
    query(getOneNews, variables);
  }

  @boundMethod
  private handleSubmitComment(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();

    const { mutation, query, data, match, commentValue } = this.props;
    if (data?.Post) {
      const commentsLength = data.Post.comments.length;

      const varMutate = {
        postId: data.Post.id,
        text: commentValue,
      };

      const varQuery = {
        id: match.params.id,
        commentsFirst:
          commentsLength === data.Post._commentsMeta.count ? commentsLength + 1 : commentsLength,
      };

      mutation(addComment, varMutate).then(() => query(getOneNews, varQuery));
    }
  }

  private getButtonShowMore(post: TDataPost, loading: boolean) {
    if (post.comments.length < post._commentsMeta.count) {
      return (
        <ButtonShowMore key="show-more-btn" onClick={this.handleButtonShowMore} loading={loading} />
      );
    }

    return null;
  }

  private getFormComment(submitting: boolean) {
    return (
      <div key="add-comment-wrapper" className="add-comment-wrapper">
        <h3 className="add-comment">Leave a Comment</h3>
        <form onSubmit={this.handleSubmitComment}>
          <Field component={textArea} key="text-area" name={ENameField.comment} placeholder="message" />
          <ButtonSubmit key="button-submit" submitting={submitting} caption="Post a comment" />
        </form>
      </div>
    );
  }

  public render() {
    const { data, submitting, loading } = this.props;
    if (data?.Post) {
      return [
        <News key="news-content" data={data.Post} footer={false} />,
        <Comments key="comments" data={data.Post} />,
        this.getButtonShowMore(data.Post, loading),
        this.getFormComment(submitting),
      ];
    }

    return <Preloader />;
  }
}

const reduxWrap = reduxForm({ form: "readMore" })(withApollo(withError(ReadMore)));

const selector = formValueSelector("readMore");
const ReadMoreWrap = connect<IStateToPropsReadMore>((state) => {
  return { commentValue: selector(state, ENameField.comment) };
})(reduxWrap);

export default ReadMoreWrap;
