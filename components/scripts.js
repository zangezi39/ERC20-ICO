import React from 'react';
import icotoken from '../ethereum/icotoken';
import web3 from '../ethereum/web3';
//import { Link } from '../routes';
import Web3 from 'web3';

//converts Unix time to standard hh:mm:ss format (UTI)
export function formatTime(s) {
  return new Date(s * 1e3).toISOString().slice( 11, -5 );
}

//converts ICO Starting date from unix time to standard ddd/mm/yyyy notaion
export function formatStartDate(s) {
  let _date = new Date(s * 1e3).toISOString().slice( 8, -14 );
  let _month = new Date(s * 1e3).toISOString().slice( 5, -17 );
  let _year = new Date(s * 1e3).toISOString().slice( 2, -20 );
  return [_date, _month, _year].join('/');
}

//converts ICO Ending date from unix time to standard ddd/mm/yyyy notaion
export function formatEndDate(s) {
  let _date = new Date(s * 1e3).toISOString().slice( 8, -14 );
  let _month = new Date(s * 1e3).toISOString().slice( 5, -17 );
  let _year = new Date(s * 1e3).toISOString().slice( 2, -20 );
  return [_date, _month, _year].join('/');
}

//returns current ICO status
export function formatStatus(statIndex) {
  const statusArray = ["Pending","Active","Paused","Ended"];
  return statusArray[statIndex];
}

//adds commas to numbers greater than 999
export function addCommas(nStr){
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


export function formatTrading(tradeIndex) {
  const tradingArray = ["Pending","Permitted"];
  return tradingArray[tradeIndex];
}

//calculates days/hours left until ICO starts
export function timeToStart() {
  const timeLeft = Date.now() - this.props.startTime;
  const daysToStart = formatDay( timeleft );
  const hoursToStart = formatTime( timeleft % 24 );

  return { daysToStart, hoursToStart };
}
