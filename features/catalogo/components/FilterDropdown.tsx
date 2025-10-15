"use client";

import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { ChevronIcon } from "../../../components/ui/ChevronIcon";

interface FilterDropdownProps {
  currentValue: string;
  options: string[];
  onSelect: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

export function FilterDropdown({
  currentValue,
  options,
  onSelect,
  placeholder,
  disabled = false,
}: FilterDropdownProps) {
  const currentLabel = currentValue || placeholder;

  return (
    <Menu as="div" className="relative flex-1 min-w-[160px]">
      {({ open }) => (
        <>
          <MenuButton
            disabled={disabled}
            aria-label={`Filtrar por: ${currentLabel}`}
            className="w-full px-3 py-2 border rounded text-[var(--color-navbar-bg)] border-[var(--color-navbar-bg)] hover:border-[var(--color-select)] hover:bg-transparent transition-colors focus:outline-none text-left flex justify-between items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{currentLabel}</span>
            <ChevronIcon isExpanded={open} />
          </MenuButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <MenuItems className="absolute left-0 sm:left-auto sm:right-0 z-10 mt-2 w-full sm:w-56 origin-top-right bg-white shadow-lg rounded-md focus:outline-none">
              <div className="py-1 max-h-60 overflow-y-auto">
                {options.map((option) => {
                  const isSelected = option === currentValue;

                  return (
                    <MenuItem key={option}>
                      {({ focus }) => (
                        <button
                          onClick={() => onSelect(option)}
                          className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                            focus
                              ? "bg-[var(--color-select)] text-white"
                              : isSelected
                              ? "bg-[var(--color-card-hover)] text-[var(--color-navbar-bg)] font-medium"
                              : "text-gray-900"
                          }`}
                          aria-current={isSelected ? "true" : undefined}
                        >
                          {option}
                          {isSelected && (
                            <span className="ml-2" aria-label="Seleccionado">
                              ✓
                            </span>
                          )}
                        </button>
                      )}
                    </MenuItem>
                  );
                })}
              </div>
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
}
