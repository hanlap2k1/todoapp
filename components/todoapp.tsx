"use client";
import {
  addTask,
  selectListTask,
  deleteTask,
  updateTask,
  search,
  selectListTaskClone,
} from "@/lib/features/listTaskSlice";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ListTask } from "./listTask";
import { AddBox } from "./addBox";
import { SearchBox } from "./searchBox";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectTask } from "@/lib/features/taskSlice";
import { v4 as uuidv4 } from "uuid";
import FilterDate from "./filterDate";
import dayjs from "dayjs";
import FilterStatus from "./filterStatus";
import Pagination from "./pagination";
import FilterRecipient from "./filterRecipient";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const INPROGRESS = 1;
export const DONE = 2;
export const CLOSED = 3;

export const TodoApp = () => {
  const [inputText, setInputText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [inputSearchText, setInputSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [typeStatus, setTypeStatus] = useState(0);
  const [recipientFilter, setRecipientFilter] = useState("0");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const listTask = useAppSelector(selectListTask);
  const listTaskClone = useAppSelector(selectListTaskClone);
  const dispatch = useAppDispatch();

  const inputAddRef = useRef<HTMLInputElement>(null);
  //handle functions
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const handleDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.target.value);
  };
  const handleStatus = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    let status = e.target.checked ? DONE : INPROGRESS;
    dispatch(updateTask({ idEdit: id, status: status }));
  };
  const handleAddTask = () => {
    if (!idEdit) {
      handleShowAll();
      dispatch(
        addTask({
          id: uuidv4(),
          content: inputText,
          status: dayjs().isSameOrBefore(dayjs(deadline)) ? INPROGRESS : CLOSED,
          startTime: new Date().toISOString(),
          deadline: deadline,
          recipient: "",
        })
      );
    } else {
      dispatch(updateTask({ idEdit, inputText, deadline }));
      setIdEdit("");
    }
    setInputText("");
    setDeadline("");
    inputAddRef.current && inputAddRef.current.focus();
  };
  const handleEdit = (id: string) => {
    setIdEdit(id);
    let temp = listTask.filter((value) => value.id === id)[0];
    setInputText(temp.content);
    setDeadline(temp.deadline);
    inputAddRef.current && inputAddRef.current.focus();
  };
  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchText(e.target.value);
  };
  const handleSearchTask = () => {
    let temp = listTaskClone.filter((value) =>
      value.content.includes(inputSearchText)
    );
    dispatch(search(temp));
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
    dispatch(search(listTaskClone));
  };
  const handleInputRangeDeadline = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const handleFilterDeadline = () => {
    let temp = listTaskClone.filter(
      (value) =>
        dayjs(value.deadline).isSameOrAfter(dayjs(startDate)) &&
        dayjs(value.deadline).isSameOrBefore(dayjs(endDate))
    );
    dispatch(search(temp));
  };
  const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setTypeStatus(Number(e.target.value));
  };
  const handleFilterStatus = (typeStatus:number) => {
    let temp = !typeStatus ?
    listTaskClone :
    listTaskClone.filter(
      (value) => value.status === Number(typeStatus)
    );
    dispatch(search(temp));
  }
  const handleChangeRecipient = (e: ChangeEvent<HTMLSelectElement>) => {
    setRecipientFilter(e.target.value);
  };
  const handleFilterRecipient = (recipientFilter:string) => {
    let temp = !Number(recipientFilter)
      ? listTaskClone
      : listTaskClone.filter((value) => value.recipient === recipientFilter);
    dispatch(search(temp));
  }
  const changePage = (page: number) => {
    setPage(page);
  };
  const handleChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
  };
  useEffect(()=>{
    typeStatus && handleFilterStatus(typeStatus)
  },[typeStatus])
  useEffect(()=>{
    recipientFilter && handleFilterRecipient(recipientFilter)
  },[recipientFilter])
  useEffect(()=>{
    switch (typeFilter) {
      case 0:
        handleSearchTask();
        break;
      case 1:
        handleFilterDeadline();
        break;
      case 2:
        handleFilterStatus(typeStatus);
        break;
      case 3:
        handleFilterRecipient(recipientFilter);
        break;
      default:
        break;
    }
  },[listTaskClone])
  return (
    <div className="flex flex-col w-10/12 border-2 border-solid border-black rounded-xl p-10 gap-5">
      <h1 className="text-2xl">To Do List</h1>
      <AddBox
        inputText={inputText}
        handleInput={handleInput}
        deadline={deadline}
        handleDeadline={handleDeadline}
        handleAddTask={handleAddTask}
        idEdit={idEdit}
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
            handleFilterDeadline={handleFilterDeadline}
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
      {listTask.length > pageSize && (
        <Pagination
          page={page}
          pageSize={pageSize}
          changePage={changePage}
          handleChangePageSize={handleChangePageSize}
          total={listTask.length}
        />
      )}
    </div>
  );
};
