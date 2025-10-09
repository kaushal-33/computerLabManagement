import { useContext } from "react";
import { Table, Placeholder, Loader, Toggle } from "rsuite";
import { LabContext } from "../context/LabProvider";
import { CloseOutline, Edit, Tools } from "@rsuite/icons";
import { useNavigate } from "react-router-dom";

const DataTable = ({ tableName, arr, tableHead, editRoute, idName, deleteData, toggleBtn }) => {
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
        <div className="p-4 min-h-screen" >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="py-4 px-6">
                    <h2 className="text-xl font-bold text-blue-800">{tableName}</h2>
                </div>
                <div
                    className="px-4 pb-6"
                    style={{
                        overflowX: 'auto',
                        minHeight: 'calc(100vh - 96px)',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    <div
                        style={{
                            minWidth: '800px',
                            maxWidth: 'none',
                        }}
                    >
                        <Table
                            loading={loading}
                            height={window.innerHeight - 120}
                            data={arr}
                            renderLoading={renderLoading}
                            style={{
                                fontSize: '13px',
                                background: 'white',
                                borderRadius: '1rem',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                                minWidth: '800px',
                            }}
                        >
                            {tableHead.map(data => {
                                const { key, label, ...rest } = data;
                                if (key === 'createdAt') {
                                    return (
                                        <Column {...rest} key={key}>
                                            <HeaderCell
                                                style={{
                                                    backgroundColor: '#f7f7fa',
                                                    fontWeight: 600,
                                                    fontSize: '14px',
                                                    textTransform: 'capitalize',
                                                    borderBottom: '1.5px solid #edeffd',
                                                }}
                                            >
                                                {label}
                                            </HeaderCell>
                                            <Cell>
                                                {rowData =>
                                                    rowData.createdAt?.seconds
                                                        ? new Date(rowData.createdAt.seconds * 1000).toLocaleDateString('en-In')
                                                        : ''
                                                }
                                            </Cell>
                                        </Column>
                                    );
                                }
                                if (key === 'actions') {
                                    return (
                                        <Column {...rest} key={key} width={150} align="center">
                                            <HeaderCell
                                                style={{
                                                    backgroundColor: '#f7f7fa',
                                                    fontWeight: 600,
                                                    fontSize: '14px',
                                                    textTransform: 'capitalize',
                                                    borderBottom: '1.5px solid #edeffd',
                                                }}
                                            >
                                                {label}
                                            </HeaderCell>
                                            <Cell>
                                                {rowData => (
                                                    <div className="flex gap-3 items-center justify-center">
                                                        <button
                                                            className="rounded text-blue-700"
                                                            title="Edit"
                                                            onClick={() => {
                                                                navigate(`/${editRoute}/${rowData[`${idName}Id`]}`);
                                                            }}
                                                        >
                                                            <Edit />
                                                        </button>
                                                        <button
                                                            className="rounded  text-red-600"
                                                            title="Delete"
                                                            onClick={() => deleteData(rowData[`${idName}Id`])}
                                                        >
                                                            <CloseOutline />
                                                        </button>
                                                        {toggleBtn && (
                                                            <Toggle size="sm" title="Maintenance" color="orange" className="ml-1">
                                                                <Tools />
                                                            </Toggle>
                                                        )}
                                                    </div>
                                                )}
                                            </Cell>
                                        </Column>
                                    );
                                }
                                return (
                                    <Column {...rest} key={key}>
                                        <HeaderCell
                                            style={{
                                                backgroundColor: '#f7f7fa',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                textTransform: 'capitalize',
                                                borderBottom: '1.5px solid #edeffd',
                                            }}
                                        >
                                            {label}
                                        </HeaderCell>
                                        <Cell
                                            dataKey={key}
                                            className="capitalize"
                                            style={{ textTransform: 'capitalize', fontSize: '13px' }}
                                        />
                                    </Column>
                                );
                            })}
                        </Table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DataTable