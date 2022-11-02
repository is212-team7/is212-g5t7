import dagre from 'dagre';
import { Dispatch, SetStateAction } from 'react';
import { Edge, Node, Position } from 'reactflow';
import { Course } from '../api/courses';
import { Role } from '../api/roles';
import { Skill } from '../api/skills';

interface useGetLearningJourneyNodesProps {
    role: Role;
    selectedCourseIds: Set<Course['id']>;
    setNodes: Dispatch<SetStateAction<Node[]>>;
    setEdges: Dispatch<SetStateAction<Edge[]>>;
}

const useGetLearningJourneyNodes = ({
    role,
    selectedCourseIds,
    setNodes,
    setEdges,
}: useGetLearningJourneyNodesProps) => {
    (async () => {
        // Get all skills from role ID
        const skillsResponse = await fetch('api/skills/role/' + role.id);
        const skillsResult: Skill[] = await skillsResponse.json();

        // Get courses for each skill
        // Separate them by 'selected' and 'not selected'
        const coursesBySkill = await Promise.all(
            skillsResult.map(async (skill) => {
                const courseResponse = await fetch(
                    'api/courses/skill/' + skill.id
                );
                const coursesResult: Course[] = await courseResponse.json();

                const courseSelectBreakdown: {
                    selected: Course[];
                    notSelected: Course[];
                } = { selected: [], notSelected: [] };

                coursesResult.map((course) => {
                    if (selectedCourseIds.has(course.id)) {
                        courseSelectBreakdown.selected.push(course);
                    } else {
                        courseSelectBreakdown.notSelected.push(course);
                    }
                });

                return { skill, courses: courseSelectBreakdown };
            })
        );

        let nodeId = 1;
        const position = { x: 0, y: 0 };
        const edgeType = 'smoothstep';

        const nodes: Node[] = [
            {
                id: String(nodeId),
                type: 'input',
                data: { label: 'Role', name: role.name },
                position,
            },
        ];
        const edges: Edge[] = [];

        // Add skill and course to nodes and edges
        coursesBySkill.forEach(({ skill, courses }) => {
            const skillNode = {
                id: String(++nodeId),
                type: 'input',
                data: { label: 'Skill', name: skill.name },
                position,
            };
            nodes.push(skillNode);
            edges.push({
                id: `${1}-${skillNode.id}`,
                source: String(1),
                target: skillNode.id,
                type: edgeType,
            });

            const selectedCourseNodes = courses.selected.map((course) => {
                const courseNodeId = String(++nodeId);

                edges.push({
                    id: `${skillNode.id}-${courseNodeId}`,
                    source: skillNode.id,
                    target: courseNodeId,
                    type: edgeType,
                });

                return {
                    id: courseNodeId,
                    type: 'input',
                    data: { label: 'Course', name: course.name },
                    position,
                };
            });

            const notSelectedCourseNodes = courses.selected.map((course) => {
                const courseNodeId = String(++nodeId);
                console.log({ course, courseNodeId });

                edges.push({
                    id: `${skillNode.id}-${courseNodeId}`,
                    source: skillNode.id,
                    target: courseNodeId,
                    type: edgeType,
                    animated: true,
                });

                return {
                    id: courseNodeId,
                    type: 'input',
                    data: { label: 'Course', name: course.name },
                    position,
                };
            });
            nodes.push(...selectedCourseNodes, ...notSelectedCourseNodes);
        });

        const { nodes: layoutedNodes, edges: layoutedEdges } =
            getLayoutedElements(nodes, edges);

        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    })();
};

export default useGetLearningJourneyNodes;

// Helpers

// https://reactflow.dev/docs/examples/layout/dagre/
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

export function getLayoutedElements(
    nodes: Node[],
    edges: Edge[],
    direction = 'TB'
) {
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = Position.Left;
        node.sourcePosition = Position.Right;

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        return node;
    });

    return { nodes, edges };
}

// Get selected courses from learning journey
// const staff = useSessionStorage();
//     const staffNotFoundToast = useCustomToast({
//         message: 'Staff ID not found',
//         type: 'error',
//     });
// if (staff == null) {
//   staffNotFoundToast();
//   return;
// }
// const learningJourneysForStaffResponse = await fetch(
//   'api/learningJourneys'
// );
// const learningJourneysForStaffResult: LearningJourney[] =
//   await learningJourneysForStaffResponse.json();
