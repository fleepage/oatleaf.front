/* eslint-disable react/no-array-index-key */
import React from "react";
import Row from "reactstrap/lib/Row";
import IconCard from "../cards/IconCard";
import { Colxx } from "../common/CustomBootstrap";

const VerticalStatCard = ({ className = "icon-cards-row" }) => {
  const data = [
    { title: "pending-orders", icon: "iconsminds-clock", value: 14 },
    {
      title: "completed-orders",
      icon: "iconsminds-basket-coins",
      value: 32,
    },
    {
      title: "refund-requests",
      icon: "iconsminds-arrow-refresh",
      value: 74,
    },
    {
      title: "new-comments",
      icon: "iconsminds-mail-read",
      value: 25,
    },
  ];

  return (
    <div className={className}>
      {data.map((item, index) => {
        return (
          <Row>
            <Colxx xxs="12" className="p-2 pl-5 pr-5  text-center">
              <div key={`icon_card_${index}`}>
                <IconCard {...item} className="mb-4" />
              </div>
            </Colxx>
          </Row>
        );
      })}
    </div>
  );
};
export default VerticalStatCard;
