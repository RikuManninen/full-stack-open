import { connect } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = (props) => {
  return <p>filter <input onChange={e => props.filterChange(e.target.value)}/></p>
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  filterChange
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter