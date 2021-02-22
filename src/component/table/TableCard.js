/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, { useCallback, useMemo, useRef, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import Modal2 from "react-modal/lib/components/Modal";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import Table from "reactstrap/lib/Table";
import { getCurrentColor } from "../../helpers/Utils";
import { Colxx } from "../common/CustomBootstrap";
import { customModalStyle } from "../common/modalStyle";
import Breadcrumb from "../navs/Breadcrumb";
import ErcasTable from "./Table";
const theme = getCurrentColor().split(".")[0];
const OatleafReactTable = ({
  title = "Recent Transactions",
  column = [],
  divided = false,
  defaultPageSize = 10,
  hover = true,
  orderItems = [],
  filterItems = [],
  selectedOrder,
  selectedFilter,
  responsive = true,
  showStat = true,
  searchButtonOutline = true,
  showPageSizeOptions = true,
  showPageJump = false,
  showSearch = false,
  showEdit = false,
  showDelete = false,
  showView = true,
  showFilterBy = false,
  showOrderBy = false,
  showRefresh = true,
  showAdd = false,
  hasActionMenu = true,
  pagination = true,
  match,
  fetchService,
  searchService,
  orderByService,
  filterByService,
  handleView,
  handleEdit,
  handleDelete,
  handleViewMore,
  handleAddNew,
  handleShowStat,
  addNewText = "Add New",
  idAccessor = "id",
  useBreadcromb = true,
  refreshRef,
  ...props
}) => {
  const cols = useMemo(() => column, []);
  const [modalBasic, setModalBasic] = useState(false);
  const [statModal, setStatModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const [orderOptions, setOrderOptions] = useState(orderItems);
  const [selectedOrderOption, setSelectedOrderOption] = useState(selectedOrder);
  const [filterOptions, setFilterOptions] = useState(filterItems);
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    selectedFilter
  );
  const [viewData, setViewData] = useState({});
  const fetchData = useCallback(async ({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    setIsLoading(true);
    if (fetchId === fetchIdRef.current) {
      const response = await fetchService({
        pageSize: pageSize,
        pageIndex: pageIndex + 1,
      });
      setData(response?.data?.data ?? []);
      setPageCount(response?.pageCount ?? 0);
      setIsLoading(false);
    }
  }, []);

  const handleSearch = async (keyword) => {
    setIsLoading(true);
    const response = await searchService({
      pageSize: defaultPageSize,
      pageIndex: 1,
      word: keyword,
    });
    setData(response?.data?.data ?? []);
    setPageCount(response?.pageCount ?? 0);
    setIsLoading(false);
  };

  const handleOrderBy = async (e) => {
    setSelectedOrderOption(e);
    setIsLoading(true);
    const response = await orderByService({
      pageSize: defaultPageSize,
      pageIndex: 1,
      orderBy: e,
    });
    setData(response?.data?.data ?? []);
    setPageCount(response?.pageCount ?? 0);
    setIsLoading(false);
  };

  const handleFilterBy = async (e) => {
    setSelectedFilterOption(e);
    setIsLoading(true);
    const response = await filterByService({
      pageSize: defaultPageSize,
      pageIndex: 1,
      orderBy: e,
    });
    setData(response?.data?.data ?? []);
    setPageCount(response?.pageCount ?? 0);
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    const response = await fetchService({
      pageSize: defaultPageSize,
      pageIndex: 1,
    });
    setData(response?.data?.data ?? []);
    setPageCount(response?.pageCount ?? 0);
    setIsLoading(false);
  };

  const viewUndefined = (row) => {
    setViewData(row);
    setModalBasic(!modalBasic);
  };

  const handleStat = () => {
    setStatModal(true);
  };
  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text={"..Loading data Please wait..."}
      styles={{
        overlay: (base) => ({
          ...base,
          background:
            theme === "dark"
              ? "rgba(0, 0, 0, 0.7)"
              : "rgba(255, 255, 255, 0.7)",
        }),
        content: (base) => ({
          ...base,
          color:
            theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)",
        }),
        spinner: (base) => ({
          ...base,
          width: "100px",
          "& svg circle": {
            stroke: "#1d477a",
          },
        }),
      }}
    >
      <Card className="mb-4">
        <CardBody>
          <CardTitle>
            <Row>
              <Colxx xxs="12">
                <div className="d-block d-md-inline-block pt-1">
                  {!useBreadcromb && <h1>{title}</h1>}
                  {useBreadcromb && (
                    <Breadcrumb heading={title} match={match} />
                  )}
                </div>
                {showAdd && (
                  <div className="float-md-right pt-1">
                    <Button
                      color="primary"
                      className="mb-2"
                      onClick={handleAddNew}
                    >
                      {addNewText}
                    </Button>
                  </div>
                )}
              </Colxx>
            </Row>
            {(showOrderBy || showFilterBy || showRefresh) && (
              <Row>
                <Colxx xxs="12">
                  <div>
                    <Button
                      color="empty"
                      className="pt-0 pl-0 d-inline-block d-md-none"
                      onClick={() =>
                        setDisplayOptionsIsOpen(!displayOptionsIsOpen)
                      }
                    >
                      Menu
                      <i className="simple-icon-arrow-down align-middle" />
                    </Button>
                    <Collapse
                      isOpen={displayOptionsIsOpen}
                      className="d-md-block"
                      id="displayOptions"
                    >
                      {showOrderBy && (
                        <div className="d-block d-md-inline-block pt-1">
                          <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                            <DropdownToggle
                              caret
                              color="outline-dark"
                              size="xs"
                            >
                              orderby:&nbsp;
                              {selectedOrderOption.label}
                            </DropdownToggle>
                            <DropdownMenu>
                              {orderOptions.map((order, index) => {
                                return (
                                  <DropdownItem
                                    key={index}
                                    onClick={() => handleOrderBy(order)}
                                  >
                                    {order.label}
                                  </DropdownItem>
                                );
                              })}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      )}
                      {showFilterBy && (
                        <div className="d-block d-md-inline-block pt-1">
                          <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                            <DropdownToggle
                              caret
                              color="outline-dark"
                              size="xs"
                            >
                              filterby:&nbsp;
                              {selectedFilterOption.label}
                            </DropdownToggle>
                            <DropdownMenu
                              modifiers={{
                                setMaxHeight: {
                                  enabled: true,
                                  order: 890,
                                  fn: (data) => {
                                    return {
                                      ...data,
                                      styles: {
                                        ...data.styles,
                                        overflow: "auto",
                                        maxHeight: "100px",
                                      },
                                    };
                                  },
                                },
                              }}
                            >
                              {filterOptions.map((filter, index) => {
                                return (
                                  <DropdownItem
                                    key={index}
                                    onClick={() => handleFilterBy(filter)}
                                  >
                                    {filter.label}
                                  </DropdownItem>
                                );
                              })}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      )}
                      {showRefresh && (
                        <div className="float-md-right pt-1">
                          <Button
                            outline
                            color="primary"
                            size="xs"
                            className="mb-2"
                            onClick={handleRefresh}
                            ref={refreshRef}
                          >
                            Refresh
                          </Button>
                          {showStat && (
                            <Button
                              outline
                              color="primary"
                              size="xs"
                              className="ml-2 mb-2"
                              onClick={
                                handleShowStat ? handleShowStat : handleStat
                              }
                            >
                              <i className="iconsminds-bar-chart-4" />
                            </Button>
                          )}
                        </div>
                      )}
                    </Collapse>
                  </div>
                </Colxx>
              </Row>
            )}
          </CardTitle>

          <ErcasTable
            columns={cols}
            data={data}
            onView={handleView ? handleView : viewUndefined}
            onSearch={handleSearch}
            fetchData={fetchData}
            onViewMore={handleViewMore}
            pageCount={pageCount}
            divided={divided}
            defaultPageSize={defaultPageSize}
            hover={hover}
            responsive={responsive}
            searchButtonOutline={searchButtonOutline}
            showPageSizeOptions={showPageSizeOptions}
            showPageJump={showPageJump}
            showSearch={showSearch}
            showEdit={showEdit}
            showDelete={showDelete}
            showView={showView}
            pagination={pagination}
            idAccessor={idAccessor}
            hasActionMenu={hasActionMenu}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardBody>
      </Card>
      <Modal
        isOpen={modalBasic}
        toggle={() => setModalBasic(!modalBasic)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <ModalHeader>Details</ModalHeader>
        <ModalBody>
          <Table striped responsive>
            <thead>
              <th>Item</th>
              <th>Values</th>
            </thead>
            <tbody>
              {Object.keys(viewData).map((keyName, i) => (
                <tr key={i}>
                  <td>{keyName}</td>

                  <td>{viewData[keyName]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalBasic(false)}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>

      <Modal2
        isOpen={statModal}
        onRequestClose={() => setStatModal(!statModal)}
        style={customModalStyle}
        preventScroll
        shouldCloseOnOverlayClick={false}
        contentLabel="Loading Account"
      >
        <div className="text-center">
          <h2 className="white">No Statistic to show!!!</h2>
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
    </LoadingOverlay>
  );
};

export default OatleafReactTable;
