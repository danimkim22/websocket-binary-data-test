# Websocket-test

### 웹소켓 테스트 서버

https://www.piesocket.com/websocket-tester#

## TS 프로젝트 설정

### env 파일 설정

1. 환경변수명 앞에 항상 `REACT_APP`을 쓴다.

```
// SERVER_URL 이라는 환경변수 설정 예시
REACT_APP_SERVER_URL = wss:demo.websockettest.com/
```

2. `react-app-env.d.ts` 파일 생성 후 1.에서 만든 환경변수의 타입을 추가한다.

```
declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      REACT_APP_SERVER_URL: string; // 생성한 환경변수 추가
    }
  }
```

3. `env` 파일 설정 후 서버 재실행한다.

## 서버에 Packet 보내기

네트워크 통신에서 Packet이란 데이터의 단위를 의미합니다.
JSON 데이터를 binary data로 보내기

## Packet 구조

| packet name size | data size |    packet name     |    data     |
| :--------------: | :-------: | :----------------: | :---------: |
|      2 byte      |  2 byte   | packet name length | data length |

**packetname size** <br>
packet name의 length

**data size** <br>
전송할 데이터의 length

-> packet header = packet name size + data size

**packet name** <br>
packet name의 binary array로 변환한 값

**data** <br>
전송할 데이터를 binary array로 변환한 값

### 참고문서

웹소켓으로 데이터 전송하기 https://ko.javascript.info/websocket#ref-1597

Uint8Array https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array

Right Shift(비트 연산자) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift

TextEncoder https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder

Concatenate typed arrays https://javascript.info/task/concat
