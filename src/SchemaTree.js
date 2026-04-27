import TreeNode from "./TreeNode";


function SchemaTree({
  data,
  search,
  onSelect
}) {
  if (!data) {
    return (
      <div style={{ color: "#555" }}>
        No schema loaded
      </div>
    );
  }

  return (
    <div>
      <TreeNode
        name="root"
        data={data}
        search={search}
        onSelect={onSelect}
      />
    </div>
  );
}

export default SchemaTree;