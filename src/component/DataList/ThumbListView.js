import classnames from "classnames";
import React from "react";
import { ContextMenuTrigger } from "react-contextmenu";
import { NavLink } from "react-router-dom";
import { Badge, Card } from "reactstrap";
import { Colxx } from "../common/CustomBootstrap";

const ThumbListView = ({
  product,
  isSelect,
  collect,
  onCheckItem,
  to = "/app/student/detail",
}) => {
  return (
    <Colxx xxs="12" key={product.id} className="mb-3">
      <NavLink to={to}>
        <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
          <Card
            onClick={(event) => onCheckItem(event, product.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect,
            })}
          >
            {/* <Badge
              color={"primary"}
              pill
              className="position-absolute badge-top-left"
            >
              Happy Birthday
            </Badge> */}
            <img
              alt={product.title}
              src={product.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <p className="list-item-heading mb-1 truncate">
                  {product.title}
                </p>
                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                  {product.category}
                </p>
                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                  {product.date}
                </p>
                <div className="w-15 w-sm-100">
                  <Badge color={product.statusColor} pill>
                    {product.status}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </ContextMenuTrigger>
      </NavLink>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListView);
