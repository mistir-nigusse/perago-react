import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePosition,
  fetchPositionDetail,
} from "../redux/actions/positionSlice";
import {
  Card,
  Text,
  Avatar,
  ActionIcon,
  Modal,
  TextInput,
  Button,
  Group,
} from "@mantine/core";
import { IconEdit, IconView360, IconPlus } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";

const Detail = () => {
  const dispatch = useDispatch();
  const position = useSelector((state) => state.position.data);
  const [positionName, setPositionName] = useState("");
  const [positionDescription, setPositionDescription] = useState("");
  const [positionParent, setPositionParent] = useState("");

  useEffect(() => {
    dispatch(fetchPositionDetail(3));
  }, [dispatch]);
  const [openEditModal, { open: toggleEditModal, close: closeEditModal }] =
    useDisclosure();

  const editHandler = () => {
    toggleEditModal();
  };

  const editPositionHandler = async () => {
    console.log("edittttt");
    try {
      const id = position.organization_hierarchy[0].id;

      const updatedPositionData = {positionId:1, parentId:0, name:"again", description:"workidnfg"}
            // name : positionName,
        // parentId : positionParent,
        // description :positionDescription
      

      await dispatch(updatePosition( updatedPositionData));
      closeEditModal();
    } catch (error) {
      console.log("Error updating position", error);
    }
  };

  if (position != null) {
    console.log(position);
    return (
      <>
        <Card shadow="l" padding="xl">
          <div className="flex justify-items-end flex-row ">
            <Card.Section>
              <Avatar size={"xl"} variant="filled" radius="sm" src="" />
              <Text fw={500} size="lg" mt="md">
                <h1>{position.organization_hierarchy[0].name}</h1>
              </Text>

              <Text mt="xs" c="dimmed" size="sm">
                <h4>{position.organization_hierarchy[0].description}</h4>
              </Text>
            </Card.Section>
            <ActionIcon variant="outline" size="xs" onClick={editHandler}>
              <IconEdit />
            </ActionIcon>
          </div>
        </Card>

        <Modal
          opened={openEditModal}
          onClose={closeEditModal}
          title="Add child position"
          centered
        >
          <TextInput
            label="ParentId"
            placeholder="new parent id"
            value={positionParent}
            onChange={(e) => setPositionParent(e.target.value)}
          />

          <TextInput
            label="Name"
            placeholder="Child position's name"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
          />
          <TextInput
            label="Description"
            placeholder="Description"
            value={positionDescription}
            onChange={(e) => setPositionDescription(e.target.value)}
          />
          <Group>
            <Button
              variant="outlined"
              type="cancel"
              onClick={editPositionHandler}
            >
              submit
            </Button>
            <Button variant="outlined" type="cancel">
              Cancel
            </Button>
          </Group>
        </Modal>
      </>
    );
  } else {
    return <>emtyyyy</>;
  }
};

export default Detail;
