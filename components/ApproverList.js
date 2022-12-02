import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import icotoken from '../ethereum/icotoken';
import { addCommas } from './scripts';

class ApproverList extends Component {

  state = { approvedAllowance: 0 };

  async componentDidMount() {
      const { id, approver } = this.props;
      const accounts = await web3.eth.getAccounts();
      const approvedSpendingAllowance = await icotoken.methods.allowance(this.props.approver, accounts[0]).call();

      this.setState({ approvedAllowance: addCommas(approvedSpendingAllowance) });

  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.id + 1}</Table.Cell>
        <Table.Cell>{this.props.approver}</Table.Cell>
        <Table.Cell textAlign='right'><div>{this.state.approvedAllowance}</div></Table.Cell>
      </Table.Row>
    );
  }
}

export default ApproverList;
