export const fadeTransition = {
  enter: "ease-in-out duration-200",
  enterFrom: "opacity-0",
  enterTo: "opacity-100",
  leave: "ease-in-out duration-200",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0",
};

export const slideFromRight = {
  enter: "transform transition ease-in-out duration-200",
  enterFrom: "translate-x-full",
  enterTo: "translate-x-0",
  leave: "transform transition ease-in-out duration-200",
  leaveFrom: "translate-x-0",
  leaveTo: "translate-x-full",
};
