/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import classnames from "classnames";
import moment from "moment";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import LoadingOverlay from "react-loading-overlay";
import { usePagination, useTable } from "react-table";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import { HistoryService } from "../../services/HistoryService";
import { Colxx } from "../common/CustomBootstrap";
import DatatablePagination from "./DataTablePagination";

function ErcasTable({
  columns,
  data,
  divided = false,
  defaultPageSize = 10,
  hover = true,
  responsive = true,
  searchButtonOutline = true,
  showPageSizeOptions = true,
  showPageJump = false,
  onDelete,
  onView,
  onEdit,
  onViewMore,
  onSearch,
  showSearch = false,
  showEdit = false,
  showDelete = false,
  showView = true,
  pagination = true,
  pageCount: controlledPageCount,
  fetchData,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,

    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
      manualPagination: true,
      pageCount: controlledPageCount,
      autoResetPage: false,
    },
    //useSortBy,
    usePagination
  );

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    onSearch(keyword);
  };

  const handleChangeSearch = async (e) => {
    setKeyword(e.target.value);
  };

  return data.length > 0 ? (
    <>
      {showSearch && (
        <div className="row">
          <div className="col-12">
            <InputGroup className="mb-3">
              <Input
                placeholder="...Search..."
                style={{ fontSize: "20px" }}
                onChange={handleChangeSearch}
              />
              <InputGroupAddon addonType="append">
                <Button
                  outline={searchButtonOutline}
                  color="secondary"
                  onClick={handleSearch}
                >
                  <i className="simple-icon-magnifier"></i>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      )}
      <Table
        {...getTableProps()}
        className={`r-table table ${classnames({ "table-divided": divided })}`}
        responsive={responsive}
        hover={hover}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  //{...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sorted-desc"
                        : "sorted-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    id={"action" + cellIndex}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cellIndex === 4 ? (
                      <div style={{ paddingRight: "50px" }}>
                        {showView && (
                          <a
                            href="#"
                            className="icon-menu-item"
                            style={{ paddingRight: "20px" }}
                            onClick={(e) => {
                              if (onView != null)
                                onView(cell.render("Cell").props.cell.value);
                              e.preventDefault();
                            }}
                          >
                            <i
                              className={"simple-icon-eye"}
                              style={{ fontSize: "18px" }}
                            ></i>
                          </a>
                        )}

                        {showEdit && (
                          <a
                            href="#"
                            className="icon-menu-item"
                            style={{ paddingRight: "20px" }}
                            onClick={(e) => {
                              if (onEdit != null)
                                onEdit(cell.render("Cell").props.cell.value);
                              e.preventDefault();
                            }}
                          >
                            <i
                              className={"simple-icon-pencil"}
                              style={{ fontSize: "18px" }}
                            ></i>
                          </a>
                        )}

                        {showDelete && (
                          <a
                            href="#"
                            className="icon-menu-item"
                            style={{ paddingRight: "20px" }}
                            onClick={(e) => {
                              if (onEdit != null)
                                onDelete(cell.render("Cell").props.cell.value);
                              e.preventDefault();
                            }}
                          >
                            <i
                              className={"simple-icon-trash"}
                              style={{ fontSize: "18px" }}
                            ></i>
                          </a>
                        )}
                      </div>
                    ) : cellIndex === 2 ? (
                      moment(cell.render("Cell").props.cell.value).calendar()
                    ) : (
                      cell.render("Cell")
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>

      {pagination && (
        <DatatablePagination
          page={pageIndex}
          pages={pageCount}
          canPrevious={canPreviousPage}
          canNext={canNextPage}
          pageSizeOptions={[10, 20, 30, 40, 50]}
          showPageSizeOptions={showPageSizeOptions}
          showPageJump={showPageJump}
          defaultPageSize={pageSize}
          onPageChange={(p) => gotoPage(p)}
          onPageSizeChange={(s) => setPageSize(s)}
          paginationMaxSize={pageCount}
        />
      )}
      {!pagination && (
        <Row>
          <Colxx xxs="12">
            <Button
              color="primary"
              size="s"
              className="mb-2"
              onClick={() => {
                if (onViewMore != null) onViewMore();
              }}
            >
              View More Transactions
            </Button>
          </Colxx>
        </Row>
      )}
    </>
  ) : (
    <>
      <div className="text-center">
        <img
          src="/assets/img/utilities/empty.png"
          style={{ width: "30%", height: "30%" }}
        />
        <h2>Nothing to show</h2>
      </div>
    </>
  );
}

const ErcasTransactionTable = ({
  title = "Recent Transactions",
  divided = false,
  defaultPageSize = 10,
  hover = true,
  responsive = true,
  searchButtonOutline = true,
  showPageSizeOptions = true,
  showPageJump = false,
  showSearch = false,
  showEdit = false,
  showDelete = false,
  showView = true,
  showFilterBy = true,
  showOrderBy = true,
  showRefresh = true,
  showAdd = false,
  pagination = true,
  match,
  ...props
}) => {
  const cols = useMemo(
    () => [
      {
        Header: "Amount",
        accessor: "amount",

        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Email",
        accessor: "email",

        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Date",
        accessor: "createDate",

        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Status",
        accessor: "status",

        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Actions",
        accessor: "id",

        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );

  const igrCols = useMemo(
    () => [
      {
        Header: "Amount",
        accessor: "amount",

        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Email",
        accessor: "email",

        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Date",
        accessor: "createDate",

        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Status",
        accessor: "status",

        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Actions",
        accessor: "id",

        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const [orderOptions, setOrderOptions] = useState([
    { label: "Transaction Date -ASC" },
    { label: "Transaction Date -DSC" },
  ]);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    label: "Transaction Date -ASC",
  });
  const [filterOptions, setFilterOptions] = useState([
    { label: "State Bill Transactions" },
    { label: "Utility Bill Transactions" },
  ]);
  const [selectedFilterOption, setSelectedFilterOption] = useState({
    label: "State Bill Transactions",
  });

  const fetchData = useCallback(async ({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    setIsLoading(true);
    if (fetchId === fetchIdRef.current) {
      const response = await HistoryService({
        pageSize: pageSize,
        pageIndex: pageIndex + 1,
      });
      setData(response?.data ?? []);
      setPageCount(response?.pageCount ?? 0);
      setIsLoading(false);
    }
  }, []);

  const handleView = async (id) => {
    props.history.push(`/app/history?p=${id}`);
  };

  const handleViewMore = async () => {
    props.history.push(`/app/history`);
  };

  const handleSearch = async (keyword) => {
    setIsLoading(true);
    const response = await HistoryService({
      pageSize: defaultPageSize,
      pageIndex: 1,
    });
    setData(response?.data ?? []);
    setPageCount(response?.pageCount ?? 0);
    setIsLoading(false);
  };

  const handleOrderBy = async (e) => {
    setSelectedOrderOption(e);
    setIsLoading(true);
    const response = await HistoryService({
      pageSize: defaultPageSize,
      pageIndex: 1,
    });
    setData(response?.data ?? []);
    setPageCount(response?.pageCount ?? 0);
    setIsLoading(false);
  };

  const handleFilterBy = async (e) => {
    setSelectedFilterOption(e);
    setIsLoading(true);
    const response = await HistoryService({
      pageSize: defaultPageSize,
      pageIndex: 1,
    });
    setData(response?.data ?? []);
    setPageCount(response?.pageCount ?? 0);
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    const response = await HistoryService({
      pageSize: defaultPageSize,
      pageIndex: 1,
    });
    setData(response?.data ?? []);
    setPageCount(response?.pageCount ?? 0);
    setIsLoading(false);
  };

  const handleAddNew = async () => {};

  const timeout = async (delay) => {
    return new Promise((res) => setTimeout(res, delay / 1000));
  };

  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text={"..Loading data Please wait..."}
      styles={{
        overlay: (base) => ({
          ...base,
          background: "rgba(255, 255, 255, 0.7)",
        }),
        content: (base) => ({
          ...base,
          color: "rgba(0, 0, 0, 1)",
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
                  <h1>{title}</h1>
                </div>
                {showAdd && (
                  <div className="float-md-right pt-1">
                    <Button
                      color="primary"
                      className="mb-2"
                      onClick={handleAddNew}
                    >
                      Add New
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
                      Table Menu
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
                            <DropdownMenu>
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
                          >
                            Refresh
                          </Button>
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
            onView={handleView}
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
          />
        </CardBody>
      </Card>
    </LoadingOverlay>
  );
};

export default ErcasTransactionTable;
