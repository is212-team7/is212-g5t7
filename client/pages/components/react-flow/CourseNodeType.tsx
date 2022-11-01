import { Text } from '@geist-ui/core';
import { FC, memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

const CourseNode: FC<NodeProps> = ({ data }) => {
    return (
        <>
            <Handle type="target" position={Position.Top} />
            <div>
                <Text font="14px">COURSE</Text>
                <Text>{data.label}</Text>
            </div>
        </>
    );
};

export default memo(CourseNode);
