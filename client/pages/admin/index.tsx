import { Spacer, Tabs } from '@geist-ui/core';
import { Folder, User, Zap } from '@geist-ui/icons';
import type { NextPage } from 'next';
import CoursesList from '../components/CoursesList';
import PageWithNavBar from '../components/PageWithNavBar';
import RolesList from '../components/RolesList';
import SkillsList from '../components/SkillsList';

const AdminPage: NextPage = () => {
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
                <Tabs.Item
                    label={
                        <>
                            <Folder /> Courses{' '}
                        </>
                    }
                    value="3"
                >
                    <CoursesList />
                </Tabs.Item>
            </Tabs>
        </PageWithNavBar>
    );
};

export default AdminPage;
