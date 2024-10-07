import { MutableRefObject, ReactElement } from "react";

export type IndexRowWithSpace = "A"|"B"|"C"|"G"|"H"|"I";
export const IndexRowWithSpace = ["A", "B", "C", "G", "H", "I"]
export type IndexRowNoSpace = "D"|"E"|"F";
export const IndexRowNoSpace = ["D", "E", "F"]
export type IndexRow = IndexRowWithSpace|IndexRowNoSpace;
export const IndexRow = [...IndexRowWithSpace, ...IndexRowNoSpace]
export type IndexNumberWithSpace = 1|2|3|7|8|9;
export const IndexNumberWithSpace = [1, 2, 3, 7, 8, 9]
export type IndexNumberNoSpace = 4|5|6;
export const IndexNumberNoSpace = [4, 5, 6]
export type IndexNumber = IndexNumberWithSpace|IndexNumberNoSpace;
export const IndexNumber = [...IndexNumberWithSpace, ...IndexNumberNoSpace]
// weird, it still fails. That wasnt im expecting about

export type IndexWithSpace = `${IndexRowWithSpace}${IndexNumberWithSpace}`
export type IndexNoSpace = `${IndexRowNoSpace}${IndexNumberNoSpace}`
export type Index = IndexWithSpace|IndexNoSpace;
export type Team = "black"|"white"

// TODO(cupglassdev): if typescript introduces a new feature to throw err (instead of never)
// prob change it 

// export type IndexWithSpace<R extends IndexRowWithSpace, N extends IndexNumberWithSpace> = `${R}${N}`
// export type IndexNoSpace<R extends IndexRowNoSpace, N extends IndexNumberNoSpace> = `${R}${N}`
// export type Index<R extends IndexRow, N extends IndexNumber> = 
//   R extends IndexRowWithSpace 
//     ? N extends IndexNumberWithSpace 
//       ? IndexWithSpace<R, N>
//       : never // Invalid: Row with space, number without space
//     : R extends IndexRowNoSpace
//       ? N extends IndexNumberNoSpace
//         ? IndexNoSpace<R, N>
//         : never // Invalid: Row without space, number with space
//       : never; // Invalid Row

// export type ValidIndex = Index<IndexRow,IndexNumber>

export class DuckncupErr extends Error {}
export interface Prop<Init extends (...args:any)=>void> {
    onMounted?:Init,
    onDismounted?:Init
}
export interface PropWithParent<Init extends (...args:any)=>void, Parent> {
    onMounted?:Init,
    onDismounted?:Init,
    INTERNAL_PARENT:MutableRefObject<Parent>
}
export interface Action<T> {
    mounted:boolean;
    element:ReactElement<T>;
}
export interface ActionWithParent<T, T2> {
    mounted:boolean;
    element:ReactElement<T>;
    parent:ReactElement<T2>;
}