import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import AppWrapper from "../components/wrapper";
import Filters from "../components/issues/filters";
import {issuesApi} from "../recoil/api";
import {useRecoilCallback, useRecoilState, useRecoilValue} from "recoil";
import {hasMoreState, issuesState, loadNowState, pageState} from "../recoil/atoms";
import {useSnackbar} from "notistack";
import {filterValue, issueList, sortByValue} from "../recoil/selectors";
import {Issue} from "../recoil/models";
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

  const getPage = useRecoilCallback(({snapshot}) => async () => {
    return await snapshot.getPromise(pageState)
  })

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      if(!loading && !loadNow && list.length)
        getPage().then(r => {
          setPage(r+1)
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

  const getIssues = useCallback(async () => {
    try {
      setLoading(true)
      const res = await issuesApi(filter, sort, page)
      if (!!res.data && res.data.length) {
        const issues: Issue[] = [...list, ...res.data].filter((value, index, self) => {
          return self.indexOf(value) === index
        })
        setIssues(issues)
      } else
        setHasMore(false)
      setLoading(false)
    } catch (e: any) {
      setLoading(false)
      enqueueSnackbar(e?.message || 'Something went wrong!', {variant: 'error'})
    }
  }, [page, filter, sort, list, enqueueSnackbar, setHasMore, setIssues])

  useEffect(() => {
    if (loadNow && !loading) {
      (async () => {
        setLoadNow(false)
        await getIssues()
      })()
    }
  }, [loadNow, loading, getIssues, setLoadNow])

  return (
    <AppWrapper>
      <Filters/>
      {list.map((l, i) => <Fragment key={i}>{i} asfsdf <br/><br/></Fragment>)}
      <div ref={loader}/>
    </AppWrapper>
  );
};

export default IssuesScreen;
