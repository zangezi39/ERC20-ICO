exports.id = 207;
exports.ids = [207];
exports.modules = {

/***/ 41207:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mr": function() { return /* binding */ formatTime; },
/* harmony export */   "Oh": function() { return /* binding */ formatStartDate; },
/* harmony export */   "Lu": function() { return /* binding */ formatEndDate; },
/* harmony export */   "LR": function() { return /* binding */ formatStatus; },
/* harmony export */   "OD": function() { return /* binding */ addCommas; }
/* harmony export */ });
/* unused harmony exports formatTrading, timeToStart */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54357);
/* harmony import */ var _ethereum_web3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61483);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3283);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_3__);


 //import { Link } from '../routes';

 //converts Unix time to standard hh:mm:ss format (UTI)

function formatTime(s) {
  return new Date(s * 1e3).toISOString().slice(11, -5);
} //converts ICO Starting date from unix time to standard ddd/mm/yyyy notaion

function formatStartDate(s) {
  let _date = new Date(s * 1e3).toISOString().slice(8, -14);

  let _month = new Date(s * 1e3).toISOString().slice(5, -17);

  let _year = new Date(s * 1e3).toISOString().slice(2, -20);

  return [_date, _month, _year].join('/');
} //converts ICO Ending date from unix time to standard ddd/mm/yyyy notaion

function formatEndDate(s) {
  let _date = new Date(s * 1e3).toISOString().slice(8, -14);

  let _month = new Date(s * 1e3).toISOString().slice(5, -17);

  let _year = new Date(s * 1e3).toISOString().slice(2, -20);

  return [_date, _month, _year].join('/');
} //returns current ICO status

function formatStatus(statIndex) {
  const statusArray = ["Pending", "Active", "Paused", "Ended"];
  return statusArray[statIndex];
} //adds commas to numbers greater than 999

function addCommas(nStr) {
  nStr += '';
  let x = nStr.split('.');
  let x1 = x[0];
  let x2 = x.length > 1 ? '.' + x[1] : '';
  let rgx = /(\d+)(\d{3})/;

  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}
function formatTrading(tradeIndex) {
  const tradingArray = ["Pending", "Permitted"];
  return tradingArray[tradeIndex];
} //calculates days/hours left until ICO starts

function timeToStart() {
  const timeLeft = Date.now() - this.props.startTime;
  const daysToStart = formatDay(timeleft);
  const hoursToStart = formatTime(timeleft % 24);
  return {
    daysToStart,
    hoursToStart
  };
}

/***/ })

};
;