import React from 'react'
import { connect } from 'react-redux'

const ContractABI = ({ abi }) => (
    <select>
     { abi.map(current => (
         <option key={current.name}>{current.name}</option>
      ))}
  </select>
// {/* <div>
// {console.log(abi)
// }
// </div> */}
)

const mapStateToProps = state => ({
  abi: state.contracts.MetaCoin.abi
})

export default connect(
  mapStateToProps
)(ContractABI)
