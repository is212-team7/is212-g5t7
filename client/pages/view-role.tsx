import { Card, Divider, Grid, Page, Spacer, Text } from '@geist-ui/core';
import type { NextPage } from 'next';
import { Role, roleCategories } from '../database/roles';

const ViewRolePage: NextPage = () => {
  const RoleCategory = ({
    key,
    roleCategory,
    roleDetails,
  }: {
    key: string;
    roleCategory: string;
    roleDetails: Role[];
  }) => {
    return (
      <Grid justify="center" key={key}>
        <h4>
          {roleCategory.slice(0, 1).toUpperCase() + roleCategory.slice(1)}
        </h4>

        {roleDetails.map(({ label, description }) => (
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
        <h2>Roles</h2>
        <Spacer h={2} />
        <Grid.Container gap={1.5}>
          {Object.entries(roleCategories).map(
            ([roleCategory, roleDetails]) => (
              <RoleCategory
                key={roleCategory}
                roleCategory={roleCategory}
                roleDetails={roleDetails}
              />
            )
          )}
        </Grid.Container>
      </Page.Content>
    </Page>
  );
};

export default ViewRolePage;
