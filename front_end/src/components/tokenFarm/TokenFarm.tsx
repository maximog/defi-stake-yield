import { Box, Tab } from "@material-ui/core";
import { Token } from "../Main";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Unstake } from "./Unstake";
import { useEthers } from "@usedapp/core";

interface TokenFarmProps {
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

export const TokenFarm = ({ supportedTokens }: TokenFarmProps) => {
  const classes = useStyles();
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTokenIndex(parseInt(newValue));
  };

  const { account } = useEthers();
  const isConnected = account !== undefined;

  return (
    <Box>
      <h1 className={classes.header}>Token Farm</h1>
      <Box className={classes.box}>
        <div>
          {isConnected ? (
            <TabContext value={selectedTokenIndex.toString()}>
              <TabList onChange={handleChange} aria-label="unstake token tabs">
                {supportedTokens.map((token, index) => {
                  return <Tab label={token.name} value={index.toString()} key={index} />;
                })}
              </TabList>
              {supportedTokens.map((token, index) => {
                return (
                  <TabPanel value={index.toString()} key={index}>
                    <div className={classes.tabContent}>
                      <Unstake token={supportedTokens[selectedTokenIndex]} />
                    </div>
                  </TabPanel>
                );
              })}
            </TabContext>
          ) : (
            <div style={{ padding: "20px" }}>You need to connect your Metamask Wallet first</div>
          )}
        </div>
      </Box>
    </Box>
  );
};
