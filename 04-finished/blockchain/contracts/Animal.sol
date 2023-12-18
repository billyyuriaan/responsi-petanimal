// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Animal {
  struct animalData{
    uint id;
    string name;
    string picture;
  }

  animalData[] public animal;
  uint counter_id = 0;

  function addAnimal(string memory _name, string memory _picture) public returns (string memory) {
    animalData memory inData;

    inData.id = counter_id;
    inData.name = _name;
    inData.picture = _picture;

    animal.push(inData);

    counter_id++;

    return _name;
  }

  function getAnimal() public view returns (animalData[] memory) {
    return animal;
  }

  function deleteAnimalById(uint _id) public returns (uint){
    delete animal[_id];

    return _id;
  }
}
