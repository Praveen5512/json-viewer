import { useState } from "react";

function TreeNode({
  name,
  data,
  level = 0,
  search,
  onSelect,
  parentCollection = null
}) {

  const [expanded, setExpanded] =
    useState(
      name === "root"
    );

  const query =
    (search || "")
      .toLowerCase();


  const isObject =
    typeof data === "object"
    &&
    data !== null;

  const isArray =
    Array.isArray(data);


  const count =
    isObject
      ? Object.keys(data).length
      : 0;


  const hasUniformSchema = (
    arr
  ) => {

    if (
      !Array.isArray(arr)
      ||
      !arr.length
    ) {
      return false;
    }

    if (
      typeof arr[0]
        !== "object"
      ||
      arr[0] === null
    ) {
      return false;
    }

    const firstSchema =
      Object.keys(
        arr[0]
      )
      .sort()
      .join(",");


    return arr.every(
      item =>
        typeof item === "object"
        &&
        item !== null
        &&
        Object.keys(item)
         .sort()
         .join(",")
         === firstSchema
    );

  };


  const uniformArray =
      isArray
      &&
      hasUniformSchema(
        data
      );


  const deepMatch = (
    node
  ) => {

    if (
      typeof node !== "object"
      ||
      node === null
    ) {
      return false;
    }

    return Object
      .entries(node)
      .some(
        ([k,v]) =>
           k.toLowerCase()
             .includes(query)
           ||
           deepMatch(v)
      );

  };


  const hasMatch = (
    node
  ) => {

    if (!query) {
      return true;
    }

    if (
      name
       .toLowerCase()
       .includes(query)
    ) {
      return true;
    }

    if (
      typeof node !== "object"
      ||
      node === null
    ) {
      return false;
    }

    return Object
      .entries(node)
      .some(
        ([k,v]) =>
          k.toLowerCase()
           .includes(query)
          ||
          deepMatch(v)
      );

  };


  if (
    !hasMatch(data)
  ) {
    return null;
  }


  const autoExpand =
    query.length > 0;

  const open =
    autoExpand || expanded;



  /* uniform array schema */
  if (
    uniformArray
  ) {

    return (
      <div
        style={{
          marginLeft:
            level * 16
        }}
      >

        <div
          onClick={() => {

            setExpanded(
              !expanded
            );

            onSelect({
              type:"array",
              name,
              data
            });

          }}

          style={{
            display:"flex",
            gap:"6px",
            cursor:"pointer",
            padding:"2px 4px",
            fontFamily:
              "monospace"
          }}
        >

          <span>
            {
              open
                ? "▾"
                : "▸"
            }
          </span>

          <span
            style={{
              color:"#58a6ff"
            }}
          >
            {name}
          </span>

          <span
            style={{
              color:"#d946ef"
            }}
          >
            [
              {data.length}
              {" "}records
            ]
          </span>

        </div>


        {
          open &&
          <div
            style={{
              marginLeft:"18px"
            }}
          >

            <TreeNode
              name="schema"
              data={data[0]}
              level={level+1}
              search={search}
              onSelect={onSelect}
              parentCollection={data}
            />

          </div>
        }

      </div>
    );

  }



  return (
    <div
      style={{
        marginLeft:
          level * 16
      }}
    >

      <div

        onClick={() => {

          if (
             isObject
             &&
             !autoExpand
          ) {
            setExpanded(
              !expanded
            );
          }


          /* repeated schema field */
          if (
             !isObject
             &&
             parentCollection
          ) {

            const values =
              parentCollection.map(
                row =>
                  row[name]
              );

            onSelect({
              type:
                "field_collection",
              name,
              values
            });

            return;
          }


          onSelect({
            name,
            data,
            type:
              isObject
               ? "object"
               : "field"
          });

        }}

        style={{
          display:"flex",
          gap:"6px",
          cursor:"pointer",
          fontFamily:
            "monospace",
          padding:"2px 4px"
        }}
      >

        <span
          style={{
            width:"14px"
          }}
        >

          {
            isObject
             ? (
                open
                 ? "▾"
                 : "▸"
               )
             : "•"
          }

        </span>


        <span
          style={{
            color:"#58a6ff"
          }}
        >
          {name}
        </span>


        {
          isObject &&
          <span
            style={{
              color:"#d946ef",
              fontSize:"12px"
            }}
          >
            {"{"}
            {count}
            {"}"}
          </span>
        }

      </div>


      {
        open
        &&
        isObject
        &&
        Object.entries(data)
          .map(
            ([k,v]) => (
              <TreeNode
                key={k}
                name={k}
                data={v}
                level={
                  level + 1
                }
                search={search}
                onSelect={onSelect}
                parentCollection={
                  parentCollection
                }
              />
            )
          )
      }

    </div>
  );

}

export default TreeNode;