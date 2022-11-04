//? === Internal React engine useCallback === ////

let memoized = [];
let numOfCalls = 0;
let callback;

const useCallback = (fn, arr) => {
  numOfCalls++;
  //console.log("arr", arr);
  let returnedFunc = {};

  //console.log("numOfCalls", numOfCalls);
  if (numOfCalls === 1) {
    callback = fn;
    memoized = [...arr];
    returnedFunc.fn = callback;
  }

  if (numOfCalls > 1) {
    //console.log("memoized", memoized);
    memoized.forEach((el) => {
      arr.forEach((elm) => {
        if (el === elm) {
          returnedFunc.fn = callback;
        } else {
          returnedFunc.fn = fn;
        }
      });
    });
  }

  return returnedFunc;
};

//! === React code =======  //

let running = 0;

const App = (dependency) => {
  const func = useCallback(() => {
    running++;
    // console.log(
    //   "I run",
    //   running,
    //   running === 1 ? "time" : "times",
    //   running === 1 ? "- first time" : "- second time"
    // );
  }, [dependency]);

  return func;
};

const dependency1 = "a";
const dependency2 = "b";

//*  === first render === //

const res1 = App(dependency1);

//*  === second render === //

const res2 = App(dependency2);

res1.fn();
res2.fn();

// console.log(
//   "has the function returned by useCallback the same identity?:",
//   res1.fn === res2.fn
// );

// books = [
//   { title: "C++", author: "Bjarne" },
//   { title: "Java", author: "James" },
//   { title: "Python", author: "Guido" },
//   { title: "Java", author: "James" },
// ];

// let jsonObject = books.map(JSON.stringify);

// const uniqueSet = new Set(jsonObject);
// uniqueArray = Array.from(uniqueSet).map(JSON.parse);

// console.log(uniqueArray);

function isIsofarm(word) {
  return new Set(word.toUpperCase()).size === word.length;
}

//[[18, 20], [45,2], [61, 12], [37,6], [21,21], [78,9] ]

function openToSenior() {
  const categories = [
    [18, 20],
    [45, 2],
    [61, 12],
    [37, 6],
    [21, 21],
    [78, 9],
  ];
  return categories.map(([age, handicap]) => {
    return age >= 55 && handicap > 7 ? "Senior" : "Open";
  });
}

function toCamelCase(str) {
  const findSeperator = str.includes("-") ? "-" : "_";
  return str
    .split(findSeperator)
    .map((word, index) => {
      return index > 0
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word;
    })
    .join("");
}

function anagrams(word, words) {
  const original = wordSorting(word);

  let arrayOfObjects = [];
  words.forEach((item) => {
    if (original === wordSorting(item)) {
      arrayOfObjects.push(item);
    }
  });
  return arrayOfObjects;
}

function wordSorting(word) {
  return [...word].sort().join("");
}

function alphabeticPosition(text) {
  return text
    .replace(/[^a-zA-Z]/g, "")
    .split("")
    .map((letter) => {
      return letter.toUpperCase().charCodeAt(0) - 64;
    })
    .join(" ");
}

function filterList(list) {
  let result = [];
  list.reduce((prev, cur) => {
    if (typeof cur === "number" && cur > -1) {
      result.push(cur);
    }
  }, {});
  return result;
}

function scramble(str1, str2) {
  //let letterCountStr1 = {};
  let isExist = false;

  const letterCountStr1 = str1
    .split("")
    .reduce((lettercounts, currentLetter) => {
      if (lettercounts[currentLetter]) {
        lettercounts[currentLetter] = lettercounts[currentLetter] + 1;
      } else {
        lettercounts[currentLetter] = 1;
      }
      return lettercounts;
    }, {});

  console.log({ letterCountStr1 });

  for (var i = 0; i < str2.length; i++) {
    const currentLetter = str2[i];
    if (letterCountStr1[currentLetter]) {
      isExist = true;
    } else {
      isExist = false;
      break;
    }
  }
  return isExist;
}

function scrambleWitProtoType(str1, str2) {
  const letterCountStr1 = Array.prototype.reduce.call(
    str1,
    (lettercounts, currentLetter) => {
      if (lettercounts[currentLetter]) {
        lettercounts[currentLetter] = lettercounts[currentLetter] + 1;
      } else {
        lettercounts[currentLetter] = 1;
      }
      return lettercounts;
    },
    {}
  );

  return Array.prototype.every.call(str2, (currentLetter) => {
    if (letterCountStr1[currentLetter]) {
      return true;
    } else {
      return false;
    }
  });
}

function timeFormat(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = (totalSeconds % 3600) - minutes * 60;

  const padNumber = (number) => number.toString().padStart(2, "0");

  return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
}

function sumString(a, b) {
  if (a == "" || b == "") return "0";
  return (Number(a) + Number(b)).toString();
}

function getSum(a, b) {
  if (a === b) return a;
  ///
  return a === b ? a : a + b;
}

function findOdd(numberArray) {
  const numberCount = Array.prototype.reduce.call(
    numberArray,
    (lettercounts, currentLetter) => {
      lettercounts[currentLetter] = lettercounts[currentLetter] || 0;
      lettercounts[currentLetter]++;
      return lettercounts;
    },
    {}
  );
  for (const letter in numberCount) {
    if (numberCount[letter] % 2 !== 0) {
      return letter;
    }
  }
}

function digitalRoot(n) {
  while (n > 9) {
    n = Array.prototype.reduce.call(
      n.toString().split(""),
      (acc, curr) => {
        return acc + Number(curr);
      },
      0
    );
  }
  return n;
}

function digitalRootRecursive(n) {
  while (n > 9) {
    let sum = 0;

    while (n > 0) {
      const lastDigit = n % 10;
      n = Math.floor(n / 10);
      sum += lastDigit;
    }
    n = sum;
  }
  return n;
}

function songDecoder(song) {
  // console.log(
  //   song
  //     .split("WUB")
  //     .filter((letter) => letter.trim())
  //     .join(" ")
  // );

  return song.replace(/(WUB)+/g, " ").trim();
}

function moveToZero(array) {
  let sortArray = [];
  const zeroCount = array.filter((x) => x === 0).length;
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
    if (array[i] != 0) {
      sortArray.push(array[i]);
    }
  }

  for (let i = 0; i < zeroCount; i++) {
    sortArray.push(0);
  }

  return sortArray;
}
//A-Bb-Ccc-Dddd

// function accum(s) {
//   let result = "";

//   for (let i = 0; i < s.length; i++) {
//     const curr = s[i];
//     result +=
//       i == 0
//         ? `${curr.toUpperCase()}-`
//         : `${curr.toUpperCase()}${curr.repeat(i).toLowerCase()}${
//             i !== s.length - 1 ? "-" : ""
//           }`;
//   }
//   return result;
// }

function accum(s) {
  return Array.prototype.reduce.call(
    s.split(""),
    (acc, curr, index) => {
      console.log({ acc });
      return (acc +=
        index == 0
          ? `${curr.toUpperCase()}-`
          : `${curr.toUpperCase()}${curr.repeat(index).toLowerCase()}${
              index !== s.length - 1 ? "-" : ""
            }`);
    },
    ""
  );
}

String.prototype.toJadenCase = function () {
  return this.toString()
    .trim()
    .split(" ")
    .reduce((prev, current) => {
      return (prev +=
        current.charAt(0).toUpperCase() + current.slice(1).toLowerCase() + " ");
    }, "");
};

var str = "How can mirrors be real if our eyes aren't real";
var jadenStr = str.toJadenCase();

function XO(str) {
  const xRegex = new RegExp("x", "i"); //case insensetive
  const oRegex = new RegExp("o", "i");

  return str.split("").reduce(
    (counts, letter, index) => {
      if (letter.match(xRegex)) {
        counts.xCount++;
      } else if (letter.match(oRegex)) {
        counts.oCount++;
      }
      if (index < str.length - 1) {
        return counts;
      } else {
        return counts.xCount == counts.oCount;
      }
    },
    { xCount: 0, oCount: 0 }
  );
}

function getVowelsCount(str) {
  return (str.match(/[aeiou]/gi) || []).length;
}

// 'Pig latin is cool => igPay atinlay siay oolcay

function pigIt(str) {
  return str.split(" ").reduce((newString, letter) => {
    const firstLetter = letter.charAt(0);
    const isPuncuation = letter.match(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g);
    return (newString +=
      isPuncuation == null ? `${letter.slice(1)}${firstLetter}ay ` : letter);
  }, "");
}

function letterWithMaximumOccurance(str) {
  const result = {};

  for (let i = 0; i < str.length; i++) {
    const currentLetter = str[i];
    if (currentLetter !== " ") {
      result[currentLetter] = result[currentLetter] || 0;
      result[currentLetter]++;
    }
  }
  const maximumValue = Math.max(...Object.values(result));
  return Object.keys(result).find((key) => result[key] === maximumValue);
}

function maskify(str) {
  let maskifyPwd = "";

  //normal loop
  for (let i = 0; i < str.length; i++) {
    if (i < str.length - 4) {
      maskifyPwd += "#";
    } else {
      maskifyPwd += str[i];
    }
  }

  //reverse loop
  for (let i = str.length - 1; i >= 0; i--) {
    if (i >= str.length - 4) {
      maskifyPwd = str[i] + maskifyPwd;
    } else {
      maskifyPwd = "#" + maskifyPwd;
    }
  }
  return maskifyPwd;
}

function plindromeChainLength(n) {
  let count = 0;
  let currentNumber = n;

  const reverse = (number) => +number.toString().split("").reverse().join("");

  const isPlindrome = (number) => {
    return number == reverse(number);
  };

  while (!isPlindrome(currentNumber)) {
    console.log(
      "Investigate",
      `${reverse(currentNumber)} + ${currentNumber}`,
      reverse(currentNumber) + currentNumber
    );
    currentNumber = reverse(currentNumber) + currentNumber;
    count++;
  }

  return count;
}

function romanNumberEncoder(number) {
  const lookup = {
    1: "I",
    4: "IV",
    5: "V",
    9: "IX",
    10: "X",
    40: "XL",
    50: "L",
    90: "XC",
    100: "C",
    400: "CD",
    500: "D",
    600: "DC",
    900: "CM",
    1000: "M",
  };

  let roman = "";
  const keys = Object.keys(lookup);

  while (number > 0) {
    for (let i = keys.length - 1; i >= 0; i--) {
      let romanLetter = keys[i];
      if (number >= romanLetter) {
        roman += lookup[romanLetter];
        number -= romanLetter;
        break;
      }
    }
  }
  return roman;
}

function sortedWords(words) {
  return words
    .split(" ")
    .reduce((sortedWords, word) => {
      let digit = +word.match(/\d/)[0];
      sortedWords[digit - 1] = word;
      return sortedWords;
    }, [])
    .join(" ");
}

function comp(array1, array2) {
  if (array1.length !== array2.length) return false;

  const squaredValues = array2.reduce((values, value) => {
    values[value] = values[value] || 0;
    values[value]++;
    return values;
  }, {});

  return array1.every((element) => {
    const squareNumber = element * element;
    if (!squaredValues[squareNumber]) {
      return false;
    } else {
      squaredValues[squareNumber]--;
      return true;
    }
  });
}

function divisor(number) {
  const divisorNumbers = [];
  for (let i = 2; i < number; i++) {
    const integerNumber = number / i;
    if (Number.isInteger(integerNumber)) {
      divisorNumbers.push(i);
    }
  }
  return divisorNumbers.length > 0 ? divisorNumbers : `${number} is prime`;
}

function spinWords(words) {
  return words.split(" ").reduce((words, word, index) => {
    if (word.length >= 5) {
      word = word.split("").reverse().join("");
    }
    words += index !== 0 ? " " + word : word;
    return words;
  }, "");
}

//cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200});

function cakes(reciepe, available) {
  const isComparing = Object.keys(reciepe).every((element) => {
    return available.hasOwnProperty(element);
  });
  if (!isComparing) return 0;

  return Object.keys(reciepe).reduce((numCakes, ingrediant) => {
    if (numCakes && available[ingrediant]) {
      const amountPerCake = reciepe[ingrediant];
      const amountAvailable = available[ingrediant];
      const possibleNumCakes = Math.floor(amountAvailable / amountPerCake);
      if (possibleNumCakes < numCakes) {
        numCakes = possibleNumCakes;
      }
      return numCakes;
    } else {
      return 0;
    }
  }, Infinity);
}

function squareDigitsWithReduce(num) {
  return +num
    .toString()
    .split("")
    .reduce((squareNumber, digits) => {
      return squareNumber + Math.pow(digits, 2);
    }, "");
}

function squareDigitReducePrototype(num) {
  return +Array.prototype.reduce.call(
    num.toString(),
    (squareNumber, digits) => {
      return squareNumber + Math.pow(digits, 2);
    },
    ""
  );
}

function duplicateCount(text) {
  return Array.prototype.reduce.call(
    text,
    ({ count, duplicates, numDuplicates }, letter) => {
      const currentLetter = letter.toLowerCase();
      count[currentLetter] = count[currentLetter] || 0;
      count[currentLetter]++;

      if (count[currentLetter] > 1 && !duplicates[currentLetter]) {
        numDuplicates++;
        duplicates[currentLetter] = true;
      }

      return { count, duplicates, numDuplicates };
    },
    { count: {}, duplicates: {}, numDuplicates: 0 }
  ).numDuplicates;
}

function orderWeight(input) {
  const sumDigits = (num) =>
    num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + +digit, 0);

  return input
    .split(" ")
    .sort((a, b) => {
      const wgtA = sumDigits(a);
      const wgtB = sumDigits(b);

      if (wgtA < wgtB) {
        return -1;
      }
      if (wgtA > wgtB) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    })
    .join(" ");
}

//codecata #12

class PaginationHelper {
  constructor(collection, itemsPerPage) {
    this.collection = collection;
    this.itemsPerPage = itemsPerPage;
  }

  itemCount() {
    return this.collection.length;
  }

  pageCount() {
    return Math.ceil(this.collection.length / this.itemsPerPage);
  }

  pageItemCount(pageIndex) {
    if (pageIndex > this.pageCount() - 1) return -1;

    if (pageIndex < this.pageCount() - 1) {
      return this.itemsPerPage;
    } else {
      return this.itemCount() * this.itemsPerPage;
    }
  }
  pageIndex(itemIndex) {}
}

function printerError(str) {
  const numberOfLetters = (str.match(/[^a-m]/gi) || []).length; // ^ matched any thing not in given range
  return `${numberOfLetters}/${str.length}`;
}

function assign(target, source) {
  Object.entries(source).forEach(([key, value]) => {
    target[key] = value;
  });
  return target;
}

function deepAssign(target, source) {
  Object.entries(source).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      target[key] = value.slice();
    } else if (typeof value === "object") {
      target[key] = deepAssign({}, value);
    } else {
      target[key] = value;
    }
  });
  return target;
}

function firstNonRepeatingLetters(s) {
  if (!s) return "";
  const lettersCount = Array.prototype.reduce.call(
    s,
    (lettersCount, currentLetter) => {
      currentLetter = currentLetter.toLowerCase();
      lettersCount[currentLetter] = lettersCount[currentLetter] || 0;
      lettersCount[currentLetter]++;
      return lettersCount;
    },
    {}
  );

  return (
    Array.prototype.find.call(s, (letter) => {
      return lettersCount[letter.toLowerCase()] === 1;
    }) || ""
  );
}

function longest(s1, s2) {
  const uniq = new Set(s1 + s2);
  return [...uniq.values()].sort().join("");
}

function duplicateEncoder(str) {
  const lettersCount = Array.prototype.reduce.call(
    str,
    (count, letter) => {
      letter = letter.toLowerCase();
      count[letter] = count[letter] || 0;
      count[letter]++;
      return count;
    },
    {}
  );

  return Array.prototype.reduce.call(
    str,
    (pren, letter) => {
      return lettersCount[letter.toLowerCase()] > 1
        ? (pren += ")")
        : (pren += "(");
    },
    ""
  );
}

function fibonacchi(n, cache = {}) {
  if (cache[n]) return cache[n];

  if (n == 0 || n == 1) {
    return n;
  }

  cache[n] = fibonacchi(n - 1, cache) + fibonacchi(n - 2, cache);
  return cache[n];
}

function filterQuery(s, q) {
  const result = [];
  const search = s.join("");
  for (let i = 0; i < q.length; i++) {
    const query = q[i];

    const regx = new RegExp(query, "g");
    const count = (search.match(regx) || []).length;
    result.push([query, count]);
  }
  return result;
}

function capitalIndex(word) {
  return Array.prototype.reduce.call(
    word,
    (acc, letter, index) => {
      if (letter.match(/[A-Z]/)) {
        acc.push(index);
      }
      return acc;
    },
    []
  );
}

//prototype

String.prototype.yell = function () {
  return this.toUpperCase() + "!!!";
};

const person = "meraj";

function generateHashtag(str) {
  if (!str.trim()) return false;

  const result = str
    .trim()
    .split(/\s+/g)
    .reduce((prev, current) => {
      return (prev +=
        current.charAt(0).toUpperCase() + current.slice(1).toLowerCase());
    }, "");

  if (result.length >= 140) return false;
  return "#" + result;
}

function binaryArrayToNumber(arr) {
  return arr.reduce((sum, number, index) => {
    return (sum += number * Math.pow(2, arr.length - 1 - index));
  }, 0);
}

function compare(number1, number2) {
  const [base1, exp1] = number1;
  const [base2, exp2] = number2;

  const number1Lincolin = exp1 * Math.log10(base1);
  const number2Lincolin = exp2 * Math.log10(base2);

  return number1Lincolin > number2Lincolin ? number1 : number2;
}

function friend(friends) {
  return friends.filter((e) => e.length == 4);
}

function inArray(array1, array2) {
  return array1
    .reduce((resultArray, word) => {
      const regx = new RegExp(word, "g");

      if (array2.some((e) => e.match(regx))) {
        resultArray.push(word);
      }
      return resultArray;
    }, [])
    .sort();
}

function removeZero(numbers) {
  return numbers
    .map((number) => {
      return +number.toString().replace(/0/g, "");
    })
    .reverse();
}

Math.round = function (number) {
  if (Number.isInteger(number)) return number;
  const [digit, decimal] = number.toString().split(".");
  if (number > 0) {
    return decimal.charAt(0) >= 5 ? +digit + 1 : +digit;
  } else {
    return decimal.charAt(0) > 5 ? +digit + 1 : +digit;
  }
};

Math.ceil = function (number) {
  if (Number.isInteger(number)) return number;
  const [digit] = number.toString().split(".");
  return number > 0 ? +digit + 1 : +digit;
};

Math.floor = function (number) {
  if (Number.isInteger(number)) return number;
  const [digit] = number.toString().split(".");
  return number > 0 ? +digit : +digit + 1;
};

function timeOutEx() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 2000);
  }
}
function x() {
  setTimeout(function () {
    console.log(i);
  }, 1000);

  var i = 1;
}

function objEntries() {
  const personx = { name: "meraj", age: 20 };

  return Object.keys(personx).map((key) => [key, personx[key]]);
}

const sequenceSum = (begin, end, step) => {
  let sum = 0;
  for (let i = begin; i <= end; i += step) {
    sum += i;
  }
  return sum;
};

//Most consective zerors but function length should be less than 60
function f(inp) {
  // const zeros = number.toString().match(/(0+)/g);
  // const lenghts = zeros.map((z) => z.length);
  return Math.max(
    ...inp
      .toString()
      .match(/(0+)/g)
      .map((z) => z.length)
  );
}

function toUnderscore(string) {
  return ("" + string)
    .split(/(?=\d[A-Z])/)
    .join("_")
    .toUpperCase();
}

//console.log(toUnderscore("MovieTender"));

function convertPower(number) {
  return +number
    .toString()
    .split("")
    .reduce((result, number) => {
      const power = Math.pow(+number, 2); //+number * 2;
      return (result += power);
    }, "");
}

function amaroPlan(pirateNum) {
  return Array.from({ length: pirateNum }, (_, i) => {
    if (i === 0) {
      return pirateNum * 20 - Math.floor((pirateNum - 1) / 2);
    } else {
      return (i + 1) % 2;
    }
  });
}

function trickOrTreat(children, candies) {
  const hasBomb = (bag) => bag.some((item) => item === "bomb");
  if (children !== candies.length || candies.some(hasBomb))
    return "Trick or treat!";
  const [first] = candies;
  const candyCount = first.filter((item) => item === "candy").length;

  if (candyCount < 2) return "Trick or treat!";

  return candies.every(
    (candy) => candy.filter((x) => x === "candy").length === candyCount
  ) == true
    ? "Thank you, strange uncle!"
    : "Trick or treat!";
}

function sumOfAll(number) {
  const sum = [...(number + "")].reduce((sum, num) => {
    return sum + +num;
  }, 0);

  if (sum > 10) return sumOfAll(sum);

  return sum;
}

function tickets(peopleLine) {
  const chageMoney = peopleLine.reduce((remaining, num) => {
    if (num > 25) {
      return remaining + (num - 25);
    }
    return remaining;
  }, 0);

  return peopleLine.reduce((ticket, num) => {
    if (num > 25) {
      ticket = num - 25 < chageMoney ? "Yes" : "No";
    } else {
      ticket = "Yes";
    }
    return ticket;
  }, "");
}

function curry(a) {
  return (b) => {
    return a + b;
  };
}

function validatePIN(pin) {
  return /^(\d{4}|\d{6})$/.test(pin);
}

class Vector {
  constructor(components) {
    this.components = components;
  }

  get length() {
    return this.components.length;
  }

  add(vector) {
    const func = (comp, i) => comp + vector.components[i];
    const components = this.mapComponents(vector, func);

    return new Vector(components);
  }

  equals(vector) {
    return this.components.every(
      (component, i) => component === vector.components[i]
    );
  }

  subtract(vector) {
    const func = (comp, i) => comp - vector.components[i];
    const components = this.mapComponents(vector, func);

    return new Vector(components);
  }

  dot(vector) {
    const func = (comp, i) => comp * vector.components[i];
    const components = this.mapComponents(vector, func);

    return components.reduce((sum, num) => sum + num);
  }

  norm() {
    return Math.sqrt(
      this.components.reduce((sum, num) => {
        return (sum = sum + Math.pow(num, 2));
      }, 0)
    );
  }

  mapComponents(vector, func) {
    if (vector.length !== this.length)
      throw new Error("Vectors must be same lenght");

    const components = this.components.map(func);
    return components;
  }

  toString() {
    return "(" + this.components + ")";
  }
}

function findMissingLetter(array) {
  return String.fromCharCode(
    array.reduce(
      ({ previous, missing }, word, i) => {
        const currentWord = word.charCodeAt(0);
        if (i > 0) {
          previous = array[i - 1].charCodeAt(0);
        }
        if (i > 0 && currentWord - previous !== 1) {
          missing = previous + 1;
        }
        return { previous, missing };
      },
      { previous: 0, missing: 0 }
    ).missing
  );
}

//Didn't approve on codewars because of confusion
let count = 0;
function arrayDepth(array) {
  count++;
  array.forEach((elem) => {
    if (Array.isArray(elem)) {
      count++;
      if (elem.length > 0) {
        arrayDepth(elem);
      }
    }
  });
  return count;
}

//didn't approve final test
function solution(number) {
  return +Array.from({ length: number - 1 }, (_, i) => i).reduce(
    (result, number) => {
      const comparable = number + 1;
      if ([3, 5].includes(comparable)) return "";
      const divisibleByThree = comparable / 3;
      const divisbleByFive = comparable / 5;
      if (Number.isInteger(divisibleByThree)) {
        result += divisibleByThree + "";
      }
      if (Number.isInteger(divisbleByFive)) {
        result += divisbleByFive + "";
      }

      return result;
    },
    ""
  );
}

Array.prototype.remove_ = function (integer_list, values_list) {
  return integer_list.reduce((array, number) => {
    if (!values_list.includes(number)) {
      array.push(number);
    }
    return array;
  }, []);
};

const l = new Array();
integer_list = [8, 2, 7, 2, 3, 4, 6, 5, 4, 4, 1, 2, 3];
values_list = [2, 4, 3];

String.prototype.capitalize = function () {
  if (!this.toString().length) return "";
  let newStr = "";
  const wordToCapitalilze = this.toString()[0].charCodeAt(0);
  if (wordToCapitalilze >= 97 && wordToCapitalilze <= 122) {
    newStr +=
      String.fromCharCode(wordToCapitalilze - 32) + this.toString().slice(1);
  } else {
    newStr = this.toString();
  }
  return newStr;
};

// solution 2
String.prototype.capitalize = function () {
  let c = this.charCodeAt(0);
  if (97 <= c && c <= 122) c -= 32;

  return String.fromCharCode(c) + this.slice(1);
};

function findUniq(arr) {
  const numberCount = arr.reduce((count, number) => {
    count[number] = count[number] || 0;
    count[number]++;
    return count;
  }, {});

  return arr.reduce((uniq, number) => {
    if (numberCount[number] == 1) {
      uniq = number;
    }
    return uniq;
  }, 0);
}

const compareTwoArrays = (arr1 = [1, 2, 3], arr2 = [1, 2, 3]) => {
  if (arr1.length !== arr2.length) return false;

  return arr2.every((element) => arr1.includes(element));
};

function order(words) {
  const arrayWords = words.split(" ");
  return arrayWords.reduce((result, word, index) => {
    const filterWord = arrayWords.filter((e) => e.includes(index + 1));

    return (result += index !== 0 ? " " + filterWord : filterWord);
  }, "");
}

//Didn't verify
function getLengthOfMissingArray(arrayOfArrays) {
  return arrayOfArrays
    .sort(function (a, b) {
      return a?.length - b?.length;
    })
    .reduce(
      ({ previous, missing }, array, i) => {
        const currentArrayLength = array.length;

        if (i > 0) {
          previous = arrayOfArrays[i - 1].length;
        }
        if (i > 0 && currentArrayLength - previous !== 1) {
          missing = previous + 1;
        }
        return { previous, missing };
      },
      { previous: 0, missing: 0 }
    ).missing;
}

function removeSmallest(numbers) {
  const smallestNumber = Math.min(...numbers);
  return numbers.reduce(
    ({ numberArray, count }, number) => {
      if (number > smallestNumber) {
        numberArray.push(number);
      }
      if (number === smallestNumber) {
        count++;
      }
      if (count > 1 && number === smallestNumber) {
        numberArray.push(number);
      }
      return { numberArray, count };
    },
    { numberArray: [], count: 0 }
  ).numberArray;
}

function rot13(message) {
  return Array.prototype.reduce.call(
    message,
    (rot13, letter) => {
      const charCode = letter.charCodeAt(0);
      if (charCode >= 65 && charCode <= 90) {
        rot13 += String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) {
        rot13 += String.fromCharCode(((charCode - 97 + 13) % 26) + 97);
      } else {
        rot13 += letter;
      }
      return rot13;
    },
    ""
  );
}

//IIFE
bar();
(function abc() {
  //console.log("IIFFEE");
})();

function bar() {
  //console.log("meraj");
}

function minMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}

function isValidIP(str) {
  const octets = str.split(".");
  if (octets.length !== 4) return false;

  const isValidation = (numbers) => {
    if (numbers.length > 1 && numbers.startsWith("0")) {
      return false;
    }
    return +numbers >= 0 && +numbers <= 255 && numbers.match(/^\d+$/);
  };

  return octets.every(isValidation);
}

function reverseWords(words) {
  return words.split(" ").reduce((words, word, index) => {
    word = word.split("").reverse().join("");

    words += index !== 0 ? " " + word : word;
    return words;
  }, "");
}

function reverseWordsNative(words) {
  return Array.prototype.reduce.call(
    words,
    ({ reverseStr, reverseWord }, letter, i) => {
      if (letter !== " ") {
        reverseWord = letter + reverseWord;
      } else {
        reverseStr += reverseWord + " ";
        reverseWord = "";
      }
      if (words.length - 1 === i) {
        reverseStr = reverseStr + reverseWord;
      }
      return { reverseStr, reverseWord };
    },
    { reverseStr: "", reverseWord: "" }
  ).reverseStr;
}

function isPangram(str) {
  return (
    Object.keys(
      Array.prototype.reduce.call(
        str,
        (count, letter) => {
          const currentLetter = letter.toLowerCase();
          if (
            currentLetter.charCodeAt(0) >= 97 &&
            currentLetter.charCodeAt(0) <= 122
          ) {
            count[currentLetter] = count[currentLetter] || 0;
            count[currentLetter]++;
          }
          return count;
        },
        {}
      )
    ).length === 26
  );

  /* Below solution is master and perfomant */

  //return new Set(str.toLowerCase().match(/[a-z]/g)).size === 26;
}

function basicOp(operation, value1, value2) {
  return eval(`${value1} ${operation} ${value2}`);
}

function basicOpAnother(operation, value1, value2) {
  const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  const operatinFn = operations[operation];

  return operatinFn(value1, value2);
}

function numberToString(num) {
  return num + "";
}

function solutionMatch(str, ending) {
  return str.endsWith(ending);
}

function findShort(s) {
  return s.split(" ").reduce(
    ({ currentCount, count }, word, i) => {
      currentCount = word.length;
      if (i === 0) {
        count = currentCount;
      }

      if (currentCount < count) {
        count = currentCount;
      }
      return { currentCount, count };
    },
    { currentCount: 0, count: 0 }
  ).count;

  //Below is smart solution
  //Math.min(...w.split(" ").map(w => w.length))
}

function getOrder(input) {
  return [
    "Burger",
    "Fries",
    "Chicken",
    "Pizza",
    "Sandwich",
    "Onionrings",
    "Milkshake",
    "Coke",
  ]
    .reduce((order, item) => {
      const regx = new RegExp(item.toLowerCase(), "g");
      if (input.match(regx)) {
        order +=
          input.match(regx).length > 1
            ? item.repeat(input.match(regx).length)
            : item;
      }
      return order;
    }, "")
    .split(/(?=[A-Z])/)
    .join(" ");
}

function int32ToIp(int32) {
  const num = int32.toString(2).padStart(32, "0");
  return num
    .split(/(.{8})/)
    .filter((O) => O)
    .map((octet) => parseInt(octet, 2))
    .join(".");
}

function isPrime(num) {
  if (num < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

function isSubsetOf(s1, s2) {
  return [...s1].every((item) => s2.has(item));
}

function isSupersetOf(s1, s2) {
  return isSubsetOf(s2, s1);
}

function toWeirdCase(string) {
  return Array.prototype.reduce.call(
    string,
    ({ weird, order }, letter) => {
      if (letter !== " ") {
        weird += order % 2 !== 0 ? letter.toUpperCase() : letter.toLowerCase();
        order++;
      } else {
        weird += letter;
        order = 1;
      }
      return { weird, order };
    },
    { weird: "", order: 1 }
  ).weird;
}

function countCharacters(string) {
  return Array.prototype.reduce.call(
    string,
    (count, letter) => {
      count[letter] = count[letter] || 0;
      count[letter]++;

      return count;
    },
    {}
  );
}

function wave(str) {
  return Array.prototype.reduce.call(
    str,
    (wave, letter, index) => {
      if (letter !== " ") {
        const newString =
          str.substring(0, index) +
          letter.toUpperCase() +
          str.substring(index + 1);
        wave.push(newString);
      }

      return wave;
    },
    []
  );
}

String.prototype.camelCase = function () {
  return Array.prototype.reduce.call(
    this.toString().trim(),
    ({ camelCase, start }, letter) => {
      if (letter !== " ") {
        camelCase += start ? letter.toUpperCase() : letter;
        start = false;
      }
      if (letter === " ") {
        start = true;
      }

      return { camelCase, start };
    },
    { camelCase: "", start: true }
  ).camelCase;
};

function stringFromHash(pairs) {
  return Object.keys(pairs).reduce((hash, item, index) => {
    hash += `${item} = ${pairs[item]}${
      index + 1 === Object.keys(pairs).length ? "" : ","
    }`;
    return hash;
  }, "");
}

Array.prototype.square = function () {
  return this.map((item) => item * item);
};

Array.prototype.cube = function () {
  return this.map((item) => item * item * item);
};

Array.prototype.average = function () {
  if (this.length === 0) return NaN;
  return (
    this.reduce((sum, num) => {
      return (sum += num);
    }, 0) / this.length
  );
};

Array.prototype.sum = function () {
  return this.reduce((sum, num) => {
    return (sum += num);
  }, 0);
};

Array.prototype.even = function () {
  return this.reduce((even, num) => {
    if (num % 2 === 0) {
      even.push(num);
    }
    return even;
  }, []);
};

Array.prototype.odd = function () {
  return this.reduce((odd, num) => {
    if (num % 2 !== 0) {
      odd.push(num);
    }
    return odd;
  }, []);
};

//It works on Sorted array
function recursiveBinarySearch(arr, target) {
  return searchBinary(arr, target, 0, arr.length - 1);
}

function searchBinary(arr, target, leftIndex, rightIndex) {
  if (leftIndex > rightIndex) {
    return -1;
  }

  let middleIndex = Math.floor((leftIndex + rightIndex) / 2);

  if (target === arr[middleIndex]) {
    return middleIndex;
  }

  if (target < arr[middleIndex]) {
    return searchBinary(arr, target, 0, middleIndex - 1);
  } else {
    return searchBinary(arr, target, middleIndex + 1, rightIndex);
  }
}

//Worst case   - O(n^2) this happen when array is already sorted
//Average Case - O(nlogn) THis algo is so popular because of its average case complexity
function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let pivot = arr[arr.length - 1];
  let right = [];
  let left = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

//Big-O = O(nlogn) Best approach for sort
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const leftArray = arr.slice(0, mid);
  const rightArray = arr.slice(mid);

  return merge(mergeSort(leftArray), mergeSort(rightArray));
}

function merge(leftArray, rightArray) {
  const sortedArray = [];

  while (leftArray.length && rightArray.length) {
    if (leftArray[0] <= rightArray[0]) {
      sortedArray.push(leftArray.shift());
    } else {
      sortedArray.push(rightArray.shift());
    }
  }

  return [...sortedArray, ...leftArray, ...rightArray];
}

//Use Quick sort
function sortByLength(array) {
  if (array.length < 2) {
    return array;
  }
  let pivot = array[array.length - 1];
  let right = [];
  let left = [];

  for (let i = 0; i < array.length - 1; i++) {
    if (array[i].length < pivot.length) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [...sortByLength(left), pivot, ...sortByLength(right)];
}

function digitalRootX(n) {
  while (n > 9) {
    n = Array.prototype.reduce.call(
      "" + n,
      (result, num) => {
        return (result += +num);
      },
      0
    );
  }
  return n;
}

function breakCamelCase(string) {
  return Array.prototype.reduce.call(
    string,
    (camelCase, letter) => {
      return (camelCase +=
        letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90
          ? " " + letter
          : letter);
    },
    ""
  );
}

function validate(n) {
  const numArray = [];
  const numbers = n.toString().split("");
  let count = 0;
  for (let i = numbers.length - 1; i >= 0; i--) {
    const currentElem = +numbers[i];
    count++;
    if (count % 2 === 0) {
      let doubleDigit = currentElem + currentElem;
      if (doubleDigit > 9) {
        numArray.push(doubleDigit - 9);
      } else {
        numArray.push(doubleDigit);
      }
    } else {
      numArray.push(currentElem);
    }
  }
  const sum = numArray.reduce((result, num) => {
    return (result += num);
  }, 0);
  return sum % 10 === 0;
}

function validateCreditCard(n) {
  return (
    Array.prototype.reduceRight.call(
      n.toString(),
      ({ sum, count }, num) => {
        num = Number(num);
        count++;
        if (count % 2 === 0) {
          let digit = num + num;
          if (digit > 9) {
            sum += digit - 9;
          } else {
            sum += digit;
          }
        } else {
          sum += num;
        }
        return { sum, count };
      },
      { sum: 0, count: 0 }
    ).sum %
      10 ===
    0
  );
}

/* ALGORITHM LINK LIST */
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }

  /* Adding node at the top of list */
  prepend(value) {
    const node = new Node(value);
    if (!this.isEmpty()) {
      node.next = this.head;
    }
    this.head = node;
    this.size++;
  }

  /* Adding node at the end of list */
  append(value) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
    } else {
      let curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = node;
    }
    this.size++;
  }

  insert(value, index) {
    if (index < 0 || index > this.size) {
      return;
    }
    if (index === 0) {
      this.prepend(value);
    } else {
      const node = new Node(value);
      let prev = this.head;
      for (let i = 0; i < index - 1; i++) {
        prev = prev.next;
      }
      node.next = prev.next;
      prev.next = node;
      this.size++;
    }
  }

  removeFrom(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let removedNode;
    if (index === 0) {
      removedNode = this.head;
      this.head = this.head.next;
    } else {
      let prev = this.head;
      for (let i = 0; i < index - 1; i++) {
        prev = prev.next;
      }
      removedNode = prev.next;
      prev.next = removedNode.next;
    }
    this.size--;
    return removedNode.value;
  }

  removeValue(value) {
    if (this.isEmpty()) {
      return null;
    }
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return value;
    } else {
      let prev = this.head;
      while (prev.next && prev.next.value !== value) {
        prev = prev.next;
      }
      if (prev.next) {
        removedNode = prev.next;
        prev.next = removedNode.next;
        this.size--;
        return value;
      }
      return null;
    }
  }

  search(value) {
    if (this.isEmpty()) {
      return -1;
    }
    let i = 0;
    let curr = this.head;
    while (curr) {
      if (curr.value === value) {
        return i;
      }
      curr = curr.next;
      i++;
    }
    return -1;
  }

  reverse() {
    let prev = null;
    let curr = this.head;
    while (curr) {
      let next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.head = prev;
  }

  print() {
    if (this.isEmpty()) {
      console.log("List is empty");
    } else {
      let curr = this.head;
      let list = "";
      while (curr) {
        list += `${curr.value}->`;
        curr = curr.next;
      }
      console.log(list);
    }
  }
}

const linkList = new LinkedList();

//CFC
const parseCsv = (input, separator = ",", quote = '"') => {
  const returnParsedContent = [];
  let parsedRow = [];
  let parsedValue = "";
  let quoteBool = false;
  let skipNext = false;

  for (let i = 0; i < input.length; ++i) {
    const character = input[i];

    if (skipNext) {
      skipNext = false;
      continue;
    } else if (character === separator && !quoteBool) {
      parsedRow.push(parsedValue);
      parsedValue = "";
    } else if (character === "\n" && !quoteBool) {
      parsedRow.push(parsedValue);
      returnParsedContent.push(parsedRow);

      parsedValue = "";
      parsedRow = [];
    } else if (character === quote) {
      if (i < input.length - 1 && input[i + 1] === quote && quoteBool) {
        parsedValue = parsedValue.concat(character);
        skipNext = true;
      } else {
        quoteBool = !quoteBool;
      }
    } else {
      parsedValue = parsedValue.concat(character);
    }
  }

  if (quoteBool) {
    throw Error("Unclosed Quotes!");
  }

  parsedRow.push(parsedValue);
  returnParsedContent.push(parsedRow);

  return returnParsedContent;
};

//CFC
const colorizeWordle = (guess, word) => {
  guess = guess.split("");
  word = word.split("");
  let output = Array(5).fill("B");

  for (let i = 0; i < 5; i++) {
    if (guess[i] === word[i]) {
      output[i] = "G";
      guess[i] = "";
      word[i] = "";
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (!guess[i]) {
      continue;
    }
    if (word.includes(guess[i])) {
      output[i] = "Y";
      word[word.indexOf(guess[i])] = "";
    }
  }

  return output.join("");
};

function lookSay(n) {
  const array = [...(n + "")].reduce(
    ({ arr, counter }, num, i, listNums) => {
      counter.push(num);
      if (num !== listNums[i + 1]) {
        arr.push(counter);
        counter = [];
      }
      return { arr, counter };
    },
    { arr: [], counter: [] }
  ).arr;

  return +array.map((x) => x.length + "" + x[0]).join("");
}

console.log(lookSay(0), 10);
console.log(lookSay(11), 21);
console.log(lookSay(12), 1112);

// console.log(colorizeWordle("mamma", "maxim"), "GGYBB");
// console.log(colorizeWordle("reeks", "elder"), "YYYBB");
// console.log(colorizeWordle("preen", "alien"), "BBBGG");
// console.log(colorizeWordle("alpha", "tacks"), "YBBBB");

// console.log(parseCsv("1,2,3\n4,5,6", ",", '"'), [
//   ["1", "2", "3"],
//   ["4", "5", "6"],
// ]);
// console.log(parseCsv('1,"two was here",3\n4,5,6', ",", '"'), [
//   ["1", "two was here", "3"],
//   ["4", "5", "6"],
// ]);
// console.log(parseCsv("1\t2\t3\n4\t5\t6", "\t", '"'), [
//   ["1", "2", "3"],
//   ["4", "5", "6"],
// ]);
// console.log(parseCsv("", ",", '"'), [[""]]);
// console.log("ISEMPTY", linkList.isEmpty());
// linkList.prepend(10);
// linkList.prepend(20);
// linkList.prepend(30);
// console.log(linkList.getSize());
// console.log(linkList.print());

//console.log(validate(1230));
//console.log(validateCreditCard(5555555555554444));
//console.log(breakCamelCase("camelCasingTest"));
//console.log(digitalRootX(942));
// console.log(sortByLength(["Beg", "Life", "I", "To"]), [
//   "I",
//   "To",
//   "Beg",
//   "Life",
// ]);

//console.log(mergeSort([-5, 2, 4, 6, 10]));
//console.log(quickSort([-5, 2, 4, 6, 10]));

//console.log(recursiveBinarySearch([-5, 2, 4, 6, 10], 20));

// const numbers = [1, 2, 3, 4, 5];
// console.log(numbers.cube()); //// must return [1, 8, 27, 64, 125]
// console.log(numbers.average()); // must return 3
// console.log(numbers.sum());
// console.log(numbers.even()); // must return [2, 4]
// console.log(numbers.odd());
//console.log(stringFromHash({ a: 1, b: "2" }));

// console.log("test case".camelCase()); // "TestCase"
// console.log("camel case method".camelCase()); //"CamelCaseMethod"
// console.log("say hello ".camelCase()); //"SayHello"
// console.log(" camel case word".camelCase()); //"CamelCaseWord"

//console.log(wave("two words")); //result = ["Two words", "tWo words", "twO words", "two Words", "two wOrds", "two woRds", "two worDs", "two wordS"];
// console.log(countCharacters("aba"));
// console.log(countCharacters(""));
// console.log(toWeirdCase("This is a test")); //'ThIs Is A TeSt'
// console.log(toWeirdCase("This"));
// console.log(toWeirdCase("is"));
// console.log(toWeirdCase("String")); //"StRiNg"
// console.log(toWeirdCase("Weird string case")); //"WeIrD StRiNg CaSe"

// if (order % 2 !== 0) {
//   formation += letter.toUpperCase()
//  } else {
//   formation += letter.toUpperCase()
//  }

// let A1 = new Set([1, 2, 3]),
//   A2 = new Set([3, 2, 1]),
//   B = new Set([1, 2, 3, 4, 5]),
//   X = new Set([1, 2, 4, 5, 6, 7]);

// console.log(isSubsetOf(A1, A1), "A is contained in A");
// console.log(isSubsetOf(A1, A2), "{1,2,3} is contained in {3,2,1}");
// console.log(isSubsetOf(A1, B), "{1,2,3} is contained in {1,2,3,4,5}");
// console.log(!isSubsetOf(A1, X), "{1,2,3} is not contained in {1,2,4,5,6,7}");

// console.log(isPrime(0), false, "0 is not prime");
// console.log(isPrime(1), false, "1 is not prime");
// console.log(isPrime(2), true, "2 is prime");
// console.log(isPrime(73), true, "73 is prime");
// console.log(isPrime(75), false, "75 is not prime");
// console.log(isPrime(-1), false, "-1 is not prime");

// console.log(int32ToIp(2154959208)); //"128.114.17.104"
// console.log(int32ToIp(2149583361)); //"128.32.10.1"
// console.log(int32ToIp(2 ** 32 - 1)); //"255.255.255.255"
// console.log(int32ToIp(1766422235)); //expected '210.146.237.91' to equal '105.73.118.219'
// console.log(int32ToIp(0)); //"255.255.255.255"

// console.log(
//   getOrder("milkshakepizzachickenfriescokeburgerpizzasandwichmilkshakepizza"),
//   "Burger Fries Chicken Pizza Pizza Pizza Sandwich Milkshake Milkshake Coke"
// );

// console.log(
//   getOrder("pizzachickenfriesburgercokemilkshakefriessandwich"),
//   "Burger Fries Fries Chicken Pizza Sandwich Milkshake Coke"
// );

// console.log(
//   findShort("bitcoin take over the world maybe who knows perhaps"),
//   3
// );
// console.log(
//   findShort(
//     "turns out random test cases are easier than writing out basic ones"
//   ),
//   3
// );
// console.log(findShort("Let's travel abroad shall we"), 2);

//console.log(solutionMatch("abcde", "cde"), true);
//console.log(solutionMatch("abcde", "abc"), false);

// console.log(basicOp("+", 4, 7), 11);
// console.log(basicOp("-", 15, 18), -3);
// console.log(basicOp("*", 5, 5), 25);
// console.log(basicOp("/", 49, 7), 7);

// console.log(compareLargeNumbers("123", "122"), "greater");

// console.log(
//   compareLargeNumbers(
//     "1000000000000000000000000000000000",
//     "1000000000000000000000000000000001"
//   ),
//   "less"
// );
// console.log(
//   compareLargeNumbers(
//     "1000000000000000000000000000000002",
//     "1000000000000000000000000000000001"
//   ),
//   "greater"
// );

// console.log(
//   compareLargeNumbers(
//     "0000000000000000000000000000000010000000000000000000000000000000000",
//     "0000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000001"
//   ),
//   "greater"
// );

//console.log(isPangram("The quick brown fox jumps over the lazy dog."));

//console.log(reverseWords("The quick brown fox jumps over the lazy dog.")); //"ehT kciuq nworb xof spmuj revo eht yzal .god"
// console.log(isValidIP("0.0.0.0"), true);
// console.log(isValidIP("12.255.56.1"), true);
// console.log(isValidIP("137.255.156.100"), true);

//console.log(minMax([2334454, 5]));

//console.log(rot13("happy monster"));
//console.log(removeSmallest([5, 3, 2, 1, 4]));
//console.log(removeSmallest([1, 2, 3, 4, 5]));

//console.log(removeSmallest([2, 2, 1, 2, 1]));

// console.log(
//   getLengthOfMissingArray([
//     [],
//     [4, 3, 4],
//     [4, 4, 4, 2, 1, 1, 1, 3],
//     [4],
//     [4, 4, 3, 2],
//     [1, 2],
//     [1, 2, 2, 3, 4, 0, 0],
//     [2, 3, 0, 3, 4],
//   ])
// );
//console.log(order("4of Fo1r pe6ople g3ood th5e the2"));
//console.log(compareTwoArrays());
//console.log(findUniq([1, 1, 1, 2, 1, 1]));

//console.log("hello world".capitalize());
//console.log(l.remove_(integer_list, values_list));

//console.log(solution(10));

// console.log(
//   arrayDepth([
//     [],
//     [
//       [
//         [[8, 8]],
//         [
//           [[3], [5], [2]],
//           [[6], [1, 1, 5]],
//           [5, [9, 3, 1]],
//         ],
//       ],
//       [],
//       [],
//     ],
//   ])
// ); //6
//console.log(arrayDepth([true], 1)); //1
// console.log(arrayDepth([], 1)); //1
//console.log(arrayDepth([2, "yes", [true, false]], 2)); //2
//console.log(findMissingLetter(["A", "B", "D", "E"]));

// var a = new Vector([1, 2, 3]);
// var b = new Vector([3, 4, 5]);

// console.log(a.add(b)); // should return a new Vector([4, 6, 8])
// console.log(a.subtract(b)); // should return a new Vector([-2, -2, -2])
// console.log(a.dot(b)); // should return 1*3 + 2*4 + 3*5 = 26
// console.log("Dot", a.toString());

// console.log(validatePIN("1"), false, "Wrong output for '1'");
// console.log(validatePIN("12"), false, "Wrong output for '12'");
// console.log(validatePIN("123"), false, "Wrong output for '123'");

//console.log(tickets([25, 25, 50]));

// console.log(
//   trickOrTreat(3, [
//     ["candy", "apple", "candy"],
//     ["candy", "candy"],
//   ]),
//   "Trick or treat!"
// );

// console.log(amaroPlan(4), [79, 0, 1, 0]);
// console.log(amaroPlan(5), [98, 0, 1, 0, 1]);

//console.log(convertPower(2244));

//f=n=>Math.max(...(''+n).match(/(0+)/g).map(z=>z.length))

//console.log(f(1002000));

// console.log(sequenceSum(2, 6, 2), 12);
// console.log(sequenceSum(1, 5, 1), 15);
// console.log(sequenceSum(1, 5, 3), 5);

//console.log(objEntries());

//x();
// console.log(Math.round(7.12), 7);
// console.log(Math.round(2.49999), 2);
// console.log(Math.ceil(0.4), 1);
// console.log(Math.ceil(0.5), 1);
// console.log(Math.ceil(0.95), 1);

//console.log(removeZero([101, 1020, 10300, 10400, 10060]));
// a2 = ["lively", "alive", "harp", "sharp", "armstrong"];

// a1 = ["live", "strong", "arp"];

// const a1 = ["live", "strong", "<1 empty item>", "lyal", "lysh", "arp"];
// const a2 = ["lively", "alive", "harp", "sharp", "armstrong"];
// console.log(inArray(a1, a2), ["arp", "live", "strong"]);

//console.log(inArray(a1, a2), ["live", "strong"]);

//console.log(friend(["Love", "Your", "Face", "1"]), ["Love", "Your", "Face"]);

//console.log(compare([15991, 714883], [960290, 502358]), [960290, 502358]);

//***********FUNCTION WROTE IN 36 CHARACTER *******One line task: Square every digit*******
//sd=x=>+[...x+''].map(v=>v*v).join``

// const sd = (x) => {
//   return +x
//     .toString()
//     .split("")
//     .reduce((square, number) => (square += Math.pow(number, 2)), "");
// };

// sd=x=>+x.toString().split("").reduce((s, n) => (s += n ** 2), "");
//sd=x=>+(x+'').split("").map(v=>v**2).join("");
//sd=x=>+[].map.call(x+'',v=>v*v).join('')  //(x+'').split("").map(v=>v**2).join("");
//.reduce((s, n) => (s += n ** 2), "");

//console.log(sd(3212));

//console.log(binaryArrayToNumber([1, 1, 1, 1]));

//console.log(generateHashtag("Codewars is nice")); //"#HelloThereThanksForTryingMyKata"
const word = "code" + " ".repeat(140) + "wars";
//console.log(generateHashtag(word)); //"#HelloThereThanksForTryingMyKata"
//console.log(capitalIndex("CodEWaRs"), person.yell());
//console.log(filterQuery(["abba", "baab"], ["a", "ba", "c"]));
//Example: if strings = [’abba’, ’baab’] and queries = [’a’, ’ba’] then result would be [[’a’, 4], [’ba’, 2]].

//console.log(fibonacchi(70));

//console.log(duplicateEncoder("Success"));
//console.log(longest("xyaabbbccccdefww", "xxxxyyyyabklmopq")); //"abcdefklmopqwxy" abcdefklmopqwxy
//console.log(firstNonRepeatingLetters("sTreSS"));

// console.log(
//   deepAssign(
//     { name: "meraj", class: "A" },
//     { a: "allama", b: "balma", class: "Z", data: { name: "charlie" } }
//   )
// );

// console.log(printerError(""));

// console.log(printerError("aaabbbbhaijjjm"));
// console.log(printerError("aaaxbbbbyyhwawiwjjjwwm"));

//console.log(orderWeight("56 65 74 100 99 68 86 180 90"));

// console.log(duplicateCount("abcde"));
// console.log(duplicateCount("aabbcde"));

// console.log(duplicateCount("aabBcde"));

// console.log(duplicateCount("indivisibility"));

// console.log(duplicateCount("Indivisibilities"));
// console.log(duplicateCount("aA11"));
// console.log(duplicateCount("ABBA"));

//console.log(squareDigitReducePrototype(9119));
//true
// console.log(
//   cakes(
//     { flour: 500, sugar: 200, eggs: 1 },
//     { flour: 1200, sugar: 1200, eggs: 5, milk: 200 }
//   )
// );

//false
// console.log(
//   cakes(
//     { apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100 },
//     { sugar: 500, flour: 2000, milk: 2000 }
//   )
// );
//console.log(spinWords("Hey fellow warriors"));

//console.log(divisor(12));

// a = [121, 144, 19, 161, 19, 144, 19, 11];
// b = [121, 14641, 20736, 361, 25921, 361, 20736, 361];

// a = [121, 144, 19, 161, 19, 144, 19, 11];
// b = [132, 14641, 20736, 361, 25921, 361, 20736, 361];
// a = [121, 144, 19, 161, 19, 144, 19, 11];
// b = [121, 14641, 20736, 36100, 25921, 361, 20736, 361];

//console.log(comp(a, b));

//console.log(sortedWords("is2 This1s T4est 3a"));

//console.log(romanNumberEncoder(2007));

//console.log(plindromeChainLength(87));

//console.log(maskify("0123456789"));

//console.log(letterWithMaximumOccurance("Pig latin is cool"));

//console.log(pigIt("Pig latin is cool"));

//console.log(getVowelsCount("abcdasdfer"));

//console.log(XO("xxxoOo"));

//console.log(jadenStr);
//console.log(addBinary(5,1));
//console.log(accum("abcd"));
//console.log(moveToZero([false, 1, 0, 1, 2, 0, 1, 3, "a"]));

//console.log(songDecoder("WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB"));

//console.log(digitalRoot(132189));

//console.log(findOdd([1, 1, 2, -2, 5, 2, 4, 4, -1, -2, 5]));

// console.log(findOdd([20, 1, -1, -2, 2, 3, 3, 5, 5, 1, 2, 4, 20, 4, -1, -2, 5]));
// console.log(findOdd([20, 1, 1, 2, 2, 3, 3, 5, 5, 4, 20, 4, 5]));
// console.log(findOdd([10]));

// console.log(getSum(-1, 0));
// console.log(getSum(-1, 2));

//console.log(sumString("111111111111111111", "21111111111111111111111111111"));

//console.log(timeFormat(359999));

// console.log(scrambleWitProtoType("aabbcamaomsccdd", "commas"));
// console.log(scrambleWitProtoType("rkqodlw", "world"));
// console.log(scrambleWitProtoType("katas", "steak"));

//console.log(filterList([]));

//console.log(anagrams("abba", ["aabb", "abcd", "bbaa", "dada"]));
//console.log(anagrams("racer", ["crazer", "carer", "racar", "caers", "racer"]));
//console.log(anagrams("laser", ["lazing", "lazy", "lacer"]));

// JSON.stringify(obj1) === JSON.stringify(obj2)

//console.log(toCamelCase("The-stelth-warrior"));
//console.log(isIsofarm("Dermatoglyphics")); //true
//isIsofarm("aba"); // false
//isIsofarm("moose"); // false

//console.log(openToSenior());
//['Open', 'Open', 'Senior', 'Open', 'Open', 'Senior']
