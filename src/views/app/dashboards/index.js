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
            Admin: <Admin match={match} {...props} />,
            Teacher: <div>Teacher</div>,
            OrgAdmin: <div>OrgAdmin</div>,
            default: <div>Default</div>,
          }[view] || <div>Default</div>}
        </Colxx>
      </Row>
    </>
  );
};
export default DashBoard;
