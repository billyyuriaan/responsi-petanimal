import AdoptionABI from '../../../blockchain/build/contracts/Adoption.json'
import AnimalABI from '../../../blockchain/build/contracts/Animal.json'
import Web3 from 'web3'

const AdoptionContract = () => {
    const web3 = new Web3(window.ethereum)
    const addresss = "0x6A940fB63959BAE4fB4B36176a53C726db2B34dc"
    const contract = new web3.eth.Contract(AdoptionABI.abi, addresss)

    return contract
}

const AnimalContract = () => {
    const web3 = new Web3(window.ethereum)
    const addresss = "0x44D2E79eF465c1BFE39905Fef73796cEE0e5c7dF"
    const contract = new web3.eth.Contract(AnimalABI.abi, addresss)

    return contract
}

export {AdoptionContract, AnimalContract}