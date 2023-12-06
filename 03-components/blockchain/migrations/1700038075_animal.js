var Animal = artifacts.require("Animal")

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(Animal)
};
