// components/positionList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPositions } from "../redux/actions/positionSlice";
import { Tree } from "react-tree-graph";
import "react-tree-graph/dist/style.css";

const PositionList = () => {
  const dispatch = useDispatch();
  const [treeData, setTreeData] = useState(null);
  const positions = useSelector((state) => state.position.data);

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);
  useEffect(() => {
    if (positions != null) {
      const rootpostions = positions.organization_hierarchy.filter(position => position.parentId === null);
      const formattedTreeData = rootpostions.map(rootposition => formatTreeData(rootposition));
      setTreeData(formattedTreeData);
    }
  }, [positions]);

 
  const formatTreeData = (position) => {
    const children = positions.organization_hierarchy.filter(
      (childposition) => childposition.parentId === position.id
    );
    return {
      name: position.title,
      children: children.map((child) => formatTreeData(child)),
    };
  };

  return (
    <div>
      <h2>position Tree</h2>
      {treeData && (
        <Tree
          data={treeData}
          height={400}
          width={600}
          svgProps={{
            className: "custom-tree",
          }}
          nodeRadius={15}
          margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
        />
      )}
    </div>
  );
};

export default PositionList;
