import * as React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Tooltip,
  Box,
  Grid,
} from "@mui/material";
import { IUser } from "../services/IUser";
import * as strings from "BirthdaysWebPartStrings";
import EmailButton from "./EmailButton";
import { DateTime } from "luxon";

const CelebrationCard = ({
  user,
  celebrationType,
  wrapName,
}: {
  user: IUser;
  celebrationType: boolean;
  wrapName: boolean;
}) => {
  const {
    userName,
    jobDescription,
    birthday,
    userEmail,
    anniversary,
    userPhoto,
  } = user;

  const [year, month, day] = (celebrationType ? birthday : anniversary)
    .split("-")
    .map((item) => parseInt(item));

  const currentYear = new Date().getFullYear();
  const isToday = new Date().getDate() === day;
  const label = isToday
    ? "Hoy"
    : DateTime.local(year, month, day).setLocale("es").toFormat("dd 'de' MMMM");

  const calculateYearsNumber = (): string => {
    const [ayear] = anniversary.split("-").map((item) => parseInt(item));
    return (currentYear - ayear).toString();
  };

  return (
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
        style={{
          maxWidth: "200px",
          maxHeight: "200px",
          overflow: "auto",
        }}
        title={
          <Grid container sx={{ justifyContent: "center" }} spacing={1}>
            <Grid item>
              <Typography
                variant="body2"
                color={"#D61921"}
                style={{ fontSize: "0.8rem", fontWeight: "bold" }}
              >
                {celebrationType
                  ? strings.happyBirthdayMessage
                  : `${calculateYearsNumber()}  ${strings.anniversaryMessage}`}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={2} sx={{ alignItems: "center" }}>
                <Grid item>
                  <div>
                    {celebrationType ? (
                      <>
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
                              fill="#D61921"
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
                      </>
                    ) : (
                      <>
                        <svg
                          fill="#fff"
                          width="30px"
                          height="30px"
                          viewBox="-10.88 -10.88 53.76 53.76"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#fff"
                          stroke-width="0.128"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0">
                            <rect
                              x="-10.88"
                              y="-10.88"
                              width="53.76"
                              height="53.76"
                              rx="26.88"
                              fill="#D61921"
                              strokeWidth={"0"}
                            ></rect>
                          </g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <title>award</title>{" "}
                            <path d="M28.211 26.834l-3.989-6.681c1.877-2.005 3.029-4.708 3.029-7.68 0-6.213-5.037-11.251-11.251-11.251s-11.251 5.037-11.251 11.251c0 2.945 1.132 5.626 2.984 7.631l-0.007-0.008-4.023 6.739c-0.066 0.11-0.106 0.242-0.106 0.384 0 0.158 0.049 0.304 0.132 0.425l-0.002-0.003c0.139 0.199 0.367 0.327 0.625 0.327 0.041 0 0.081-0.003 0.12-0.009l-0.004 0.001 3-0.49 1.095 2.803c0.105 0.264 0.349 0.452 0.639 0.474l0.003 0 0.057 0.002c0.276-0 0.517-0.149 0.647-0.371l0.002-0.004 3.946-6.835c0.641 0.134 1.378 0.21 2.133 0.21 0.733 0 1.449-0.072 2.142-0.21l-0.070 0.012 3.939 6.821c0.133 0.225 0.374 0.374 0.65 0.375h0l0.057-0.002c0.293-0.023 0.537-0.211 0.641-0.47l0.002-0.005 1.094-2.803 3 0.49c0.037 0.006 0.079 0.010 0.122 0.010 0.414 0 0.75-0.336 0.75-0.75 0-0.142-0.040-0.275-0.108-0.388l0.002 0.003zM9.394 28.273l-0.748-1.914c-0.114-0.281-0.384-0.476-0.701-0.476-0.042 0-0.083 0.003-0.123 0.010l0.004-0.001-2.007 0.328 3.016-5.054c1 0.83 2.171 1.498 3.446 1.944l0.079 0.024zM6.25 12.5c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75c0 5.385-4.365 9.75-9.75 9.75v0c-5.382-0.006-9.744-4.368-9.75-9.749v-0.001zM24.088 25.891c-0.037-0.006-0.080-0.010-0.123-0.010-0.316 0-0.586 0.195-0.695 0.472l-0.002 0.005-0.746 1.914-2.952-5.112c1.358-0.462 2.532-1.124 3.556-1.964l-0.020 0.016 2.99 5.007zM16 5.25c-4.004 0-7.25 3.246-7.25 7.25s3.246 7.25 7.25 7.25c4.004 0 7.25-3.246 7.25-7.25v0c-0.004-4.002-3.248-7.246-7.25-7.25h-0zM16 18.25c-3.176 0-5.75-2.574-5.75-5.75s2.574-5.75 5.75-5.75c3.176 0 5.75 2.574 5.75 5.75v0c-0.003 3.174-2.576 5.747-5.75 5.75h-0zM18.666 11.151h-1.492l-0.461-1.417c-0.124-0.276-0.396-0.464-0.713-0.464s-0.589 0.189-0.711 0.459l-0.002 0.005-0.461 1.417h-1.491c-0.414 0-0.75 0.336-0.75 0.75 0 0.248 0.12 0.468 0.306 0.605l0.002 0.001 1.207 0.877-0.461 1.417c-0.024 0.069-0.037 0.15-0.037 0.233 0 0.414 0.336 0.749 0.749 0.749 0.166 0 0.319-0.054 0.443-0.145l-0.002 0.001 1.207-0.876 1.207 0.876c0.122 0.089 0.275 0.143 0.44 0.143 0.414 0 0.75-0.336 0.75-0.75 0-0.083-0.013-0.162-0.038-0.237l0.002 0.005-0.462-1.417 1.208-0.877c0.188-0.138 0.308-0.358 0.308-0.606 0-0.414-0.335-0.75-0.75-0.75h-0zM16.269 13.138c-0.080-0.032-0.172-0.050-0.269-0.050s-0.189 0.018-0.274 0.052l0.005-0.002c0.001-0.012 0.001-0.026 0.001-0.040 0-0.18-0.063-0.345-0.169-0.473l0.001 0.001c0.183-0.050 0.335-0.162 0.434-0.313l0.002-0.003c0.101 0.153 0.252 0.266 0.43 0.314l0.005 0.001c-0.105 0.128-0.168 0.292-0.168 0.472 0 0.014 0 0.028 0.001 0.041l-0-0.002z"></path>{" "}
                          </g>
                        </svg>
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item>
                  <Box>
                    <Tooltip
                      title={userName}
                      placement="top"
                      style={{
                        overflow: "auto",
                        color: "#565656",
                      }}
                    >
                      <Box
                        sx={{
                          fontWeight: "bold",
                          maxWidth: "100px !important",
                          overflow: "hidden",
                        }}
                      >
                        {wrapName ? (
                          <Typography
                            noWrap
                            sx={{
                              fontWeight: "bold",
                              maxWidth: "100px !important",
                              overflow: "hidden",
                            }}
                          >
                            {userName}
                          </Typography>
                        ) : (
                          <Typography sx={{ fontWeight: "bold !important" }}>
                            {userName}
                          </Typography>
                        )}
                      </Box>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
          sx={{ width: 100, height: 100 }}
        />
        <Tooltip title={jobDescription} placement="top">
          <Typography variant="body2" noWrap>
            {jobDescription}
          </Typography>
        </Tooltip>
        <Tooltip title={label} placement="top">
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold !important",
              color: "#D61921",
            }}
          >
            {label}
          </Typography>
        </Tooltip>
      </CardContent>
      <CardActions style={{ backgroundColor: "#D61921", color: "white" }}>
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
  );
};

export default CelebrationCard;
