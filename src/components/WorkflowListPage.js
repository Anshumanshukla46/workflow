import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./list.css";

export default function WorkflowListPage() {
    const [workflows, setWorkflows] = useState([]);

    useEffect(() => {
        fetch('https://64307b10d4518cfb0e50e555.mockapi.io/workflow')
            .then((response) => response.json())
            .then((data) => setWorkflows(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <h2 className='title'>Workflow List</h2>
            <table className='table'>
                <thead className='table-head'>
                    <tr>
                        <th>Name</th>
                        <th>Input Type</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {workflows.map((workflow) => (
                        <tr key={workflow.id}>
                            <td>
                                <Link
                                    className='link-tag'
                                    to={`/workflow/${workflow.id}`}>{workflow.name}</Link>
                            </td>
                            <td>{workflow.input_type}</td>
                            <td>{workflow.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
