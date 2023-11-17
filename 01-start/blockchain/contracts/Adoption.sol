// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;


contract Adoption {
  address[16] Adopt;

  function setAdoption(uint _id) public returns (string memory) {
    Adopt[_id] = msg.sender;

    return "Berhasil Tersimpan Adopsi Binatang";
  }

  function getAdopter(uint _id) public view returns (address) {
    return Adopt[_id];
  }
}
