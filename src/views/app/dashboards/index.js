import React from "react";
import { Row } from "reactstrap";
import { Colxx } from "../../../component/common/CustomBootstrap";
import Admin from "./admin";

const DashBoard = ({ intl, match, view = "default", ...props }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          {{
            admin: <Admin match={match} />,
            teacher: <div>Teacher</div>,
            default: <div>Default</div>,
          }[view] || <div>Default</div>}
        </Colxx>
      </Row>
    </>
  );
};
export default DashBoard;
