import React from 'react'
import TableWrapper from '@/components/tables/TableWrapper'

const DashboardPage = () => {
    return (
        <div>
            <TableWrapper
                title={"Users"}
                columns={[
                    { title: "Name", key: "name" },
                    { title: "Email", key: "email" },
                    { title: "Phone", key: "phone" },
                    { title: "Address", key: "address" },
                ]}
                data={Array(40).fill({
                    name: "John Doe",
                    email: "johndoe@gmail.com",
                    phone: "123-456-7890",
                    address: "1234 Elm St",
                },)}
            // error={true}
            // loading={true}
            />

        </div>
    )
}

export default DashboardPage