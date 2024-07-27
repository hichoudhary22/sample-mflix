import { useOutsideClickAlert } from "@/lib/clientUtils";
import { useRef, useState } from "react";

export default function DropDown({
  name,
  options,
  selectedOptions,
  setSelectedOptions,
  params,
}: {
  name: string;
  options: Array<string>;
  selectedOptions: Array<string>;
  setSelectedOptions: Function;
  params: URLSearchParams;
}) {
  const [showOptionPanel, setShowOptionPanel] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  useOutsideClickAlert(optionsRef, setShowOptionPanel);
  return (
    <div ref={optionsRef}>
      <div
        className="flex w-fit cursor-pointer gap-2 rounded-full border bg-black px-4 py-1 text-white"
        onClick={() => {
          setShowOptionPanel((val) => !val);
        }}
      >
        <p className="capitalize">{name}</p>
        <p>{selectedOptions.length !== 0 ? selectedOptions.length : "+"}</p>
      </div>
      {showOptionPanel && (
        <div className="absolute z-50 rounded-md border bg-slate-400 p-2">
          <button
            onClick={() => {
              params.delete(name);
              setSelectedOptions([]);
            }}
            className="mb-1 w-full rounded-full bg-slate-800 py-1 text-white"
          >
            Clear All
          </button>
          <div className="flex max-h-[400px] flex-col flex-wrap overflow-y-scroll ">
            {options.map((option) => (
              <div
                key={option}
                className="mx-1 flex gap-1 px-2 hover:rounded-full hover:bg-slate-500"
              >
                <input
                  type="checkbox"
                  id={option}
                  checked={selectedOptions.includes(option)}
                  onChange={function (e) {
                    if (e.target.checked) {
                      setSelectedOptions((arr: Array<string>) => [
                        ...arr,
                        option,
                      ]);
                      params.append(name, option);
                    } else {
                      setSelectedOptions((arr: Array<string>) =>
                        arr.filter((el) => el != option),
                      );
                      params.delete(name, option);
                    }
                  }}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
