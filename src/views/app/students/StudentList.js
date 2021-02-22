import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import ListPageHeading from "../../../component/DataList/ListPageHeading";
import ListPageListing from "../../../component/DataList/ListPageListing";
import useMousetrap from "../../../component/hooks/use-mousetrap";
import { BASE_URL } from "../../../constants/defaultValues";
import { AccountContext } from "../../../context/AccountContext";
import { AuthContext } from "../../../context/AuthContext";
import NewStudent from "./NewStudent";

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const apiUrl = `${BASE_URL}/School/students`;
const classUrl = `${BASE_URL}/School/classes`;

const orderOptions = [
  { column: "title", label: "Product Name" },
  { column: "category", label: "Category" },
  { column: "status", label: "Status" },
];
const pageSizes = [4, 8, 12, 20];

const gender = [
  { label: "Male", value: 1, key: 1 },
  { label: "Female", value: 2, key: 2 },
  { label: "Not Specified", value: 0, key: 3 },
];

const StudentList = ({ match }) => {
  const { dispatch, auth } = useContext(AuthContext);
  const accountContext = useContext(AccountContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState("thumblist");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: "title",
    label: "Product Name",
  });
  const [selectedClassOption, setSelectedClassOption] = useState({});
  const [classes, setClasses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);

  const [editor, setEditor] = useState(false);

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
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  const handlePictureUplaod = () => {
    setEditor(!editor);
  };

  useEffect(() => {
    async function fetchData() {
      axios
        .get(
          `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${selectedOrderOption.column}&search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${accountContext?.account?.token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          return res.data ?? {};
        })

        .then((data) => {
          if (data && data.length > 0) {
            setTotalPage(data.totalPage);
            setItems(
              data.data.map((x) => {
                return {
                  ...x,
                  img: (x.img = "https://localhost:44319/logo/student.png"),
                };
              })
            );
            setSelectedItems([]);
            setTotalItemCount(data.totalItem);
            setIsLoaded(true);
          } else {
            setTotalPage(0);
            setItems([]);
            setSelectedItems([]);
            setTotalItemCount(0);
            setIsLoaded(true);
          }
        })
        .catch((data) => {
          setTotalPage(0);
          setItems([]);
          setSelectedItems([]);
          setTotalItemCount(0);
          setIsLoaded(true);
        });
    }
    fetchData();
  }, [selectedPageSize, currentPage, selectedOrderOption, search]);

  const onCheckItem = (event, id) => {
    if (
      event.target.tagName === "A" ||
      (event.target.parentElement && event.target.parentElement.tagName === "A")
    ) {
      return true;
    }
    if (lastChecked === null) {
      setLastChecked(id);
    }

    let selectedList = [...selectedItems];
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    setSelectedItems(selectedList);

    if (event.shiftKey) {
      let newItems = [...items];
      const start = getIndex(id, newItems, "id");
      const end = getIndex(lastChecked, newItems, "id");
      newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...newItems.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedItems));
      setSelectedItems(selectedList);
    }
    document.activeElement.blur();
    return false;
  };

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(items.map((x) => x.id));
    }
    document.activeElement.blur();
    return false;
  };

  const handleChangeClass = (index) => {
    setSelectedClassOption(classes[index]);
  };

  const onContextMenuClick = (e, data) => {
    // params : (e,data,target)
    console.log("onContextMenuClick - selected items", selectedItems);
    console.log("onContextMenuClick - action : ", data.action);
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }

    return true;
  };

  useMousetrap(["ctrl+a", "command+a"], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(["ctrl+d", "command+d"], () => {
    setSelectedItems([]);
    return false;
  });

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="Student"
          displayMode={displayMode}
          selectedClassOption={selectedClassOption}
          classOption={classes}
          changeClass={handleChangeClass}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          changeOrderBy={(column) => {
            setSelectedOrderOption(
              orderOptions.find((x) => x.column === column)
            );
          }}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          selectedOrderOption={selectedOrderOption}
          match={match}
          startIndex={startIndex}
          endIndex={endIndex}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          onSearchKey={(e) => {
            if (e.key === "Enter") {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <NewStudent
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          gender={gender}
          classes={classes}
          toggleEditor={handlePictureUplaod}
        />
        <ListPageListing
          items={items}
          displayMode={displayMode}
          selectedItems={selectedItems}
          onCheckItem={onCheckItem}
          currentPage={currentPage}
          totalPage={totalPage}
          onContextMenuClick={onContextMenuClick}
          onContextMenu={onContextMenu}
          onChangePage={setCurrentPage}
        />
      </div>
      <Modal
        isOpen={editor}
        toggle={handlePictureUplaod}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalBody>hello</ModalBody>
      </Modal>
    </>
  );
};

export default StudentList;
