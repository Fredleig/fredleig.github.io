import React, { useCallback, useEffect, useState } from "react";
import FormItem from "../../components/FormItem/FormItem";
import { validateId } from "../../utils/validation";
import { useDispatch } from "react-redux";
import { getDocuments } from "../../store/documentsSlice/documentsSlice";

export type TParamDocs = { id?: string; name?: string };
const docUrl = "documents";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useState<TParamDocs>({
    id: undefined,
    name: undefined,
  });

  useEffect(() => {
    if (params.id) {
      dispatch(getDocuments({ url: docUrl, params: { id: params.id } }));
    } else if (params.name) {
      dispatch(getDocuments({ url: docUrl, params: { name: params.name } }));
    }
  }, [dispatch, params.id, params.name]);

  const handleChangeId = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setParams({ ...params, id: ev.target.value });
    },
    [params]
  );

  const handleChangeName = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setParams({ ...params, name: ev.target.value });
    },
    [params]
  );

  return (
    <>
      <FormItem
        label="ID документа"
        description="Если поле ID документа, будет заполнено все остальные поля будут проигнорированы"
        onChange={handleChangeId}
        validate={validateId}
      />
      <FormItem label="Имя документа" onChange={handleChangeName} />
    </>
  );
};

export default React.memo(Search);
