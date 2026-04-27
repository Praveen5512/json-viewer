import { useState } from "react";
import { countKeys } from "./treeUtils";
import FileUploader from "./FileUploader";
import SchemaTree from "./SchemaTree";
import PreviewPanel from "./PreviewPanel";
import 'bootstrap/dist/css/bootstrap.min.css';

function JsonExplorer() {
  const [jsonData, setJsonData] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <div
      className="container-fluid p-3"
      style={{
        background: "#0d0f11",
        minHeight: "100vh",
        color: "#ddd"
      }}
    >
      {/* Upload Section */}
      <FileUploader
        onDataLoaded={(data) => {
          setJsonData(data);
          setSelectedNode(null);
        }}
      />

      <div className="row">
        {/* LEFT PANEL — SCHEMA */}
        <div
          className="col-5 p-0"
          style={{
            height: "78vh",
            background: "#111",
            border: "1px solid #222"
          }}
        >
          <div
            className="p-3 border-bottom"
            style={{
              borderColor: "#222"
            }}
          >
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "2px",
                color: "#777"
              }}
            >
              SCHEMA
            </div>

            <input
              className="form-control mt-2"
              placeholder="search fields..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: "#1b1b1b",
                border: "1px solid #333",
                color: "#fff"
              }}
            />
          </div>

          <div
            style={{
              height: "calc(100% - 120px)",
              overflowY: "auto",
              padding: "12px"
            }}
          >
            {jsonData && (
              <SchemaTree
                data={jsonData}
                search={search}
                onSelect={setSelectedNode}
              />
            )}
          </div>

          {jsonData && (
            <div
              className="p-2 border-top"
              style={{
                fontSize: "12px",
                color: "#777",
                borderColor: "#222"
              }}
            >
              keys {countKeys(jsonData)}
            </div>
          )}
        </div>

        {/* RIGHT PANEL — PREVIEW */}
        <div
          className="col-7 p-0"
          style={{
            height: "78vh",
            background: "#090909",
            border: "1px solid #222"
          }}
        >
          <div
            className="p-3 border-bottom"
            style={{
              fontSize: "11px",
              letterSpacing: "2px",
              color: "#777",
              borderColor: "#222"
            }}
          >
            DATA INSPECTOR
          </div>

          <div
            style={{
              padding: "30px",
              height: "90%",
              overflow: "auto"
            }}
          >
            {selectedNode ? (
              <PreviewPanel node={selectedNode} />
            ) : (
              <div style={{ color: "#555" }}>
                Select a schema node
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JsonExplorer;