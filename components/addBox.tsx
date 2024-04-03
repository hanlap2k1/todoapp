import { forwardRef } from "react";

export interface TypeAddProps {
  inputText: string;
  deadline: string;
  idEdit: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeadline: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddTask: () => void;
}
const AddBox = forwardRef<HTMLInputElement, TypeAddProps>(
  (props, ref) => {
    const {
      inputText,
      handleInput,
      deadline,
      handleDeadline,
      handleAddTask,
      idEdit,
    } = props;
    return (
      <div className="flex gap-5">
        <input
          ref={ref}
          type="text"
          value={inputText}
          onInput={handleInput}
          className="px-5 flex-grow border-2 border-solid border-black rounded-xl"
          placeholder={"Enter task..."}
        />
        <input
          type="date"
          value={deadline}
          onInput={handleDeadline}
          className="px-5 border-2 border-solid border-black rounded-xl"
        />
        <button
          className="px-5 py-3 bg-green-500 rounded-xl text-white"
          onClick={handleAddTask}
        >
          {idEdit === "" ? "Add task" : "Update task"}
        </button>
      </div>
    );
  }
);
AddBox.displayName = 'AddBox';
export default AddBox;
