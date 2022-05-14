import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Divider } from "@material-ui/core";
import DictM from "./MTR_Dict.js";
import "../css/MTRInfo.css";
import "../css/SaveStnInfo.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Blink from "react-blink-text";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

function MTRSaveInfo({ line, station, lang }) {
  const [mtrEta, setMtrEta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mtrIsDelay, setMtrIsDelay] = useState("");
  const [mtrStatus, setMtrStatus] = useState("");
  const [mtrError, setMtrError] = useState([]);
  const limitETA = 3;

  const storage = window.localStorage;
  if (storage.getItem(line + "_SaveStn") === null) {
    var newArray = [];
    storage.setItem(line + "_SaveStn", JSON.stringify(newArray));
  }

  useEffect(() => {
    const inteval = setInterval(() => {
      let mtrAPI = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`;
      axios
        .get(mtrAPI)
        .then((res) => {
          if (res.data.status === 0) {
            setMtrStatus(res.data.status);
            setMtrError(res.data.error);
          } else {
            setMtrIsDelay(res.data.isdelay);
            setMtrStatus(res.data.status);
            setMtrEta(res.data.data[line + "-" + station]);
          }
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }, 10000);
    return () => clearInterval(inteval);
  }, [line, station]);

  useEffect(() => {
    setIsLoading(true);
    setMtrEta([]);
    let mtrAPI = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`;
    axios
      .get(mtrAPI)
      .then((res) => {
        if (res.data.status === 0) {
          setMtrStatus(res.data.status);
          setMtrError(res.data.error);
        } else {
          setMtrIsDelay(res.data.isdelay);
          setMtrStatus(res.data.status);
          setMtrEta(res.data.data[line + "-" + station]);
        }
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [line, station]);

  if (mtrStatus === 0) {
    return (
      <div className="mtrSaveInfo">
        <Link to={"/mtr/" + line + "/" + station}>
          <Card className="infoBox">
            <CardContent>
              <div className={"mtrstation__header" + line}>
                <div className="station__name">
                  {DictM.MtrStations[station][lang + "_name"]}{" "}
                </div>
              </div>

              {isLoading === true ? (
                <LinearProgress color="primary" className="loadingBar" />
              ) : null}

              {mtrError !== null ? (
                <div className="mtr__info">
                  <Alert severity="error">
                    {DictM.Error[lang][mtrError.errorCode]}
                  </Alert>
                </div>
              ) : null}
              <p align="center">未有到站時間 No ETA Information</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    );
  } else if (mtrIsDelay === "Y") {
    return (
      <div className="mtrSaveInfo">
        <Link to={"/mtr/" + line + "/" + station}>
          <Card className="infoBox">
            <CardContent>
              {isLoading === true ? (
                <LinearProgress color="primary" className="loadingBar" />
              ) : null}
              <p align="center">未有到站時間 No ETA Information</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="mtrSaveInfo">
        <Link to={"/mtr/" + line + "/" + station}>
          <Card className="infoBox">
            <CardContent>
              <div className={"mtrstation__header" + line}>
                <div className="station__name">
                  {DictM.MtrStations[station][lang + "_name"]}{" "}
                </div>
                <div style={{ flex: "1 0 0" }} />
                <div className="header__time">
                  {mtrEta?.sys_time
                    ? DictM.Common[lang].lastUpdate +
                      ": " +
                      new Date(
                        Date.parse(mtrEta?.sys_time.replace(/-/g, "/"))
                      ).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : null}
                </div>
              </div>
              {isLoading === true ? (
                <LinearProgress color="primary" className="loadingBar" />
              ) : null}
              {mtrEta.UP?.length === 0 && mtrEta.DOWN?.length === 0 ? (
                <p align="center">未有到站時間 No ETA Information</p>
              ) : null}
              <div className="saveStnETA">
                {mtrEta.UP?.slice(0, limitETA).map((train, i, arr) => (
                  <div className="saveStnBox">
                    <div className="saveStnBoxRow">
                      <div className="saveStnBox_To">
                        {DictM.Common[lang].to +
                          DictM.MtrStations[train.dest][lang + "_name"]}
                        {train.route === "RAC" ? (
                          <small>{DictM.Common[lang].ealRAC}</small>
                        ) : null}
                      </div>
                      <div className={"mtr__plat" + line}>{train.plat}</div>
                      <div className="trainArrowBox">
                        {arr.length - 1 === i ? null : <ArrowForwardIcon />}
                      </div>
                    </div>

                    <div className="saveStnBoxRow">
                      <div className="saveStnBoxTime">
                        <small>
                          {train.ttnt < 1 ? (
                            <Blink
                              fontSize="small"
                              color="blue"
                              text={DictM.Common[lang].dep}
                            ></Blink>
                          ) : (
                            train.ttnt +
                            DictM.Common[lang].min +
                            " (" +
                            new Date(
                              Date.parse(train.time.replace(/-/g, "/"))
                            ).toLocaleTimeString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                            }) +
                            ")"
                          )}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {mtrEta.UP?.length > 0 ? <Divider /> : null}

              <div className="saveStnETA">
                {mtrEta.DOWN?.slice(0, limitETA).map((train, i, arr) => (
                  <div className="saveStnBox">
                    <div className="saveStnBoxRow">
                      <div className="saveStnBox_To">
                        {DictM.Common[lang].to +
                          DictM.MtrStations[train.dest][lang + "_name"]}
                        {train.route === "RAC" ? (
                          <small>{DictM.Common[lang].ealRAC}</small>
                        ) : null}
                      </div>
                      <div className={"mtr__plat" + line}>{train.plat}</div>
                      <div className="trainArrowBox">
                        {arr.length - 1 === i ? null : <ArrowForwardIcon />}
                      </div>
                    </div>
                    <div className="saveStnBoxRow">
                      <div className="saveStnBoxTime">
                        <small>
                          {train.ttnt < 1 ? (
                            <Blink
                              fontSize="small"
                              color="blue"
                              text={DictM.Common[lang].dep}
                            ></Blink>
                          ) : (
                            train.ttnt +
                            DictM.Common[lang].min +
                            " (" +
                            new Date(
                              Date.parse(train.time.replace(/-/g, "/"))
                            ).toLocaleTimeString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                            }) +
                            ")"
                          )}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {mtrEta.DOWN?.length > 0 ? <Divider /> : null}
            </CardContent>
          </Card>
        </Link>
      </div>
    );
  }
}

export default MTRSaveInfo;
