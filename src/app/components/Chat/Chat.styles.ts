import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  table: {
    minWidth: 650,
  },
  chatSection: {
    marginTop: theme.spacing(1),
    width: "100%",
    height: "90vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "calc(100% - 100px)",
    overflowY: "auto",
  },
}));
