import React from "react";
import browser from "webextension-polyfill";
import openUrl from "src/common/openUrl";
import { patreonLink } from "src/common/personalUrls";
import HeartIcon from "../icons/heart.svg";
import DictIcon from "../icons/dict.svg";
import SettingsIcon from "../icons/settings.svg";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import "../styles/Header.scss";
import { getSettings } from "src/settings/settings"

const openPatreon = () => {
  openUrl(patreonLink);
};

const openSettings = () => {
  const url = "../options/index.html#settings";
  openUrl(url);
};

const openDictionary = () => {
  const url = "../dictionary/index.html";
  openUrl(url);
};

const getToggleButtonTitle = isEnabled => {
  return isEnabled
    ? browser.i18n.getMessage("disableOnThisPage")
    : browser.i18n.getMessage("enableOnThisPage");
};


export default props => {
  const shouldDictButtonShow = getSettings("isDictEnable")

  return (
    <div id="header">
      <div className="title">Simple Translate</div>
      <div className="rightButtons">
        <div className="toggleButton" title={getToggleButtonTitle(props.isEnabledOnPage)}>
          <Toggle
            checked={props.isEnabledOnPage}
            onChange={props.toggleEnabledOnPage}
            icons={false}
            disabled={!props.isConnected}
          />
        </div>
        <button
          className="heartButton"
          onClick={openPatreon}
          title={browser.i18n.getMessage("donateLabel")}
        >
          <HeartIcon />
        </button>
        {shouldDictButtonShow && (<button
          className="dictButton"
          onClick={openDictionary}
          title={browser.i18n.getMessage("dictionaryLabel")}
        >
          <DictIcon />
        </button>)}
        <button
          className={"settingsButton"}
          onClick={openSettings}
          title={browser.i18n.getMessage("settingsLabel")}
        >
          <SettingsIcon />
        </button>
      </div>
    </div>
  )
}
