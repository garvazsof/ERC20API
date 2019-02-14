var Migrations = artifacts.require("./Migrations.sol");
var GestionPuntos = artifacts.require("./GestionPuntos.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(GestionPuntos);
};
