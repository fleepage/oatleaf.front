import React, { Suspense, useEffect, useContext } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import SwitchLayout from "../../layout/SwitchLayout";
import { Colxx, Separator } from "../../component/common/CustomBootstrap";
import GradientWithRadialProgressCard from "../../component/cards/GradientWithRadialProgressCard";
import { NavLink } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import { LogoutAction } from "../../actions/AuthAction";
import { AuthContext } from "../../context/AuthContext";
import MenuContextProvider from "../../context/MenuContext";

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
const FourOfour = ({ intl, match, ...props }) => {
  const { dispatch, auth } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch(LogoutAction());
  };
  return (
    <MenuContextProvider>
      <SwitchLayout handleLogout={handleLogout}>
        <Row>
          <Colxx xxs="12">
            <h1>404</h1>
            <p>no such link.</p>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
      </SwitchLayout>
    </MenuContextProvider>
  );
};
export default FourOfour;
