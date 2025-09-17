import { useContext } from "react";
import { Table, Placeholder, Loader } from "rsuite";
import { LabContext } from "../context/LabProvider";
import { CloseOutline, Edit } from "@rsuite/icons";
import { useNavigate } from "react-router-dom";

const DataTable = ({ arr, tableHead, editRoute, idName }) => {
    const navigate = useNavigate();
    const { loading, withPlaceholder } = useContext(LabContext);
    const { Column, HeaderCell, Cell } = Table;
    const loaderContainerStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'var(--rs-bg-card)',
        padding: 20,
        zIndex: 1
    };
    const renderLoading = () => {
        if (withPlaceholder) {
            return (
                <div style={loaderContainerStyle}>
                    <Placeholder.Grid rows={9} columns={4} active />
                </div>
            );
        }

        return <Loader center backdrop content="Loading..." />;
    };
    return (
        <div>
            <Table loading={loading} height={500} data={arr} renderLoading={renderLoading}>
                {tableHead.map(data => {
                    const { key, label, ...rest } = data;
                    if (key === "createdAt") {
                        return (
                            <Column {...rest} key={key}>
                                <HeaderCell style={{ backgroundColor: "#f7f7fa", fontWeight: "600", fontSize: "14px" }}>{label}</HeaderCell>
                                <Cell>
                                    {rowData =>
                                        rowData.createdAt?.seconds
                                            ? new Date(rowData.createdAt.seconds * 1000).toLocaleDateString("en-In")
                                            : ""
                                    }
                                </Cell>
                            </Column>
                        );
                    }
                    if (key === "actions") {
                        return (
                            <Column {...rest} key={key}>
                                <HeaderCell style={{ backgroundColor: "#f7f7fa", fontWeight: "600", fontSize: "14px" }}>{label}</HeaderCell>
                                <Cell className="">
                                    {rowData => (
                                        <div style={{ display: "flex", gap: "1rem" }}>
                                            <button className="text-blue-600" title="Edit" onClick={() => { navigate(`/${editRoute}/${rowData[`${idName}Id`]}`) }}><Edit /></button>
                                            <button className="text-red-600" title="Delete" onClick={() => console.log("Delete", rowData)}><CloseOutline /></button>
                                        </div>
                                    )}
                                </Cell>
                            </Column>
                        );
                    }
                    return (
                        <Column {...rest} key={key}>
                            <HeaderCell style={{ backgroundColor: "#f7f7fa", fontWeight: "600", fontSize: "14px" }}>{label}</HeaderCell>
                            <Cell dataKey={key} className="capitalize" />
                        </Column>
                    );
                })}
            </Table>
        </div>
    )
}

export default DataTable