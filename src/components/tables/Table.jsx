// import cx from 'clsx';
import { Checkbox, Pagination, rem, Table } from "@mantine/core"
import SortableTH from "./SortableTH"
import EmptyView from "../common/EmptyView"
import { useRecoilState } from "recoil"
import { paginationOptionsState } from "@/atoms"

export function CustomTable({
    columns,
    data,
    selection,
    setSelection,
    sortedData,
    sortBy,
    reverseSortDirection,
    onSort,
    pageSize = 10,
    page = 1,
    setPage = () => { },
    errorFetching = false,
    loading,
    dateRange,
    paginated = false,
    pagination
}) {
    const [paginationOptions, setPaginationOpts] = useRecoilState(
        paginationOptionsState
    )
    const toggleRow = id =>
        setSelection(current =>
            current.includes(id)
                ? current.filter(item => item !== id)
                : [...current, id]
        )
    const toggleAll = () =>
        setSelection(current =>
            current.length === data.length ? [] : data.map(item => item.id)
        )
    // console.log('sortedData', sortedData);
    const rows =
        //check if paginated is true
        !paginated
            ? Array.isArray(sortedData) && sortedData.length > 0
                ? sortedData
                    .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
                    .map((item, item_index) => {
                        return (
                            <Table.Tr role="data-rows" key={item_index} className={""}>
                                <Table.Td>
                                    <Checkbox
                                        checked={selection.includes(item.id)}
                                        onChange={() => toggleRow(item.id)}
                                    />
                                </Table.Td>
                                {columns.map((column, i) => {
                                    return (
                                        <Table.Td
                                            data-test-id={item[column.key]}
                                            key={i}
                                            align={column.align}
                                        >
                                            {column.Element ? (
                                                <column.Element
                                                    {...{
                                                        selected: selection.includes(item.id),
                                                        row: item,
                                                        rows: data,
                                                        value: item[column.key]
                                                    }}
                                                />
                                            ) : (
                                                String(item[column.key])
                                            )}
                                        </Table.Td>
                                    )
                                })}
                            </Table.Tr>
                        )
                    })
                : []
            : sortedData.map((item, item_index) => {
                return (
                    <Table.Tr role="data-rows" key={item_index} className={""}>
                        <Table.Td>
                            <Checkbox
                                checked={selection.includes(item.id)}
                                onChange={() => toggleRow(item.id)}
                            />
                        </Table.Td>
                        {columns.map((column, i) => {
                            return (
                                <Table.Td
                                    data-test-id={item[column.key]}
                                    key={i}
                                    align={column.align}
                                >
                                    {column.Element ? (
                                        <column.Element
                                            {...{
                                                selected: selection.includes(item.id),
                                                row: item,
                                                rows: data,
                                                value: item[column.key]
                                            }}
                                        />
                                    ) : (
                                        String(item[column.key])
                                    )}
                                </Table.Td>
                            )
                        })}
                    </Table.Tr>
                )
            })

    return (
        <div className="overflow-x-auto mt-2 rounded-t-md">
            <Table miw={800} verticalSpacing="sm" striped={"even"}>
                <Table.Thead>
                    <Table.Tr className="bg-[#518DC8] text-[1rem] text-white border border-[#518DC8] ">
                        <Table.Th style={{ width: rem(40) }}>
                            <Checkbox
                                onChange={toggleAll}
                                checked={selection.length === data.length}
                                indeterminate={
                                    selection.length > 0 && selection.length !== data.length
                                }
                            />
                        </Table.Th>
                        {columns.map((column, i) => {
                            return (
                                <SortableTH
                                    className="whitespace-nowrap"
                                    key={i}
                                    {...(column.sortable && {
                                        onSort: onSort.bind(null, column.key),
                                        sorted: sortBy === column.key,
                                        reversed: reverseSortDirection
                                    })}
                                >
                                    {column.title}
                                </SortableTH>
                            )
                        })}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows.length ? (
                        rows
                    ) : !loading ? (
                        <Table.Tr>
                            <Table.Td colSpan={columns.length + 1}>
                                {/* <div className="text-center text-gray-400">
                           {errorFetching ? 'Error Fetching Data' : 'No Data To Show'}
                        </div> */}
                                <EmptyView
                                    message={
                                        errorFetching ? "Error Fetching Data" : "No Data To Show"
                                    }
                                />
                            </Table.Td>
                        </Table.Tr>
                    ) : null}
                </Table.Tbody>
            </Table>

            <Pagination
                total={
                    paginated
                        ? pagination.totalPages
                        : Math.ceil(sortedData.length / pageSize)
                }
                value={paginated ? paginationOptions : page}
                onChange={setPage}
                color="#518DC8"
            />
        </div>
    )
}
