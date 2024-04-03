import { useEffect } from "react";
import { CLOSED, DONE, INPROGRESS } from "./todoapp";

function FilterStatus({
  setTypeStatus,
  typeStatus,
  handleChangeStatus,
}: {
  setTypeStatus: Function;
  typeStatus: number;
  handleChangeStatus: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  useEffect(() => {
    return () => {
      setTypeStatus(0);
    };
  }, []);
  return (
    <div className="flex items-center gap-10 justify-center">
      <div className="flex items-center gap-3">
        <input
          onChange={handleChangeStatus}
          name="status"
          id="done"
          type="radio"
          value={DONE}
          checked={typeStatus === DONE}
        />
        <label htmlFor="done">Hoàn thành</label>
      </div>
      <div className="flex items-center gap-3">
        <input
          onChange={handleChangeStatus}
          name="status"
          id="inprogress"
          type="radio"
          value={INPROGRESS}
          checked={typeStatus === INPROGRESS}
        />
        <label htmlFor="inprogress">Đang thực hiện</label>
      </div>
      <div className="flex items-center gap-3">
        <input
          onChange={handleChangeStatus}
          name="status"
          id="closed"
          type="radio"
          value={CLOSED}
          checked={typeStatus === CLOSED}
        />
        <label htmlFor="closed">Quá hạn</label>
      </div>
    </div>
  );
}

export default FilterStatus;
