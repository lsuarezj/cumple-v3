import { Box, Grid, Typography } from "@mui/material";
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
    const {
      hasTeamsContext,
      useTestData,
      webpartType,
      wrapName,
      themePrimary,
    } = this.props;

    const chunkSize = 3;
    const chunks = _.chunk(users, chunkSize);

    return (
      <section
        className={`${styles.birthdays} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <Typography component="h1" variant="h4" style={{ color: themePrimary }}>
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
          <Box sx={{ minWidth: "500px !important" }}>
            <Carousel
              autoPlay={false}
              animation="slide"
              navButtonsAlwaysVisible
              sx={{ minWidth: "500px !important" }}
            >
              {chunks.map((chunk: any[], index: React.Key) => (
                <Grid
                  key={index}
                  container
                  spacing={3}
                  sx={{
                    alingItems: "center",
                    justifyContent: "space-evenly",
                    flexWrap: "nowrap",
                    margin: "0",
                    minWidth: "500px",
                  }}
                >
                  {chunk.map((item) => (
                    <Grid item>
                      <CelebrationCard
                        user={item}
                        celebrationType={webpartType}
                        wrapName={wrapName}
                        themePrimary={themePrimary}
                      />
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Carousel>
          </Box>
        ) : (
          <div>no data</div>
        )}
      </section>
    );
  }
}
