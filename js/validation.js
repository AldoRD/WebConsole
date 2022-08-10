let patternColorOnly =
  /^\({1}((?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\))\){1}:{1}$/i;
let patternColorSearch =
  /(\({1}(?:(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\))\){1}:{1})/i;
let patternQuotes = /("{1}.*?"{1})/g;

function splitForQuotesAndSpaces(str = '') {
  let string = str.split(patternQuotes).filter(Boolean);
  let array = [];

  string.forEach((s, index) => {
    if (patternQuotes.test(s))
      array.push({
        string: s,
        index,
      });
  });

  string = str.replace(patternQuotes, '').split(' ').filter(Boolean);
  array.forEach((e) => {
    string.splice(e.index, 0, e.string);
  });

  return string;
}

const validation = {
  isString(str) {
    let pattern = /^\w{1,10}$/;
    return pattern.test(str);
  },
  isNumber(str) {
    let pattern = /^\d{1,10}$/;
    return pattern.test(str);
  },
  isColor(str) {
    let pattern = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    return pattern.test(str);
  },
  isStrBtwQuotes(str) {
    let pattern = /^"{1}.*?"{1}$/;
    return pattern.test(str);
  },
  allCharacters(str) {
    let pattern = /^.*$/;
    return pattern.test(str);
  },
};

const regexStrings = {
  isString: '\\w{1,10',
  isNumber: '\\d{1,5}',
  isColor: '#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})',
  allCharacters: '.*',
};
