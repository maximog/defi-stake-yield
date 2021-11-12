import { formatUnits } from "@ethersproject/units";
import { Button, Input, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useEthers, useTokenBalance, useNotifications } from "@usedapp/core";
import { utils } from "ethers";
import React, { useEffect, useState } from "react";
import { useStakeTokens } from "../../hooks/useStakeTokens";
import { Token } from "../Main";

export interface StakeFormProps {
  token: Token;
  amount: number;
  setAmount: Function;
}

export const StakeForm = ({ token, amount, setAmount }: StakeFormProps) => {
  // const [amount, setAmount] = useState<number | string | Array<number | string>>(0);

  const { address: tokenAddress, name } = token;
  const { account } = useEthers();
  const tokenBalance = useTokenBalance(tokenAddress, account);
  const formattedTokenBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0;

  const { approveAndStake, state: approveAndStakeErc20State } = useStakeTokens(tokenAddress);
  const { notifications } = useNotifications();

  const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] = useState(false);
  const [showStakeTokensSuccess, setShowStakeTokensSuccess] = useState(false);

  const handleCloseSnack = () => {
    setShowErc20ApprovalSuccess(false);
    setShowStakeTokensSuccess(false);
  };

  useEffect(() => {
    if (
      notifications.filter(
        (notif) =>
          notif.type === "transactionSucceed" && notif.transactionName === "Approve ERC20 transfer"
      ).length > 0
    ) {
      setShowErc20ApprovalSuccess(true);
      setShowStakeTokensSuccess(false);
    }
    if (
      notifications.filter(
        (notif) => notif.type === "transactionSucceed" && notif.transactionName === "Stake tokens"
      ).length > 0
    ) {
      setShowErc20ApprovalSuccess(false);
      setShowStakeTokensSuccess(true);
    }
  }, [notifications, showErc20ApprovalSuccess, showStakeTokensSuccess]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value === "" ? "" : Number(event.target.value);
    setAmount(newAmount);
  };

  const handleStakeSubmit = () => {
    const amountAsWei = utils.parseEther(amount.toString());
    return approveAndStake(amountAsWei.toString());
  };
  const isMining = approveAndStakeErc20State.status === "Mining";

  return (
    <>
      <div>
        <Input onChange={handleInputChange} value={amount} />
        <Button
          color="primary"
          size="large"
          onClick={handleStakeSubmit}
          disabled={isMining || formattedTokenBalance === 0}
        >
          {isMining ? <CircularProgress size={26} /> : "Stake"}
        </Button>
      </div>
      <Snackbar open={showErc20ApprovalSuccess} autoHideDuration={5000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success">
          ERC-20 token transfer approved! Now approve the 2nd transaction
        </Alert>
      </Snackbar>
      <Snackbar open={showStakeTokensSuccess} autoHideDuration={5000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success">
          Tokens staked!
        </Alert>
      </Snackbar>
    </>
  );
};
