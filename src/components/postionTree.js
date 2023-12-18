import React, { useState, useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { useDispatch, useSelector } from 'react-redux';

import { fetchpositions } from '../redux/actions/positionSlice';
import { Button, Group, Modal, Dialog, Text, TextInput } from '@mantine/core';
import {  IconTrash, IconView360 , IconPlus} from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';
import { closeModal } from '@mantine/modals';
import { useNavigate } from "react-router";


function PostionTree() {
    const dispatch = useDispatch();
    const postions = useSelector(state => state.position);
  
    useEffect(() => {
      dispatch(fetchpositions());
    }, [dispatch]);
    const navigate = useNavigate();
const [hoveredNode, setHoveredNode] = useState(null);
const [openeAddChildModal, { open: openAddChildModal, close: closeAddChildModal }] = useDisclosure();
const [openDeleteDialog, { toggle: toggleDeleteDialog, close: closeDeleteDialog }] = useDisclosure();


const handleNodeHover = (label) => {
  setHoveredNode(label);
};

const handleNodeLeave = () => {
  setHoveredNode(null);
};
const addHandler = (e) => {
  console.log("add");
  openAddChildModal();
  e.preventDefault();
  
}
const deleteHandler = (e) => {
  toggleDeleteDialog();
  console.log("delete");
  e.preventDefault();
  
}
const viewDetailHandler = (e) => {
  console.log("view detail ");
  e.preventDefault();
  navigate('/detail')
  
}
const renderActionsButtons = (label) => {
  if (hoveredNode === label) {
    return (
      <Group>
        <Button variant='outline' size="xs" onClick={viewDetailHandler}><IconView360 /></Button>
        <Button variant="outline"size="xs" onClick={addHandler}><IconPlus/></Button>
        <Button variant="outline"size="xs" onClick={deleteHandler}>
          <IconTrash/>
        </Button>
      </Group>
    );
  }
  return null;
};
  return (
    <>
    
<Tree
lineWidth={'2px'}
lineColor={'green'}
lineBorderRadius={'10px'}

label={
  <div
  className='card shadow-sm hover:text-green-600 hover:font-bold border-green-600 flex justify-center'
  onMouseEnter={() => handleNodeHover('CEO')}
  onMouseLeave={handleNodeLeave}
>
  CEO
<span className=''> {renderActionsButtons('CEO')}</span>         
</div>
}
>
<TreeNode label={"CTO"}>
  <TreeNode label={"Project Manager"}>
    <TreeNode label={"Product Owner"}>
      <TreeNode label={"Tech Lead"}>
        <TreeNode label={"Frontend developer"}>
          {renderActionsButtons('Frontend developer')}
        </TreeNode>
        <TreeNode label={"Backend Developer"}>
          {renderActionsButtons('Backend Developer')}
        </TreeNode>
        <TreeNode label={"Devops engineer"}>
          {renderActionsButtons('Devops engineer')}
        </TreeNode>
      </TreeNode>
      <TreeNode label={"QA Engineer"}>{renderActionsButtons('QA Engineer')}</TreeNode>
      <TreeNode label={"Scrum Master"}>{renderActionsButtons('Scrum Master')}</TreeNode>
    </TreeNode>
  </TreeNode>
</TreeNode>

<TreeNode label={"CFO"}>
  <TreeNode label={"Chef Accountant"}>
    <TreeNode label={"Financial Analyst"}>{renderActionsButtons('Financial Analyst')}</TreeNode>
    <TreeNode label={"Account and payable"}>{renderActionsButtons('Account and payable')}</TreeNode>
  </TreeNode>
  <TreeNode label={"Internal Audit"}>{renderActionsButtons('Internal Audit')}</TreeNode>
</TreeNode>

<TreeNode label={"COO"}>
  <TreeNode label={<>Product Manager</>}>{renderActionsButtons('Product Manager')}</TreeNode>
  <TreeNode label={<>Operation Manager</>}>{renderActionsButtons('Operation Manager')}</TreeNode>
  <TreeNode label={<>Customer Relation</>}>{renderActionsButtons('Customer Relation')}</TreeNode>
</TreeNode>

<TreeNode label={"HR"}>
  <TreeNode label={<>Grand Child 1</>}>{renderActionsButtons('Grand Child 1')}</TreeNode>
  <TreeNode label={<>Grand Child 2</>}>{renderActionsButtons('Grand Child 2')}</TreeNode>
</TreeNode>
</Tree>
<Modal opened={openeAddChildModal} onClose={closeAddChildModal} title="Add child position" centered>
<TextInput
label="Name"
placeholder="child position's name"
/>
<TextInput
label="description"
placeholder="description"
/> 

</Modal>

<Dialog position={{top:5, left: 5}} opened={openDeleteDialog} onClose={closeDeleteDialog} title="Delete Node" size="lg" radius="md">
<Text size="m" mb="xs" fw={500}>
     Are you sure?

</Text>

<Text size="xs" mb="xs" fw={500}>
    Deleting a parent positon will cause deletion of all children postions!

</Text>
<Group align="flex-end">
<Button variant='outline' onClick={closeDeleteDialog}>Cancel</Button>

  <Button variant='outline' color='blue' onClick={closeDeleteDialog}>Delete</Button>
</Group>
</Dialog>
    </>
  )
}

export default PostionTree