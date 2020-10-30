import * as React from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
//my import
import withApollo from "../../../helpers/Hocs/withApollo/withApollo";
import CKEditor from "../../../components/Fields/CKEditor/CKEditor";
import ButtonSubmit from "../../../components/ButtonSubmit/ButtonSubmit";
import { createNews } from "../../../dataBase/addNews/addNewsMutation";
import InputField from "../../../components/Fields/InputField/InputField";
import "./addnews.sass";
import { IAddNewsProps, IStateToPropsAddNews } from "./AddNews.type";

enum ENameField {
  titleNews = "titleNews",
  addNewsEditor = "addNewsEditor"
}

const AddNews: React.FC<IAddNewsProps> = ({ mutation, titleNews, newsValue, submitting }) => {
  const handleCreateNews = React.useCallback(
    (e: React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutation(createNews, { title: titleNews, text: newsValue });
    },
    [mutation, titleNews, newsValue]
  );

  return (
    <>
      <h1 key="title_add-news" className="title_add-news">
        Add news
      </h1>
      <form key="form-add-news" onSubmit={handleCreateNews}>
        <Field
          component={InputField}
          key="title-news"
          name={ENameField.titleNews}
          type="text"
          label="Title"
          placeholder="Title news"
        />
        <Field
          component={CKEditor}
          key="add-news-editor"
          name={ENameField.addNewsEditor}
          placeholder="your news"
        />
        <ButtonSubmit key="button-submit" submitting={submitting} caption="Add news" />
      </form>
    </>
  );
};

const reduxWrap = reduxForm({ form: "addNews" })(withApollo(React.memo(AddNews)));

const selector = formValueSelector("addNews");
const AddNewsWrap = connect<IStateToPropsAddNews>((state) => {
  return {
    titleNews: selector(state, ENameField.titleNews),
    newsValue: selector(state, ENameField.addNewsEditor),
  };
})(reduxWrap);

export default AddNewsWrap;
