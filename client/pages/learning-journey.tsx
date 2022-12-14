import {
    Button,
    Card,
    Divider,
    Link,
    Loading,
    Modal,
    Note,
    Page,
    Spacer,
    Tag,
    Text,
} from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { Course } from './api/courses';
import { LearningJourney } from './api/learningJourneys';
import PageWithNavBar from './components/PageWithNavBar';
import useCustomToast from './hooks/useCustomToast';
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
                        fetchLearningJourneys={fetchLearningJourneys}
                    />
                ))}
                {learningJourneys === undefined && (
                    <Loading
                        style={{ width: '100%', height: '80%', zoom: '200%' }}
                    />
                )}
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
    fetchLearningJourneys: (() => void) | null;
}

const LearningJourneyCard = ({
    learningJourney,
    count,
    fetchLearningJourneys,
}: LearningJourneyCardProps) => {
    return (
        <>
            <Card>
                <Card.Content
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Text b font="20px">
                        {count}. {learningJourney.role.name}
                    </Text>
                    {fetchLearningJourneys != null && (
                        <DeleteLearningJourneyButton
                            learningJourney={learningJourney}
                            fetchLearningJourneys={fetchLearningJourneys}
                        />
                    )}
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
                                    <li style={{ display: 'flex' }}>
                                        <Tag type="default" invert>
                                            {course.id}
                                        </Tag>{' '}
                                        <Spacer width={0.5} />
                                        {course.name}
                                    </li>
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

interface DeleteLearningJourneyProps {
    learningJourney: LearningJourney;
    fetchLearningJourneys: () => void;
}

const DeleteLearningJourneyButton = ({
    learningJourney,
    fetchLearningJourneys,
}: DeleteLearningJourneyProps) => {
    const deletedToast = useCustomToast({
        message: 'Learning Journey is deleted',
        type: 'secondary',
    });
    const failedToDeleteToast = useCustomToast({
        message: 'Learning Journey is cannot be deleted',
        type: 'error',
    });

    const onClick = () => {
        fetch('/api/learningJourneys/' + learningJourney.id, {
            method: 'DELETE',
        })
            .then((response) => {
                deletedToast();
                fetchLearningJourneys();
            })
            .catch((e) => {
                failedToDeleteToast();
            });
    };

    return (
        <Button type="error" auto scale={1 / 3} font="12px" onClick={onClick}>
            Delete
        </Button>
    );
};

export default LearningJourneyPage;
