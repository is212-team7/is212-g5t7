import { Button, Input, Link, Page, Spacer, Card, Text, Divider, Grid } from '@geist-ui/core';
import type { NextPage } from 'next';
import { roles } from './database/roles';

const Home: NextPage = () => {
    return (
        <Page>
            <Page.Content>
                <h2>Roles</h2>
                <Spacer h={2} />
                <Grid.Container gap={1.5}>
                    {/* having some issue writing a loop here */}
                    <Spacer h={2}/>
                    <Grid justify="center">
                    <h4> {Object.keys(roles)[0]}</h4>
                        {Object.values(roles)[0].map(role => (
                            <Card width="600px">
                                <Card.Content>
                                    <Text b my={0}>{role}</Text>
                                </Card.Content>
                                <Divider h="1px" my={0} />
                                <Card.Content>
                                    <Text>some role description here.</Text>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid>
                    <Spacer h={2} />
                    <Grid  justify="center">
                    <h4>Technology</h4>
                        {skills['technology'].map(skill => (
                            <Card width="600px">
                                <Card.Content>
                                    <Text b my={0}>{skill}</Text>
                                </Card.Content>
                                <Divider h="1px" my={0} />
                                <Card.Content>
                                    <Text>some skill description here.</Text>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid>
                    <Spacer h={2} />
                    
                    <Grid justify="center">
                    <h4>Marketing</h4>
                        {skills['marketing'].map(skill => (
                            <Card width="600px">
                                <Card.Content>
                                    <Text b my={0}>{skill}</Text>
                                </Card.Content>
                                <Divider h="1px" my={0} />
                                <Card.Content>
                                    <Text>some skill description here.</Text>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid>
                    <Grid justify="center">
                    <h4>Admin</h4>
                        {skills['admin'].map(skill => (
                            <Card width="600px">
                                <Card.Content>
                                    <Text b my={0}>{skill}</Text>
                                </Card.Content>
                                <Divider h="1px" my={0} />
                                <Card.Content>
                                    <Text>some skill description here.</Text>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid>
                </Grid.Container>


            </Page.Content>
        </Page>
    );
};

export default Home;