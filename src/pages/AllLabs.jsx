import { useContext } from "react"
import { LabContext } from "../context/LabProvider"
import DataTable from "../components/DataTable";

const AllLabs = () => {
    const { labs, deleteLab } = useContext(LabContext);
    const tableHeadings = [
        {
            key: 'labName',
            label: 'Name',
            flexGrow: 1,
        },
        {
            key: 'labLocation',
            label: 'Location',
            flexGrow: 1,

        },
        {
            key: 'labCapacity',
            label: 'Capacity',
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
            <DataTable arr={labs} tableHead={tableHeadings} editRoute={"add-lab"} idName={"lab"} deleteData={deleteLab} />
        </div>
    )
}

export default AllLabs