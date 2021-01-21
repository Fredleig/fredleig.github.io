import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { matchPath } from "react-router";
import { NavLink } from "react-router-dom";
import "./BreadCrumbs.sass";
import { connect } from "react-redux";
import { TBreadcrumbsInitialState } from "../../store/breadcrumbs/breadcrumbsSlice";
import { routes, TRoutes } from "../../utils/routes";
import { RootState } from "../../store";

interface IBreadCrumbsProps extends RouteComponentProps {
  serverBread: TBreadcrumbsInitialState["dynamicNames"];
  loading: boolean;
}

interface IBreadCrumbsState {
  breadcrumbs: TRoutes[];
}

class BreadCrumbs extends React.PureComponent<
  IBreadCrumbsProps,
  IBreadCrumbsState
> {
  public state = {
    breadcrumbs: [],
  };

  public static mapStateToProps(state: RootState) {
    return {
      serverBread: state.breadcrumbsSlice.dynamicNames,
      loading: state.dataRetrieval.loading,
    };
  }

  public componentDidMount(): void {
    this.setState({ breadcrumbs: this.getRoutesBreadcrumbs() });
  }

  public componentDidUpdate(
    prevProps: Readonly<IBreadCrumbsProps>,
    prevState: Readonly<IBreadCrumbsState>
  ): void {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ breadcrumbs: this.getRoutesBreadcrumbs() });
    }
  }

  private getRoutesBreadcrumbs() {
    return routes.filter((route) =>
      matchPath(this.props.location.pathname, { path: route.path })
    );
  }

  private getBreadcrumbs() {
    return this.state.breadcrumbs.map(
      (item: TRoutes, index: number, array: TRoutes[]) => {
        const caption: string | undefined = item.dynamicName
          ? this.props.serverBread[item.dynamicName]
          : item.staticName;

        if (array.length - 1 !== index) {
          const link = matchPath(this.props.location.pathname, {
            path: item.path,
          })?.url;
          return [
            <NavLink
              className="breadcrumbs_link"
              key={`${item.key}-link`}
              to={link || ""}
            >
              {caption}
            </NavLink>,
            <span key={`${item.key}-span`}> {">"} </span>,
          ];
        }

        return (
          <span className="breadcrumbs_last-element" key={`${item.key}-span`}>
            {caption}
          </span>
        );
      }
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="breadcrumbs">
        {!this.props.loading ? this.getBreadcrumbs() : null}
      </div>
    );
  }
}

export default connect(BreadCrumbs.mapStateToProps)(withRouter(BreadCrumbs));
