import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IBirthdaysProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  webpartType: string;
  numberUpcomingDays: number;
  context: WebPartContext;
  useTestData: boolean;
}
