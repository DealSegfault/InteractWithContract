import web3 from '../util/web3bis'

export const findIndex = (abi, func) => {
    let out = ""
    abi.map((current, index) => {
      if (current.name === func)
        out = index
    })
    return out
}

export const getTokenContract = (address, abi) => {
    return new Promise((resolve, reject) => {
        web3.eth.contract(abi).at(address, (error, contract) => {
                    if (error) {
                        return reject('TokenHelpers - getTokenContract', error)
                    } else if (contract.address) {
                        resolve(contract)
                    }
        })
    })
}

export const watchTokenCreationTransactionHash = ({hash}) => {
    return new Promise((resolve, reject) => {
        web3.eth.getTransactionReceipt(hash, (error, transaction) => {
            if (error) {
                return reject('watchTokenCreationTransactionHash - getTransaction', error)
            }
            return resolve(transaction)
        })
    })
}

export const callContract = (address, abi, currentFunction, params) => {
    return new Promise((resolve, reject) => {
        getEtherAdress().then(coinbase => {
            getTokenContract(address, abi).then(contract => {
                console.log(abi[findIndex(abi, currentFunction)].constant)
                if (abi[findIndex(abi, currentFunction)].constant == true) {
                    contract[currentFunction].call(...params, (error, result) => {
                        if (error) {
                            reject(error)
                        }
                        resolve(result.valueOf())
                    })
                }
               else {
                   console.log(currentFunction, ...params)
                contract[currentFunction].sendTransaction(...params, {from: coinbase}, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result.valueOf())
                })
               }
            })
        })
    })
}

export const getEtherAdress = () => {
    return new Promise((resolve, reject) => {
        web3.eth.getCoinbase((error, result) => {
            resolve(result)
        })
    })
};
