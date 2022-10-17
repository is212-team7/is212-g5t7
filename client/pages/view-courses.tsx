import { Card, Grid, Image, Page, Spacer, Text } from '@geist-ui/core';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Course, courses } from '../database/courses';

const ViewCourses: NextPage = () => {
  return (
    <Page>
      <Page.Content>
        <h2>View Courses</h2>

        <Spacer h={2} />

        <Grid.Container gap={2} height="100px">
          {courses.map(({ label, description }) => (
            <CourseCard key={label} label={label} description={description} />
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
          <Image
            src="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
            height="200px"
            width="400px"
            draggable={false}
            alt={label}
          />
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
