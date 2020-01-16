import { getLiveListAdapter, IEvents } from "./adapter";

const moment = Moment.load();

const expanded = () => {
  const result = getLiveListAdapter();
  const { events } = result.data;

  // const now = moment();

  const list = events.filter((item: IEvents): boolean => {
    // return moment("2020-01-14T00:00:00.000+09:00").diff(now, "hour") <= 1;
    return item.id === 14571;
  });

  const activeList = list.map((item: IEvents): any => {
    return {
      username: item.livers[0].name,
      avatar_url: item.livers[0].avatar,
      content: `
      ${moment(item.start_date).format("HH:MM〜")}
      ${item.name}
      ${item.url}
      `
    };
  });

  Logger.log(list);

  return activeList;
};

export const postHook = () => {
  const reuslt = expanded();
  var data = {
    content: "aaa",
    username: "test"
  };
  reuslt.map(item => {
    UrlFetchApp.fetch(
      "https://discordapp.com/api/webhooks/666136819615793153/8aYDjfYQlqQ4-nWl327A_rBsJMri6A0OU5n8XczxQNBwSJWB19ugeo9jUjHL2NtZlmO7",
      {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(item),
        muteHttpExceptions: true
      }
    );
  });
};
