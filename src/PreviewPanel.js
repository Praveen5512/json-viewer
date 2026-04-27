import { useState } from "react";
import DataTable from "./DataTable";

function PreviewPanel({ node }) {
  const [format, setFormat] = useState("js");
  const [copied, setCopied] = useState(false);

  const getFormattedOutput = () => {

    if (node.type === "field_collection") {
      const values = node.values;

      switch (format) {
        case "csv":
          return values.join("\n");

        case "lines":
          return values.join("\n");

        case "unique":
          return [...new Set(values)]
            .join("\n");

        case "json":
          return JSON.stringify(
            values,
            null,
            2
          );

        case "table":
          return values.join("\n");

        default:
          return JSON.stringify(values);
      }
    }

    if (node.type === "array") {
      return JSON.stringify(
        node.data.slice(0,5),
        null,
        2
      );
    }

    return JSON.stringify(
      node.data,
      null,
      2
    );
  };


  const handleCopy = async () => {

    try {

      await navigator.clipboard.writeText(
        getFormattedOutput()
      );

      setCopied(true);

      setTimeout(
        () => setCopied(false),
        1200
      );

    } catch {
      alert("Copy failed");
    }

  };


  return (
    <div>

      {/* HEADER */}
      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          marginBottom:"24px"
        }}
      >

        <div>
          <h3
            style={{
              marginBottom:"6px"
            }}
          >
            {node.name}
          </h3>
        </div>


        <div
          style={{
            display:"flex",
            gap:"8px"
          }}
        >

          <select
            value={format}
            onChange={(e)=>
              setFormat(
                e.target.value
              )
            }
            style={{
              background:"#12161c",
              color:"white",
              border:"1px solid #2b3139",
              padding:"10px 14px",
              borderRadius:"12px",
              fontSize:"13px"
            }}
          >

            <option value="js">
              JS
            </option>

            <option value="json">
              JSON
            </option>

            <option value="table">
              Table
            </option>

            <option value="csv">
              CSV
            </option>

            <option value="lines">
              Lines
            </option>

            <option value="unique">
              Unique
            </option>

          </select>


          <button
            onClick={handleCopy}
            style={{
              background:"#12161c",
              color:"white",
              border:"1px solid #2b3139",
              padding:"10px 16px",
              borderRadius:"12px",
              minWidth:"54px"
            }}
          >
            {
              copied
               ? "✓"
               : "⧉"
            }
          </button>

        </div>

      </div>


      {
        node.type==="field_collection"
        &&
        <div
          style={{
            marginBottom:"16px",
            color:"#777"
          }}
        >
          {node.values.length} values
        </div>
      }


      <div
        style={{
          background:"#0f1318",
          border:"1px solid #242932",
          borderRadius:"14px",
          padding:"22px",
          fontFamily:"monospace"
        }}
      >

        {
          format==="table"

          ? (
             <DataTable
               node={node}
             />
            )

          :

          <pre
            style={{
              color:"#9FE870",
              margin:0,
              whiteSpace:"pre-wrap",
              overflowX:"auto"
            }}
          >
            {
              getFormattedOutput()
            }
          </pre>

        }

      </div>

    </div>
  );
}

export default PreviewPanel;