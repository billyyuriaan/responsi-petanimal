import React from 'react'
import { AdoptionContract} from '../utils'

const Animals = ({account, balance, pets, owner, getAllOwnerPet}) => {
  const contract = AdoptionContract()
  const nullVal = "0x0000000000000000000000000000000000000000"

  const handleAdopt = async (e) =>{
    try {
      const gas = await contract.methods.setAdopters(Number(e.target.value)).estimateGas()
      const res = await contract.methods.setAdopters(Number(e.target.value)).send({from : String(account[0])})

      getAllOwnerPet()
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h5 className="text-center">Account : {account[0]}</h5>
      <h5 className="text-center">Account balance : {balance}&</h5>
      <br />
        {
          pets.map((val, id) => {
            if (val.name == "") {
              return (
                <></>
              )
            }

            return (
              <div className="col mt-3 mb-2" key={id}>
                <div className="card" style={{ width: "18rem" }}>
                  <img src={`images/${val.picture}`} className="card-img-top" alt="test" />
                  <div className="card-body">
                    <h5 className="card-title">{val.name}</h5>
                    {
                      (owner[Number(val.id)] == nullVal) ? <button value={val.id} onClick={handleAdopt} className="btn btn-primary">Adopt</button> : <button className='btn btn-success disabled'>Already Owned</button>
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
    </>
  )
}

export default Animals