import { Grid, Card, Image, Text, Button, Input, Link, Page, Select, Spacer } from '@geist-ui/core';
import type { NextPage } from 'next';


const ViewCourses: NextPage = () => {

  return (
    <Page>
      <Page.Content>
        <h2>View Courses</h2>

        <Spacer h={2} />

        <Grid.Container gap={2} height="100px">
        <Grid xs={24} md={6}>
          <Card onClick={onClick} style={{ cursor: "pointer" }} shadow width="100%" href="./add-course">
          <Image src="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
          height="200px" width="400px" draggable={false} />
          <Text h4 mb={0}>Service Innovation</Text>
          <Text type="secondary" small> This module covers knowledge and application skills in understanding the importance of service innovation and the methods and opportunities that are available for a service staff to generate ideas that contribute to service innovation.</Text>
        </Card>

        </Grid>
        <Grid xs={24} md={6}>
          <Card shadow width="100%">
          <Image src="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
          height="200px" width="400px" draggable={false} />
          <Text h4 mb={0}>Service Innovation</Text>
          <Text type="secondary" small> This module covers knowledge and application skills in understanding the importance of service innovation and the methods and opportunities that are available for a service staff to generate ideas that contribute to service innovation.</Text>
        </Card>
        </Grid>
        <Grid xs={24} md={6}>
          <Card shadow width="100%">
          <Image src="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
          height="200px" width="400px" draggable={false} />
          <Text h4 mb={0}>Service Innovation</Text>
          <Text type="secondary" small> This module covers knowledge and application skills in understanding the importance of service innovation and the methods and opportunities that are available for a service staff to generate ideas that contribute to service innovation.</Text>
        </Card>
        </Grid>
        <Grid xs={24} md={6}>
          <Card shadow width="100%">
          <Image src="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
          height="200px" width="400px" draggable={false} />
          <Text h4 mb={0}>Service Innovation</Text>
          <Text type="secondary" small> This module covers knowledge and application skills in understanding the importance of service innovation and the methods and opportunities that are available for a service staff to generate ideas that contribute to service innovation.</Text>
        </Card>
        </Grid>
        </Grid.Container>

   

      
      </Page.Content>
    </Page>
  );
};

// SUB-COMPONENTS
const onClick = () => {
  location.href = "./add-course";
}
export default ViewCourses;
