import axios from "axios";
import React, { createRef, useContext, useEffect, useState } from "react";
import Modal2 from "react-modal/lib/components/Modal";
import { Button } from "reactstrap";
import { setContainerClassnames } from "../../../actions/MenuActions";
import IconCard from "../../../component/cards/IconCard";
import Badger from "../../../component/common/badger";
import { customModalStyle } from "../../../component/common/modalStyle";
import OatleafReactTable from "../../../component/table/TableCard";
import { adminRoot, BASE_URL } from "../../../constants/defaultValues";
import { AccountContext } from "../../../context/AccountContext";
import { AuthContext } from "../../../context/AuthContext";
import { MenuContext } from "../../../context/MenuContext";
import { FetchAdmissionService } from "../../../services/toolService";
import NewStudent from "./NewStudent";

const gender = [
  { label: "Male", value: "1", key: 1 },
  { label: "Female", value: "2", key: 2 },
  { label: "Not Specified", value: "0", key: 3 },
];

const classUrl = `${BASE_URL}/School/classes`;

const Student = ({ match, history, ...props }) => {
  const menuContext = useContext(MenuContext);
  const { dispatch, auth } = useContext(AuthContext);
  const accountContext = useContext(AccountContext);
  const [statModal, setStatModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [classes, setClasses] = useState([]);
  const refreshRef = createRef();
  const [editor, setEditor] = useState(false);
  const [selectedClassOption, setSelectedClassOption] = useState({});

  useEffect(() => {
    async function fetchClasses() {
      axios
        .get(`${classUrl}`, {
          headers: {
            Authorization: `Bearer ${accountContext?.account?.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          return res.data ?? {};
        })

        .then((data) => {
          //console.log(data);
          var dataset = data.classes.map((item) => {
            var option = {};
            option.id = item.id;
            option.label = item.name;
            return option;
          });
          setClasses(dataset);
          setSelectedClassOption(dataset[0]);
          //console.log(dataset[0]);
        })
        .catch((data) => {
          setClasses([{ label: "Empty", id: 0 }]);
          setSelectedClassOption({ label: "Empty", id: 0 });
        });
    }
    fetchClasses();
  }, []);

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
    setModal(true);
  };

  const handleViewStat = async () => {
    setStatModal(true);
  };

  const handlePictureUplaod = () => {
    setEditor(!editor);
  };

  return (
    <>
      <OatleafReactTable
        showAdd
        column={cols}
        fetchService={FetchAdmissionService}
        orderItems={orderOptions}
        filterItems={filterOptions}
        selectedFilter={selectedFilterOption}
        selectedOrder={selectedOrderOption}
        handleView={handleView}
        searchService={FetchAdmissionService}
        orderByService={FetchAdmissionService}
        filterByService={FetchAdmissionService}
        handleAddNew={handleAddNew}
        addNewText={"Add Student"}
        title={"Student(s)"}
        match={match}
        idAccessor={"referenceKey"}
        hasActionMenu={true}
        handleShowStat={handleViewStat}
        refreshRef={refreshRef}
      />
      <NewStudent
        modalOpen={modal}
        refresh={refreshRef}
        toggleModal={() => setModal(!modal)}
        gender={gender}
        classes={classes}
        toggleEditor={handlePictureUplaod}
        token={accountContext?.account?.token}
      />
      <Modal2
        isOpen={statModal}
        onRequestClose={() => setStatModal(!statModal)}
        style={customModalStyle}
        preventScroll
        shouldCloseOnOverlayClick={false}
        contentLabel="Loading Account"
      >
        <div className="text-center">
          <h2 className="white">Student Statistic</h2>
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
export default Student;
