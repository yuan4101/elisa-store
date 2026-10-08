"use client";

import { useState, Fragment } from "react";
import { FilterDropdown } from "./FilterDropdown";
import { ClearFiltersButton } from "./ClearFiltersButton";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  GripFilterValue,
  GripFilter,
  GripFilterOptions,
} from "../types/grip-filter";
import {
  PriceSortValue,
  PriceSort,
  PriceSortOptions,
} from "../types/price-filter";

interface CatalogFiltersProps {
  gripFilter: string;
  priceSort: string;
  onGripChange: (value: GripFilterValue) => void;
  onPriceChange: (value: PriceSortValue) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
  showGripFilter: boolean;
  showPriceFilter: boolean;
}

export function CatalogFilters({
  gripFilter,
  priceSort,
  onGripChange,
  onPriceChange,
  onClear,
  hasActiveFilters,
  showGripFilter,
  showPriceFilter,
}: CatalogFiltersProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayGripValue = gripFilter === GripFilter.TODOS ? "" : gripFilter;
  const displayPriceValue = priceSort === PriceSort.NONE ? "" : priceSort;

  // Si no hay filtros para mostrar, no renderizar nada
  if (!showGripFilter && !showPriceFilter) {
    return null;
  }

  const activeFiltersCount =
    (displayGripValue ? 1 : 0) + (displayPriceValue ? 1 : 0);

  return (
    <>
      {/* --- VERSIÓN ESCRITORIO (Original de Git) --- */}
      <div
        className="hidden md:block sticky z-50 bg-white shadow-lg rounded-xl p-2 w-fit border border-[var(--color-navbar-bg)]/60 transition-all duration-300 ease-in-out"
        style={{
          top: "calc(168px + (10px * (var(--font-scale, 1) - 1)) + (40px * (var(--line-height, 1.2) - 1.2)))",
        }}
      >
        <div className="flex flex-row items-center gap-4 pl-2 pr-2">
          <div className="whitespace-nowrap text-base text-[var(--color-text)]">
            Filtrar por:
          </div>

          <div className="flex flex-row w-full">
            {showGripFilter && (
              <div
                className="flex-1"
                style={{ minWidth: "max(96px, max-content)" }}
              >
                <FilterDropdown
                  currentValue={displayGripValue}
                  options={GripFilterOptions}
                  onSelect={(value) => {
                    onGripChange(value as GripFilterValue);
                    window.scrollTo({ top: -20, behavior: "smooth" });
                  }}
                  placeholder="Agarre"
                />
              </div>
            )}

            {showPriceFilter && (
              <div
                className={`flex-1 ${showGripFilter ? "ml-4" : ""}`}
                style={{ minWidth: "max(160px, max-content)" }}
              >
                <FilterDropdown
                  currentValue={displayPriceValue}
                  options={PriceSortOptions}
                  onSelect={(value) => {
                    onPriceChange(value as PriceSortValue);
                    window.scrollTo({ top: -20, behavior: "smooth" });
                  }}
                  placeholder="Precio"
                />
              </div>
            )}

            <ClearFiltersButton
              isVisible={hasActiveFilters}
              onClick={() => {
                onClear();
                window.scrollTo({ top: -20, behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </div>

      {/* --- VERSIÓN MÓVIL (Modal) --- */}
      <div
        className="md:hidden sticky z-50 w-full transition-all duration-300 ease-in-out"
        style={{
          top: "calc(126px + (10px * (var(--font-scale, 1) - 1)) + (40px * (var(--line-height, 1.2) - 1.2)))",
        }}
      >
        <div className="flex flex-row items-center justify-between w-full px-5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 flex-1 min-w-[120px] h-[40px] px-4 rounded-full text-white bg-[var(--color-navbar-bg)] hover:bg-[var(--color-select)] transition-colors shadow-lg"
          >
            <FunnelIcon
              className="flex-shrink-0"
              style={{
                width: "calc(1.25rem * var(--font-scale, 1))",
                height: "calc(1.25rem * var(--font-scale, 1))",
              }}
            />
            <span className="font-medium whitespace-nowrap text-base">
              Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </span>
          </button>

          <ClearFiltersButton
            isVisible={hasActiveFilters}
            onClick={() => {
              onClear();
              window.scrollTo({ top: -20, behavior: "smooth" });
            }}
          />
        </div>
      </div>

      <Transition show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[100]"
          onClose={() => setIsModalOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-0 md:items-center md:p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="transition duration-300 ease-out"
                enterFrom="opacity-0 translate-y-full md:translate-y-0 md:scale-95 md:opacity-0"
                enterTo="opacity-100 translate-y-0 md:scale-100 md:opacity-100"
                leave="transition duration-200 ease-in"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-full md:translate-y-0 md:scale-95"
              >
                <DialogPanel className="relative w-full max-w-md transform overflow-hidden rounded-t-3xl md:rounded-2xl bg-white p-4 text-left align-middle shadow-2xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-xl md:text-2xl font-bold leading-6 text-[var(--color-navbar-bg)] border-b pb-3 mb-4 flex justify-between items-center"
                  >
                    Filtros
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                      aria-label="Cerrar filtros"
                    >
                      <XMarkIcon className="h-[calc(28px*var(--font-scale,1))] w-[calc(28px*var(--font-scale,1))]" />
                    </button>
                  </DialogTitle>

                  <div className="flex flex-col gap-3">
                    {showGripFilter && (
                      <div className="w-full">
                        <label className="block text-base font-semibold text-[var(--color-navbar-bg)] mb-2">
                          Agarre
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => onGripChange(GripFilter.TODOS)}
                            className={`px-3 py-1.5 rounded-full border text-sm md:text-base transition-colors shadow-sm ${
                              displayGripValue === ""
                                ? "is-selected-filter bg-[var(--color-navbar-bg)] text-white border-[var(--color-navbar-bg)]"
                                : "bg-white text-[var(--color-text)] border-gray-300 hover:border-[var(--color-select)]"
                            }`}
                          >
                            Todos
                          </button>
                          {GripFilterOptions.filter(
                            (o) => o !== GripFilter.TODOS,
                          ).map((option) => (
                            <button
                              key={option}
                              onClick={() =>
                                onGripChange(option as GripFilterValue)
                              }
                              className={`px-3 py-1.5 rounded-full border text-sm md:text-base transition-colors shadow-sm ${
                                displayGripValue === option
                                  ? "is-selected-filter bg-[var(--color-navbar-bg)] text-white border-[var(--color-navbar-bg)]"
                                  : "bg-white text-[var(--color-text)] border-gray-300 hover:border-[var(--color-select)]"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {showPriceFilter && (
                      <div className="w-full pt-1">
                        <label className="block text-base font-semibold text-[var(--color-navbar-bg)] mb-2">
                          Precio
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => onPriceChange(PriceSort.NONE)}
                            className={`px-3 py-1.5 rounded-full border text-sm md:text-base transition-colors shadow-sm ${
                              displayPriceValue === ""
                                ? "is-selected-filter bg-[var(--color-navbar-bg)] text-white border-[var(--color-navbar-bg)]"
                                : "bg-white text-[var(--color-text)] border-gray-300 hover:border-[var(--color-select)]"
                            }`}
                          >
                            Sin orden
                          </button>
                          {PriceSortOptions.filter(
                            (o) => o !== PriceSort.NONE,
                          ).map((option) => (
                            <button
                              key={option}
                              onClick={() =>
                                onPriceChange(option as PriceSortValue)
                              }
                              className={`px-3 py-1.5 rounded-full border text-sm md:text-base transition-colors shadow-sm ${
                                displayPriceValue === option
                                  ? "is-selected-filter bg-[var(--color-navbar-bg)] text-white border-[var(--color-navbar-bg)]"
                                  : "bg-white text-[var(--color-text)] border-gray-300 hover:border-[var(--color-select)]"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t flex flex-col gap-2">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center rounded-xl border border-transparent bg-[var(--color-navbar-bg)] px-4 py-3 text-lg font-medium text-white hover:bg-[var(--color-select)] focus:outline-none transition-colors shadow-md hover:shadow-lg"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Listo
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
