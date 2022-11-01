import { Card, Divider, Grid, Link, Page, Spacer, Text } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Skill } from '../api/skills';
import PageWithNavBar from '../components/PageWithNavBar';

const AdminSkillsPage: NextPage = () => {
    const [skills, setSkills] = useState<Skill[]>();

    const Skill = ({
        id,
        name,
        description,
    }: {
        id: number;
        name: string;
        description?: string;
    }) => {
        return (
            <Grid justify="center">
                <Card width="600px" key={name}>
                    <Card.Content>
                        <Text b my={0}>
                            {name}
                        </Text>
                    </Card.Content>
                    <Divider h="1px" my={0} />
                    <Card.Content>
                        <Text font="12px" mt={0} style={{ color: '#ccc' }}>
                            DESCRIPTION
                        </Text>
                        <Text>{description}</Text>
                    </Card.Content>
                    <Card.Footer>
                        <Link color href={'enroll/' + id}>
                            View skills for {name} &#8594;
                        </Link>
                    </Card.Footer>
                </Card>
                <Spacer h={2} />
            </Grid>
        );
    };

    useEffect(() => {
        // Get staff with at least one LJ
        (async () => {
            const staffIds: number[] = await (
                await fetch('/api/staffs/participating/ids')
            ).json();

            fetch('/api/skills', { method: 'GET' })
                .then((response) => response.json())
                .then(setSkills)
                .catch((error) => console.log('error', error));
        })();
    }, []);

    return (
        <PageWithNavBar homeLink="/roles">
            <Page.Content>
                <h2>Skills</h2>
                <Spacer h={2} />
                <Grid.Container gap={1.5}>
                    {skills &&
                        skills.map(({ id, name, description }) => (
                            <Skill
                                key={name}
                                id={id}
                                name={name}
                                description={description}
                            />
                        ))}
                </Grid.Container>
            </Page.Content>
        </PageWithNavBar>
    );
};

export default AdminSkillsPage;
