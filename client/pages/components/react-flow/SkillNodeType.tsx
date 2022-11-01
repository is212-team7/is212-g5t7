import { Text } from '@geist-ui/core';
import { FC, memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

const SkillNode: FC<NodeProps> = ({ data }) => {
    return (
        <>
            <Handle type="target" position={Position.Top} />
            <div>
                <Text font="14px">SKILL</Text>
                <Text>{data.label}</Text>
            </div>
        </>
    );
};

export default memo(SkillNode);
