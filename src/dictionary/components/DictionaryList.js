import React from "react";
import { getDictionary, removeFromDictionary } from "../modules/dictionary";
import DictionaryItem from "./DictionaryItem";
import '../styles/DictionaryList.scss'

export default () => {
    const [dictionary, setDictionary] = React.useState([])

    React.useEffect(() => {
        updateDict()
    }, [])

    const updateDict = () => {
        getDictionary()
            .then((result) => setDictionary(result))
    }

    const deleteWordFromDict = (word) => {
        removeFromDictionary(word)
            .then(() => updateDict())
    }

    return (
        <div className="dictionaryList">
            <ul>
                {dictionary.length > 0 && dictionary.map((item) => {
                    const [word, translate] = item

                    return (
                        <DictionaryItem
                            deleteWordFromDict={deleteWordFromDict}
                            word={word}
                            translate={translate}
                        />
                    )
                })}
            </ul>
        </div>
    );
};
