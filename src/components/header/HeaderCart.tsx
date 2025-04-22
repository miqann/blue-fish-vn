import Image from "next/image";
import Combobox, { BaseDropdownItem } from "../ui/form-input/Combobox/Combobox";
import DelayRender from "../ui/DelayRender";
import { useMemo, useState } from "react";
import { debounce } from "lodash-es";

const list = [
  {
    id: "1",
    value: "1",
    label: "Shoes",
  },
  {
    id: "2",
    value: "2",
    label: "Package",
  },
  {
    id: "3",
    value: "3",
    label: "Balo",
  },
  {
    id: "4",
    value: "4",
    label: "T-shirt",
  },
];

export default function HeaderCart() {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<BaseDropdownItem | null>(null);

  const handleInputChange = useMemo(
    () =>
      debounce((input: string | undefined) => setInputValue(input || ""), 300),
    [setInputValue]
  );

  const filterItem = useMemo(() => {
    return list.filter((item) => item.value === inputValue);
  }, [inputValue]);

  return (
    <div className="flex flex-row gap-4 items-center">
      <DelayRender>
        <Combobox
          value={value}
          options={filterItem}
          onChange={(value) => setValue(value)}
          onInputValueChange={handleInputChange}
        />
      </DelayRender>
      <Image
        src="/static/icon/shopping-cart.svg"
        alt="Cart"
        width={25}
        height={25}
        style={{ color: "#005282" }}
        className="hover:cursor-pointer"
      />
    </div>
  );
}
