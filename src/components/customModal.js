import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePosition,
  fetchPositions,
  addPosition,
} from "../redux/actions/positionSlice";
import { Button, Group, Modal, Dialog, Text, TextInput } from "@mantine/core";
import { IconTrash, IconView360, IconPlus } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import { closeModal } from "@mantine/modals";
import { useNavigate } from "react-router";
import { Tree, TreeNode } from "react-organizational-chart";
import { ActionIcon } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";

function CustomModal (){
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const dispatch = useDispatch();
    const [
        openeAddChildModal,
        { open: openAddChildModal, close: closeAddChildModal },
      ] = useDisclosure();
    const addPositionHandler = async () => {
        console.log("adddd");
        try {
          if (selectedNodeId) {
            const postionData = {
              parentId: 1,
              description: "tesstttt",
              name: "HR",
            };
            // Dispatch the deletePosition async thunk with the selectedNodeId
            await dispatch(addPosition(postionData));
    
            // Optionally, you can close the delete dialog after successful deletion
            closeAddChildModal();
          } else {
            console.error("No parent node identified");
          }
        } catch (error) {
          // Handle errors if needed
          console.error("Error adding  position:", error);
        }
      };
   return (
     <>
        <Modal
        opened={openeAddChildModal}
        onClose={closeAddChildModal}
        title="Add child position"
        centered
      >
        <TextInput label="Parent" placeholder="Child position's name" />

        <TextInput label="Name" placeholder="Child position's name" />
        <TextInput label="Description" placeholder="Description" />
        <Group>
          <Button variant="outlined" type="cancel" onClick={addPositionHandler}>
            submit
          </Button>
          <Button variant="outlined" type="cancel">
            Cancel
          </Button>
        </Group>
      </Modal>
     </>
   );
}

export default CustomModal;