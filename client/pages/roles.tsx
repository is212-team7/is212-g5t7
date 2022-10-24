
import { Card, Divider, Grid, Link, Page, Spacer, Text } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Role } from './api/roles';

interface RoleAPI {
    Role_ID: string;
    Role_Name: string;
    Role_Description: string;
}


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
            .then((result) => {
                console.log({ result });
                setRoles(result);
            })
            .catch((error) => console.log('error', error));
    }, []);

    return (
        <Page>
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
                </Grid.Container>
            </Page.Content>
        </Page>
    );
};

export default ViewRolePage;