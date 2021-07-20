import React, { useEffect, useState } from "react";
import axios from "axios";

import "../css/HK_weather.css";

function HK_weather() {
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [warningData, setWarningData] = useState([]);
  const [liveTime, setLiveTime] = useState("");

  // Api Links
  const weatherReportApi =
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en";
  const weatherWarningApi =
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en";
  const weatherReport = axios.get(weatherReportApi);
  const weatherWarning = axios.get(weatherWarningApi);

  //First Get Data
  useEffect(() => {
    setIsLoading(true);
    axios
      .all([weatherReport, weatherWarning])
      .then(
        axios.spread(function (report, warning) {
          setHumidity(report.data.humidity.data[0].value);
          setTemperature(report.data.temperature.data[1]);
          setWeatherIcon(report.data.icon);

          setWarningData(warning.data);
          setIsLoading(false);
        })
      )
      .catch((error) => console.log(error));
  }, []);

  //Getting Data every 10 mins
  useEffect(() => {
    const inteval = setInterval(() => {
      axios
        .all([weatherReport, weatherWarning])
        .then(
          axios.spread(function (report, warning) {
            setHumidity(report.data.humidity.data[0].value);
            setTemperature(report.data.temperature.data[1]);
            setWeatherIcon(report.data.icon);

            setWarningData(warning.data);
          })
        )
        .catch((error) => console.log(error));
    }, 600000);
    return () => clearInterval(inteval);
  }, []);

  //Loading Warning Icons
  function ShowWarnings(props) {
    let warningArr = [];

    if (!isLoading) {
      // Typhoon Icons
      if (warningData.WTCSGNL?.code === "TC1") {
        warningArr.push("TC1");
      }
      if (warningData.WTCSGNL?.code === "TC3") {
        warningArr.push("TC3");
      }
      if (warningData.WTCSGNL?.code === "TC8NE") {
        warningArr.push("TC8NE");
      }
      if (warningData.WTCSGNL?.code === "TC8SE") {
        warningArr.push("TC8SE");
      }
      if (warningData.WTCSGNL?.code === "TC8NW") {
        warningArr.push("TC8NW");
      }
      if (warningData.WTCSGNL?.code === "TC8SW") {
        warningArr.push("TC8SW");
      }
      if (warningData.WTCSGNL?.code === "TC9") {
        warningArr.push("TC9");
      }
      if (warningData.WTCSGNL?.code === "TC10") {
        warningArr.push("TC10");
      }
      // Rain Icons
      if (warningData.WRAIN?.code === "WRAINA") {
        warningArr.push("WRAINA");
      }
      if (warningData.WRAIN?.code === "WRAINR") {
        warningArr.push("WRAINR");
      }
      if (warningData.WRAIN?.code === "WRAINB") {
        warningArr.push("WRAINB");
      }
      if (warningData.WTS?.code === "WTS") {
        warningArr.push("WTS");
      }
      if (warningData.WL?.code === "WL") {
        warningArr.push("WL");
      }
      if (warningData.WHOT?.code === "WHOT") {
        warningArr.push("WHOT");
      }
      if (warningData.WCOLD?.code === "WCOLD") {
        warningArr.push("WCOLD");
      }
      if (warningData.WMSGN?.code === "WMSGNL") {
        warningArr.push("WMSGNL");
      }
      if (warningData.WNFNTSA?.code === "WNFNTSA") {
        warningArr.push("WNFNTSA");
      }
      if (warningData.WFIRE?.code === "WFIREY") {
        warningArr.push("WFIREY");
      }
      if (warningData.WFIRE?.code === "WFIRER") {
        warningArr.push("WFIRER");
      }
      if (warningData.WFROST?.code === "WFROST") {
        warningArr.push("WFROST");
      }
      if (warningData.WTMW?.code === "WTMW") {
        warningArr.push("WTMW");
      }

      return warningArr?.map((warn) => (
        <img
          src={require(`../img/weather-icon/warnings/${warn}.png`).default}
          alt="warning icon"
        />
      ));
    }
  }

  //Live Clock
  useEffect(() => {
    const interval = setInterval(
      () =>
        setLiveTime(
          new Date().toLocaleString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        ),
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="hk_weather">
      <div className="weatherBanner_Container">
        {!isLoading ? (
          <div className="weatherBanner_WeatherIcon">
            <img
              src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${weatherIcon.slice(
                -1
              )}.png`}
              alt="weather icon"
            />
          </div>
        ) : null}
        {!isLoading ? (
          <div className="weatherBanner_WarningIcon">
            <ShowWarnings />
          </div>
        ) : null}
        {!isLoading ? (
          <div className="weatherBanner_Temperature">
            {temperature.value + String.fromCharCode(176) + temperature.unit}
          </div>
        ) : null}
        {!isLoading ? (
          <div className="weatherBanner_Humidity">{humidity + "\u0025"}</div>
        ) : null}
        <div style={{ flex: "1 0 0" }} />
        <div className="currentTime">{liveTime}</div>
      </div>
    </div>
  );
}

export default HK_weather;
