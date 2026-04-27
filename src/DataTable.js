function DataTable({ node }) {

  /* field collection table */
  if (
    node.type === "field_collection"
  ) {

    return (
      <div
        style={{
          maxHeight:"500px",
          overflow:"auto"
        }}
      >

        <table
          className="table table-dark table-hover table-sm"
          style={{
            marginBottom:0
          }}
        >

          <thead
            style={{
              position:"sticky",
              top:0
            }}
          >
            <tr>
              <th>#</th>
              <th>Value</th>
            </tr>
          </thead>

          <tbody>

            {
              node.values.map(
                (
                  value,
                  index
                ) => (
                  <tr key={index}>
                    <td>
                      {index + 1}
                    </td>

                    <td
                      style={{
                        wordBreak:"break-all"
                      }}
                    >
                      {
                        String(value)
                      }
                    </td>

                  </tr>
                )
              )
            }

          </tbody>

        </table>

      </div>
    );
  }



  /* object-array table */
  if (
      node.type==="array"
      &&
      Array.isArray(node.data)
      &&
      typeof node.data[0]
        === "object"
  ) {

    const rows =
      node.data.slice(
        0,
        20
      );

    const columns =
      Object.keys(
        rows[0] || {}
      );

    return (
      <div
        style={{
          overflow:"auto"
        }}
      >

        <table
          className="table table-dark table-hover table-sm"
        >

          <thead>
            <tr>

              {
                columns.map(
                  col => (
                    <th key={col}>
                      {col}
                    </th>
                  )
                )
              }

            </tr>
          </thead>

          <tbody>

            {
              rows.map(
                (
                  row,
                  i
                ) => (
                  <tr key={i}>

                    {
                      columns.map(
                        col => (
                          <td key={col}>
                            {
                              String(
                                row[col]
                              )
                            }
                          </td>
                        )
                      )
                    }

                  </tr>
                )
              )
            }

          </tbody>

        </table>

      </div>
    )

  }


  return (
    <div style={{
      color:"#666"
    }}>
      No table view available
    </div>
  );

}

export default DataTable;