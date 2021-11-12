import { Box, Tab } from "@material-ui/core";
import { Token } from "../Main";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useState } from "react";
import { WalletBalance } from "./WalletBalance";
import { StakeForm } from "./StakeForm";
import { makeStyles } from "@material-ui/core";

interface YourWalletProps {
  supportedTokens: Array<Token>;
}

const useStyles = makeStyles((theme) => ({
  tabContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),
  },
  box: {
    backgroundColor: "white",
    borderRadius: "25px",
  },
  header: {
    color: "white",
  },
}));

export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
  const classes = useStyles();
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTokenIndex(parseInt(newValue));
    setAmount(0);
  };
  return (
    <Box>
      <h1 className={classes.header}>Your wallet</h1>
      <Box className={classes.box}>
        <TabContext value={selectedTokenIndex.toString()}>
          <TabList onChange={handleChange} aria-label="stake form tabs">
            {supportedTokens.map((token, index) => {
              return <Tab label={token.name} value={index.toString()} key={index} />;
            })}
          </TabList>
          {supportedTokens.map((token, index) => {
            return (
              <TabPanel value={index.toString()} key={index}>
                <div className={classes.tabContent}>
                  <WalletBalance
                    token={supportedTokens[selectedTokenIndex]}
                    setAmount={setAmount}
                  />
                  <StakeForm
                    token={supportedTokens[selectedTokenIndex]}
                    amount={amount}
                    setAmount={setAmount}
                  />
                </div>
              </TabPanel>
            );
          })}
        </TabContext>
      </Box>
    </Box>
  );
};
