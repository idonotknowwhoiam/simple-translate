import React from "react";
import '../styles/DictionaryItem.scss'

export default ({ word, translate, deleteWordFromDict }) => {
    return (
        <div className="dictionaryItem">
            <li>
                <button onClick={() => { deleteWordFromDict(word) }}>
                    X
                </button>
                <b>{word}: </b>
                <span>{translate}</span>
            </li>
        </div>
    );
};
