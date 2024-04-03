import { TypeListTask, updateTask } from "@/lib/features/listTaskSlice";
import dayjs from "dayjs";
import { DONE } from "./todoapp";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectListRecipient } from "@/lib/features/listRecipient";
import { v4 as uuidv4 } from "uuid";
import { ChangeEvent } from "react";

const Task = ({
  value,
  handleDelete,
  handleEdit,
  handleStatus,
}: {
  value: TypeListTask;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  handleStatus: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const listRecipient = useAppSelector(selectListRecipient);
  const changeRecipient = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateTask({ idEdit: value.id, recipient: e.target.value }));
  };
  return (
    <div className="flex justify-between bg-slate-200 rounded-xl">
      <input
        onChange={(e) => handleStatus(e, value.id)}
        className="ml-5 bg-transparent"
        type="checkbox"
        disabled={!dayjs().isBefore(dayjs(value.deadline))}
        checked={value.status === DONE}
      />
      <p className="w-1/4 p-3 bg-transparent">{value.content}</p>
      <p className="p-3 bg-transparent flex items-center">
        {dayjs(value.deadline).format("DD/MM/YYYY")}
      </p>
      <p className="w-1/5 p-3 bg-transparent justify-center flex items-center">
        {value.status === DONE
          ? "Hoàn thành"
          : !dayjs().isBefore(dayjs(value.deadline))
          ? "Hết hạn"
          : "Đang thực hiện"}
      </p>
      <div className="flex items-center">
        <button
          className="w-20 py-3 bg-orange-500 rounded-xl text-white"
          onClick={() => handleEdit(value.id)}
        >
          Edit
        </button>
        <button
          className="w-20 py-3 bg-red-500 rounded-xl ml-5 text-white"
          onClick={() => handleDelete(value.id)}
        >
          Delete
        </button>
        <select
          onChange={changeRecipient}
          value={value.recipient}
          className="bg-sky-400 outline-none px-5 py-3 rounded-xl ml-5 text-white"
        >
          <option hidden value={""}>
            Chọn người nhận
          </option>
          {listRecipient.map((value) => (
            <option key={uuidv4()} value={value.id}>
              {value.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export const ListTask = ({
  page,
  pageSize,
  listTask,
  handleDelete,
  handleEdit,
  handleStatus,
}: {
  page: number;
  pageSize: number;
  listTask: TypeListTask[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  handleStatus: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-5">
      {listTask.map(
        (value, index) =>
          Math.floor(index / pageSize) === page && (
            <Task
              key={value.id}
              value={value}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleStatus={handleStatus}
            />
          )
      )}
    </div>
  );
};
