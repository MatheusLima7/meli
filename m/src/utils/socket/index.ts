type TDataObject = any;

type TDataWS = Array<TDataObject>;

const getDateTime = (date: string) => new Date(date).getTime();

const handlerWSData = (props: {
  customData: TDataWS;
  socketData: TDataWS;
  propDate?: string;
  propId: string;
}) => {
  const {
    customData,
    socketData,
    propDate,
    propId,
  } = props;

  let accumulator: TDataWS = customData;
  const newsSocketData: TDataWS = [];

  accumulator = accumulator.map((item: TDataObject) => {
    const findItem = socketData.find(
      (socketItem: TDataObject) => socketItem[propId] === item[propId]
        && (!propDate
          || getDateTime(socketItem[propDate]) > getDateTime(item[propDate])),
    );
    if (findItem) {
      return findItem;
    }

    return item;
  });

  socketData.forEach((item: TDataObject) => {
    const findItem = accumulator.find(
      (row: TDataObject) => row[propId] === item[propId],
    );
    if (!findItem) {
      newsSocketData.push(item);
    }
  });

  return accumulator.length === 0 ? socketData : newsSocketData.concat(accumulator);
};

export default {
  handlerWSData,
};
