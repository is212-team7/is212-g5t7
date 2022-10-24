import { Input, Page, Spacer, useToasts } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ButtonWithToast from '../components/ButtonWithToast';

interface Form {
    name: string;
    description: string;
}

const emptyForm = {
    name: '',
    description: '',
};

const CreateRole: NextPage = () => {
    const router = useRouter();
    const { setToast } = useToasts();
    const [formValues, setFormValues] = useState<Form>(emptyForm);

    const submitRoleCreation = () => {
        const body = JSON.stringify(formValues);

        fetch('/api/roles', {
            method: 'POST',
            body,
            headers: { 'Content-Type': 'application/json' },
        }).then(() => {
            router.push('../roles');
        });
    };

    const showWarningToast = () =>
        setToast({
            text: 'A role needs to have a name.',
            type: 'warning',
        });

    return (
        <Page>
            <Page.Content>
                <h2>Create a Role</h2>

                <Spacer h={2} />

                <Input
                    placeholder="Role Name"
                    value={formValues.name}
                    onChange={(val) =>
                        setFormValues((curr) => ({
                            ...curr,
                            name: val.target.value,
                        }))
                    }
                >
                    Role Name
                </Input>
                <Spacer />
                <Input
                    placeholder="Description"
                    width="100%"
                    value={formValues.description}
                    onChange={(val) =>
                        setFormValues((curr) => ({
                            ...curr,
                            description: val.target.value,
                        }))
                    }
                >
                    Description
                </Input>

                <Spacer h={3} />

                <ButtonWithToast
                    buttonText={'Add role'}
                    toastText={'Role created'}
                    onClick={() => {
                        if (formValues.name === '') {
                            showWarningToast();
                            return false;
                        }
                        submitRoleCreation();
                        return true;
                    }}
                />
            </Page.Content>
        </Page>
    );
};

export default CreateRole;
