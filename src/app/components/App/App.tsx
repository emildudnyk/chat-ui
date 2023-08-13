import React from "react";

import { Container } from "@mui/material";
import { useStyles } from "./App.styles";
import { Chat } from "../Chat";

export const App = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root} fixed={true}>
      <Chat />
    </Container>
  );
};
