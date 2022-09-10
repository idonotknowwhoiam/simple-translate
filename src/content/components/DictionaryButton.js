import React, { Component } from "react";
import browser from "webextension-polyfill";
import { setDictionary, isInDictionary, removeFromDictionary } from "src/dictionary/modules/dictionary";
import '../styles/TranslatePanel.scss'


const plusIcon = browser.extension.getURL("icons/plus.png");
const tickIcon = browser.extension.getURL("icons/tick.png");

export default class DictionaryButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alreadySaved: false,
        }
        this.trimmedSelectedText = this.props.selectedText.trim()
    }

    componentDidMount() {
        isInDictionary(this.trimmedSelectedText)
            .then((result) => this.setState({ alreadySaved: result }))
    }

    handleClick = () => {
        if (this.state.alreadySaved) {
            removeFromDictionary(this.trimmedSelectedText)
                .then(() => this.setState({ alreadySaved: false }))
        } else {
            setDictionary(this.trimmedSelectedText, this.props.resultText)
                .then(() => this.setState({ alreadySaved: true }))
        }
    }

    render = () => {
        return (
            <div
                onClick={this.handleClick}
                style={{ backgroundImage: `url(${this.state.alreadySaved ? tickIcon : plusIcon})` }}
                className="simple-translate-dict-btn"
            />
        );
    };
}