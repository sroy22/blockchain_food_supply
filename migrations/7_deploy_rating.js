const Rating = artifacts.require("Rating");

module.exports = function(deployer) {
  deployer.deploy(Rating);
};
