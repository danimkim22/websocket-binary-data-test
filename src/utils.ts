const typedArrConcat = (arrays: Uint8Array[]) => {
    let totalLength = arrays.reduce(
      (acc, value) => acc + value.length,
      0
    );
    let result = new Uint8Array(totalLength);

    if (!arrays.length) return result;

    let length = 0;
    for (let array of arrays) {
      result.set(array, length);
      length += array.length;
    }
    return result;
}

type JsonDataType = {
    Playerid: string,
    CurrentMap: string
}

export const sendPacket = (packetName: string, data: JsonDataType ) => {
const headerSizeBytes = 4; // packetname size 2byte + data size 2byte
const stringifiedData = JSON.stringify(data);

const encoder = new TextEncoder();
const packetNameUint8Arr = encoder.encode(packetName);
const dataUint8Arr = encoder.encode(stringifiedData);
const pktNameLength = packetNameUint8Arr.length;
const dataLength = dataUint8Arr.length;

const headerUint8Arr = new Uint8Array(headerSizeBytes);
headerUint8Arr[0] = pktNameLength;
headerUint8Arr[1] = pktNameLength >> 8;
headerUint8Arr[2] = dataLength;
headerUint8Arr[3] = dataLength >> 8;

const chunks = [headerUint8Arr, packetNameUint8Arr, dataUint8Arr];
const typedArray = typedArrConcat(chunks);

return typedArray;
}
