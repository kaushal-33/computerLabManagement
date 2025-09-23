import { useContext } from "react"
import DataTable from "../components/DataTable"
import { StudentContext } from "../context/StudentProvider"
import { LabContext } from "../context/LabProvider";
import { PcContext } from "../context/PcProvider";

const AllStudents = () => {

    const { students } = useContext(StudentContext);
    const { labs } = useContext(LabContext);
    const { pcs } = useContext(PcContext);
    let studentArr = students.map((stu) => {
        let pc = pcs?.find((pc) => pc?.pcId === stu.assignedPc);
        let lab = labs?.find((lab) => lab?.labId === stu.labLocation);
        return { ...stu, assignedPc: pc?.pcName || "not assigned", labLocation: lab?.labName || "not assigned" }
    })

    console.log(studentArr);

    const tableHeadings = [
        {
            key: 'studentName',
            label: 'Name',
            flexGrow: 1,
        },
        {
            key: 'GRID',
            label: 'GRID',
            flexGrow: 1,
        },
        {
            key: 'studentEmail',
            label: 'Email',
            flexGrow: 1,
        },
        {
            key: 'labLocation',
            label: 'Lab Location',
            flexGrow: 1,

        },
        {
            key: 'assignedPc',
            label: 'PC-Name',
            flexGrow: 1,

        },
        {
            key: 'createdAt',
            label: 'Created at',
            flexGrow: 1,

        },
        {
            key: 'actions',
            label: 'Actions',
            flexGrow: 1,
        },
    ]
    return (
        <div>
            <DataTable tableHead={tableHeadings} arr={studentArr}/>
        </div>
    )
}

export default AllStudents