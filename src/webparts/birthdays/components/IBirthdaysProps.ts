import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IBirthdaysProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  webpartType: boolean;
  numberUpcomingDays: number;
  context: WebPartContext;
  useTestData: boolean;
  wrapName: boolean;
  themePrimary: string;
}
