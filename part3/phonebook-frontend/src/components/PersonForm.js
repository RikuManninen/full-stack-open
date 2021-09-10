import React from "react"

const PersonForm = ({action, nameValue, nameHandler, numberValue, numberHandler}) => {
  return (
    <form onSubmit={action}>
      <div>
        name: <input 
          value={nameValue}
          onChange={nameHandler} 
        />
      </div>
      <div>
        number: <input 
          value={numberValue}
          onChange={numberHandler} 
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm