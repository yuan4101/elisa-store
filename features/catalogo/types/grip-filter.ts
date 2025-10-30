import { GripEnum } from "@/types/grip";

export const GripFilter = {
  TODOS: 'Todos los agarres',
  MICRO: GripEnum.MICRO,
  BAJO: GripEnum.BAJO,
  MEDIO: GripEnum.MEDIO,
  ALTO: GripEnum.ALTO,
} as const;

export type GripFilterValue = (typeof GripFilter)[keyof typeof GripFilter];

export const GripFilterOptions = Object.values(GripFilter);