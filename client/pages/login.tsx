import { Button, Input, Page, Spacer, useToasts } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Staff } from './api/staffs';

interface LoginForm {
    email: string;
    password: string;
}

const LoginPage: NextPage = () => {
    const router = useRouter();
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: '',
        password: '',
    });
    const { setToast } = useToasts();

    const login = () => {
        if (
            loginForm == null ||
            loginForm.email === '' ||
            loginForm.password === ''
        ) {
            setToast({
                text: 'Please fill in your email and password.',
                type: 'warning',
            });
            return;
        }

        fetch('/api/staffs/login', {
            method: 'POST',
            body: JSON.stringify({ email: loginForm.email }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((result: Staff) => {
                console.log('setting user to: ', result);
                sessionStorage.setObject('user', result);

                switch (result.systemRole) {
                    case null:
                        setToast({
                            text: 'No such user exists.',
                            type: 'error',
                        });
                        break;
                    case 'User':
                    case 'Manager':
                        router.push('/roles');
                        break;
                    case 'Admin':
                        router.push('/admin');
                        break;
                    default:
                        break;
                }
            });
    };

    return (
        <Page
            style={{
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
            }}
        >
            <Page.Content>
                <h2>Login</h2>
                <Spacer h={2} />
                <Input
                    value={loginForm?.email}
                    onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    label="Email"
                    placeholder="Email"
                    width={16}
                />
                <Spacer h={0.5} />
                <Input.Password
                    value={loginForm?.password}
                    onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    label="Password"
                    placeholder="Password"
                    width={16}
                />
                <Spacer h={3} />
                <Button type="secondary" auto onClick={login}>
                    Login
                </Button>
            </Page.Content>
        </Page>
    );
};

export default LoginPage;
