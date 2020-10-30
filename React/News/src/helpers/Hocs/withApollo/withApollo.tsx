import * as React from "react";
import { connect } from "react-redux";
import { DocumentNode } from "@apollo/client";
import { Dispatch } from "redux";
import { client } from "../../../configs/configApollo";
import {
  queryActionLoading,
  queryAction,
  queryActionError,
  deleteData,
} from "../../../store/queryReducer/queryReducer";
import {
  mutationAction,
  mutationActionError,
  mutationActionLoading,
} from "../../../store/mutationReducer/mutationReducer";

interface INextStateToProps<Data = {}> {
  // query
  data?: Data;
  error?: any;
  loading: boolean;
  // mutation
  submitting?: boolean;
  dataMutation?: any;
  errorMutation?: any;
}

type TQuery = (query: DocumentNode, variables?: object) => Promise<any>;

interface IDispatchToProps {
  query: TQuery;
  mutation: TQuery;
  removeData: () => void;
}

export interface IWithApollo<Data extends { [K in keyof Data]?: any } = {}>
  extends INextStateToProps<Data>,
    IDispatchToProps {}

const withApollo = (Component: React.ComponentType | React.NamedExoticComponent) => {
  class WithApollo extends React.PureComponent<INextStateToProps & IDispatchToProps> {
    // Эти свойства попадут в пропсы
    public static nextStateToProps(state) {
      const data = state.queryReducer.data ? "data" : undefined;
      const errorQuery = state.queryReducer.error ? "errorQuery" : undefined;
      const submitting = state.mutationReducer.submitting ? "submitting" : undefined;
      const dataMutation = state.mutationReducer.dataMutation ? "dataMutation" : undefined;
      const errorMutation = state.mutationReducer.error ? "errorMutation" : undefined;

      return {
        [data]: state.queryReducer.data,
        [errorQuery]: state.queryReducer.error,
        loading: state.queryReducer.loading,
        [submitting]: state.mutationReducer.submitting,
        [dataMutation]: state.mutationReducer.dataMutation,
        [errorMutation]: state.mutationReducer.error,
      };
    }

    // Эти свойства(методы) попадут в пропсы
    public static dispatchToProps(dispatch: Dispatch) {
      return {
        query: (query: DocumentNode, variables: object) => {
          dispatch(queryActionLoading());
          return client
            .query({ query: query, variables: variables, fetchPolicy: "network-only" })
            .then((data) => dispatch(queryAction(data)))
            .catch((err) => dispatch(queryActionError(err)));
        },
        mutation: (mutation: DocumentNode, variables: object) => {
          dispatch(mutationActionLoading());
          return client
            .mutate({ mutation: mutation, variables: variables })
            .then((data) => dispatch(mutationAction(data)))
            .catch((err) => dispatch(mutationActionError(err)));
        },
        removeData: () => {
          dispatch(deleteData());
        },
      };
    }

    public render() {
      return <Component {...this.props} />;
    }
  }

  return connect<INextStateToProps, IDispatchToProps>(
    WithApollo.nextStateToProps,
    WithApollo.dispatchToProps
  )(WithApollo);
};

export default withApollo;
