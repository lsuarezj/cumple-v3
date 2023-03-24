import { IBirthdaysProps } from "../components/IBirthdaysProps";
import { IUser } from "./IUser";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export const getDataForComponent = async (
  props: IBirthdaysProps
): Promise<IUser[]> => {
  const { context } = props;
  //   const baseURL = context.pageContext.web.absoluteUrl;s
  const baseURL = "https://camaramed.sharepoint.com/";
  const listName = "Birthdays";
  const data = await context.spHttpClient
    .get(
      `${baseURL}/_api/lists/getbytitle('${listName}')/items?$select=Id,Title,email,JobTitle&$top=5`,
      SPHttpClient.configurations.v1
    )
    .then((response: SPHttpClientResponse) => {
      return response.json();
    });

  return data.value.map((item: any) => {
    return {
      key: item.Id,
      userName: item.Title,
      userEmail: item.email,
      jobDescription: item.JobTitle,
      userPhoto: `/_layouts/15/userphoto.aspx?size=L&username=${item.email}`,
    };
  });
};
