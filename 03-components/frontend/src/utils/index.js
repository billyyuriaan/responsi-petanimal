import AdoptionABI from '../../../blockchain/build/contracts/Adoption.json'
import AnimalABI from '../../../blockchain/build/contracts/Animal.json'
import Web3 from 'web3'

const AdoptionContract = () => {
    const web3 = new Web3(window.ethereum)
    const addresss = "0xFb78F9954e5763Aa9605E42a98cdd6Ae02699Bca"
    const contract = new web3.eth.Contract(AdoptionABI.abi, addresss)

    return contract
}

const AnimalContract = () => {
    const web3 = new Web3(window.ethereum)
    const addresss = "0xdb70852ac647C5580881085fFb936ABe0C642051"
    const contract = new web3.eth.Contract(AnimalABI.abi, addresss)

    return contract
}

export {AdoptionContract, AnimalContract}