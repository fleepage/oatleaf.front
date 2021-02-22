import { Card } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Modal2 from "react-modal/lib/components/Modal";
import { Button, CardBody, CardTitle, Row, Table } from "reactstrap";
import { setContainerClassnames } from "../../../actions/MenuActions";
import IconCard from "../../../component/cards/IconCard";
import Badger from "../../../component/common/badger";
import { Colxx, Separator } from "../../../component/common/CustomBootstrap";
import { customModalStyle } from "../../../component/common/modalStyle";
import Breadcrumb from "../../../component/navs/Breadcrumb";
import { adminRoot } from "../../../constants/defaultValues";
import { MenuContext } from "../../../context/MenuContext";

const Settings = ({ match, history, ...props }) => {
  const menuContext = useContext(MenuContext);
  const [statModal, setStatModal] = useState(false);

  useEffect(() => {
    menuContext.dispatch(
      setContainerClassnames(
        1,
        menuContext.menu.containerClassnames,
        menuContext.menu.selectedMenuHasSubItems
      )
    );
  }, []);
  const cols = [
    {
      Header: "IMEI",
      accessor: "posImei",

      Cell: (props) => <>{props.value}</>,
    },

    {
      Header: "Biller",
      accessor: "billerName",

      Cell: (props) => <>{props.value}</>,
    },
    {
      Header: "Level One",
      accessor: "levelOne",

      Cell: (props) => <>{props.value}</>,
    },
    {
      Header: "Level Two",
      accessor: "levelTwo",

      Cell: (props) => <>{props.value}</>,
    },
    {
      Header: "Active",
      accessor: "isActive",

      Cell: (props) => (
        <>
          <Badger success={props.value} title={props.value ? "Yes" : "No"} />
        </>
      ),
    },
  ];

  const orderOptions = [
    { label: "Transaction Date -ASC" },
    { label: "Transaction Date -DSC" },
  ];
  const selectedOrderOption = {
    label: "Transaction Date -ASC",
  };
  const filterOptions = [
    { label: "State Bill Transactions" },
    { label: "Utility Bill Transactions" },
  ];
  const selectedFilterOption = {
    label: "State Bill Transactions",
  };

  const handleView = async (row) => {
    if (row) {
      history.push({
        pathname: `${adminRoot}/setup/pos/tracker`,

        state: {
          pos: row,
        },
      });
    }
  };

  const handleAddNew = async () => {
    history.push(`${adminRoot}/setup/pos/create`);
  };

  const handleViewStat = async () => {
    setStatModal(true);
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Settings" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Card>
        <CardBody>
          <CardTitle></CardTitle>
          <Table striped responsive className="mt-2">
            <thead>
              <th>Setting</th>
              <th>Action</th>
            </thead>
            <tbody>
              <tr>
                <td>display</td>
                <td>on</td>
              </tr>
              <tr>
                <td>sound</td>
                <td>off</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Modal2
        isOpen={statModal}
        onRequestClose={() => setStatModal(!statModal)}
        style={customModalStyle}
        preventScroll
        shouldCloseOnOverlayClick={false}
        contentLabel="Loading Account"
      >
        <div className="text-center">
          <h2 className="white">POS Statistic</h2>
          <div className="mb-5 mt-5" style={{ display: "flex" }}>
            <IconCard
              className="ml-2"
              icon="iconsminds-financial"
              title={`Transaction Volume`}
              value={`9`}
              to={`${adminRoot}/report/transactions`}
            />
            <IconCard
              className="ml-2"
              icon="iconsminds-financial"
              title={`Transaction Volume`}
              value={`9`}
              to={`${adminRoot}/report/transactions`}
            />
            <IconCard
              className="ml-2"
              icon="iconsminds-financial"
              title={`Transaction Volume`}
              value={`9`}
              to={`${adminRoot}/report/transactions`}
            />
          </div>
          <Button
            color="primary"
            size="xs"
            className="mb-2"
            onClick={() => setStatModal(!statModal)}
          >
            Close
          </Button>
        </div>
      </Modal2>
    </>
  );
};
export default Settings;
