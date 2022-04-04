const ProcessorRole = artifacts.require("ProcessorRole");

module.exports = function(deployer) {
  deployer.deploy(ProcessorRole);
};
