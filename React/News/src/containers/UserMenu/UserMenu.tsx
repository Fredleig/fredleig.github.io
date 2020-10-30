import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import "../Aside/Navigation/navigation.sass";
import { NavLink } from "react-router-dom";
import "./userMenu.sass";
import { connect } from "react-redux";
import { INextStatePropsUserMenu, IUserMenuProps } from "./UserMenu.type";
import { logoutAction } from "../../store/auth/authReducer";
import Authorization from "../Authorization/Authorization";

const UserMenu: React.FC<IUserMenuProps> = (props) => {
  const { title, routes, dispatch, isOpenLoginModal, access } = props;
  const [stateVisibleLogin, setStateVisibleLogin] = useState<boolean>(false);

  useEffect(() => {
    if (isOpenLoginModal) {
      setStateVisibleLogin(true);
    }
  }, [isOpenLoginModal]);

  const handleVisibleModal = useCallback(() => {
    setStateVisibleLogin(!stateVisibleLogin);
  }, [stateVisibleLogin]);

  const handleLogout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const buttonLogin = (
    <div key="login-btn" className="user-menu-wrapper-link">
      <span className="user-menu-link" onClick={handleVisibleModal}>
        Login
      </span>
    </div>
  );

  const getUserMenu = useMemo(() => {
    return (
      <>
        {routes.map((route) => {
          return route.userMenu ? (
            <div key={route.name} className="user-menu-wrapper-link">
              <NavLink className={title === route.name ? "user-menu-link active" : "user-menu-link"} to={route.path}>
                {route.name}
              </NavLink>
              <span className="slash">|</span>
            </div>
          ) : null;
        })}
        <div key="logout-btn" className="user-menu-wrapper-link" onClick={handleLogout}>
          <span className="user-menu-link">Logout</span>
        </div>
      </>
    );
  }, [handleLogout, routes, title]);

  return (
    <nav key="user-menu" className="user-menu">
      {access ? getUserMenu : buttonLogin}
      {stateVisibleLogin && <Authorization onVisible={handleVisibleModal} />}
    </nav>
  );
};

function nextStateToProps(state): INextStatePropsUserMenu {
  return {
    isOpenLoginModal: state.loginModalReducer.isOpenLoginModal,
    access: state.authReducer.access,
  };
}

export default connect(nextStateToProps)(React.memo(UserMenu));
