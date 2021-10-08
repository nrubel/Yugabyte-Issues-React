import {atom} from "recoil";
import { Issue } from "./models";

export const filterState = atom<string>({
  key: 'filterState',
  default: 'all'
})

export const sortByState = atom<string>({
  key: 'sortByState',
  default: 'created'
})

export const issuesState = atom<Issue[]>({
  key: 'issuesState',
  default: [] as Issue[],
})

export const pageState = atom<number>({
  key: 'pageState',
  default: 1,
})

export const hasMoreState = atom<boolean>({
  key: 'hasMoreState',
  default: true,
})

export const loadNowState = atom<boolean>({
  key: 'loadNowState',
  default: true,
})