export const BgColorClass = {
  // gray is reserved color for inactive period
  Gray: "background-color-gray",
  Blue: "background-color-blue",
  Green: "background-color-green",
  Yellow: "background-color-yellow",
  Red: "background-color-red",
  Purple: "background-color-purple",
  Orange: "background-color-orange",
  Pink: "background-color-pink",
} as const;
type AllocatableBgColorClassT = Exclude<keyof typeof BgColorClass, "Gray">;
const allocatableBgColorClasses: AllocatableBgColorClassT[] = Object.keys(BgColorClass)
  .filter(k => isNaN(Number(k)) && k !== "Gray") as AllocatableBgColorClassT[];

export const bgColorClassAllocator = (() => {
  let id = 0;
  return () => {
    const bgColor = allocatableBgColorClasses[id % allocatableBgColorClasses.length];
    id++;
    return BgColorClass[bgColor];
  };
})();

export const BoxColorClass = {
  Gray: "box-color-gray",
  Blue: "box-color-blue",
  // Green: "box-color-green", // vis-range に使うため減らす
  Yellow: "box-color-yellow",
  Red: "box-color-red",
  Purple: "box-color-purple",
  Orange: "box-color-orange",
  Pink: "box-color-pink",
} as const;
type AllocatableBoxColorClassT = Exclude<keyof typeof BoxColorClass, "Gray">;
const allocatableBoxColorClasses: AllocatableBoxColorClassT[] = Object.keys(BoxColorClass)
  .filter(k => isNaN(Number(k)) && k !== "Gray") as AllocatableBoxColorClassT[];

export const boxColorClassAllocator = (() => {
  let id = 0;
  return () => {
    const boxColor = allocatableBoxColorClasses[id % allocatableBoxColorClasses.length];
    id++;
    return BoxColorClass[boxColor];
  };
})();
