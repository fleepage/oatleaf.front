import { CircularProgress } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Button, Row } from "reactstrap";
import { AddAccount } from "../../actions/AccountAction";
import { LogoutAction } from "../../actions/AuthAction";
import FreelanceCard from "../../component/cards/freelanceCards";
import GradientWithRadialProgressCard from "../../component/cards/GradientWithRadialProgressCard";
import OrganisationCard from "../../component/cards/organisationCard";
import SchoolCard from "../../component/cards/schoolCard";
import { Colxx, Separator } from "../../component/common/CustomBootstrap";
import { AccountContext } from "../../context/AccountContext";
import { AuthContext } from "../../context/AuthContext";
import { MyAccountsService } from "../../services/AuthService";

const Account = ({ intl, match, ...props }) => {
  const authContext = useContext(AuthContext);
  const accountContext = useContext(AccountContext);
  const [accounts, setAccounts] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(async () => {
    var _accounts = await MyAccountsService({
      token: authContext.auth.data.token,
    });
    if (_accounts != undefined) {
      if (_accounts?.status === 200) {
        accountContext.dispatch(
          AddAccount({ data: _accounts.data?.myAccounts ?? [] })
        );
        setAccounts(accountContext.account.data ?? []);
      } else {
        authContext.dispatch(
          LogoutAction({ message: `${btoa("Session has Expired.")}` })
        );
        //props.history.push(`/login?m=${btoa("Session Expired.")}`);
      }
    } else {
      accountContext.dispatch(AddAccount({ data: {} }));
    }
    setRefresh(false);
  }, [accounts, refresh]);

  return (
    <>
      <div className="section mb-10">
        <Row>
          <Colxx xxs="12">
            <h1>My Account</h1>
            <p>
              {accounts.length > 0
                ? "Select Account you would love to access."
                : "No account to show click on refresh."}
              {!refresh && (
                <div className="float-md-right pt-1">
                  <Button
                    color="primary"
                    size="xs"
                    className="mb-2"
                    onClick={() => {
                      setRefresh(true);
                      setAccounts([]);
                    }}
                  >
                    Refresh
                  </Button>
                </div>
              )}
            </p>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        {refresh && (
          <Row>
            <Colxx xxs="12 text-center">
              <CircularProgress style={{ color: "#3db264" }} />
              <p style={{ color: "#3db264" }}>
                Fetching account(s)...please wait.
              </p>
            </Colxx>
          </Row>
        )}
        {accounts.length > 0 && (
          <Row>
            {accounts.map((item, i) => (
              <Colxx lg="4" md="6" className="mb-4" key={i}>
                {item.role == "OrgAdmin" ? (
                  <GradientWithRadialProgressCard
                    icon="simple-icon-organization"
                    title={`Admin at ${item.orgAdmin.organisation.name}`}
                    detail={`Click to access your organisation account. `}
                    to="home"
                    selected={i}
                    accountId={item.id}
                    history={props.history}
                  />
                ) : item.role == "Teacher" ? (
                  <GradientWithRadialProgressCard
                    icon="iconsminds-the-white-house"
                    title={`${item.role} at ${item.teachers.school.name}`}
                    detail={`Click to access your school account. `}
                    to="home"
                    selected={i}
                    accountId={item.id}
                    history={props.history}
                  />
                ) : (
                  <GradientWithRadialProgressCard
                    icon="iconsminds-the-white-house"
                    title={`${item.role} at ${item.schoolAdmin.school.name}`}
                    detail={`Click to access your school account. `}
                    to="home"
                    selected={i}
                    accountId={item.id}
                    history={props.history}
                  />
                )}
              </Colxx>
            ))}
          </Row>
        )}
        {accounts.length == 0 && !refresh && (
          <Row>
            <Colxx xxs="12 text-center">
              <h3 style={{ color: "#3db264" }}>
                You have no account(s).Setup new account
              </h3>
            </Colxx>
          </Row>
        )}
      </div>

      <div className="section mb-10">
        <Row>
          <Colxx xxs="12">
            <h1>Setup New Account</h1>
            <p>You can setup new account.</p>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="4" md="6" className="mb-4">
            <GradientWithRadialProgressCard
              icon="iconsminds-the-white-house"
              title={`Register A School`}
              detail={
                "Do you have a school and want to transform it into a learning platform. Oatleaf will help you achieve that in few to no time."
              }
              to="home"
            />
          </Colxx>
          <Colxx lg="4" md="6" className="mb-4">
            <GradientWithRadialProgressCard
              icon="simple-icon-organization"
              title={`Create An Organisation`}
              detail={
                "Use oatleaf platform to achieve your organisational goals."
              }
              to="utility-bill"
            />
          </Colxx>
          <Colxx lg="4" md="6" className="mb-4">
            <GradientWithRadialProgressCard
              icon="iconsminds-business-man-woman"
              title={`Enable Your Freelance Account`}
              detail={
                "Enable your freelance account so that you can start reaching parent who are looking for home teachers for their kid(s)"
              }
              to="utility-bill"
            />
          </Colxx>
          <Colxx lg="4" md="6" className="mb-4">
            <GradientWithRadialProgressCard
              icon="iconsminds-business-man-woman"
              title={`Enable Parent Account`}
              detail={
                "Enable parent account so that you can start managing your kid(s)"
              }
              to="utility-bill"
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
