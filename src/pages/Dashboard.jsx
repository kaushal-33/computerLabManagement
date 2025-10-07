import React, { useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { LabContext } from "../context/LabProvider";
import { PcContext } from "../context/PcProvider";
import { StudentContext } from "../context/StudentProvider";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
    const { labs } = useContext(LabContext);
    const { pcs } = useContext(PcContext);
    const { students } = useContext(StudentContext);

    // bar chart
    const labData = labs.map(lab => ({
        name: lab.labLocation || "Unknown",
        Capacity: lab.labCapacity,
        Available: lab.availableCapacity,
    }));

    // pie chart
    const pcStatusCount = pcs.reduce((acc, pc) => {
        acc[pc.pcStatus] = (acc[pc.pcStatus] || 0) + 1;
        return acc;
    }, {});

    const pcData = Object.entries(pcStatusCount).map(([status, value]) => ({
        name: status,
        value,
    }));

    // Totals for summary
    const totalLabs = labs.length;
    const totalPcs = pcs.length;
    const totalStudents = students.length;

    return (
        <div className="container mx-auto px-4 py-4">
            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
                    <span className="text-2xl font-bold text-blue-600">{totalLabs}</span>
                    <span className="text-gray-700 mt-2">Total Labs</span>
                </div>
                <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
                    <span className="text-2xl font-bold text-emerald-600">{totalPcs}</span>
                    <span className="text-gray-700 mt-2">Total PCs</span>
                </div>
                <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
                    <span className="text-2xl font-bold text-yellow-600">{totalStudents}</span>
                    <span className="text-gray-700 mt-2">Total Students</span>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Lab Capacity Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={labData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Capacity" fill="#8884d8" />
                            <Bar dataKey="Available" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">PC Status Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pcData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                }
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pcData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
