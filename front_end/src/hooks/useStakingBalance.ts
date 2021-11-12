import TokenFarm from "../chain-info/contracts/TokenFarm.json";
import networkMapping from "../chain-info/deployments/map.json";
import { constants, utils } from "ethers";

import { useEthers, useContractCall } from "@usedapp/core";

export const useStakingBalance = (tokenAddress: string) => {
  const { account, chainId } = useEthers();
  const { abi } = TokenFarm;
  const tokenFarmContractAddress = chainId
    ? networkMapping[String(chainId)]["TokenFarm"][0]
    : constants.AddressZero;
  const tokenFarmInterface = new utils.Interface(abi);

  const [stakingBalance] =
    useContractCall({
      abi: tokenFarmInterface,
      address: tokenFarmContractAddress,
      method: "stakingBalance",
      args: [tokenAddress, account],
    }) ?? [];
  return stakingBalance;
};
