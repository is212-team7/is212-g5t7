import React from "react";
import { useState } from 'react';
import { Card, Divider, Grid, Page, Spacer, Text } from '@geist-ui/core';
import { Skill, skillCategories } from '../database/skills';

const SkillFind: React.FC = () => {
    const skills= [
        {
            role : 'Sales',
            label : 'Product Knowledge',
            description : 'Description is empty',
        },
        {
            role : 'Technology',
            label : 'Web Development',
            description : 'Description is empty',
        }
    ];
    const [skillList, setSkillList] = React.useState<
        { role:string; label:string; description:string; }[] | undefined
    >(skills);
    const [text, setText] = React.useState<string>('');

    const handleOnClick = () => {
        const findSkills = 
            skillList && skillList?.length > 0 
            ? skillList?.filter((s) => s?.role == text)
            : undefined;

            console.log(findSkills);
        setSkillList(findSkills);
    };

    const [selectedSkills, setSelectedSkills] = useState<string[]>([])
    return(
        <div>
            <div className="title">
            <h1>View Skills by Role</h1>
            </div>
            <div className="input_wrapper">
                <input 
                type="text" 
                placeholder="Search Skills" 
                value={text} 
                onChange={(e) => {
                    setText(e.target.value); 
                    setSkillList(skills);
                }}
                />
                <button disabled={!text} onClick={handleOnClick}>Search</button>

            </div>
                <div className="body">

                    {skillList && skillList?.length == 0 &&(
                        <div className="notFound">No Skills Found</div>
                    )}
                {skillList && 
                    skillList?.length>0 && 
                    skillList?.map(role =>{
                    return(
                        <div className="body__item" key={role}>

                            <Card width="600px">
                            <Card.Content>
                                <Text b my={0}>Role: {role?.role}</Text>
                                </Card.Content>
                                <Divider h="1px" my={0} />
                                <Card.Content>
                                <Text>{role?.label}</Text>
                                <Text>{role?.description}</Text>
                            {/* <p>Role: {role?.role}</p>
                            <p>Skill1: {role?.label}</p>
                            <p>Skill: {role?.description}</p> */}
                            </Card.Content>
                            </Card>
                            <Spacer h={2} />

                        </div>
                    )
                })}

                </div>
            
        </div>
    );
};

export default SkillFind;