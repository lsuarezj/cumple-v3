import { Grid, Typography } from "@mui/material";
import * as React from "react";
import { getDataForComponent } from "../services/customSPDAO";
import { IUser } from "../services/IUser";
import CelebrationCard from "./CelebrationCard";
import styles from "./Birthdays.module.scss";
import { IBirthdaysProps } from "./IBirthdaysProps";
import * as strings from "BirthdaysWebPartStrings";
import Carousel from "react-material-ui-carousel";
import * as _ from "lodash";

export default class Birthdays extends React.Component<
  IBirthdaysProps,
  { users: IUser[] }
> {
  constructor(props: IBirthdaysProps) {
    super(props);
    this.state = {
      users: [],
    };
  }

  public async componentDidMount(): Promise<void> {
    this.getData();
  }

  private async getData(): Promise<void> {
    const data = await getDataForComponent(this.props);
    this.setState({ users: data });
  }

  public render(): React.ReactElement<IBirthdaysProps> {
    const { users } = this.state;
    const { hasTeamsContext, useTestData, webpartType, wrapName } = this.props;

    const chunkSize = 3;
    const chunks = _.chunk(users, chunkSize);

    return (
      <section
        className={`${styles.birthdays} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <Typography component="h1" variant="h4" style={{ color: "#D61921" }}>
          <strong>
            {webpartType
              ? strings.webpartTitleCumpleaños
              : strings.webpartTitleAniversario}
          </strong>
        </Typography>
        {useTestData && (
          <Typography style={{ margin: 10 }}>Showing Test Data</Typography>
        )}
        {users.length > 0 ? (
          <Carousel
            autoPlay={false}
            animation="slide"
            navButtonsAlwaysVisible
            navButtonsProps={{
              buttonWrapper: {
                position: "absolute",
                height: "100px",
                backgroundColor: "transparent",
                top: "calc(50% - 70px)",
                "&:hover": {
                  "& $button": {
                    backgroundColor: "black",
                    filter: "brightness(120%)",
                    opacity: "0.4",
                  },
                },
              },
              fullHeightHoverWrapper: {
                height: "100%",
                top: "0",
              },
              buttonVisible: {
                opacity: "1",
              },
              buttonHidden: {
                opacity: "0",
              },
              button: {
                margin: "10px 10px",
                position: "relative",
                backgroundColor: "#494949",
                top: "calc(50% - 20px) !important",
                color: "white",
                fontSize: "30px",
                transition: "200ms",
                cursor: "pointer",
                "&:hover": {
                  opacity: "0.6 !important",
                },
              },
              // Applies to the "next" button wrapper
              next: {
                right: 0,
              },
              // Applies to the "prev" button wrapper
              prev: {
                left: 0,
              },
            }}
          >
            {chunks.map((chunk: any[], index: React.Key) => (
              <Grid
                key={index}
                container
                spacing={3}
                sx={{
                  alingItems: "center",
                  width: "100%",
                  justifyContent: "space-evenly",
                  flexWrap: "nowrap",
                  margin: "0",
                }}
              >
                {chunk.map((item) => (
                  <Grid item>
                    <CelebrationCard
                      user={item}
                      celebrationType={webpartType}
                      wrapName={wrapName}
                    />
                  </Grid>
                ))}
              </Grid>
            ))}
          </Carousel>
        ) : (
          <div>no data</div>
        )}
      </section>
    );
  }
}
