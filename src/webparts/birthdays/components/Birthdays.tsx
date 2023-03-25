import { Grid } from "@mui/material";
import * as React from "react";
import { getDataForComponent } from "../services/customSPDAO";
import { IUser } from "../services/IUser";
import BirthDayCard from "./BirthDayCard";
import styles from "./Birthdays.module.scss";
import { IBirthdaysProps } from "./IBirthdaysProps";

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
    const data = await getDataForComponent(this.props);
    this.setState({ users: data });
  }

  public render(): React.ReactElement<IBirthdaysProps> {
    const { users } = this.state;
    const { hasTeamsContext } = this.props;

    return (
      <section
        className={`${styles.birthdays} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <Grid container spacing={2}>
          {users.length > 0 ? (
            users.map((user: IUser) => <BirthDayCard user={user} />)
          ) : (
            <div>no data</div>
          )}
        </Grid>
      </section>
    );
  }
}
