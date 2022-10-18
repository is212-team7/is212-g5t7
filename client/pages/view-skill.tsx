import { Card, Divider, Grid, Page, Spacer, Text } from '@geist-ui/core';
import type { NextPage } from 'next';
import { Skill, skillCategories } from '../database/skills';

const ViewSkillPage: NextPage = () => {
    const SkillCategory = ({
        key,
        skillCategory,
        skillDetails,
    }: {
        key: string;
        skillCategory: string;
        skillDetails: Skill[];
    }) => {
        return (
            <Grid justify="center">
                <h4>
                    {skillCategory.slice(0, 1).toUpperCase() +
                        skillCategory.slice(1)}
                </h4>

                {skillDetails.map(({ label, description }) => (
                    <>
                        <Card width="600px" key={label}>
                            <Card.Content>
                                <Text b my={0}>
                                    {label}
                                </Text>
                            </Card.Content>
                            <Divider h="1px" my={0} />
                            <Card.Content>
                                <Text>{description}</Text>
                            </Card.Content>
                        </Card>
                        <Spacer h={2} />
                    </>
                ))}
            </Grid>
        );
    };

    return (
        <Page>
            <Page.Content>
                <h2>Skills</h2>
                <Spacer h={2} />
                <Grid.Container gap={1.5}>
                    {Object.entries(skillCategories).map(
                        ([skillCategory, skillDetails]) => (
                            <SkillCategory
                                key={skillCategory}
                                skillCategory={skillCategory}
                                skillDetails={skillDetails}
                            />
                        )
                    )}
                </Grid.Container>
            </Page.Content>
        </Page>
    );
};

export default ViewSkillPage;
