import React, { useEffect, useState } from "react";
import { w3cwebsocket } from "websocket";
import "./App.css";

const App = () => {
  const [humidValues, setHumidValues] = useState([]);
  const [gasValues, setGasValues] = useState([]);
  const [tempValues, setTempValues] = useState([]);

  useEffect(() => {
    const socket = new w3cwebsocket("ws://192.168.0.18:1880/sensor?type=data");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { data: sensorData } = data;
      console.log(data);

      const gasValue =
        sensorData.find((sensor) => sensor.type === "gas")?.value || null;
      setGasValues([gasValue].filter(Boolean));

      const humidValue =
        sensorData.find((sensor) => sensor.type === "humid")?.value || null;
      setHumidValues([humidValue].filter(Boolean));
      const tempValue =
        sensorData.find((sensor) => sensor.type === "temp")?.value || null;
      setTempValues([tempValue].filter(Boolean));
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    const openAir = () => {
      socket.send("message");
    };

    return () => {
      socket.close();
    };
  }, []);

  const openCCTV = () => {
    window.open("http://192.168.0.18:8080/", "_blank");
  };

  return (
    <div className="APP">
      <h1>SMART HOME🏠</h1>
      <div className="content">
        <div className="gas">
          <p className="subTitle">현재 가스 농도🔥</p>
          {gasValues.map((value, index) => (
            <p key={index}>{value} ppm</p>
          ))}
        </div>
        <div className="temp">
          <p className="subTitle">현재 온도🌡</p>
          {tempValues.map((value, index) => (
            <p className="tempValue" key={index}>
              {value}°C
            </p>
          ))}
        </div>
        <div className="humid">
          <p className="subTitle">현재 습도💧</p>
          {humidValues.map((value, index) => (
            <p className="humidValue" key={index}>
              {value}%
            </p>
          ))}
        </div>
      </div>
      <button className="cctv" onClick={openCCTV}>
        CCTV🎥
      </button>
    </div>
  );
};

export default App;
