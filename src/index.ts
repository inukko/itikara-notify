import { postHook } from "./webhook";

global.doGet = () => {
  const result = postHook();
  return ContentService.createTextOutput(JSON.stringify(result));
};
