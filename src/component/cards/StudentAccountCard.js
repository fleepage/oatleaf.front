import React from "react";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import { NavLink } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Row,
} from "reactstrap";
import { adminRoot } from "../../constants/defaultValues";
import { blogData } from "../../data/blogData";
import { Colxx } from "../common/CustomBootstrap";

const recentPosts = blogData.slice(0, 3);
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
const StudentAccountCard = () => {
  return (
    <Row>
      <Colxx xxs="12">
        <Row>
          <Colxx md="6" sm="6" lg="4" xxs="12">
            <Card className="mb-4">
              <CardBody>
                <div className="text-center">
                  <CardImg
                    top
                    src="https://localhost:44319/logo/student.png"
                    alt="Card image cap"
                    className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail"
                  />
                  <NavLink to={`${adminRoot}/cards`}>
                    <CardSubtitle className="mb-1">Sarah Kortney</CardSubtitle>
                  </NavLink>
                  <CardText className="text-muted text-small mb-4">
                    <p>Executive Director</p>
                    <p>Executive Director</p>
                    <p>Executive Director</p>
                    <p>Executive Director</p>
                    <p>Executive Director</p>
                  </CardText>
                  <Button outline size="sm" color="primary">
                    Edit
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx md="6" sm="6" lg="4" xxs="12">
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  Parent/Gaurdian
                  {/* <IntlMessages id="pages.recent-posts" /> */}
                </CardTitle>
                {recentPosts.map((blogItem, index) => {
                  return (
                    <div
                      className={`d-flex flex-row ${
                        index === recentPosts.length - 1 ? "" : "mb-3"
                      }`}
                      key={index}
                    >
                      <div>
                        <NavLink to="#" location={{}}>
                          <img
                            src={
                              //blogItem.thumb ??
                              "https://localhost:44319/logo/student.png"
                            }
                            alt="img caption"
                            className="list-thumbnail border-0"
                          />
                        </NavLink>
                      </div>
                      <div className="pl-3 pt-2 list-item-heading-container">
                        <NavLink to="#" location={{}}>
                          <ResponsiveEllipsis
                            className="list-item-heading"
                            text={blogItem.title}
                            maxLine="3"
                            trimRight
                            basedOn="words"
                            component="h5"
                          />
                        </NavLink>
                      </div>
                    </div>
                  );
                })}
                <div className="text-center">
                  <Button outline>Add Parent/Guardian</Button>
                </div>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx md="6" sm="6" lg="4" xxs="12">
            <Card className="mb-4">
              <CardBody>
                <div className="text-center">
                  <CardImg
                    top
                    src="https://localhost:44319/logo/student.png"
                    alt="Card image cap"
                    className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail"
                  />
                  <NavLink to={`${adminRoot}/cards`}>
                    <CardSubtitle className="mb-1">Sarah Kortney</CardSubtitle>
                  </NavLink>
                  <CardText className="text-muted text-small mb-4">
                    Executive Director
                  </CardText>
                  <Button outline size="sm" color="primary">
                    Edit
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Colxx>
    </Row>
  );
};

export default StudentAccountCard;
