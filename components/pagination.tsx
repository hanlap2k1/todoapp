import { ChangeEvent } from "react";

function Pagination({
  page,
  pageSize,
  changePage,
  handleChangePageSize,
  total,
}: {
  page: number;
  pageSize: number;
  changePage: (page: number) => void;
  handleChangePageSize: (e: ChangeEvent<HTMLSelectElement>) => void;
  total: number;
}) {
  return (
    <div className="flex justify-center gap-10 relative">
      <button
        disabled={!page}
        onClick={() => changePage(page - 1)}
        className={`${!page && "opacity-50"}`}
      >
        {"<< Pre"}
      </button>
      |
      <button
        disabled={Math.floor(total / pageSize) === page}
        onClick={() => changePage(page + 1)}
        className={`${Math.floor(total / pageSize) === page && "opacity-50"}`}
      >
        {"Next >>"}
      </button>
      <select
        value={pageSize}
        onChange={handleChangePageSize}
        className="absolute right-0 border-2 border-solid border-black"
      >
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  );
}

export default Pagination;
