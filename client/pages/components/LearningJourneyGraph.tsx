import ReactFlow, {
    addEdge,
    Background,
    Connection,
    ConnectionLineType,
    useEdgesState,
    useNodesState,
} from 'reactflow';

import { useCallback } from 'react';
import { Course } from '../api/courses';
import { Role } from '../api/roles';
import useGetLearningJourneyNodes from '../hooks/useGetLearningJourneyNodes';
import './LearningJourneyGraph.module.css';
import styles from './react-flow/Flow.module.css';

export type NodeType = 'role' | 'skill' | 'course';

interface LearningJourneyGraphProps {
    role: Role;
    selectedCourseIds: Set<Course['id']>;
}

function LearningJourneyGraph({
    role,
    selectedCourseIds,
}: LearningJourneyGraphProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // Set nodes and edges
    useGetLearningJourneyNodes({ role, selectedCourseIds, setNodes, setEdges });

    const onConnect = useCallback(
        (params: Connection) =>
            setEdges((eds) =>
                addEdge(
                    {
                        ...params,
                        type: ConnectionLineType.SmoothStep,
                        animated: true,
                    },
                    eds
                )
            ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <div className={styles.flow}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                // onConnect={onConnect}
                connectionLineType={ConnectionLineType.Straight}
                fitView
                proOptions={{ hideAttribution: true }}
            >
                <Background />
            </ReactFlow>
        </div>
    );
}

export default LearningJourneyGraph;
