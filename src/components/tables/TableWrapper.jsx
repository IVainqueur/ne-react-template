import React, { useCallback, useEffect, useMemo, useState } from "react"
import { IoIosRefresh } from "react-icons/io"
import { IoSearchOutline } from "react-icons/io5"
import { CustomTable } from "./Table"
import { useRecoilState } from "recoil"
import { getObjValue } from "../../utils"
import LoadingView from "../common/LoadingView"
import EmptyView from "../common/EmptyView"
import { paginationOptionsState } from "@/atoms"

function sortData(data, payload) {
  const { sortBy, reversed, search, dateRange } = payload

  if (search) {
    data = data.filter(item => {
      const values = Object.values(item)
      return values.some(value => {
        return JSON.stringify(value)
          .toLowerCase()
          .includes(search.toLowerCase())
      })
    })
  }

  // if (dateRange) {
  //    const [from, to] = dateRange;
  //    if (from) {
  //       data = data.filter((item) => {
  //          const date = new Date(item.createdAt);
  //          return date >= from;
  //       });
  //    }
  //    if (to) {
  //       data = data.filter((item) => {
  //          const date = new Date(item.createdAt);
  //          return date <= to;
  //       });
  //    }
  // }

  if (!sortBy) {
    return data
  }

  return [...data].sort((a, b) => {
    return reversed
      ? String(JSON.stringify(getObjValue(sortBy, b))).localeCompare(
          String(JSON.stringify(getObjValue(sortBy, a)))
        )
      : String(JSON.stringify(getObjValue(sortBy, a))).localeCompare(
          String(JSON.stringify(getObjValue(sortBy, b)))
        )
  })
}

const TableWrapper = ({
  columns,
  data: originalData,
  className,
  title,
  filters,
  actions,

  // setData,
  reset: dataReset,

  filterableByDate = false,
  loading,
  error,
  refresh,
  errorFetching = false,
  paginated,
  pagination
}) => {
  const [paginationOptions, setPaginationOpts] = useRecoilState(
    paginationOptionsState
  )

  const [search, setSearch] = useState("")
  const [selection, setSelection] = useState([])
  const [sortBy, setSortBy] = useState(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const [page, setPage] = useState(1)
  const [dateRange, setDateRange] = useState([null, null])
  const [data, setData] = useState([])

  const reset = useCallback(() => {
    setSearch("")
    setSelection([])
    setSortBy(null)
    setReverseSortDirection(false)
    setPage(1)
    setDateRange([null, null])
    if (dataReset) {
      dataReset()
      setData(originalData) // Reset data to the original data
    }
  }, [originalData, dataReset])

  useEffect(() => {
    !!originalData && setData(originalData)
  }, [originalData])

  useEffect(() => {
    setPage(1)
    setSortBy(null)
    setReverseSortDirection(false)
  }, [search])

  const sortedData = useMemo(() => {
    return sortData(data, { sortBy, reversed: reverseSortDirection, search })
  }, [sortBy, reverseSortDirection, data, search])

  const onSort = key => {
    if (sortBy === key && reverseSortDirection) {
      setSortBy(null)
      setReverseSortDirection(false)
      return
    }
    if (sortBy === key) {
      setReverseSortDirection(current => !current)
    } else {
      setSortBy(key)
      setReverseSortDirection(false)
    }
  }

  return (
    <div className="flex flex-col gap-0 pt-2 pb-8 px-4 rounded-xl bg-white">
      {/* HEADER */}
      <div className="flex flex-col flex-wrap lg:flex-row lg:justify-between gap-2 items-center">
        <div className="flex flex-row gap-2 items-center">
          <h1 className="font-bold text-2xl text-[#518DC8]">{title}</h1>
          {/* <IoRefreshCircleOutline
                  className={`h-7 w-7 text-gray-600 cursor-pointer ${loading !== undefined && loading ? 'animate-spin' : ''}`}
                  onClick={refresh}
               /> */}
        </div>
        {/* SEARCH + OTHER FILTERS */}
        <div className="flex flex-row flex-wrap items-center gap-2 h-fit">
          {data.length !== 0 && (
            <div className="flex flex-row items-center rounded-md h-full max-h-[40px] bg-color-a4 px-4 lg:py-4 gap-2">
              <IoSearchOutline className="stroke-[#5D6E8B]" />
              <input
                type="text"
                placeholder={"Search here..."}
                onChange={e => setSearch(e.target.value)}
                value={search}
                className="grow border-none outline-none bg-transparent h-full"
              />
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            {!!filters && filters(originalData, sortedData, setData, reset)}
            {/* {filterableByDate && (
                     <Popover position="bottom-end" offset={6}>
                        <Popover.Target>
                           <Button
                              leftSection={<IoCalendarOutline className="stroke-color-a2 h-4 w-4" />}
                              className="text-color-a2 bg-color-a4 h-[40px] max-h-[40px]"
                           >
                              Today
                           </Button>
                        </Popover.Target>
                        <Popover.Dropdown>
                           <DatePicker type="range" value={dateRange} onChange={setDateRange} />;
                        </Popover.Dropdown>
                     </Popover>
                  )} */}
            {refresh && (
              <IoIosRefresh
                className={`h-6 w-6 text-gray-600 cursor-pointer ${
                  loading !== undefined && loading ? "animate-spin" : ""
                }`}
                onClick={() => refresh()}
              />
            )}
            {actions && actions}
          </div>
        </div>
      </div>
      {loading ? (
        <LoadingView message="Loading data ..." />
      ) : error ? (
        <EmptyView message="Error fetching data" />
      ) : (
        <CustomTable
          errorFetching={errorFetching}
          data={data}
          loading={loading}
          columns={columns}
          className={className}
          selection={selection}
          setSelection={setSelection}
          sortedData={sortedData}
          sortBy={sortBy}
          reverseSortDirection={reverseSortDirection}
          onSort={onSort}
          page={paginated ? paginationOptions : page}
          setPage={paginated ? setPaginationOpts : setPage}
          paginated={paginated}
          pagination={pagination}
        />
      )}
    </div>
  )
}

export default TableWrapper
