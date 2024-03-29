import { useContractFunction, useEthers } from "@usedapp/core";
import TokenFarm from "../chain-info/contracts/TokenFarm.json";
import networkMapping from "../chain-info/deployments/map.json";
import { constants, utils } from "ethers";
import { Contract } from "@usedapp/core/node_modules/@ethersproject/contracts";

export const useUnstakeTokens = () => {
  const { chainId } = useEthers();
  const { abi } = TokenFarm;
  const tokenFarmContractAddress = chainId
    ? networkMapping[String(chainId)]["TokenFarm"][0]
    : constants.AddressZero;
  const tokenFarmInterface = new utils.Interface(abi);
  const tokenFarmContract = new Contract(tokenFarmContractAddress, tokenFarmInterface);

  return useContractFunction(tokenFarmContract, "unstakeTokens", {
    transactionName: "Unstake Tokens",
  });
};
