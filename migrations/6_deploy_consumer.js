const ConsumerRole = artifacts.require("ConsumerRole");

module.exports = function(deployer) {
  deployer.deploy(ConsumerRole);
};
