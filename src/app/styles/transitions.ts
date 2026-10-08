export const fadeTransition = {
  enter: "transition ease-out duration-300",
  enterFrom: "opacity-0",
  enterTo: "opacity-100",
  leave: "transition ease-in duration-200",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0",
};

export const slideFromRight = {
  enter: "transform transition duration-[250ms] ease-[cubic-bezier(0.1,0.9,0.2,1)]",
  enterFrom: "translate-x-full",
  enterTo: "translate-x-0",
  leave: "transform transition duration-[200ms] ease-[cubic-bezier(0.4,0,1,1)]",
  leaveFrom: "translate-x-0",
  leaveTo: "translate-x-full",
};
