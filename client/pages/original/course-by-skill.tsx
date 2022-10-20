import { Card, Grid, Image, Page, Spacer, Text } from '@geist-ui/core';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Course, courses } from '../../database/courses';

const ViewCourses: NextPage = () => {
    // TODO: dynamic page (route changes)
    return (
        <Page>
            <Page.Content>
                <h2>View Courses for XXX Skill</h2>

                <Spacer h={2} />

                <Grid.Container gap={2} height="100px">
                    {courses.map(({ label, description }: Course) => (
                        <CourseCard
                            key={label}
                            label={label}
                            description={description}
                        />
                    ))}
                </Grid.Container>
            </Page.Content>
        </Page>
    );
};

// SUB-COMPONENTS

const CourseCard = ({ label, description }: Course) => {
    return (
        <Link href="./add-course">
            <Grid xs={6}>
                <Card style={{ cursor: 'pointer' }} shadow width="100%">
                    <Text h4 mb={0}>
                        {label}
                    </Text>
                    <Text type="secondary" small>
                        {' '}
                        {description}
                    </Text>
                </Card>
            </Grid>
        </Link>
    );
};

export default ViewCourses;
