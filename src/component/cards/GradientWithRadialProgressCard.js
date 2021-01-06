import { CircularProgress } from "@material-ui/core";
import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { NavLink } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import {
  AddAccountPermission,
  AddSelectedAccount,
} from "../../actions/AccountAction";
import { LogoutAction } from "../../actions/AuthAction";
import { adminRoot } from "../../constants/defaultValues";
import { AccountContext } from "../../context/AccountContext";
import { AuthContext } from "../../context/AuthContext";
import { SelectAccountService } from "../../services/AuthService";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    background: "rgba(0, 0, 0, 0)",
    border: "none",
    transform: "translate(-50%, -50%)",
  },
};

const GradientWithRadialProgressCard = ({
  icon = "iconsminds-bell",
  title = "title",
  detail = "detail",
  to = "",
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
    setModal(true);
    setIsError(false);
    const selectedAccount = await SelectAccountService({
      token: authContext.auth.data.token,
      account: accountId,
    });
    if (selectedAccount) {
      if (selectedAccount?.status == 200) {
        accountContext.dispatch(AddSelectedAccount({ accountIndex: selected }));
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
    //history.push(`${adminRoot}/${to}`);
  };
  return (
    <>
      <NavLink to="#" onClick={handleNavigate}>
        <Card className="progress-banner">
          <CardBody className="justify-content-between d-flex flex-row align-items-center">
            <div>
              <i
                className={`${icon} mr-2 text-white align-text-bottom d-inline-block`}
              />
              <div>
                <p className="lead text-white">{title}</p>
                <p className="text-medium text-white">{detail}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </NavLink>
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
