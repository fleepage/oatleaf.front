import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  Row,
} from "reactstrap";
import { Colxx } from "../common/CustomBootstrap";

const school = [1, 2, 3, 4, 5, 6];

const SchoolCard = () => {
  return (
    <Row>
      <Colxx xxs="12">
        <Row>
          {school.map((item, i) => (
            <Colxx xxs="12" xs="6" lg="4" key={i}>
              <Card className="mb-4">
                <div className="position-relative">
                  <CardImg
                    top
                    src="/assets/img/cards/thumb-1.jpg"
                    alt="Card image cap"
                  />
                </div>
                <CardBody>
                  <CardSubtitle className="mb-4">
                    Homemade Cheesecake with Fresh Berries and Mint
                  </CardSubtitle>
                  <CardText className="text-muted text-small mb-0 font-weight-light">
                    09.04.2018
                  </CardText>
                </CardBody>
              </Card>
            </Colxx>
          ))}
        </Row>
      </Colxx>
    </Row>
  );
};

export default SchoolCard;
