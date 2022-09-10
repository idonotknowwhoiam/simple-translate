import browser from "webextension-polyfill";

export const setDictionary = async (word, translate) => {
    const response = await browser.storage.local.get("Dictionary");
    const dictionary = response.Dictionary || []

    if (dictionary.find((item) => item[0] === word)) return
    dictionary.push([word, translate])

    await browser.storage.local.set({ Dictionary: dictionary });
};

export const getDictionary = async () => {
    const response = await browser.storage.local.get("Dictionary");
    return response.Dictionary || [];
};

export const isInDictionary = async (word) => {
    const response = await browser.storage.local.get("Dictionary");
    let dictionary = response.Dictionary || []

    const findedWord = dictionary.find((item) => item[0] === word)

    return !!findedWord
};

export const removeFromDictionary = async (word) => {
    const response = await browser.storage.local.get("Dictionary");
    let dictionary = response.Dictionary || []

    dictionary = dictionary.filter((item) => item[0] !== word)

    await browser.storage.local.set({ Dictionary: dictionary });
};