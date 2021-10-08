import {selector} from "recoil";
import {filterState, hasMoreState, issuesState, pageState, sortByState} from "./atoms";
import { Issue } from "./models";

export const filterValue = selector<string>({
  key: 'filterValue',
  get: ({get}) => get(filterState)
})

export const sortByValue = selector<string>({
  key: 'sortByValue',
  get: ({get}) => get(sortByState)
})

export const issueList = selector<Issue[]>({
  key: 'issueList',
  get: ({get}) => get(issuesState)
})

export const currentPage = selector<number>({
  key: 'currentPage',
  get: ({get}) => get(pageState)
})

export const hasMoreValue = selector<boolean>({
  key: 'hasMoreValue',
  get: ({get}) => get(hasMoreState)
})