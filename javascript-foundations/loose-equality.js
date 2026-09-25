// Unexpected "true" results caused by loose equality coercion:
console.log(0 == false);        // true  (0 and false coerce to the same truthiness)
console.log("" == 0);           // true  (empty string coerces to 0)
console.log(" \t\r\n " == 0);   // true  (whitespace string coerces to 0)
console.log(null == undefined); // true  (special rule in JS)
console.log([] == false);       // true  ([] converts to "", which converts to 0)
console.log([] == ![]);         // true  (![] is false; [] == false -> true)

// With strict equality (===), all of these safely evaluate to false:
console.log(0 === false);       // false
console.log("" === 0);          // false
console.log([] === false);      // false