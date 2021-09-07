import React from 'react'
import Part from './Part'
import Total from './Total'

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(p => 
        <Part key={p.id} part={p} />
      )}
      <Total parts={parts}/>
    </>
  )
}

export default Content