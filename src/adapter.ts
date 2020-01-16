export interface ILivers {
  name: string;
  id: number;
  avatar: string;
  color: string;
}

interface IGenre {
  id: number;
  name: string;
}

export interface IEvents {
  id: number;
  name: string;
  description: string;
  public: number;
  url: string;
  thumbnail: string;
  start_date: string;
  end_date: string;
  recommend: boolean;
  genre: IGenre | null;
  livers: ILivers[];
}

interface IResponse {
  events: IEvents[];
}

interface IResult<T> {
  status: string;
  message?: string;
  data: T;
}

export const getLiveListAdapter = (): IResult<IResponse | null> => {
  const url = "https://api.itsukaralink.jp/v1.2/events.json";

  try {
    const response = UrlFetchApp.fetch(url);
    const jsonStrings = response.getContentText();
    const reuslt = JSON.parse(jsonStrings);
    return reuslt;
  } catch (err) {
    return {
      status: "",
      message: `Message: ${err.message}\r\nFile: ${err.fileName}\r\nLine: ${err.lineNumber}\r\n`,
      data: null
    };
  }
};
