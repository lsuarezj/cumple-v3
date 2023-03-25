import * as React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Tooltip,
} from "@mui/material";
import { IUser } from "../services/IUser";
import * as strings from "BirthdaysWebPartStrings";
import EmailButton from "./EmailButton";
import { DateTime } from "luxon";

const BirthDayCard = ({ user }: { user: IUser }) => {
  const {
    // key,
    userName,
    jobDescription,
    birthday,
    userEmail,
    // message,
    // anniversary,
    userPhoto,
  } = user;

  const [_year, month, day] = birthday.split("-").map((item) => parseInt(item));
  const currentYear = new Date().getFullYear();
  const isToday = new Date().getDate() === day;
  const label = isToday
    ? "Hoy"
    : DateTime.local(currentYear, month, day)
        .setLocale("es")
        .toFormat("dd 'de' MMMM");

  return (
    <Grid item>
      <Card
        style={{
          marginTop: "15px",
          minWidth: " 200px",
          width: "200px",
          minHeight: "190px",
          marginRight: "15px",
          position: "relative",
          textAlign: "center",
          display: "inline-block}",
        }}
      >
        <CardHeader
          style={{ maxWidth: "200px", maxHeight: "200px", overflow: "auto" }}
          avatar={
            <div>
              <svg
                fill="#fff"
                height="30px"
                width="30px"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-145.7 -145.7 761.40 761.40"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                enable-background="new 0 0 470 470"
                stroke="#fff"
              >
                <g
                  id="SVGRepo_bgCarrier"
                  stroke-width="0"
                  transform="translate(0,0), scale(1)"
                >
                  <rect
                    x="-145.7"
                    y="-145.7"
                    width="761.40"
                    height="761.40"
                    rx="380.7"
                    fill="#ff0000"
                    strokeWidth={"0"}
                  ></rect>
                </g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#CCCCCC"
                  stroke-width="9.4"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path d="m462.5,420h-35.876v-142.99c0-0.02 0-30.01 0-30.01 0-26.191-21.309-47.5-47.5-47.5h-116.624v-68.191c0-9.649-7.851-17.5-17.5-17.5h-2.5v-22.5c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v22.5h-2.5c-9.649,0-17.5,7.851-17.5,17.5v68.191h-123.043c-26.191,0-47.5,21.309-47.5,47.5v173h-29.457c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5 7.5,7.5h4.343l4.325,15.137c3.182,11.138 14.748,19.863 26.332,19.863h385c11.584,0 23.15-8.725 26.332-19.862l4.325-15.138h4.343c4.142,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5zm-240-288.691c0-1.355 1.145-2.5 2.5-2.5h20c1.355,0 2.5,1.145 2.5,2.5v68.191h-25v-68.191zm-138.043,83.191h294.667c17.92,0 32.5,14.58 32.5,32.5v23c-13.563,1.819-21.473,8.441-28.555,14.402-7.553,6.357-13.519,11.378-26.396,11.378s-18.842-5.021-26.396-11.378c-8.299-6.985-17.706-14.903-36.055-14.903-18.347,0-27.752,7.917-36.051,14.903-7.552,6.357-13.517,11.378-26.391,11.378-12.875,0-18.839-5.021-26.392-11.378-8.299-6.985-17.705-14.903-36.052-14.903-18.347,0-27.752,7.917-36.051,14.903-4.436,3.734-8.626,7.262-14.052,9.321-2.912,1.105-4.838,3.896-4.838,7.012v51.285c0,4.136-3.364,7.5-7.5,7.5-4.135,0-7.5-3.364-7.5-7.5v-51.039c0.105-3.161-1.803-6.105-4.835-7.256-5.427-2.06-9.618-5.588-14.054-9.323-7.081-5.961-14.989-12.583-28.55-14.402v-23c0.001-17.92 14.58-32.5 32.501-32.5zm-32.5,70.688c8.032,1.574 12.983,5.717 18.89,10.69 3.871,3.258 8.145,6.856 13.55,9.688v46.454c0,12.407 10.093,22.5 22.5,22.5s22.5-10.093 22.5-22.5l.001-46.454c5.404-2.832 9.679-6.43 13.549-9.688 7.552-6.357 13.517-11.378 26.391-11.378 12.875,0 18.84,5.021 26.392,11.378 8.299,6.985 17.705,14.903 36.052,14.903s27.753-7.917 36.051-14.903c7.552-6.357 13.517-11.378 26.391-11.378 12.877,0 18.843,5.021 26.396,11.379 8.299,6.985 17.706,14.902 36.055,14.902s27.755-7.917 36.055-14.902c5.909-4.973 10.861-9.117 18.896-10.691v134.812h-359.669v-134.812zm387.452,160.829c-1.343,4.701-7.02,8.983-11.909,8.983h-385c-4.89,0-10.566-4.282-11.909-8.983l-3.148-11.017h415.114l-3.148,11.017z"></path>{" "}
                    <path d="m205.002,95.547c1.778,0 3.563-0.628 4.993-1.905 3.09-2.759 3.358-7.5 0.6-10.59-5.353-5.995-8.3-13.71-8.3-21.726 0-17.564 13.299-35.9 32.706-45.552 19.407,9.651 32.706,27.987 32.706,45.552 0,8.016-2.948,15.731-8.3,21.726-2.759,3.089-2.491,7.831 0.599,10.589 3.088,2.758 7.83,2.491 10.589-0.599 7.81-8.747 12.111-20.01 12.111-31.716 0-24.235-18.382-49.196-44.702-60.699-1.915-0.837-4.092-0.836-6.007,0-26.32,11.503-44.702,36.463-44.702,60.698 0,11.706 4.301,22.969 12.111,31.716 1.481,1.661 3.534,2.507 5.596,2.506z"></path>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
          }
          title={
            <Typography variant="body2" color={"red"}>
              {strings.happyBirthdayMessage}
            </Typography>
          }
          subheader={
            <Tooltip
              title={userName}
              placement="top"
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                overflow: "auto",
              }}
            >
              <Typography variant="body2" noWrap>
                {userName}
              </Typography>
            </Tooltip>
          }
        ></CardHeader>
        <CardContent
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            alignContent: "baseline",
            flexWrap: "wrap",
            justifyContent: "space-around",
            rowGap: "10px",
          }}
        >
          <Avatar
            style={{ border: "solid 2px red" }}
            src={userPhoto}
            alt={userName}
          />
          <Tooltip title={jobDescription} placement="top">
            <Typography variant="body2" noWrap>
              {jobDescription}
            </Typography>
          </Tooltip>
          <Tooltip title={label} placement="top">
            <Typography variant="body2">{label}</Typography>
          </Tooltip>
        </CardContent>
        <CardActions style={{ backgroundColor: "red", color: "white" }}>
          <svg
            fill="#FFFFFF"
            width="30px"
            height="30px"
            viewBox="-3.2 -3.2 38.40 38.40"
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new -3.2 -3.2 38.40 38.40"
            stroke="#FFFFFF"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M5 24.225V7.776h22v16.447H5v.002zm3.011-1.815h15.978l-5.111-5.115L16 20.179l-2.877-2.883-5.112 5.114zm-1.216-1.275l5.077-5.09-5.077-5.065v10.155zm13.332-5.09l5.079 5.09V10.979l-5.079 5.066zm-4.126 1.588l8.022-8.027-16.045-.001 8.023 8.028z"></path>
            </g>
          </svg>
          <EmailButton userEmail={userEmail}>
            {strings.cardActionMessage}
          </EmailButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BirthDayCard;
