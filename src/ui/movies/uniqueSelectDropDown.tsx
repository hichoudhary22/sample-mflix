import { useOutsideClickAlert } from "@/lib/clientUtils";
import { useRef, useState } from "react";

export default function UniqueSelectDropDown({
  name,
  options,
  selectedOption,
  setSelectedOption,
  params,
}: {
  name: string;
  options: Array<string>;
  selectedOption: string;
  setSelectedOption: Function;
  params: URLSearchParams;
}) {
  const [showOptionPanel, setShowOptionPanel] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  useOutsideClickAlert(optionsRef, setShowOptionPanel);
  return (
    <div ref={optionsRef}>
      <div
        className="flex cursor-pointer gap-2 rounded-full border bg-black px-4 py-1 text-white"
        onClick={() => {
          setShowOptionPanel((val) => !val);
        }}
      >
        <p className="capitalize">{name}</p>
        <p>{selectedOption ? "1" : "+"}</p>
      </div>
      {showOptionPanel && (
        <div className="absolute z-50 flex max-h-[400px] flex-col flex-wrap overflow-y-scroll rounded-md border bg-slate-400 p-2">
          {options.map((option) => (
            <div
              key={option}
              className="mx-1 flex gap-1 px-2 hover:rounded-full hover:bg-slate-500"
            >
              <input
                type="checkbox"
                id={option}
                checked={selectedOption.includes(option)}
                onChange={function (e) {
                  if (e.target.checked) {
                    setSelectedOption(option);
                    params.set(name, option);
                  } else {
                    setSelectedOption("");
                    params.delete(name);
                  }
                }}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
