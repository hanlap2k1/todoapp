import { forwardRef } from "react";
export interface TypeSearchProps {
  inputSearchText: string;
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchTask: () => void;
  handleShowAll: () => void;
}
export const SearchBox = forwardRef<HTMLInputElement, TypeSearchProps>(
  function SearchBoxComponent(props, ref) {
    const {
      inputSearchText,
      handleSearchInput,
      handleSearchTask,
      handleShowAll,
    } = props;
    return (
      <div className="flex gap-5 flex-grow">
        <input
          ref={ref}
          type="text"
          value={inputSearchText}
          onInput={handleSearchInput}
          className="px-5 flex-grow border-2 border-solid border-black rounded-xl"
          placeholder={"Search..."}
        />
        <button
          className="px-5 py-3 bg-green-500 rounded-xl text-white"
          onClick={handleSearchTask}
        >
          Search
        </button>
        <button
          className="px-5 py-3 bg-green-500 rounded-xl text-white"
          onClick={handleShowAll}
        >
          Show all
        </button>
      </div>
    );
  }
);
