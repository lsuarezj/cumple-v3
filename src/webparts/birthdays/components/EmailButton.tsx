import { Button } from "@mui/material";
import * as strings from "BirthdaysWebPartStrings";
import * as React from "react";

const EmailButton = (props: { userEmail: any; children: any }) => {
  const { userEmail, children } = props;
  const handleClick = () => {
    const mailtoLink = `mailto:${userEmail}?subject=${encodeURIComponent(
      strings.messageSubject
    )}`;
    window.location.href = mailtoLink;
  };
  return (
    <Button size="small" onClick={handleClick}>
      {children}
    </Button>
  );
};

export default EmailButton;
