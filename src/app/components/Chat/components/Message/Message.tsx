import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

export enum MessageType {
  Public = "Public",
  System = "system",
}

type MessageProps = {
  author?: string;
  time?: string;
  message: string;
  type: MessageType;
};
export const Message = ({ message, author, time, type }: MessageProps) => {
  return (
    <ListItem key="1">
      {type !== MessageType.System && (
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" />
        </ListItemAvatar>
      )}
      <ListItemText
        primary={
          type !== MessageType.System && (
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body1"
                color="text.main"
              >
                {author}
              </Typography>
              {` `}
              <Typography
                component="span"
                variant="body2"
                color="text.primary"
                sx={{ display: "inline" }}
              >
                ({time})
              </Typography>
            </React.Fragment>
          )
        }
        secondary={message}
      />
    </ListItem>
  );
};
