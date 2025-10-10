import { useContext } from "react"
import { PcContext } from "../context/PcProvider"
import DataTable from "../components/DataTable";
import { LabContext } from "../context/LabProvider";

const AllPcs = () => {
    const { pcs, deletePc, handleCheck } = useContext(PcContext);
    const { labs } = useContext(LabContext);
    const pcArr = pcs.map((pc) => {
        const { labLocation, ...rest } = pc;
        const labObj = labs.find((lab) => lab.labId === labLocation)
        return { labLocation: labObj?.labName || "Not assigned", ...rest };
    })
    const tableHeadings = [
        {
            key: 'pcName',
            label: 'Name',
            flexGrow: 1,
        },
        {
            key: 'labLocation',
            label: 'Lab Location',
            flexGrow: 1,

        },
        {
            key: 'pcStatus',
            label: 'Status',
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
            <DataTable tableName={"All PC"} tableHead={tableHeadings} arr={pcArr} editRoute={"add-pc"} idName={"pc"} deleteData={deletePc} toggleBtn={"Maintenance"} maintenanceChecked={handleCheck} />
        </div>
    )
}

export default AllPcs