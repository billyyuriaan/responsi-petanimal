import AdoptionABI from '../../../blockchain/build/contracts/Adoption.json'
import AnimalABI from '../../../blockchain/build/contracts/Animal.json'
import Web3 from "web3";

const AdoptionContract = () => {
    const web3 = new Web3(window.ethereum)
    const address = "0x8f1A6eBD055403e55A42d41eF08ABaC135B9AF46"
    const contract = new web3.eth.Contract(AdoptionABI.abi, address);


    return contract;
}

const AnimalContract = () => {
    const web3 = new Web3(window.ethereum)
    const address = "0xEDD9404cE937a9C61aaC445376F1C40AD539B410"
    const contract = new web3.eth.Contract(AnimalABI.abi, address)

    return contract;
}

export { AdoptionContract, AnimalContract }