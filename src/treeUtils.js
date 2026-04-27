/*
 Count total nested keys
*/
export function countKeys(obj) {

  if (
    typeof obj !== "object"
    ||
    obj === null
  ) {
    return 1;
  }

  let total = 0;

  for (let key in obj) {
    total += countKeys(
      obj[key]
    );
  }

  return total;
}



/*
 Detect homogeneous object arrays
*/
export function hasUniformSchema(
  arr
) {

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

}



/*
 Recursive deep search match
*/
export function deepMatch(
  node,
  query
) {

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
        k
         .toLowerCase()
         .includes(query)
        ||
        deepMatch(
          v,
          query
        )
    );

}



/*
 Current node or descendants match search
*/
export function hasMatch(
  name,
  node,
  query
) {

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
         k
          .toLowerCase()
          .includes(query)
         ||
         deepMatch(
           v,
           query
         )
    );

}