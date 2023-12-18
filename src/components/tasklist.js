// components/positionList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchpositions } from '../redux/actions/positionSlice';
import {Tree} from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';

const PositionList = () => {
  const dispatch = useDispatch();
  const [treeData, setTreeData] = useState(null);
  const positions = useSelector(state => state.positions);

  useEffect(() => {
    dispatch(fetchpositions());
  }, [dispatch]);

  useEffect(() => {
    console.log(positions)
    // if (postions.length > 0) {
    //   const rootpostions = postions.filter(position => position.parentId === null);
    //   const formattedTreeData = rootpostions.map(rootposition => formatTreeData(rootposition));
    //   setTreeData(formattedTreeData);
    // }
  }, [positions]);

  const formatTreeData = position => {
    const children = positions.filter(childposition => childposition.parentId === position.id);
    return {
      name: position.title,
      children: children.map(child => formatTreeData(child)),
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
            className: 'custom-tree',
          }}
          nodeRadius={15}
          margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
        />
      )}
    </div>
  );
};

export default PositionList;
