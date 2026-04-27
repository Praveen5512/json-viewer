import { useState, useRef } from "react";

function FileUploader({ onDataLoaded }) {
  const fileInputRef = useRef();

  const [fileName, setFileName] = useState("");
  const [extension, setExtension] = useState("");
  const [fileSize, setFileSize] = useState({
    value: "",
    unit: ""
  });

  const formatFileSize = (bytes) => {
    if (bytes > 1000000000) {
      return {
        value: bytes / 1000000000,
        unit: "GB"
      };
    }

    if (bytes > 1000000) {
      return {
        value: bytes / 1000000,
        unit: "MB"
      };
    }

    return {
      value: bytes / 1000,
      unit: "KB"
    };
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const nameWithoutExt =
        file.name.split(".")[0];

      const ext =
        file.name.split(".").pop();

      const size =
        formatFileSize(file.size);

      const text =
        await file.text();

      const parsedJson =
        JSON.parse(text);

      setFileName(nameWithoutExt);
      setExtension(ext);
      setFileSize(size);

      onDataLoaded(parsedJson);

    } catch (error) {
      alert("Invalid JSON file");
      console.error(error);
    }
  };

  return (
    <div
      className="p-3 rounded mb-4"
      onClick={() =>
        fileInputRef.current.click()
      }
      style={{
        background: "#10160d",
        border: "1px solid #5a7f31",
        cursor: "pointer"
      }}
    >
      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        className="d-none"
        onChange={handleFile}
      />

      <div className="d-flex align-items-center">

        {/* icon */}
        <div className="me-3 fs-2">
          📄
        </div>

        {/* file details */}
        <div className="flex-grow-1">
          {fileName ? (
            <>
              <div>
                {fileName}.{extension}
              </div>

              <small
                style={{
                  color: "#7f9f66"
                }}
              >
                Loaded successfully
              </small>
            </>
          ) : (
            "Upload JSON File"
          )}
        </div>

        {/* type/size */}
        {fileName && (
          <div className="text-end">

            <div
              style={{
                color: "#b5ff6d",
                fontWeight: "bold"
              }}
            >
              JSON
            </div>

            <small>
              {fileSize.value.toFixed(1)}
              {fileSize.unit}
            </small>

          </div>
        )}

      </div>
    </div>
  );
}

export default FileUploader;