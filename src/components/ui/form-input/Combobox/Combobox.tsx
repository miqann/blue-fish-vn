import { composeRefs } from "@/hooks/utils/compose-refs";
import { cssClassBuilderFactory } from "@/hooks/utils/css-class-builder-factory";
import {
  autoPlacement,
  autoUpdate,
  offset,
  size,
  useFloating,
} from "@floating-ui/react";
import clsx from "clsx";
import { useCombobox } from "downshift";
import Image from "next/image";
import { forwardRef, Ref, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import cssModule from "./ComboBox.module.css";
import { useObserverLoadMore } from "./useObserverLoadMore";

export type BaseDropdownItem = {
  id: string;
  label: string;
  value: any;
};

interface ComboboxProps<T> {
  id?: string;
  value: T | null;
  options: T[];
  disabled?: boolean;
  className?: string;
  innerFilter?: boolean;
  placeholder?: string;
  isLoadingOption?: boolean;
  onBlur?: () => void;
  onChange: (value: T | null) => void;
  fetchPageOnLastItem?: () => void;
  onInputValueChange?: (val: string | undefined) => void;
}

function getItemsFilter(inputValue: string | undefined) {
  return function filter<T extends BaseDropdownItem>(option: T) {
    return (
      !inputValue ||
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
}

const textFieldWithDataClassNames =
  "h-[35px] bg-se-gray-100 p-0 border text-[14px] rounded-3xl font-light text-dark focus-within:font-normal outline-none flex items-center box-border border-[#005282]";

const cssClassBuilder = cssClassBuilderFactory(cssModule);

function ComboboxInner<T extends BaseDropdownItem>(
  {
    id,
    value,
    disabled,
    options,
    innerFilter,
    placeholder,
    isLoadingOption,
    onBlur,
    onChange,
    fetchPageOnLastItem,
    onInputValueChange,
  }: ComboboxProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const [items, setItems] = useState(options);

  const wrapperRef = useRef(null);
  const inputRefControlled = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setItems(options);
  }, [options]);

  const optionsUsed = useMemo(
    () => (innerFilter ? items : options),
    [options, innerFilter, items]
  );

  const defaultInputValue =
    optionsUsed.find((data) => data.value === value?.value)?.label || "";

  const {
    isOpen,
    inputValue,
    selectedItem,
    highlightedIndex,
    getMenuProps,
    getItemProps,
    getInputProps,
    setInputValue,
  } = useCombobox<T>({
    id,
    items: optionsUsed,
    selectedItem: value || null,
    defaultInputValue,
    defaultSelectedItem:
      optionsUsed.find((item) => item.value === value?.value) || null,
    itemToString(item) {
      return item ? item.label : "";
    },
    onInputValueChange({ inputValue }) {
      onInputValueChange?.(inputValue);
      setItems(optionsUsed.filter(getItemsFilter(inputValue)));
    },
    onSelectedItemChange(state) {
      onChange?.(state.selectedItem ?? null);
    },
    onIsOpenChange: (state) => {
      if (!state.isOpen) {
        onBlur?.();
      }
    },
  });

  useEffect(() => {
    if (value) {
      setInputValue(value.label);
    } else {
      setInputValue("");
    }
  }, [value, setInputValue]);

  const { refs, floatingStyles } = useFloating({
    placement: "bottom-start",
    open: isOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(0),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            minWidth: `${rects.reference.width}px`,
          });
        },
        padding: 0,
      }),
    ],
  });

  function handleBlur() {
    if (!inputValue || selectedItem?.label !== inputValue) {
      onChange?.(null);
    }
  }

  const { ref: menuRef, ...menuProps } = getMenuProps();
  const { ...inputProps } = getInputProps({
    disabled,
    onFocus: function () {
      if (value?.value) {
        inputRefControlled.current?.select();
      }
    },
    onBlur: () => {
      handleBlur();
    },
  });

  const contentCssClass = cssClassBuilder({
    cssModule: "custom-scroll-bar",
    tw: "overflow-auto",
  });

  const loadMoreRef = useObserverLoadMore({
    fetchNextPage: fetchPageOnLastItem,
    enableFetchNextPage: Boolean(fetchPageOnLastItem),
  });

  return (
    <>
      <div
        className={clsx(
          textFieldWithDataClassNames,
          isOpen
            ? "focus-within:bg-white"
            : "rounded focus-within:bg-se-gray-100 data-[invalid]:border data-[invalid]:border-red",
          "disabled:hover:cursor-not-allowed"
        )}
        ref={composeRefs(refs.setReference, wrapperRef)}
      >
        <input
          type="text"
          ref={composeRefs(inputRefControlled, ref)}
          className={clsx(
            "h-[calc(100%_-_2px)] w-full truncate bg-se-gray-100 pl-4 outline-none disabled:hover:cursor-not-allowed",
            isOpen
              ? "rounded-3xl  bg-se-gray-100 focus-within:bg-white"
              : "focus-within:bg-se-gray-100 data-[invalid]:border data-[invalid]:border-red"
          )}
          placeholder={placeholder}
          {...inputProps}
        />
        {isLoadingOption && <span>Loading...</span>}
        <span>
          <Image
            src="/static/icon/search.svg"
            alt="search"
            width={20}
            height={20}
            className="mr-[10px]"
          />
        </span>
      </div>

      <div
        ref={composeRefs(refs.setFloating, menuRef)}
        style={{ ...floatingStyles }}
        className={twMerge(
          `${contentCssClass} z-100 max-w-[100px] overflow-auto rounded-b border-b border-l border-r border-se-blue-200 bg-white`,
          !isOpen && "invisible"
        )}
        {...menuProps}
      >
        {isOpen &&
          optionsUsed.map((item, index) => (
            <li
              key={`${item.value}${index}`}
              className={clsx(
                highlightedIndex === index && "bg-gray-200 font-semibold",
                selectedItem === item && "font-bold",
                "flex h-[42px] cursor-pointer items-center px-4 text-[14px] text-dark last:rounded-b"
              )}
              {...getItemProps({ item, index })}
              {...(index === optionsUsed.length - 1 && {
                ref: composeRefs(
                  getItemProps({ item, index }).ref,
                  loadMoreRef
                ),
              })}
            >
              <span className="truncate">{item.label}</span>
            </li>
          ))}
      </div>
    </>
  );
}

const Combobox = forwardRef(ComboboxInner) as <T extends BaseDropdownItem>(
  props: ComboboxProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof ComboboxInner>;

export default Combobox;
