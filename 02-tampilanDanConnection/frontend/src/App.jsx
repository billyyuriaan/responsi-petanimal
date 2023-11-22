import { useState, useEffect } from 'react'
import Web3 from 'web3'
import { AdoptionContract, AnimalContract } from './utils'
import AnimalJSON from '../src/json/animal.json'

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [account, setAccount] = useState("")
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    getConnection()
    setIsLoading(false)
  }, [])

  const getConnection = async (e) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.requestAccounts()
      const ballance = await web3.eth.getBalance(accounts[0])

      setAccount(accounts[0])
      setBalance(ballance)
      setIsConnected(true)
    } else {
      console.log("No Metamask");
    }
  }

  if (isLoading) {
    return (
      <div className="container">
        <div className="row justify-content-center mt-4">
          <div className="spinner-border" role='status'>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-4">
          <h1 className='text-center mb-4'>Animal Adoption</h1>
          {
            isConnected ? (
              <>
                <p>User account : {account}</p>
                <p>Balance : {balance} &</p>
                {
                  AnimalJSON.map((val) => {
                    return (
                      <>
                        <div className="col mt-3 mb-2">
                          <div className="card" style={{width : "18rem"}}>
                            <img className='card-img-top' src={`images/${val.images}`} style={{width : "18rem"}} alt="gambar binatang" />
                            <div className="card-body">
                              <div className="card-title">{val.name}</div>
                              <button className='btn btn-success'>Adopt</button>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })
                }
              </>
            ) :
              (
                <>
                  is not connected
                </>
              )
          }
        </div>
      </div>
    </>
  )
}

export default App
