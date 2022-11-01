import { Button, Note, Page, Spacer, Tabs, Tag, Text } from '@geist-ui/core';
import { Home, LogOut, User, Zap } from '@geist-ui/icons';
import { useRouter } from 'next/router';
import useCustomToast from '../hooks/useCustomToast';
import useSessionStorage from '../hooks/useSessionStorage';

interface PageWithNavBar {
    homeLink?: string;
    children: React.ReactNode;
}

const PageWithNavBar = ({ homeLink, children }: PageWithNavBar) => {
    const router = useRouter();
    const staff = useSessionStorage();

    const logoutToast = useCustomToast({
        message: 'Successfully logged out.',
        type: 'success',
    });

    const managerTabChange = (val: string) => {
        switch (val) {
            case '/roles':
                router.push(val);
                break;
            case '/manager/staff-skills':
                router.push(val);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Page.Header>
                <Note
                    label={false}
                    filled
                    style={{
                        justifyContent: homeLink ? 'space-between' : 'right',
                        borderRadius: 0,
                        display: 'flex',
                    }}
                >
                    {homeLink && (
                        <Button
                            type="secondary"
                            onClick={() => router.push(homeLink)}
                            iconRight={<Home />}
                            auto
                            scale={2 / 3}
                            px={0.6}
                        />
                    )}
                    <div style={{ display: 'flex' }}>
                        {staff && (
                            <>
                                <Text style={{ paddingTop: '5px' }}>
                                    {staff.fName + ' ' + staff.lName}
                                </Text>
                                <Spacer width={0.8} />
                                <Tag
                                    type="success"
                                    invert
                                    style={{
                                        marginTop: '3px',
                                        fontSize: '10px',
                                        lineHeight: '14px',
                                    }}
                                >
                                    {staff.systemRole}
                                </Tag>
                            </>
                        )}
                        <Spacer width={0.3} />
                        <Button
                            type="secondary"
                            onClick={() => {
                                router.push('/login');
                                logoutToast();
                            }}
                            iconRight={<LogOut />}
                            auto
                            scale={2 / 3}
                            px={0.6}
                        />
                    </div>
                </Note>
                {staff?.systemRole === 'Manager' && (
                    <Tabs
                        initialValue={
                            router.pathname === '/manager/staff-skills'
                                ? '/manager/staff-skills'
                                : '/roles'
                        }
                        align="center"
                        leftSpace={0}
                        onChange={managerTabChange}
                    >
                        <Tabs.Item
                            label={
                                <>
                                    <Zap /> Create Learning Journey
                                </>
                            }
                            value="/roles"
                        />
                        <Tabs.Item
                            label={
                                <>
                                    <User /> View Staff Skills
                                </>
                            }
                            value="/manager/staff-skills"
                        />
                    </Tabs>
                )}
            </Page.Header>
            <Page>{children}</Page>
        </>
    );
};

export default PageWithNavBar;
