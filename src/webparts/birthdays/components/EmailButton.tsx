import { Button } from "@mui/material";
import * as React from "react";

const EmailButton = (props: {
  userEmail: any;
  linkToSendMessage: string;
  children: any;
}) => {
  const { children, linkToSendMessage } = props;
  const handleClick = () => {
    const mailtoLink = linkToSendMessage;
    window.open(mailtoLink, "_blank");
  };

  return (
    <Button
      sx={{
        color: "#FFF",
        textTransform: "none",
        justifyContent: "center",
        textAlign: "center",
      }}
      size="small"
      onClick={() => {
        handleClick();
      }}
    >
      {children}
    </Button>
  );
};

export default EmailButton;
