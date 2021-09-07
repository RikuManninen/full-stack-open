import React from 'react'

const Total = ({ parts }) => {
  const total = parts.reduce((a, v) => a + v.exercises, 0)
  return <b>total of {total} exercises</b>
}

export default Total