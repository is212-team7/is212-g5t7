import { Button, Input, Link, Page, Spacer } from '@geist-ui/core';
import type { NextPage } from 'next';

const Home: NextPage = () => {
    return (
        // TODO: change this form
        <Page>
            <Page.Content>
                <h2>Create a Skill</h2>

                <Spacer h={2} />

                <Input placeholder="Email">Role Name</Input>
                <Spacer />
                <Input placeholder="First name" width="50%">
                    First name
                </Input>
                <Spacer />
                <Input placeholder="Last name" width="50%">
                    Last name
                </Input>
                <Spacer />
                <Input placeholder="DD-MM-YYYY" width="50%">
                    Date of birth
                </Input>

                <Spacer h={5} />

                <Link href="/verifyAccount">
                    <Button type="secondary">Register</Button>
                </Link>
            </Page.Content>
        </Page>
    );
};

export default Home;
