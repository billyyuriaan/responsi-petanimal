import { useRef } from 'react'
import ReactModal from 'react-modal'
import { AnimalContract } from '../utils'

const AddAnimals = ({ isOpen, setIsOpen, account, getAllPets }) => {
    const animalName = useRef()
    const animalType = useRef()
    const contract = AnimalContract()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = animalName.current.value;
        const type = animalType.current.value;

        try {
            const gas = await contract.methods.addAnimal(name, type).estimateGas();
            const res = await contract.methods.addAnimal(name, type).send({from : String(account[0]), gas : gas})

            console.log(res);
            getAllPets()
        } catch (error) {
            console.error(error);
        }
    }

    const handelClose = (e) => {
        e.preventDefault()
        setIsOpen(false)
    }

    return (
        <ReactModal isOpen={isOpen}>
            <h1 className='text-center'>Add Animal</h1>
            <hr /><br />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Pet Name</label>
                    <input type="text" ref={animalName} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <select className="form-select" ref={animalType} aria-label="Default select example">
                        <option selected>Silahkan Pilih</option>
                        <option value="cat.jpeg">Kucing</option>
                        <option value="dog.jpeg">Anjing</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{marginRight : "10px"}}>Submit</button>
                <button className='btn btn-primary' onClick={handelClose}>close</button>
            </form>
        </ReactModal>
    )
}

export default AddAnimals