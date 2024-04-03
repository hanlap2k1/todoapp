import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function FilterDate({
  startDate,
  endDate,
  handleInputRangeDeadline,
  handleFilterDeadline,
}: {
  startDate: Date | null;
  endDate: Date | null;
  handleInputRangeDeadline: (dates: [Date | null, Date | null]) => void;
  handleFilterDeadline: () => void;
}) {
  return (
    <div className="flex flex-grow gap-5">
      <div className="flex gap-5">
        <DatePicker
          placeholderText="dd/mm/yyyy - dd/mm/yyyy"
          dateFormat="dd/MM/yyyy"
          className="w-200 px-5 py-3 border-2 border-solid border-black rounded-xl"
          selected={startDate}
          onChange={handleInputRangeDeadline}
          startDate={startDate}
          endDate={endDate}
          selectsRange
        ></DatePicker>
      </div>
      <button
        onClick={handleFilterDeadline}
        className="px-10 py-3 bg-green-500 rounded-xl text-white"
      >
        Lọc
      </button>
    </div>
  );
}

export default FilterDate;
