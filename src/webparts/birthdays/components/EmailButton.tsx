import { Button } from "@mui/material";
import * as React from "react";

const EmailButton = (props: { userEmail: any; children: any }) => {
  const { children } = props;
  const handleClick = () => {
    const mailtoLink = `https://camaramed.sharepoint.com/sites/Intranet/_layouts/15/listform.aspx?PageType=8&ListId=%7BB18A0AD8-1CA4-4727-959E-F1E54997077A%7D&RootFolder=%2Fsites%2FIntranet%2FLists%2FFelicitaciones&Source=https%3A%2F%2Fcamaramed.sharepoint.com%2Fsites%2FIntranet%2FLists%2FFelicitaciones%2FAllItems.aspx&ContentTypeId=0x0100D8D270E13C017943888798B51869033D`;
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
