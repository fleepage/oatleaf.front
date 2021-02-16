import { CircularProgress } from "@material-ui/core";
import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { NavLink } from "react-router-dom";
import { Badge, Button, Card, CardBody } from "reactstrap";
import {
  AddAccountPermission,
  AddCurrentSchool,
  AddSelectedAccount,
} from "../../actions/AccountAction";
import { LogoutAction } from "../../actions/AuthAction";
import { adminRoot, customStyles } from "../../constants/defaultValues";
import { AccountContext } from "../../context/AccountContext";
import { AuthContext } from "../../context/AuthContext";
import { SelectAccountService } from "../../services/AuthService";

const GradientWithRadialProgressCard = ({
  icon = "/assets/img/utilities/school.png",
  title = "title",
  detail = "detail",
  to = "",
  isAdmin = false,
  name = "Name",
  school,
  active = false,
  history,
  selected,
  accountId = 0,
}) => {
  const authContext = useContext(AuthContext);
  const accountContext = useContext(AccountContext);
  const [modal, setModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const handleNavigate = async (e) => {
    e.preventDefault();
    accountContext.dispatch(AddSelectedAccount({ accountIndex: selected }));
    accountContext.dispatch(AddCurrentSchool({ school: school }));
    if (school.percentage < 100) {
      if (isAdmin) {
        history.push(`/accounts/school/register`);
      } else {
        setIsError(true);
        setMessage("Admin is currently setting up school please hold on.");
      }
    } else {
      setModal(true);
      setIsError(false);
      if (school.isBlocked) {
        setIsError(true);
        setMessage(school.blockedMessage ?? "School is blocked");
      } else {
        if (isAdmin) {
          await FetchAccount();
        } else {
          if (!active) {
            setIsError(true);
            setMessage("Your account is Deactivated by School Admin.");
          } else if (!school.isActive) {
            setIsError(true);
            setMessage("School is Deactivated by Admin.");
          } else {
            await FetchAccount();
          }
        }
      }
    }
  };

  const FetchAccount = async () => {
    const selectedAccount = await SelectAccountService({
      token: authContext.auth.data.token,
      account: accountId,
    });
    if (selectedAccount) {
      if (selectedAccount?.status == 200) {
        accountContext.dispatch(
          AddAccountPermission({
            permission: selectedAccount?.data?.permissions,
            token: selectedAccount?.data?.token,
          })
        );
        history.push(`${adminRoot}/${to}`);
      } else if (selectedAccount?.status == 401) {
        authContext.dispatch(
          LogoutAction({ message: `${btoa("Session has Expired.")}` })
        );
      } else {
        setIsError(true);
        setMessage(selectedAccount?.data?.message ?? "Error Encountered");
      }
    } else {
      setIsError(true);
      setMessage("Connection Problem!");
    }
  };

  return (
    <>
      <Card className="light-banner">
        <NavLink to="#" onClick={handleNavigate}>
          <Badge
            color={
              active
                ? school.isBlocked
                  ? "danger"
                  : !school.isActive
                  ? "danger"
                  : school.percentage < 100
                  ? "warning"
                  : "primary"
                : "danger"
            }
            pill
            className="position-absolute badge-top-left"
          >
            {active
              ? school.isBlocked
                ? "School is Blocked"
                : !school.isActive
                ? "School is Deactivated"
                : school.percentage < 100
                ? "Setting up"
                : "Active"
              : "Account is Deactivated"}
            {}
          </Badge>
          <CardBody className="justify-content-between d-flex flex-row align-items-center">
            <div>
              <img
                src={`https://localhost:44319/logo/${icon}`}
                className="rounded-circle"
                width="100px"
              />
              {/* <i
              
                className={`${icon} mr-2 text-white align-text-bottom d-inline-block`}
              /> */}
            </div>

            <div className="ml-5">
              <p className="">
                <h3>{title}</h3>
              </p>
              <p className="text-medium">{name}</p>
              <p
                className="text-medium "
                style={{ color: school.isBlocked ? "red" : "black" }}
              >
                {school.isBlocked ? school.blockedMessage : detail}
              </p>
            </div>
          </CardBody>
        </NavLink>
        <div className="text-right mr-5">
          {school.isBlocked && school.subHasExpired && (
            <p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  window.alert("hello");
                }}
              >
                Renew Subscription
              </Button>
            </p>
          )}
        </div>
      </Card>

      <Modal
        isOpen={modal}
        //onAfterOpen={afterOpenModal}
        onRequestClose={() => setModal(!modal)}
        style={customStyles}
        preventScroll
        shouldCloseOnOverlayClick={false}
        contentLabel="Loading Account"
      >
        {!isError && (
          <div className="text-center">
            <CircularProgress style={{ color: "#fff" }} />
            <h2 className="white">Loading Account...please wait</h2>
          </div>
        )}
        {isError && (
          <div className="text-center">
            <h2 className="white">{message}</h2>
            <Button
              color="primary"
              size="xs"
              className="mb-2"
              onClick={() => setModal(!modal)}
            >
              Close
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};
export default React.memo(GradientWithRadialProgressCard);
