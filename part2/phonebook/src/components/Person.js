import React from "react";

const Person = ({person, remove}) => {
  return <p>{person.name} {person.number} <button onClick={() => remove(person)}>delete</button></p>
}

export default Person