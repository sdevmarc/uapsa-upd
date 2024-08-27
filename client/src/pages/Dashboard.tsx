import { columns } from "@/components/data-table-components/columns";
import { DataTable } from "@/components/data-table-components/data-table";
import { Expense } from "@/components/data-table-components/schema";
import Header from "@/components/header";
import expense from '@/components/data-table-components/data.json'
import { useState } from "react";

export default function Dashboard() {
    const modifiedExpense = expense.map(item => ({ id: generateId(), ...item, type: item.type as "income" | "expense" }));
    const [data, setData] = useState<Expense[]>(modifiedExpense)

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <Header />
                <div className="w-full max-w-[90rem] pt-10 px-4">
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </>
    )
}

function generateId() {
    return '1';
}