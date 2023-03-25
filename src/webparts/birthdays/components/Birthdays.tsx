import { Grid, Typography } from "@mui/material";
import * as React from "react";
import { getDataForComponent } from "../services/customSPDAO";
import { IUser } from "../services/IUser";
import CelebrationCard from "./CelebrationCard";
import styles from "./Birthdays.module.scss";
import { IBirthdaysProps } from "./IBirthdaysProps";
import * as strings from "BirthdaysWebPartStrings";

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
    return (
      <section
        className={`${styles.birthdays} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <Typography component="h1" variant="h4" style={{ color: "red" }}>
          {webpartType
            ? strings.webpartTitleCumpleaños
            : strings.webpartTitleAniversario}
        </Typography>
        {useTestData && (
          <Typography style={{ margin: 10 }}>Showing Test Data</Typography>
        )}
        <Grid container spacing={2}>
          {users.length > 0 ? (
            users.map((user: IUser) => (
              <CelebrationCard
                user={user}
                celebrationType={webpartType}
                wrapName={wrapName}
              />
            ))
          ) : (
            <div>no data</div>
          )}
        </Grid>
      </section>
    );
  }
}
