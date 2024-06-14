import { Table } from "@mantine/core"
import React from "react"
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa"

const SortableTH = ({
  children,
  onSort,
  reversed = false,
  sorted = false,
  className,
  iconClassName,
  style,
  iconStyle
}) => {
  const Icon = sorted ? (reversed ? FaSortUp : FaSortDown) : FaSort

  return (
    <Table.Th className={"" + " " + className} style={style}>
      <div
        className="group flex items-center justify-between gap-2 cursor-pointer"
        onClick={onSort}
      >
        <span className="font-bold">{children}</span>
        {!!onSort && (
          <Icon
            className={[
              "inline-block duration-150",
              !sorted ? "opacity-0 group-hover:opacity-100" : "",
              iconClassName
            ].join(" ")}
            style={iconStyle}
          />
        )}
      </div>
    </Table.Th>
  )
}

export default SortableTH
