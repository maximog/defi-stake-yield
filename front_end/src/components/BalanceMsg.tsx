import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "inline-grid",
    gridTemplateColumns: "auto auto auto",
    gap: theme.spacing(1),
    alignItems: "center",
  },
  tokenImg: {
    width: "32px",
  },
  amount: {
    fontWeight: 700,
  },
  "amount-clickable": {
    fontWeight: 700,
    "&:hover": {
      color: theme.palette.success,
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
}));

export interface BalanceMsgProps {
  amount: number;
  label: string;
  tokenImgSrc: string;
  setAmount?: Function;
}

export const BalanceMsg = ({ amount, label, tokenImgSrc, setAmount }: BalanceMsgProps) => {
  const classes = useStyles();
  const handleClick = () => {
    setAmount && setAmount(amount);
  };

  return (
    <div className={classes.container}>
      <div>{label}</div>
      {setAmount ? (
        <div className={classes["amount-clickable"]} onClick={handleClick}>
          {amount}
        </div>
      ) : (
        <div className={classes.amount}>{amount}</div>
      )}
      <img className={classes.tokenImg} src={tokenImgSrc} alt="token logo" />
    </div>
  );
};
