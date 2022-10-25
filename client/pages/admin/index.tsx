import { Note, Page, Spacer, Tabs, useToasts } from '@geist-ui/core';
import { User, Zap } from '@geist-ui/icons';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PageWithNavBar from '../components/PageWithNavBar';
import RolesList from '../components/RolesList';
import SkillsList from '../components/SkillsList';

interface LoginForm {
    email: string;
    password: string;
}

const AdminPage: NextPage = () => {
    const router = useRouter();
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: '',
        password: '',
    });
    const { setToast } = useToasts();

    return (
        <PageWithNavBar>
            <Spacer height={1} />
            <Tabs initialValue="1" align="center" leftSpace={0}>
                <Tabs.Item
                    label={
                        <>
                            <User /> Roles
                        </>
                    }
                    value="1"
                >
                    <RolesList />
                </Tabs.Item>
                <Tabs.Item
                    label={
                        <>
                            <Zap /> Skills{' '}
                        </>
                    }
                    value="2"
                >
                    <SkillsList />
                </Tabs.Item>
            </Tabs>
            <Page.Content></Page.Content>
        </PageWithNavBar>
    );
};

export default AdminPage;
