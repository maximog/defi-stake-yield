import { formatUnits } from "@ethersproject/units";
import { Button, Input, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useEthers, useTokenBalance, useNotifications } from "@usedapp/core";
import { utils } from "ethers";
import React, { useEffect, useState } from "react";
import { useStakeTokens } from "../../hooks/useStakeTokens";
import { useStakingBalance } from "../../hooks/useStakingBalance";
import { useUnstakeTokens } from "../../hooks/useUnstakeTokens";
import { BalanceMsg } from "../BalanceMsg";
import { Token } from "../Main";

export interface UnStakeFormProps {
  token: Token;
}

export const Unstake = ({ token }: UnStakeFormProps) => {
  const { image, address: tokenAddress, name } = token;
  const { notifications } = useNotifications();

  const balance = useStakingBalance(tokenAddress);
  const formattedTokenBalance: number = balance ? parseFloat(formatUnits(balance, 18)) : 0;

  const { send: unstakeTokensSend, state: unstakeTokensState } = useUnstakeTokens();

  const isMining = unstakeTokensState.status === "Mining";

  const handleUnstakeSubmit = () => unstakeTokensSend(tokenAddress);
  const handleCloseSnack = () => {
    showUnstakeSuccess && setShowUnstakeSuccess(false);
  };
  const [showUnstakeSuccess, setShowUnstakeSuccess] = useState(false);

  useEffect(() => {
    if (
      notifications.filter(
        (notif) => notif.type === "transactionSucceed" && notif.transactionName === "Unstake Tokens"
      ).length > 0
    ) {
      !showUnstakeSuccess && setShowUnstakeSuccess(true);
    }
  }, [notifications, showUnstakeSuccess]);

  return (
    <>
      <div>
        <BalanceMsg
          amount={formattedTokenBalance}
          label={`Your unstaked ${name} balance:`}
          tokenImgSrc={image}
        />
        <Button
          color="primary"
          size="large"
          onClick={handleUnstakeSubmit}
          disabled={isMining || formattedTokenBalance === 0}
        >
          {isMining ? <CircularProgress size={26} /> : "Unstake"}
        </Button>
        <Snackbar open={showUnstakeSuccess} autoHideDuration={5000} onClose={handleCloseSnack}>
          <Alert onClose={handleCloseSnack} severity="success">
            Success. Tokens unstaked!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};
