export type Primitive = string | number | boolean | null | undefined;
export type NestedData = NestedData[] | { [key: string]: NestedData | Primitive };
export interface IProxy {
  data: any
  proxy: any
  update: () => void
}