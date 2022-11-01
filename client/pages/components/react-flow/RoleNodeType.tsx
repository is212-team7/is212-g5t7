import { Text } from '@geist-ui/core';
import { FC, memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

const RoleNode: FC<NodeProps> = ({ data }) => {
    return (
        <>
            <div>
                <Text font="14px">ROLE</Text>
                <Text>{data.label}</Text>
            </div>
        </>
    );
};

export default memo(RoleNode);
