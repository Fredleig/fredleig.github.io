import * as React from "react";
import "./buttonSubmit.sass";
import Preloader, { ESizePreloader } from "../Preloader/Preloader";
import { IButtonSubmitProps } from "./ButtonSubmit.type";

const ButtonSubmit: React.FC<IButtonSubmitProps> = ({ submitting, caption }) => (
  <button key="button-submit" className="button-submit" type="submit">
    {submitting ? (
      <Preloader size={ESizePreloader.small}>
        <span className="button-text-loading">Loading</span>
      </Preloader>
    ) : (
      caption
    )}
  </button>
);

export default React.memo(ButtonSubmit);
