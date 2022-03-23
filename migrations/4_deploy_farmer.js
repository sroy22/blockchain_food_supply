const FarmExchange = artifacts.require("FarmExchange");

module.exports = function(deployer) {
  deployer.deploy(FarmExchange);
};
