import React, { useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { LabContext } from "../context/LabProvider";
import { PcContext } from "../context/PcProvider";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
    const { labs } = useContext(LabContext);
    const { pcs } = useContext(PcContext);

    // Prepare data for labs bar chart
    const labData = labs.map(lab => ({
        name: lab.labLocation || "Unknown",
        Capacity: lab.labCapacity,
        Available: lab.availableCapacity
    }));

    // Prepare data for PC status pie chart
    const pcStatusCount = pcs.reduce((acc, pc) => {
        acc[pc.pcStatus] = (acc[pc.pcStatus] || 0) + 1;
        return acc;
    }, {});

    const pcData = Object.entries(pcStatusCount).map(([status, value]) => ({
        name: status,
        value
    }));

    return (
        <div>
            <h2>Lab Capacity Overview</h2>
            <BarChart width={600} height={300} data={labData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Capacity" fill="#8884d8" />
                <Bar dataKey="Available" fill="#82ca9d" />
            </BarChart>

            <h2>PC Status Distribution</h2>
            <PieChart width={400} height={400}>
                <Pie data={pcData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={150} fill="#8884d8" dataKey="value">
                    {pcData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default Dashboard;
