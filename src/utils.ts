import * as dayjs from "dayjs";

function formatTime(timestamp: number) {
  return dayjs.unix(timestamp).format("HH:mm DD.MM.YYYY");
}

function pluralize(num: number, word: string, plural = `${word}s`) {
  if (Math.abs(num) === 1) {
    return word;
  } else {
    return plural;
  }
}

function _prepareRequests(
  url: string,
  ids: number[],
  start: number,
  end: number
) {
  const promises = [];

  let tmpUrl = "";

  for (let i = start; i < end; i++) {
    tmpUrl = url.replace("$", String(ids[i]));
    promises.push(fetch(tmpUrl));
  }

  return promises;
}

function filterInPlace<T>(
  arr: T[],
  condition: (element: T, index: number, arr: T[]) => boolean
) {
  let i = 0;
  let j = 0;

  while (i < arr.length) {
    if (condition(arr[i], i, arr)) {
      arr[j] = arr[i];
      j++;
    }

    i++;
  }

  arr.length = j;
  return arr;
}

async function fetchMany(url: string, ids: number[], batchSize: number) {
  const resultUnparsed = [];

  let requestCounter = 0;

  while (requestCounter < ids.length) {
    let tmpPromises = [];

    if (requestCounter + batchSize <= ids.length) {
      tmpPromises = _prepareRequests(
        url,
        ids,
        requestCounter,
        requestCounter + batchSize
      );
      requestCounter += batchSize;
    } else {
      tmpPromises = _prepareRequests(url, ids, requestCounter, ids.length);
      requestCounter = ids.length;
    }

    let tmp = await Promise.all(tmpPromises);

    for (let i = 0; i < tmp.length; i++) {
      resultUnparsed.push(tmp[i]);
    }
  }

  const result = [];

  for (let i = 0; i < resultUnparsed.length; i++) {
    let value = await resultUnparsed[i].json();
    result.push(value);
  }

  return result;
}

export { formatTime, pluralize, filterInPlace, fetchMany };
