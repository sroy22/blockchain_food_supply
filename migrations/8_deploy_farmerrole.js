const FarmerRole = artifacts.require("FarmerRole");

module.exports = function(deployer) {
  deployer.deploy(FarmerRole);
};
