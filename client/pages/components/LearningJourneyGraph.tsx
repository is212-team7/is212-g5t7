import { useCallback } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    Connection,
    ConnectionLineType,
    Edge,
    Node,
    useEdgesState,
    useNodesState,
} from 'reactflow';
import CourseNodeType from './react-flow/CourseNodeType';

import styles from './react-flow/Flow.module.css';
import RoleNodeType from './react-flow/RoleNodeType';
import SkillNodeType from './react-flow/SkillNodeType';

export type NodeType = 'role' | 'skill' | 'course';

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Node 1' },
        position: { x: 250, y: 5 },
    },
    {
        id: '2',
        data: { label: 'Node 2' },
        position: { x: 100, y: 100 },
    },
    {
        id: '3',
        data: { label: 'Node 3' },
        position: { x: 400, y: 100 },
    },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
];

const defaultEdgeOptions = {
    animated: true,
    type: 'smoothstep',
};

const nodeTypes = {
    role: RoleNodeType,
    course: CourseNodeType,
    skill: SkillNodeType,
};

function LearningJourneyGraph() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
        (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div className={styles.flow}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                defaultEdgeOptions={defaultEdgeOptions}
                connectionLineType={ConnectionLineType.Straight}
                fitView
                proOptions={{ hideAttribution: true }}
                nodeTypes={nodeTypes}
            >
                <Background />
            </ReactFlow>
        </div>
    );
}

export default LearningJourneyGraph;
