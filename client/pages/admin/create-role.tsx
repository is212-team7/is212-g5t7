import { Button, Input, Link, Page, Select, Spacer } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useState } from 'react';
import { Skill } from '../../database/skills';

interface Form {
    roleName: string;
    roleDescription: string;
}

const emptyForm = {
    roleName: '',
    roleDescription: '',
};

const CreateRole: NextPage = () => {
    const [formValues, setFormValues] = useState<Form>(emptyForm);

    const submitRoleCreation = () => {
        const body = JSON.stringify({
            Role_Name: formValues.roleName,
            Role_Description: formValues.roleDescription,
        });

        fetch(process.env.API_URL + '/roles', {
            method: 'POST',
            body,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    return (
        <Page>
            <Page.Content>
                <h2>Create a Role</h2>

                <Spacer h={2} />

                <Input
                    placeholder="Role Name"
                    value={formValues.roleName}
                    onChange={(val) =>
                        setFormValues((curr) => ({
                            ...curr,
                            roleName: val.target.value,
                        }))
                    }
                >
                    Role Name
                </Input>
                <Spacer />
                <Input
                    placeholder="Description"
                    width="100%"
                    value={formValues.roleDescription}
                    onChange={(val) =>
                        setFormValues((curr) => ({
                            ...curr,
                            roleDescription: val.target.value,
                        }))
                    }
                >
                    Description
                </Input>

                <Spacer h={5} />

                {/* TODO: Add view roles link */}
                <Link onClick={() => submitRoleCreation()}>
                    <Button type="secondary">Add role</Button>
                </Link>
            </Page.Content>
        </Page>
    );
};

// SUB-COMPONENTS

type genSkillSelectGroupType = (
    label: string,
    skills: Skill[]
) => React.ReactNode[];

const genSkillSelectGroup: genSkillSelectGroupType = (label, skills) => {
    const options = skills.map((skill) => (
        <Select.Option
            key={kebabCaseTransform(skill.label)}
            value={skill.label}
        >
            {skill.label}
        </Select.Option>
    ));

    return [
        <Select.Option key={label} label>
            {label}
        </Select.Option>,
        ...options,
    ];
};

// HELPERS

const kebabCaseTransform = (text: string) => {
    return text.toLowerCase().split(' ').join('-');
};

export default CreateRole;
