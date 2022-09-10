import React from "react";
import { initSettings, getSettings } from "../../settings/settings";
import "../styles/DictionaryPage.scss";
import DictionaryList from "./DictionaryList";

const setupTheme = async () => {
    await initSettings();
    document.body.classList.add(getSettings("theme") + "-theme");

    browser.storage.onChanged.addListener((changes) => {
        if (changes.Settings.newValue.theme === changes.Settings.oldValue.theme)
            return;

        document.body.classList.replace(
            changes.Settings.oldValue.theme + "-theme",
            changes.Settings.newValue.theme + "-theme"
        );
    });
};

const UILanguage = browser.i18n.getUILanguage()
const rtlLanguage = ['he', 'ar'].includes(UILanguage)
const dictionaryPageClassName = 'dictionaryPage' + (rtlLanguage ? ' rtl-language' : '')

export default () => {
    setupTheme();

    return (
        <div className={dictionaryPageClassName}>
            <DictionaryList />
        </div>
    );
};
