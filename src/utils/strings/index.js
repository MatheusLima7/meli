const nameNormalizer = (str, separator = "_") =>
    str
        .toLowerCase()
        .replace(/(^\s{1,}|\s{1,}$)/g, "")
        .replace(/\s/g, separator)
        .replace(new RegExp(/\s/g), "")
        .replace(new RegExp(/[àáâãäå]/g), "a")
        .replace(new RegExp(/æ/g), "ae")
        .replace(new RegExp(/ç/g), "c")
        .replace(new RegExp(/[èéêë]/g), "e")
        .replace(new RegExp(/[ìíîï]/g), "i")
        .replace(new RegExp(/ñ/g), "n")
        .replace(new RegExp(/[òóôõö]/g), "o")
        .replace(new RegExp(/œ/g), "oe")
        .replace(new RegExp(/[ùúûü]/g), "u")
        .replace(new RegExp(/[ýÿ]/g), "y");

export default {
    nameNormalizer,
};
