import { Button, Note, Page, Spacer, Tag, Text } from '@geist-ui/core';
import { LogOut } from '@geist-ui/icons';
import { useRouter } from 'next/router';
import useCustomToast from '../hooks/useCustomToast';

interface PageWithNavBar {
    children: React.ReactNode;
}

const PageWithNavBar = ({ children }: PageWithNavBar) => {
    const router = useRouter();
    const logoutToast = useCustomToast({
        message: 'Successfully logged out.',
        type: 'success',
    });

    return (
        <>
            <Page.Header>
                <Note
                    label={false}
                    filled
                    style={{
                        justifyContent: 'right',
                        borderRadius: 0,
                        display: 'flex',
                    }}
                >
                    <Text style={{ paddingTop: '5px' }}>
                        {localStorage.getObject('user').fName +
                            ' ' +
                            localStorage.getObject('user').lName}
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
                        {localStorage.getObject('user').systemRole}
                    </Tag>
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
                </Note>
            </Page.Header>
            <Page>{children}</Page>
        </>
    );
};

export default PageWithNavBar;
