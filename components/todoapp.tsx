"use client";
import {
  addTask,
  selectListTask,
  deleteTask,
  updateTask,
  search,
  setlist,
} from "@/lib/features/listTaskSlice";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ListTask } from "./listTask";
import { AddBox } from "./addBox";
import { SearchBox } from "./searchBox";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import FilterDate from "./filterDate";
import dayjs from "dayjs";
import FilterStatus from "./filterStatus";
import Pagination from "./pagination";
import FilterRecipient from "./filterRecipient";
import {
  changeContent,
  changeDeadline,
  changeId,
  selectTask,
} from "@/lib/features/taskSlice";

export const INPROGRESS = 1;
export const DONE = 2;
export const CLOSED = 3;

export const TodoApp = () => {
  const [inputSearchText, setInputSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [typeStatus, setTypeStatus] = useState(0);
  const [recipientFilter, setRecipientFilter] = useState("1");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const listTask = useAppSelector(selectListTask);
  const task = useAppSelector(selectTask);
  const dispatch = useAppDispatch();

  const inputAddRef = useRef<HTMLInputElement>(null);
  //handle functions
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeContent(e.target.value));
  };
  const handleDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeDeadline(dayjs(e.target.value).unix()));
  };
  const handleStatus = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    let status = e.target.checked ? DONE : INPROGRESS;
    dispatch(changeId(id))
    const res = await fetch("/api/listtask/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        status: status,
      }),
    });
    const data = await res.json();
    dispatch(
      updateTask({ idEdit: data.new_task.id, status: data.new_task.status })
    );
    dispatch(changeId(0))
  };
  const handleAddTask = async () => {
    if (!task.id) {
      const res = await fetch("/api/listtask/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: task.content,
          status: INPROGRESS,
          startTime: dayjs().unix(),
          deadline: task.deadline,
          recipient: 0,
        }),
      });
      getAPIListTask(page, pageSize, '');
      handleShowAll()
    } else {
      const res = await fetch("/api/listtask/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: task.id,
          content: task.content,
          deadline: task.deadline,
        }),
      });
      const data = await res.json();
      
      // dispatch(
      //   updateTask({
      //     idEdit: data.new_task.id,
      //     inputText: data.new_task.content,
      //     deadline: data.new_task.deadline,
      //   })
      // );
      // setIdEdit(0);
      dispatch(changeId(0));
    }
    dispatch(changeContent(""));
    dispatch(changeDeadline(0));
    inputAddRef.current && inputAddRef.current.focus();
  };
  const handleEdit = (id: number) => {
    // setIdEdit(id);
    dispatch(changeId(id));
    let temp = listTask.filter((value) => value.id === Number(id))[0];
    dispatch(changeContent(temp.content));
    dispatch(changeDeadline(temp.deadline));
    inputAddRef.current && inputAddRef.current.focus();
  };
  const handleDelete = async (id: number) => {
    dispatch(changeId(id))
    const res = await fetch(`/api/listtask/delete/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    // dispatch(deleteTask(data.task_deleted.id));
    dispatch(changeId(0))
    if(task.content) {
      dispatch(changeContent(""));
    } 
    task.deadline && dispatch(changeDeadline(0));
  };
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchText(e.target.value);
  };
  const handleSearchTask = () => {
    getAPIListTask(page, pageSize, inputSearchText);
  };
  const handleTypeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(Number(e.target.value));
    handleShowAll();
  };
  const handleShowAll = () => {
    setInputSearchText("");
    setStartDate(null);
    setEndDate(null);
    setTypeStatus(0);
    setRecipientFilter("");
    getAPIListTask(page, pageSize, "");
  };
  const handleInputRangeDeadline = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const handleFilter = async () => {
    const res = await fetch(
      `/api/listtask/filter?${typeFilter ? "typeFilter=" + typeFilter : ""}${
        startDate ? "&startDate=" + dayjs(startDate).unix() : ""
      }${endDate ? "&endDate=" + dayjs(endDate).unix() : ""}${
        typeStatus ? "&status=" + typeStatus : ""
      }${recipientFilter ? "&recipient=" + recipientFilter : ""}
      `
    );
    const data = await res.json();
    setTotal(data.total);
    dispatch(setlist(data.listTask));
  };
  const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setTypeStatus(Number(e.target.value));
  };
  const handleChangeRecipient = (e: ChangeEvent<HTMLSelectElement>) => {
    setRecipientFilter(e.target.value);
  };
  const changePage = (page: number) => {
    setPage(page);
  };
  const handleChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
  };
  async function getAPIListTask(
    page: number,
    pageSize: number,
    search?: string
  ) {
    const response = await fetch(
      `/api/listtask?${page ? "page=" + page : ""}${
        pageSize ? "&pageSize=" + pageSize : ""
      }${search ? "&search=" + search : ""}`
    );
    const list = await response.json();
    setTotal(list.total);
    dispatch(setlist(list.listTask));
  }
  useEffect(() => {
    getAPIListTask(page, pageSize, inputSearchText);
  }, [page, pageSize]);
  useEffect(() => {
    if (!listTask.length && page > 0) {
      setPage((preState) => preState - 1);
    }
  }, [listTask.length]);
  useEffect(() => {
    if(typeStatus) {
      handleFilter();
    } 
  }, [typeStatus]);
  useEffect(() => {
    if(Number(recipientFilter)) {
      handleFilter();
    }
  }, [recipientFilter]);
  useEffect(() => {
    if(!task.id){     
      switch (typeFilter) {
        case 0:
          handleSearchTask();
          break;
        case 1:
          (startDate && endDate) ? handleFilter() : getAPIListTask(page, pageSize, '');
          break;
        case 2:
          typeStatus ? handleFilter() : getAPIListTask(page, pageSize, '');
          break;
        case 3:
          recipientFilter ? handleFilter() : getAPIListTask(page, pageSize, '');
          break;
        default:
          break;
      }
    }
  }, [task.id]);
  return (
    <div className="flex flex-col w-10/12 border-2 border-solid border-black rounded-xl p-10 gap-5">
      <h1 className="text-2xl">To Do List</h1>
      <AddBox
        inputText={task.content}
        handleInput={handleInput}
        deadline={task.deadline}
        handleDeadline={handleDeadline}
        handleAddTask={handleAddTask}
        idEdit={task.id}
        ref={inputAddRef}
      />
      <div className="flex gap-5">
        <select
          value={typeFilter}
          onChange={handleTypeFilter}
          className="p-3 border-2 border-solid border-black rounded-xl"
        >
          <option value="0">Search</option>
          <option value="1">Filter date</option>
          <option value="2">Filter status</option>
          <option value="3">Filter recipient</option>
        </select>
        {typeFilter === 0 ? (
          <SearchBox
            handleSearchTask={handleSearchTask}
            inputSearchText={inputSearchText}
            handleSearchInput={handleSearchInput}
            handleShowAll={handleShowAll}
          />
        ) : typeFilter === 1 ? (
          <FilterDate
            startDate={startDate}
            endDate={endDate}
            handleInputRangeDeadline={handleInputRangeDeadline}
            handleFilterDeadline={handleFilter}
          />
        ) : typeFilter === 2 ? (
          <FilterStatus
            setTypeStatus={setTypeStatus}
            typeStatus={typeStatus}
            handleChangeStatus={handleChangeStatus}
          />
        ) : (
          <FilterRecipient
            recipientFilter={recipientFilter}
            handleChangeRecipient={handleChangeRecipient}
          />
        )}
      </div>
      <ListTask
        page={page}
        pageSize={pageSize}
        listTask={listTask}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleStatus={handleStatus}
      />
      {total > pageSize && (
        <Pagination
          page={page}
          pageSize={pageSize}
          changePage={changePage}
          handleChangePageSize={handleChangePageSize}
          total={total}
        />
      )}
    </div>
  );
};
