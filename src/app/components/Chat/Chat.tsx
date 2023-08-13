import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useStyles } from "./Chat.styles";
import {
  Send as SendIcon,
  Logout as LogOutIcon,
  Login as LoginIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";
import { ModalSetName } from "../ModalSetName";
import { Message, MessageType } from "app/components/Chat/components";

export const Chat = () => {
  const { classes } = useStyles();

  const [connecting, setConnecting] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const socket = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [members, setMembers] = useState([]);
  const [chatRows, setChatRows] = useState<
    { type: MessageType; message: string }[]
  >([]);

  const handleSetName = useCallback((name: string) => {
    if (name) {
      socket.current?.send(JSON.stringify({ action: "setName", name }));
      setIsConnected(true);
      setConnecting(false);
    }
  }, []);

  const onSocketOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onSocketClose = useCallback(() => {
    setMembers([]);
    setIsConnected(false);
    setChatRows([]);
  }, []);

  const onSocketMessage = useCallback((dataStr: string) => {
    const data = JSON.parse(dataStr);
    if (data.members) {
      setMembers(data.members);
    } else if (data.publicMessage) {
      setChatRows((oldArray) => [
        ...oldArray,
        { ...data.publicMessage, type: MessageType.Public },
      ]);
    } else if (data.privateMessage) {
      setChatRows((oldArray) => [
        ...oldArray,
        { ...data.privateMessage, type: MessageType.Private },
      ]);
    } else if (data.systemMessage) {
      setChatRows((oldArray) => [
        ...oldArray,
        { message: data.systemMessage, type: MessageType.System },
      ]);
    }
  }, []);

  const onConnect = useCallback(() => {
    setConnecting(true);
    if (socket.current?.readyState !== WebSocket.OPEN) {
      socket.current = new WebSocket(import.meta.env.VITE_URL);
      socket.current.addEventListener("open", onSocketOpen);
      socket.current.addEventListener("close", onSocketClose);
      socket.current.addEventListener("message", (event) => {
        onSocketMessage(event.data);
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      socket.current?.close();
    };
  }, []);

  const onSendPrivateMessage = useCallback((to: string) => {
    const message = prompt("Enter private message for " + to);
    socket.current?.send(
      JSON.stringify({
        action: "sendPrivate",
        message,
        to,
      }),
    );
  }, []);

  const onSendPublicMessage = useCallback(() => {
    socket.current?.send(
      JSON.stringify({
        action: "sendPublic",
        message,
      }),
    );
    setMessage("");
  }, [message]);

  const onDisconnect = useCallback(() => {
    if (isConnected) {
      socket.current?.close();
    }
  }, [isConnected]);

  const handleClose = useCallback(() => {
    setOpen(false);
    onDisconnect();
  }, []);

  return (
    <>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <Grid item xs={12} p={1}>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h6">Users</Typography>
              </Grid>
              <Grid
                item
                xs={6}
                display="flex"
                justifyContent="right"
                alignItems="center"
              >
                {isConnected ? (
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<CircleIcon sx={{ color: "#00da00" }} />}
                    endIcon={<LogOutIcon />}
                    onClick={onDisconnect}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<CircleIcon sx={{ color: "red" }} />}
                    endIcon={<LoginIcon />}
                    onClick={onConnect}
                    disabled={open || connecting}
                  >
                    Connect
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <List>
            {members.map((member) => (
              <ListItem key={member}>
                <ListItemAvatar>
                  <Avatar alt={member} />
                </ListItemAvatar>
                <ListItemText primary={member}>{member}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            {chatRows.map((data) => (
              <Message {...data} />
            ))}
          </List>
          <Divider />
          <Grid container style={{ padding: "20px", height: "100px" }}>
            <Grid
              item
              xs={10}
              display="flex"
              justifyContent="left"
              alignItems="center"
            >
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                size="small"
                disabled={!isConnected}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              justifyContent="right"
              alignItems="center"
            >
              <Button
                disabled={!isConnected || message.length < 5}
                variant="contained"
                endIcon={<SendIcon />}
                onClick={onSendPublicMessage}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ModalSetName
        onSetValue={handleSetName}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};
