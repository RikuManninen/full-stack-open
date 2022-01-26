import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {

  const dispatch = useDispatch()

  return <p>filter <input onChange={e => dispatch(filterChange(e.target.value))}/></p>
}

export default Filter