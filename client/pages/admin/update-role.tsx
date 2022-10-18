import {
    Button,
    Input,
    Modal,
    Page,
    Spacer,
    Table,
    useModal,
  } from '@geist-ui/core';
  import type { NextPage } from 'next';
  import { useState } from 'react';
  import { roleCategories, RoleCategory } from '../../database/roles';
  
  interface RowData {
    category: string;
    role: string;
    description: string;
  }
  
  const emptyRowData = {
    category: '',
    role: '',
    description: '',
  };
  
  const UpdateRolePage: NextPage = () => {
    const [data, setData] = useState(parseRoleCategories(roleCategories));
  
    // For Modal
    const [updatedValues, setUpdatedValues] = useState<RowData>(emptyRowData);
    const [roleToUpdate, setRoleToUpdate] = useState('');
    const { visible, setVisible, bindings } = useModal();
  
    const showUpdateRoleModal = (value: any, rowData: any) => {
      const updateHandler = () => {
        setVisible(true);
        // naive way of identifying role since there's no ID on client side
        setRoleToUpdate(rowData.role);
      };
      console.log({ value, rowData });
  
      return (
        <Button
          type="secondary"
          auto
          scale={1 / 3}
          font="12px"
          onClick={updateHandler}
        >
          Update
        </Button>
      );
    };
  
    const updateRole = (
      originalRoleLabel: string,
      category: string,
      newRoleLabel: string,
      newDescription: string
    ) => {
      setData((last) =>
        last.map((row) => {
          if (row.role !== originalRoleLabel) return row;
          return { category, role: newRoleLabel, description: newDescription };
        })
      );
    };
  
    const deleteRole = (_1: any, _2: any, index: number) => {
      const removeHandler = () => {
        setData((last) => last.filter((_, dataIndex) => dataIndex !== index));
      };
      return (
        <Button
          type="error"
          auto
          scale={1 / 3}
          font="12px"
          onClick={removeHandler}
        >
          Delete
        </Button>
      );
    };
  
    const resetModal = () => {
      setVisible(false);
      setRoleToUpdate('');
      setUpdatedValues(emptyRowData);
    }
  
    return (
      <Page>
        <Page.Content>
          <h2>Update Role</h2>
          <Table data={data}>
            <Table.Column prop="category" label="category" />
            <Table.Column prop="role" label="role" />
            <Table.Column prop="description" label="description" />
            <Table.Column
              prop="update"
              label="update"
              width={150}
              render={showUpdateRoleModal}
            />
            <Table.Column
              prop="delete"
              label="delete"
              width={150}
              render={deleteRole}
            />
          </Table>
  
          {/* MODAL */}
          <Modal {...bindings}>
            <Modal.Title>Update role</Modal.Title>
            <Modal.Content>
              <Input
                label="Category"
                placeholder="Category"
                value={updatedValues.category}
                onChange={(val) =>
                  setUpdatedValues((curr) => ({
                    ...curr,
                    category: val.target.value,
                  }))
                }
              />
              <Spacer h={0.5} />
              <Input
                label="Role"
                placeholder="Role"
                value={updatedValues.role}
                onChange={(val) =>
                  setUpdatedValues((curr) => ({
                    ...curr,
                    role: val.target.value,
                  }))
                }
              />
              <Spacer h={0.5} />
              <Input
                label="Description"
                placeholder="Description"
                value={updatedValues.description}
                onChange={(val) =>
                  setUpdatedValues((curr) => ({
                    ...curr,
                    description: val.target.value,
                  }))
                }
              />
            </Modal.Content>
            <Modal.Action
              passive
              onClick={resetModal}
            >
              Cancel
            </Modal.Action>
            <Modal.Action
              onClick={() => {
                updateRole(
                  roleToUpdate,
                  updatedValues.category,
                  updatedValues.role,
                  updatedValues.description
                );
                resetModal();
              }}
            >
              Submit
            </Modal.Action>
          </Modal>
        </Page.Content>
      </Page>
    );
  };
  
  // HELPERS
  
  function parseRoleCategories(roleCategories: RoleCategory) {
    const categories = Object.keys(roleCategories);
    let rows = [];
  
    for (let category of categories) {
      for (let role of roleCategories[category]) {
        rows.push({
          category,
          role: role.label,
          description: role.description,
        });
      }
    }
  
    return rows;
  }
  
  export default UpdateRolePage;
  