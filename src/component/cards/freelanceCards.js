import React from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  Row,
} from "reactstrap";
import { adminRoot } from "../../constants/defaultValues";
import { Colxx } from "../common/CustomBootstrap";
import ThumbnailImage from "./ThumbnailImage";

const FreelanceCard = () => {
  const freelance = [1, 2, 3, 4, 5, 6];
  return (
    <Row>
      <Colxx xxs="12">
        <Row>
          {freelance.map((item, i) => (
            <Colxx md="6" sm="6" lg="4" xxs="12" key={i}>
              <Card className="d-flex flex-row mb-4">
                <NavLink to={`${adminRoot}/cards`} className="d-flex">
                  <ThumbnailImage
                    rounded
                    src="/assets/img/profiles/l-1.jpg"
                    alt="Card image cap"
                    className="m-4"
                  />
                </NavLink>
                <div className=" d-flex flex-grow-1 min-width-zero">
                  <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                    <div className="min-width-zero">
                      <NavLink to={`${adminRoot}/cards`}>
                        <CardSubtitle className="truncate mb-1">
                          Sarah Kortney
                        </CardSubtitle>
                      </NavLink>
                      <CardText className="text-muted text-small mb-2">
                        Executive Director
                      </CardText>
                      <Button outline size="xs" color="primary">
                        Edit
                      </Button>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </Colxx>
          ))}
        </Row>
        <Row>
          <Colxx xxs="12">
            <a>Click Here</a>
          </Colxx>
        </Row>
      </Colxx>
    </Row>
  );
};

export default FreelanceCard;
