import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPositions } from "../redux/actions/positionSlice";
import { Button, Group, Modal, Dialog, Text, TextInput } from "@mantine/core";
import { IconTrash, IconView360, IconPlus } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import { closeModal } from "@mantine/modals";
import { useNavigate } from "react-router";
import { Tree, TreeNode } from "react-organizational-chart";
import { ActionIcon } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';


function PostionTree() {
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.position.data);
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  useEffect(() => {
    if (positions) {
      setTreeData(buildTree(positions.organization_hierarchy));
    }
  }, [positions]);

  const navigate = useNavigate();
  const [hoveredNode, setHoveredNode] = useState(null);
  const [
    openeAddChildModal,
    { open: openAddChildModal, close: closeAddChildModal },
  ] = useDisclosure();
  const [
    openDeleteDialog,
    { toggle: toggleDeleteDialog, close: closeDeleteDialog },
  ] = useDisclosure();

  const handleNodeHover = (label) => {
    setHoveredNode(label);
  };

  const handleNodeLeave = () => {
    setHoveredNode(null);
  };
  const addHandler = (e) => {
    openAddChildModal();
    e.preventDefault();
  };
  const deleteHandler = (e) => {
    toggleDeleteDialog();
    e.preventDefault();
  };
  const viewDetailHandler = (e) => {
    e.preventDefault();
    navigate("/detail");
  };
  const renderActionsButtons = (label) => {
    if (hoveredNode === label) {
      return (
        <Group className="flex flex-row gap-0 min-w-40">
          <ActionIcon variant="outline" size="xs" onClick={viewDetailHandler}>
          <IconView360 size={10} />
    </ActionIcon>
          
          <ActionIcon variant="outline" size="xs" onClick={addHandler}>
            <IconPlus />
          </ActionIcon>
          <ActionIcon variant="outline" size="xs" onClick={deleteHandler}>
            <IconTrash />
         </ActionIcon>
        </Group>
      );
    }
    return null;
  };

  function buildTree(nodes) {
    const tree = {};
  
    nodes.forEach((node) => {
      if (!tree[node.parentId]) {
        tree[node.parentId] = { children: [] };
      }
  
      const newNode = {
        id: node.id,
        name: node.name,
        description: node.description,
        children: [],
      };
  
      tree[node.parentId].children.push(newNode);
      tree[node.id] = newNode;
    });
  
    return tree[0].children;
  }
  const TreeChildNode = ({ node }) => (
    <div className="flex flex-col w-full">
      <div   className='flex justify-center  card shadow-sm hover:text-green-600 hover:font-bold border-green-600 text-2xl hover:bg-green-400 '
 onMouseEnter={() => handleNodeHover(node.name)}
  onMouseLeave={handleNodeLeave} ><span className="flex justify-end"> {renderActionsButtons(node.name)}</span> {node.name}   </div>
  
      {node.children && node.children.length > 0 && (
        <div className="flex flex-row">
          {node.children.map((child) => (
            <TreeNode className="" centered key={String(child.id)} node={child}  label={<div className=""><TreeChildNode node={child} /></div> } />
              
             
          ))}
        </div>
      )}
    </div>
  );
  
  
  
  const CustomTree = ({ tree }) => (
    <Tree
    lineColor={"green"}
    lineWidth="2px"
    lineBorderRadius="10px"
    lineHeight="20px"
      label={tree.map((node) => ( // <div className="flex flex-col justify-center m-10 ml-80">
        <TreeChildNode key={node.id} node={node} />
      ))}
    > 
   </Tree>
  );

  return (
    <>
    <CustomTree tree={treeData} />
      

      <Modal
        opened={openeAddChildModal}
        onClose={closeAddChildModal}
        title="Add child position"
        centered
      >
        <TextInput label="Name" placeholder="Child position's name" />
        <TextInput label="Description" placeholder="Description" />
      </Modal>

      <Dialog
        position={{ top: 5, left: 5 }}
        opened={openDeleteDialog}
        onClose={closeDeleteDialog}
        title="Delete Node"
        size="lg"
        radius="md"
      >
        <Text size="m" mb="xs" fw={500}>
          Are you sure?
        </Text>

        <Text size="xs" mb="xs" fw={500}>
          Deleting a parent position will cause the deletion of all children
          positions!
        </Text>
        <Group align="flex-end">
          <Button variant="outline" onClick={closeDeleteDialog}>
            Cancel
          </Button>

          <Button variant="outline" color="blue" onClick={closeDeleteDialog}>
            Delete
          </Button>
        </Group>
      </Dialog>
    </>
  );
}

export default PostionTree;

{
  /* <Tree
        lineWidth={"2px"}
        lineColor={"green"}
        lineBorderRadius={"10px"}
        label={
          <div
            className="card shadow-sm hover:text-green-600 hover:font-bold border-green-600 flex justify-center"
            onMouseEnter={() => handleNodeHover("CEO")}
            onMouseLeave={handleNodeLeave}
          >
            CEO
            <span className=""> {renderActionsButtons("CEO")}</span>
          </div>
        }
      >
        <TreeNode label={"CTO"}>
          <TreeNode label={"Project Manager"}>
            <TreeNode label={"Product Owner"}>
              <TreeNode label={"Tech Lead"}>
                <TreeNode label={"Frontend developer"}>
                  {renderActionsButtons("Frontend developer")}
                </TreeNode>
                <TreeNode label={"Backend Developer"}>
                  {renderActionsButtons("Backend Developer")}
                </TreeNode>
                <TreeNode label={"Devops engineer"}>
                  {renderActionsButtons("Devops engineer")}
                </TreeNode>
              </TreeNode>
              <TreeNode label={"QA Engineer"}>
                {renderActionsButtons("QA Engineer")}
              </TreeNode>
              <TreeNode label={"Scrum Master"}>
                {renderActionsButtons("Scrum Master")}
              </TreeNode>
            </TreeNode>
          </TreeNode>
        </TreeNode>

        <TreeNode label={"CFO"}>
          <TreeNode label={"Chef Accountant"}>
            <TreeNode label={"Financial Analyst"}>
              {renderActionsButtons("Financial Analyst")}
            </TreeNode>
            <TreeNode label={"Account and payable"}>
              {renderActionsButtons("Account and payable")}
            </TreeNode>
          </TreeNode>
          <TreeNode label={"Internal Audit"}>
            {renderActionsButtons("Internal Audit")}
          </TreeNode>
        </TreeNode>

        <TreeNode label={"COO"}>
          <TreeNode label={<>Product Manager</>}>
            {renderActionsButtons("Product Manager")}
          </TreeNode>
          <TreeNode label={<>Operation Manager</>}>
            {renderActionsButtons("Operation Manager")}
          </TreeNode>
          <TreeNode label={<>Customer Relation</>}>
            {renderActionsButtons("Customer Relation")}
          </TreeNode>
        </TreeNode>

        <TreeNode label={"HR"}>
          <TreeNode label={<>Grand Child 1</>}>
            {renderActionsButtons("Grand Child 1")}
          </TreeNode>
          <TreeNode label={<>Grand Child 2</>}>
            {renderActionsButtons("Grand Child 2")}
          </TreeNode>
        </TreeNode>
      </Tree>
       */
}
