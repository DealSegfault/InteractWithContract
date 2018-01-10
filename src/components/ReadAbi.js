import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setFunc } from '../state/constants/actionCreators'
import { abi } from  '../../build/contracts/MetaCoin.json'

const findIndex = (abi, func) => {
  let out = ""
  abi.map((current, index) => {
    if (current.name === func)
      out = index
  })
  return out
}

const sendTransac = () => {

}

class ContractABI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "None",
      index: -1,
      inputs: []
    }
  }
  
  handleClick = () => {
    const current = document.getElementById("list")
    const input = current.options[current.selectedIndex].value
    const index = findIndex(abi, input)
    this.setState({index: index})
    this.setState({inputs: abi[index].inputs})
  }

  render() {
    return (
  <div>
      <select id="list" onChange={() => this.handleClick()}>
      { abi.map((current, index) => {
          if (current.name) {
            return (
              <option key={index}>{current.name}</option>
            )
          }
        })
      }
      </select>
      { this.state.inputs.length > 0 ? <FuncInputs inputs={this.state.inputs} /> : console.log("nope")
      }
      <button onClick={this.sendTransac()}>Action</button>
  </div>)
  }
}

const FuncInputs = (inputs) => (
  <div>
    { 
      inputs.inputs.map(action => (
      <div>
        <p><label>{action.name}: </label></p>
        <input type="text" name={action.type} ></input>
      </div>))
    }
  </div>
)

export default ContractABI