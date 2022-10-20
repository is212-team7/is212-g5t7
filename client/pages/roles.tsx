import { Card, Divider, Grid, Page, Spacer, Text } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Role } from '../database/roles';

interface RoleAPI {
    Role_ID: string;
    Role_Name: string;
    Role_Description: string;
}

const ViewRolePage: NextPage = () => {
    const [roles, setRoles] = useState<Role[]>();

    const Role = ({
        id,
        label,
        description,
    }: {
        id: string;
        label: string;
        description: string;
    }) => {
        return (
            <Grid justify="center">
                <Card width="600px" key={label}>
                    <Card.Content>
                        <Text b my={0}>
                            {label}
                        </Text>
                    </Card.Content>
                    <Divider h="1px" my={0} />
                    <Card.Content>
                        <Text>
                            {description} (Role ID: {id})
                        </Text>
                    </Card.Content>
                </Card>
                <Spacer h={2} />
            </Grid>
        );
    };

    useEffect(() => {
        fetch(process.env.API_URL + '/roles')
            .then((response) => response.json())
            .then((result) => {
                const rolesResult = result.map((row: RoleAPI) => {
                    return {
                        id: Number(row.Role_ID),
                        label: row.Role_Name,
                        description: row.Role_Description,
                    };
                });
                setRoles(rolesResult);
            })
            .catch((error) => console.log('error', error));
    });

    return (
        <Page>
            <Page.Content>
                <h2>Roles</h2>
                <Spacer h={2} />
                <Grid.Container gap={1.5}>
                    {roles &&
                        roles.map(({ id, label, description }) => (
                            <Role
                                key={label}
                                id={id}
                                label={label}
                                description={description}
                            />
                        ))}
                </Grid.Container>
            </Page.Content>
        </Page>
    );
};

export default ViewRolePage;
