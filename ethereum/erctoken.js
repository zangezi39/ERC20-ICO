import web3 from './web3';
import ErcToken from './build/erctoken.json';

export default (address) => {
  return new web3.eth.Contract(
    SailToken,
    address
  );
}
