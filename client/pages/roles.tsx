import {
    Card,
    Divider,
    Grid,
    Link,
    Loading,
    Note,
    Page,
    Spacer,
    Text,
} from '@geist-ui/core';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Role } from './api/roles';
import PageWithNavBar from './components/PageWithNavBar';

const ViewRolePage: NextPage = () => {
    const [roles, setRoles] = useState<Role[]>();

    const Role = ({
        id,
        name,
        description,
    }: {
        id: string;
        name: string;
        description: string;
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
        fetch('/api/roles', { method: 'GET' })
            .then((response) => response.json())
            .then(setRoles)
            .catch((error) => console.log('error', error));
    }, []);

    return (
        <PageWithNavBar homeLink="/roles">
            <Page.Content>
                <h2>Roles</h2>
                <Spacer h={2} />
                <Grid.Container gap={1.5}>
                    {roles &&
                        roles.map(({ id, name, description }) => (
                            <Role
                                key={name}
                                id={id}
                                name={name}
                                description={description}
                            />
                        ))}
                    {roles === undefined && (
                        <Loading
                            style={{
                                width: '100%',
                                height: '80%',
                                zoom: '200%',
                            }}
                        />
                    )}
                    {roles === null && (
                        <Note type="warning">
                            No learning journeys have been created yet.
                        </Note>
                    )}
                </Grid.Container>
            </Page.Content>
        </PageWithNavBar>
    );
};

export default ViewRolePage;
