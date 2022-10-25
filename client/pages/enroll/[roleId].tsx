import {
    Button,
    Card,
    Checkbox,
    Divider,
    Grid,
    Note,
    Page,
    Spacer,
    Text,
} from '@geist-ui/core';
import { Plus } from '@geist-ui/icons';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MouseEventHandler, useEffect, useState } from 'react';
import { Skill } from '../api/skills';
import PageWithNavBar from '../components/PageWithNavBar';

const EnrollPage: NextPage = () => {
    const router = useRouter();
    const { roleId } = router.query;
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        fetch('/api/skills/role/' + roleId, { method: 'GET' })
            .then((response) => response.json())
            .then(setSkills)
            .catch((error) => console.log('error', error));
    }, [roleId]);

    return (
        <PageWithNavBar homeLink="/roles">
            <Page.Content>
                <h2>Skills for Role {roleId}</h2>
                <Spacer h={2} />
                {skills.length !== 0 ? (
                    <Grid.Container gap={1.5}>
                        {skills.map((skill) => (
                            <SkillCard skill={skill} key={skill.id} />
                        ))}
                    </Grid.Container>
                ) : (
                    <Note type="error">
                        There are no skills assigned to this role yet.
                    </Note>
                )}
            </Page.Content>
        </PageWithNavBar>
    );
};

// Sub-Components

interface SkillCard {
    skill: Skill;
}

const SkillCard = ({ skill }: SkillCard) => {
    const [isChecked, setIsChecked] = useState(false);
    const courses = ['Course 1', 'Course 2', 'Course 3'];

    const addCourse: MouseEventHandler = (e) => {
        e.preventDefault();
    };

    return (
        <Card width="400px">
            <Card.Content
                style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <Text b my={0}>
                    {skill.name}
                </Text>
                <Checkbox
                    checked={isChecked}
                    type="success"
                    scale={2.3}
                    onChange={(e) => setIsChecked(e.target.checked)}
                />
            </Card.Content>
            <Divider h="1px" my={0} />
            {isChecked && (
                <Card.Content style={{ display: 'block' }}>
                    {courses.map((course) => (
                        <div
                            key={course}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                verticalAlign: 'middle',
                            }}
                        >
                            <Text style={{ margin: '0', padding: '6px 0' }}>
                                {course}
                            </Text>
                            <Button
                                style={{ border: 'none' }}
                                iconRight={<Plus />}
                                auto
                                scale={2 / 3}
                                py={0.6}
                                onClick={addCourse}
                            />
                        </div>
                    ))}
                </Card.Content>
            )}
        </Card>
    );
};

export default EnrollPage;
