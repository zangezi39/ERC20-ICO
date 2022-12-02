import web3 from './web3';
import IcoToken from './build/IcoToken.json';

const icotoken = new web3.eth.Contract(
  IcoToken,
  '0x20De54ABB262122EE2446a83715ab04a2b01B3b8'
);

export default icotoken;
