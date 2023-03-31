import { IBirthdaysProps } from "../components/IBirthdaysProps";
import { IUser } from "./IUser";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { DateTime } from "luxon";

export const getDataForComponent = async (
  props: IBirthdaysProps
): Promise<IUser[]> => {
  const { context, numberUpcomingDays, useTestData, webpartType } = props;
  // const baseURL = context.pageContext.web.absoluteUrl;
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
      if (item.Birthday == null || item.Aniversity == null) return false;

      return (
        useTestData ||
        (webpartType
          ? validateBirthday(item.Birthday, numberUpcomingDays)
          : validateAnniversary(item.Aniversity, numberUpcomingDays))
      );
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

const validateDate = (
  dateString: string,
  numberUpcomingDays: number,
  targetYear: number
): boolean => {
  try {
    const { month, day } = DateTime.fromISO(
      dateString.split("T")[0]
    ).toObject();
    const targetDate = DateTime.local(targetYear, month, day);
    const currentDate = DateTime.now();
    const { days } = targetDate.diff(currentDate, "days").toObject();
    const diffDays = Math.ceil(days);

    return diffDays >= 0 && diffDays <= numberUpcomingDays;
  } catch (error) {
    console.error("Error validating date:", error);
    return false;
  }
};

const validateBirthday = (
  birthday: string,
  numberUpcomingDays: number
): boolean => {
  return validateDate(birthday, numberUpcomingDays, new Date().getFullYear());
};

const validateAnniversary = (
  anniversary: string,
  numberUpcomingDays: number
): boolean => {
  return validateDate(
    anniversary,
    numberUpcomingDays,
    new Date().getFullYear()
  );
};
