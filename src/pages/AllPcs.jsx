import { useContext } from "react"
import { PcContext } from "../context/PcProvider"

const AllPcs = () => {
    const { pcs } = useContext(PcContext);
    console.log(pcs);
    return (
        <div>AllPcs</div>
    )
}

export default AllPcs