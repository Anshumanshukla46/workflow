import { useEffect, useState } from 'react';
import ReactFlow, { Handle } from 'react-flow-renderer';
import { useParams } from 'react-router-dom';

const WorkflowDesignerPage = () => {
    const { workflow_id } = useParams();
    const [workflow, setWorkflow] = useState(null);
    const [modules, setModules] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkflowData = async () => {
            try {
                const workflowResponse = await fetch(`https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${workflow_id}`);
                const workflowData = await workflowResponse.json();
                setWorkflow(workflowData);

                const modulesResponse = await fetch('https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=1&limit=5');
                const modulesData = await modulesResponse.json();
                setModules(modulesData);
            } catch (error) {
                setError('Error fetching data');
            }
        };

        fetchWorkflowData();
    }, [workflow_id]);


    if (error) {
        return <div>{error}</div>;
    }

    if (!workflow || modules.length === 0) {
        return <div>Loading...</div>;
    }

    const handleNodeDelete = (nodeId) => {
        // handle delete node logic 
    };

    const handleNodeDragStop = (event, node) => {
        // Todo : (tried but not getting it)
    };

    return (
        <div>
            <h1>{workflow.name}</h1>
            <div>Workflow input type: {workflow.input_type}</div>

            {/* React Flow canvas */}
            <ReactFlow
                elements={[
                    {
                        id: 'input-node',
                        type: 'input',
                        data: {
                            label: 'Input',
                        },
                        position: { x: 50, y: 50 },
                    },
                ]}
                onElementDelete={handleNodeDelete}
                onNodeDragStop={handleNodeDragStop}
            >
                {/* Render modules as draggable nodes */}
                {modules.map((module) => (
                    <div key={module.id}>
                        <div>Module name: {module.name}</div>
                        <div>Module input type: {module.input_type}</div>
                        <div>Module output type: {module.output_type}</div>
                        <Handle
                            type="target"
                            position="left"
                            id={`${module.id}-input`}
                            style={{ top: '50%', background: '#555' }}
                        />
                        <Handle
                            type="source"
                            position="right"
                            id={`${module.id}-output`}
                            style={{ top: '50%', background: '#555' }}
                        />
                    </div>
                ))}
            </ReactFlow>
        </div>
    );
};

export default WorkflowDesignerPage;
