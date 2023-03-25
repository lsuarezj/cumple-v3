import { IBirthdaysProps } from "../components/IBirthdaysProps";
import { IUser } from "./IUser";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { DateTime } from "luxon";

const currentYear = new Date().getFullYear();
export const getDataForComponent = async (
  props: IBirthdaysProps
): Promise<IUser[]> => {
  const { context, numberUpcomingDays, useTestData } = props;
  //   const baseURL = context.pageContext.web.absoluteUrl;s
  const baseURL = "https://camaramed.sharepoint.com/";
  const listName = "Birthdays";
  const select = "$select=Id,Title,email,JobTitle,Aniversity,Birthday";
  const orderBy = "&$orderby=Birthday desc";
  const simpleQuery = `${baseURL}_api/lists/getbytitle('${listName}')/items?${select}&$top=5${orderBy}`;
  //   const queryURL = `${baseURL}_api/web/lists/getbytitle('${listName}')/items?$select=Title,Birthday&$filter=month(Birthday) eq month(getdate()) and day(Birthday) ge day(getdate()) and day(Birthday) le day(getdate() + ${
  //     numberUpcomingDays && 5
  //   })`;
  const queryURL = `${baseURL}_api/web/lists/getbytitle('${listName}')/items?${select}&$top=5000${orderBy}`;
  const data = await context.spHttpClient
    .get(useTestData ? simpleQuery : queryURL, SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
      return response.json();
    });

  return data.value
    .filter((item: any) => {
      return validateBirthday(item.Birthday, numberUpcomingDays);
    })
    .map((item: any) => {
      return {
        key: item.Id,
        userName: item.Title,
        userEmail: item.email,
        jobDescription: item.JobTitle,
        userPhoto: `/_layouts/15/userphoto.aspx?size=L&username=${item.email}`,
        anniversary: item.Aniversity.split("T")[0],
        birthday: item.Birthday.split("T")[0],
      };
    });
};

const validateBirthday = (
  birthday: string,
  numberUpcomingDays: number
): boolean => {
  const [_year, month, day] = birthday.split("-").map((item) => parseInt(item));
  const date1 = DateTime.local(currentYear, month, day);
  const date2 = DateTime.fromISO(new Date().toISOString());
  const diffInDays = Math.ceil(date2.diff(date1, "days").toObject().days);
  return diffInDays > 0 && diffInDays <= numberUpcomingDays;
};
