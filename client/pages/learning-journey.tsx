import {
    Card,
    Divider,
    Link,
    Modal,
    Note,
    Page,
    Spacer,
    Text,
} from '@geist-ui/core';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Course } from './api/courses';
import { LearningJourney } from './api/learningJourneys';
import LearningJourneyGraph from './components/LearningJourneyGraph';
import PageWithNavBar from './components/PageWithNavBar';
import useFetchLearningJourneys from './hooks/useFetchLearningJourneys';
import useSessionStorage from './hooks/useSessionStorage';

const LearningJourneyPage = () => {
    const staff = useSessionStorage();
    const [learningJourneys, setLearningJourneys] = useState<
        LearningJourney[] | null
    >();

    const fetchLearningJourneys = useFetchLearningJourneys({
        setLearningJourneys,
        staff,
    });
    console.log({ staff, learningJourneys });

    useEffect(() => {
        if (
            fetchLearningJourneys == null ||
            (learningJourneys != null && learningJourneys.length > 0)
        )
            return;
        fetchLearningJourneys();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [staff?.id]);

    return (
        <PageWithNavBar homeLink=".">
            <Page.Content>
                <h2>Your Learning Journeys</h2>
                <Spacer height={2} />
                {learningJourneys?.map((learningJourney, i) => (
                    <LearningJourneyCard
                        key={learningJourney.role.id}
                        learningJourney={learningJourney}
                        count={i + 1}
                    />
                ))}
                {learningJourneys === undefined && <Skeleton count={5} />}
                {learningJourneys === null && (
                    <Note type="default">
                        You don&apos;t have any learning journeys yet.
                    </Note>
                )}
                {/* {learningJourneys != null &&
                    learningJourneys.map((learningJourney) => (
                        <LearningJourneyGraph
                            key={learningJourney.id}
                            role={learningJourney.role}
                            selectedCourseIds={
                                new Set(
                                    learningJourney.course.map(
                                        (course) => course.id
                                    )
                                )
                            }
                        />
                    ))} */}
            </Page.Content>
        </PageWithNavBar>
    );
};

// Sub-components

interface LearningJourneyCardProps {
    learningJourney: LearningJourney;
    count: number;
}

const LearningJourneyCard = ({
    learningJourney,
    count,
}: LearningJourneyCardProps) => {
    return (
        <>
            <Card>
                <Card.Content>
                    <Text b font="20px">
                        {count}. {learningJourney.role.name}
                    </Text>
                </Card.Content>
                <Divider h="1px" my={0} />
                <Card.Content>
                    <ul>
                        {learningJourney.course.map((course) => {
                            return (
                                <div key={course.id}>
                                    {/* <Text b h5>
                                    {courseBySkill.skill.name}
                                </Text>
                                <ol>
                                    {courseBySkill.courses.map((course) => {
                                        return (
                                            <LearningJourneyCourse
                                                key={course.id}
                                                course={course}
                                            />
                                        );
                                    })}
                                </ol> */}
                                    <li>{course.name}</li>
                                </div>
                            );
                        })}
                    </ul>
                </Card.Content>
            </Card>
            <Spacer height={2} />
        </>
    );
};

interface LearningJourneyCourseProps {
    course: Course;
}

const LearningJourneyCourse = ({ course }: LearningJourneyCourseProps) => {
    const [state, setState] = useState(false);

    return (
        <>
            <li key={course.id}>
                <Link
                    href="javascript:void(0);"
                    color
                    underline
                    onClick={() => setState(true)}
                >
                    {course.id}: {course.name}
                </Link>
            </li>

            <Modal visible={state}>
                <Modal.Title>{course.name}</Modal.Title>
                <Modal.Subtitle>{course.id}</Modal.Subtitle>
                <Modal.Content>
                    <p>{course.description}</p>
                </Modal.Content>
                <Modal.Action onClick={() => setState(false)}>
                    Exit
                </Modal.Action>
            </Modal>
        </>
    );
};

export default LearningJourneyPage;
