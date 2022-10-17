import { Grid, Image, Page, Spacer, Text } from '@geist-ui/core';
import type { NextPage } from 'next';
import Toast from './components/toast';

const AddCourse: NextPage = () => {
    return (
        <Page>
            <Page.Content>
                <h2>Add Course</h2>
                <Spacer h={2} />
                <Text b font="30px">
                    Course Title: Service Innovation
                </Text>
                <Grid.Container justify="center" gap={3} height="100%">
                    <Grid
                        flex-direction="column"
                        direction="column"
                        xs={24}
                        md={12}
                    >
                        <Image
                            height="fluid"
                            src="https://www.bain.com/contentassets/100cd05b7a634f839e25e66cde37850e/gettyimages-1178687233-16_9.jpg"
                            alt=""
                        />
                    </Grid>

                    <Grid direction="column" xs={24} md={12}>
                        <Text b font="20px">
                            Description:
                        </Text>
                        <Spacer />
                        <Text>
                            This module covers knowledge and application skills
                            in understanding the importance of service
                            innovation and the methods and opportunities that
                            are available for a service staff to generate ideas
                            that contribute to service innovation.
                        </Text>
                        <Spacer />
                        <Toast text={'Successfully enrolled.'} />
                    </Grid>
                </Grid.Container>
            </Page.Content>
        </Page>
    );
};

export default AddCourse;
