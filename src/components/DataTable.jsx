import { useContext } from "react";
import { Table, Placeholder, Loader } from "rsuite";
import { LabContext } from "../context/LabProvider";

const DataTable = ({ arr, tableHead }) => {
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
            <Table loading={loading} height={300} data={arr} renderLoading={renderLoading}>
                {tableHead.map(data => {
                    const { key, label, ...rest } = data;
                    return (
                        <Column {...rest} key={key}>
                            <HeaderCell>{label}</HeaderCell>
                            <Cell dataKey={key} />
                        </Column>
                    );
                })}
            </Table>
        </div>
    )
}

export default DataTable