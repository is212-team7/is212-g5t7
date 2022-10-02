import { Button, Input, Link, Page, Spacer, Card, Text, Divider, Grid } from '@geist-ui/core';
import type { NextPage } from 'next';
import { skills } from './database/skills';

const Home: NextPage = () => {
    return (
        <Page>
            <Page.Content>
                <h2>skills</h2>
                <Spacer h={2} />
                <Grid.Container gap={1.5}>
                    {/* having some issue writing a loop here */}
                    <Spacer h={2}/>
                    <Grid justify="center">
                    <h4> {Object.keys(skills)[0]}</h4>
                        {Object.values(skills)[0].map(skill => (
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