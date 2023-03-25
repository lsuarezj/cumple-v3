import { Button } from "@mui/material";
import * as strings from "BirthdaysWebPartStrings";
import * as React from "react";

const EmailButton = (props: { userEmail: any; children: any }) => {
  const { userEmail, children } = props;
  const handleClick = () => {
    const mailtoLink = `mailto:${userEmail}?subject=${encodeURIComponent(
      strings.messageSubject
    )}`;
    console.log(mailtoLink);
    window.open(mailtoLink, "_blank");
  };

  return (
    <Button
      style={{ color: "#FFF" }}
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
