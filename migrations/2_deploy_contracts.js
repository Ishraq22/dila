const DILA = artifacts.require("DILA");


module.exports = function (deployer) {
  deployer.deploy(DILA, { gas: 6500000 });
};
