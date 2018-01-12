import React, { Component } from 'react'
import { connect } from 'react-redux'
import { abi } from  '../../build/contracts/MetaCoin.json'
import * as helpers from '../util/helpers'



class ContractABI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "None",
      index: -1,
      inputs: [],
      address: "0xc6cf6f65acc76c632f8c4478e2d360a5cbd6b2c8"
    }
  }
  
  handleClick = () => {
    const current = document.getElementById("list")
    const input = current.options[current.selectedIndex].value
    const index = helpers.findIndex(abi, input)
    this.setState({index: index})
    this.setState({inputs: abi[index].inputs})
  }

  handleAddress = () => {
    const current = document.getElementById("address")
    const input = current.value
    this.setState({address: input})
  }

  handleSubmit = () => {
    // helpers.callContract(this.state.address, abi, abi[this.state.index], this.state.inputs).then(result => {
    //   console.log(result)
    // })
    let current = ""//document.getElementById("address")
    let input = ""//current.value
    let output = []
    
    this.state.inputs.map((action, index) => {
      current = document.getElementById(action.name)
      input = current.value
      output.push(input) 
    })

    console.log(output)
    console.log(this.state.address, abi[this.state.index].name)
    this.handleAddress()
    helpers.callContract(this.state.address, abi, abi[this.state.index].name, output).then(result => {
      console.log(result)
    })
    //this.props.contracts.address == replace by the content of input id="address"
    //abi current loaded abi
    //current Function to execute
    //params of function 
  }

  render() {

  const functionlist = abi.map((current, index) => {
    if (current.name) {
      return (
        <option key={index}>{current.name}</option>
      )
    }
  })

  const Inputevent = () => {
    if (this.state.inputs.length > 0) {
      return (<div>
        { 
          this.state.inputs.map((action, index) => (
          <div>
            <p><label key={index}>{action.name}: </label></p>
            <input type="text" id={action.name} key={index} name={action.name} ></input>
          </div>))
        }
      </div>)
    }
    return (<div></div>)
  }

  return (
  <div>
      Address of the contract:
      {/* <form onSubmit={this.handleSubmit}>  */}
      <input id="address" name="address" placeholder="0xc6cf6f65acc76c632f8c4478e2d360a5cbd6b2c8"/>
      <select id="list" onChange={() => this.handleClick()}>
        {functionlist}
      </select>      
      <Inputevent />
      <input type='submit' value='Now!' onClick={() => this.handleSubmit()}/>
      {/* </form> */}
  </div>)
  }
}

const mapStateToProps = state => ({
  contracts: state.contracts
})

export default connect(
  mapStateToProps,
)(ContractABI)

