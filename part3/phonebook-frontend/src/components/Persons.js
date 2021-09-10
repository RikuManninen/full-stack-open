import React from "react";
import Person from "./Person";

const Persons = ({persons, remove}) => {
  return persons.map(person => <Person key={person.name} person={person} remove={remove} />)
}

export default Persons