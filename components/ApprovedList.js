import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import icotoken from '../ethereum/icotoken';
import { addCommas } from './scripts';

class ApprovedList extends Component {

  state = { approvedBalance: 0 };

  async componentDidMount() {
      const { id, spender } = this.props;
      const accounts = await web3.eth.getAccounts();
      const approvedSpendingBalance = await icotoken.methods.allowance(accounts[0], this.props.spender).call();

      this.setState({ approvedBalance: addCommas(approvedSpendingBalance) });

  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.id + 1}</Table.Cell>
        <Table.Cell>{this.props.spender}</Table.Cell>
        <Table.Cell textAlign='right'><div>{this.state.approvedBalance}</div></Table.Cell>
      </Table.Row>
    );
  }
}

export default ApprovedList;
