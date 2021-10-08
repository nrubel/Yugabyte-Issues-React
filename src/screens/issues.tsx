import React, {useCallback, useEffect, useRef, useState} from 'react';
import AppWrapper from "../components/wrapper";
import Filters from "../components/issues/filters";
import {issuesApi, userApi} from "../recoil/api";
import {useRecoilCallback, useRecoilState, useRecoilValue} from "recoil";
import {hasMoreState, issuesState, loadNowState, pageState, userState} from "../recoil/atoms";
import {useSnackbar} from "notistack";
import {filterValue, issueList, sortByValue} from "../recoil/selectors";
import {Issue} from "../recoil/models";
import ListItem from "../components/issues/list_item";
import {Box} from "@mui/material";
// import mockList from '../utils/mock.json'

const IssuesScreen = () => {
  const {enqueueSnackbar} = useSnackbar();
  const filter = useRecoilValue(filterValue)
  const sort = useRecoilValue(sortByValue)
  const list = useRecoilValue(issueList)
  const [hasMore, setHasMore] = useRecoilState(hasMoreState)
  const [page, setPage] = useRecoilState(pageState)
  const [, setIssues] = useRecoilState(issuesState)
  const loader = useRef(null);
  const [loadNow, setLoadNow] = useRecoilState(loadNowState)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useRecoilState(userState)

  const getPage = useRecoilCallback(({snapshot}) => async () => {
    return await snapshot.getPromise(pageState)
  })
  const getUsers = useRecoilCallback(({snapshot}) => async () => {
    return await snapshot.getPromise(userState)
  })

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      if (!loading && !loadNow && list.length)
        getPage().then(r => {
          setPage(r + 1)
          setLoadNow(true)
        })
    }
  }, [getPage, hasMore, setPage, setLoadNow, loading, loadNow, list]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "100px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  const getUserData = useCallback(async (username: string) => {
    try {
      const res = await userApi(username)
      const users = await getUsers()
      setUserData({...users, [username]: res.data})
    } catch (e: any) {
      enqueueSnackbar(e?.message || 'Something went wrong!', {variant: 'error'})
    }
  }, [enqueueSnackbar, getUsers, setUserData])

  const getIssues = useCallback(async (p: number = 1, reload: boolean = false) => {
    try {
      setLoading(true)
      const res = await issuesApi(filter, sort, p)
      if (!!res.data && res.data.length) {
        const issues: Issue[] = reload ? res.data : [...list, ...res.data]
        const finalIssues: Issue[] = []
        const ids = issues.map(i => i.id).filter((value, index, self) => self.indexOf(value) === index)
        ids.forEach((id) => {
          finalIssues.push(issues.filter(v => v.id === id)[0])
        })

        setIssues(finalIssues)
        const users = finalIssues.map(i => i.user.login).filter((value, index, self) => self.indexOf(value) === index)

        if (users.length)
          users.forEach((v) => {
            if (!userData[v])
              (async () => await getUserData(v))()
          })
      } else
        setHasMore(false)
      setLoading(false)
    } catch (e: any) {
      setLoading(false)
      setHasMore(false)
      enqueueSnackbar(e?.message || 'Something went wrong!', {variant: 'error'})
    }
  }, [filter, sort, list, enqueueSnackbar, getUserData, setHasMore, setIssues, userData])

  useEffect(() => {
    if (loadNow && !loading) {
      (async () => {
        setLoadNow(false)
        await getIssues(page)
      })()
    }
  }, [loadNow, loading, getIssues, setLoadNow, page])

  return (
    <AppWrapper>
      <Filters {...{getIssues}}/>
      {list.length ? list.map((l, i) => <ListItem key={l.id} {...l} />) : 'No issues'}
      {loading && <Box component={"strong"}>Loading</Box>}
      <div ref={loader}/>
    </AppWrapper>
  );
};

export default IssuesScreen;
