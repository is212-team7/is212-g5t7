import { Dispatch, SetStateAction } from 'react';
import { Edge, Node } from 'reactflow';
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
}: useGetLearningJourneyNodesProps) => {
    (async () => {
        // Get all skills from role ID
        const skillsResponse = await fetch('api/');
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

            const selectedCourseNodes = courses.selected.map((course) => ({
                id: String(++nodeId),
                type: 'input',
                data: { label: 'Skill', name: skill.name },
                position,
            }));
        });
    })();
};

export default useGetLearningJourneyNodes;

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
