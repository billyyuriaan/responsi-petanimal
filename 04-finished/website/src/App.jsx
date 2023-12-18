import { useEffect, useState } from 'react'
import Animals from './components/Animals';
import AddAnimals from './components/AddAnimals';
import ListAnimals from './components/ListAnimals';
import Web3 from 'web3';
import { AdoptionContract, AnimalContract } from './utils';
// import './App.css'

function App() {
  const [pets, setPets] = useState([])
  const [owner, setOwner] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [addAnimalsIsOpen, setAddAnimalsIsOpen] = useState(false)
  const [listAnimalIsOpen, setListAnimalIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [account, setAccount] = useState([])
  const [balance, setBalance] = useState(0)
  const adoptionContract = AdoptionContract()
  const animalContract = AnimalContract()

  useEffect(() => {
    document.title = "animal pet care blockchain";
    getConnection()
    getAllPets()
    getAllOwnerPet()
    setIsLoading(false)
  }, [])

  const getConnection = async (e) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.requestAccounts()
      const ballance = await web3.eth.getBalance(accounts[0])

      setAccount(accounts)
      setBalance(ballance)
      setIsConnected(true)

    } else {
      console.log("no metamask");
    }
  }

  const getAllPets = async () => {
    try {
      const gas = await animalContract.methods.getAnimal().estimateGas()
      const res = await animalContract.methods.getAnimal().call()

      // console.log(res);
      setPets(res)
    } catch (error) {
      console.error(error);
    }
  }

  const getAllOwnerPet = async () => {
    try {
      const gas = await adoptionContract.methods.getAdopters().estimateGas()
      const data = await adoptionContract.methods.getAdopters().call()

      setOwner(data)
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) {
    return (
      <div className="container">
        <div className="row justify-content-center mt-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-4">
        <h1 className='text-center mb-4'>Animal Adoption</h1>
        <AddAnimals isOpen={addAnimalsIsOpen} setIsOpen={setAddAnimalsIsOpen} account={account} getAllPets={getAllPets} />
        <ListAnimals isOpen={listAnimalIsOpen} setIsOpen={setListAnimalIsOpen} pets={pets} account={account} getAllOwnerPet={getAllOwnerPet} getAllPets={getAllPets} />
        {
          isConnected ?
            <>
              <div className="col">
                <div className="btn-group">
                  <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    options
                  </button>
                  <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={(e) => { setAddAnimalsIsOpen(true) }}>Add Animals</button></li>
                    <li><button className="dropdown-item" onClick={(e) => { setListAnimalIsOpen(true) }}>Animals List</button></li>
                  </ul>
                </div>
              </div>
              <Animals account={account} balance={balance} pets={pets} owner={owner} getAllOwnerPet={getAllOwnerPet} />
            </>
            :
            <h1 className='text-center text-warning'>Cannot connect to metamask please fix the connection and refresh the page again</h1>
        }
      </div>
    </div>
  )
}

export default App
