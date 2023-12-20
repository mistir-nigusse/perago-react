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