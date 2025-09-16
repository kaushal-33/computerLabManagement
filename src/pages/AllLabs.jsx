import { useContext } from "react"
import { LabContext } from "../context/LabProvider"
import DataTable from "../components/DataTable";

const AllLabs = () => {
    const { labs } = useContext(LabContext);
    const tableHeadings = [
        {
            key: '1',
            label: 'Name',
            flexGrow: 1,
        },
        {
            key: '2',
            label: 'Location',
            flexGrow: 1,

        },
        {
            key: '3',
            label: 'Capacity',
            flexGrow: 1,

        },
        {
            key: '4',
            label: 'Actions',
            flexGrow: 2,

        },
    ]
    return (
        <div>
            <DataTable arr={labs} tableHead={tableHeadings} />
        </div>
    )
}

export default AllLabs