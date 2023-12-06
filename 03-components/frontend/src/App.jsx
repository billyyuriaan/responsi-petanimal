import { useState, useEffect } from 'react'
import Web3 from 'web3'
import { AdoptionContract, AnimalContract } from './utils'
import AddAnimal from './components/AddAnimal'
import ListAnimal from './components/ListAnimal'
import AnimalJSON from '../src/json/animal.json'

function App() {
  const [pets, setPets] = useState([])
  const [owner, setOwner] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [account, setAccount] = useState("")
  const [balance, setBalance] = useState(0)
  const [addAnimalIsOpen, setAddAnimalIsOpen] = useState(false)
  const [listAnimalIsOpen, setListAnimalIsOpen] = useState(false)
  const adoptionContract = AdoptionContract()
  const animalContract = AnimalContract()

  useEffect(() => {
    getConnection()
    getAllOwner()
    getAllPets()
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

  const getAllPets = async () => {
    try {
      const gas = await animalContract.methods.getAnimal().estimateGas()
      const res = await animalContract.methods.getAnimal().call()
      setPets(res)
    } catch (error) {
      console.log(error);
    }
  }

  const getAllOwner = async () => {
    try {
      const gas = await adoptionContract.methods.getAdopters().estimateGas()
      const res = await adoptionContract.methods.getAdopters().call()
      setOwner(res)
    } catch (error) {
      console.log(error);
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
                <button className='btn btn-success' onClick={(e) => setAddAnimalIsOpen(true)}>add animal</button>
                <button className='btn btn-success' onClick={(e) => setListAnimalIsOpen(true)}>list animal</button>
                <AddAnimal isOpen={addAnimalIsOpen} setIsOpen={setAddAnimalIsOpen} getAllPets={getAllPets} account={account} />
                <ListAnimal isOpen={listAnimalIsOpen} setIsOpen={setListAnimalIsOpen} getAllPets={getAllPets} account={account} pets={pets} />
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
