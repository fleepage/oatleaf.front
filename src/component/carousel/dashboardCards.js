/* eslint-disable react/no-array-index-key */
import React from "react";
import IconCard from "../cards/IconCard";
import GlideComponent from "../carousel/GlideComponent";

const DashboardCardsCarousel = ({ className = "icon-cards-row" }) => {
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
      <GlideComponent
        dotSize={12}
        settings={{
          gap: 5,
          perView: 4,
          type: "carousel",
          breakpoints: {
            320: { perView: 1 },
            576: { perView: 2 },
            1600: { perView: 3 },
            1800: { perView: 4 },
          },
          hideNav: false,
          navSize: 20,
        }}
      >
        {data.map((item, index) => {
          return (
            <div key={`icon_card_${index}`}>
              <IconCard {...item} className="mb-4" />
            </div>
          );
        })}
      </GlideComponent>
    </div>
  );
};
export default DashboardCardsCarousel;
