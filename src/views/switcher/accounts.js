import React, { Suspense, useEffect, useContext } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../component/common/CustomBootstrap";
import GradientWithRadialProgressCard from "../../component/cards/GradientWithRadialProgressCard";
import FreelanceCard from "../../component/cards/freelanceCards";
import SchoolCard from "../../component/cards/schoolCard";
import OrganisationCard from "../../component/cards/organisationCard";

const Account = ({ intl, match, ...props }) => {
  return (
    <>
      <div className="section mb-10">
        <Row>
          <Colxx xxs="12">
            <h1>My Account</h1>
            <p>
              You have multiple account please choose which account you want to
              view. You can switch whenever you want to by clicking switch
              account button.
            </p>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="4" md="6" className="mb-4">
            <GradientWithRadialProgressCard
              icon="iconsminds-the-white-house"
              title={`State Bills`}
              detail={"Click here to pay your state bills"}
              to="home"
            />
          </Colxx>
          <Colxx lg="4" md="6" className="mb-4">
            <GradientWithRadialProgressCard
              icon="iconsminds-communication-tower-2"
              title={`Utility Bill`}
              detail={"Click here to pay your utility bills"}
              to="utility-bill"
            />
          </Colxx>
          <Colxx lg="4" md="6" className="mb-4 d-none d-md-block">
            <GradientWithRadialProgressCard
              icon=""
              title={``}
              detail={""}
              to="home"
            />
          </Colxx>
        </Row>
      </div>

      <div className="section mb-10">
        <Row>
          <Colxx xxs="12">
            <h1>Setup Account</h1>
            <p>
              You have multiple account please choose which account you want to
              view. You can switch whenever you want to by clicking switch
              account button.
            </p>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="4" md="6" className="mb-4">
            <GradientWithRadialProgressCard
              icon="iconsminds-the-white-house"
              title={`State Bills`}
              detail={"Click here to pay your state bills"}
              to="home"
            />
          </Colxx>
          <Colxx lg="4" md="6" className="mb-4">
            <GradientWithRadialProgressCard
              icon="iconsminds-communication-tower-2"
              title={`Utility Bill`}
              detail={"Click here to pay your utility bills"}
              to="utility-bill"
            />
          </Colxx>
          <Colxx lg="4" md="6" className="mb-4 d-none d-md-block">
            <GradientWithRadialProgressCard
              icon=""
              title={``}
              detail={""}
              to="home"
            />
          </Colxx>
        </Row>
      </div>

      <div className="section mb-10">
        <Row>
          <Colxx xxs="12">
            <h1>School(s) on Oatleaf</h1>
            <p>
              You have multiple account please choose which account you want to
              view. You can switch whenever you want to by clicking switch
              account button.
            </p>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <SchoolCard />
          </Colxx>
        </Row>
      </div>

      <div className="section mb-10">
        <Row>
          <Colxx xxs="12">
            <h1>Freelance Teacher(s) on Oatleaf</h1>
            <p>
              You have multiple account please choose which account you want to
              view. You can switch whenever you want to by clicking switch
              account button.
            </p>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" className="mb-4">
            <FreelanceCard />
          </Colxx>
        </Row>
      </div>

      <div className="section mb-10">
        <Row>
          <Colxx xxs="12">
            <h1>Organisation(s) on Oatleaf</h1>
            <p>
              You have multiple account please choose which account you want to
              view. You can switch whenever you want to by clicking switch
              account button.
            </p>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <OrganisationCard />
          </Colxx>
        </Row>
      </div>
    </>
  );
};
export default Account;
