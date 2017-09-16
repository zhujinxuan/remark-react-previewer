function gatherDefinitions(node, cache = {}) {
  if (node.type === "definition") {
    cache[node.identifier] = node;
    return cache;
  }
  if (node.children) {
    for (const child of node.children) {
      gatherDefinitions(child, cache);
    }
  }
  return cache;
}
// However, table and list cannot happen
// POI
// Meow~
const outlineParagraphFrom = ["root", "list", "table"];

function normalizeMDAST(tree, parent = null) {
  if (parent && parent.type && outlineParagraphFrom.indexOf(parent.type) > -1) {
    if (tree.type === "paragraph") {
      tree.type = "outlineParagraph";
    }
    return tree;
  }

  if (tree.children) {
    for (let child of tree.children) {
      normalizeMDAST(child, tree);
    }
  }

  return { tree: tree, definitions: gatherDefinitions(tree, {}) };
}

export default normalizeMDAST;
export { normalizeMDAST };
