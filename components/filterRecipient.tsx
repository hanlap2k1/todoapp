import { selectListRecipient } from "@/lib/features/listRecipient";
import { useAppSelector } from "@/lib/hooks";

function FilterRecipient({
  recipientFilter,
  handleChangeRecipient,
}: {
  recipientFilter: string;
  handleChangeRecipient: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const listRecipient = useAppSelector(selectListRecipient);
  return (
    <>
      <select
        value={recipientFilter}
        onChange={handleChangeRecipient}
        className="bg-transparent outline-none px-5 py-3 rounded-xl border-2 border-solid border-black"
      >
        <option value="5">Choose person ...</option>
        {listRecipient.map((value) => (
          <option key={value.id} value={value.id}>
            {value.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default FilterRecipient;
