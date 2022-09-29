import { Button, Input, Link, Page, Select, Spacer } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useState } from 'react';
import { skills } from './database/skills';

const CreateRole: NextPage = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  return (
    <Page>
      <Page.Content>
        <h2>Create a Role</h2>

        <Spacer h={2} />

        <Input placeholder="Role Name">Role Name</Input>
        <Spacer />
        <Select
          placeholder="Skills"
          multiple
          width="350px"
          value={selectedSkills}
          onChange={(val) => {
            if (!Array.isArray(val)) {
              setSelectedSkills([val]);
            } else {
              setSelectedSkills(val);
            }
          }}
        >
          {Object.entries(skills).map(([label, skills]) =>
            genSkillSelectGroup(label, skills)
          )}
        </Select>

        <Spacer h={5} />

        {/* TODO: Add view roles link */}
        <Link href="/">
          <Button type="secondary">Add role</Button>
        </Link>
      </Page.Content>
    </Page>
  );
};

// SUB-COMPONENTS

type genSkillSelectGroupType = (
  label: string,
  skills: string[]
) => React.ReactNode[];

const genSkillSelectGroup: genSkillSelectGroupType = (label, skills) => {
  const options = skills.map((skill) => (
    <Select.Option key={kebabCaseTransform(skill)} value={skill}>
      {skill}
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
