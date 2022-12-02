import React, { Component } from 'react';
import {
  Card,
  Container,
  Form,
  Button,
  Input,
  Message,
  Grid,
  Segment,
  Table
} from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';
import icotoken from '../ethereum/icotoken';
import web3 from '../ethereum/web3';
import ApprovedList from '../components/ApprovedList';
import ApproverList from '../components/ApproverList';
import {
  formatTime,
  formatStartDate,
  formatEndDate,
  formatStatus,
  addCommas,
  timeToStart,
  formatTrading
} from '../components/scripts';

const Web3 = require('web3');


class AccountInfo extends Component {

    static async getInitialProps() {
        const statIndex = await icotoken.methods.getIcoStatus().call();
        const tradeIndex = await icotoken.methods.getTradingStatus().call();
        const startTime = await icotoken.methods.icoStartTime().call();
        const endTime = await icotoken.methods.icoEndTime().call();
        const maxInvest = web3.utils.fromWei(await icotoken.methods.maxInvest().call(), 'ether');
        const tokenPrice = web3.utils.fromWei(await icotoken.methods.tokenPrice().call(), 'ether');
        const investLimit = web3.utils.fromWei(await icotoken.methods.getInvestLimit().call(), 'ether');
        const tokens = await icotoken.methods.getAvailableTokens().call();
        const tokenMax =  maxInvest / tokenPrice ;
        const limitToken = investLimit / tokenPrice;
        const tokenLimit = addCommas( limitToken );
        const availableTokens = addCommas( tokens );
        const maxTokens = addCommas(tokenMax);
        const formattedEndTime = formatTime( endTime );
        const formattedStatus = formatStatus( statIndex );
        const formattedTrading = formatTrading( tradeIndex );
        const endDate = formatEndDate( endTime );

        return {
            tokenPrice,
            availableTokens,
            investLimit,
            tokenLimit,
            maxTokens,
            endDate,
            statIndex,
            formattedStatus,
            formattedTrading,
            formattedEndTime,
            startTime,
            endTime,
        };
    }

    state = {
        investAmount: 0,
        investLimit: this.props.investLimit,
        availableTokens: addCommas(this.props.availableTokens),
        transferAddress: '',
        transferAmount: 0,
        cancelledSpender: '',
        transferFromAddress: '',
        transferToAddress: '',
        transferFromAmount: 0,
        spenderAddress: '',
        approverAddress: '',
        approvedAmount: 0,
        errorMessage1: '', //error message = empty string (falsish - convert to true bool by !!)
        errorMessage2: '',
        errorMessage3: '',
        errorMessage4: '',
        errorMessage5: '',
        loading1: false,    //button spinner
        loading2: false,
        loading3: false,
        loading4: false,
        loading5: false
    };

    async componentDidMount() {

        const accounts = await web3.eth.getAccounts();
        const balance = await icotoken.methods.balanceOf( accounts[0] ).call();
        const investment = web3.utils
          .fromWei(await icotoken.methods.getInvestment( accounts[0] ).call(), 'ether');
        const _spendersList = await icotoken.methods.getSpenders( accounts[0] ).call();
        const _approversList = await icotoken.methods.getApprovers( accounts[0] ).call();

        this.setState ({
          accounts: accounts,
          investBalance: addCommas(investment),
          tokenBalance: addCommas(balance),
          spendersList: _spendersList,
          approversList: _approversList
        });

    }

    //Itiratively fetch and render a list of approved spenders for a given owner and their respective allowances
    renderSpenders() {
      if (this.state.spendersList) {

        return this.state.spendersList.map((spender, index) => {
          return (
            <ApprovedList
              key={index}
              id={index}
              spender={spender}
            />
          );
        });
      }
    }

    //Itiratively fetch and render a list of approving owners for a given spender and their respective balances
    renderApprovers() {
      if (this.state.approversList) {
        return this.state.approversList.map((approver, index) => {
          return (
            <ApproverList
              key={index}
              id={index}
              approver={approver}
            />
          );
        });
      }
    }

    //Render cards with account information
    renderCards() {
      const accountItems = [
        {
          key: 'tokenbalance',
          header: this.state.tokenBalance,
          meta: 'Token Balance',
          style: { overflowWrap: 'break-word' }
        },
        {
          key: 'investbalance',
          header: this.state.investBalance,
          meta: 'Amount investment (in ether)',
          style: { overflowWrap: 'break-word' }
        },
        {
          key: 'icostatus',
          header: this.props.formattedStatus,
          meta: 'Current ICO status',
          style: { overflowWrap: 'break-word' }
        },
        {
          key: 'tradingstatus',
          header: this.props.formattedTrading,
          meta: 'Current Trading Status',
          style: { overflowWrap: 'break-word' }
        },

        {
          key: 'enddate',
          header: this.props.endDate,
          meta: 'ICO End date',
          style: { overflowWrap: 'break-word' }
        },
        {
          key: 'endtime',
          header: this.props.formattedEndTime,
          meta: 'End time (UTC)',
          style: { overflowWrap: 'break-word' }
        },
        {
          key: 'tokenprice',
          header: this.props.tokenPrice,
          meta: 'Token price (in ether)',
          style: { overflowWrap: 'break-word' }
        },
        {
          key: 'availabletokens',
          header: this.state.availableTokens,
          meta: 'Number of tokens currently available',
          style: { overflowWrap: 'break-word' }
        }
      ];

      return <Card.Group items={accountItems} />;
    }

    //Handles additional investment in tokens
    onInvestSubmit = async event => {
        event.preventDefault();

        this.setState({ loading1: true, errorMessage1: '' });

        const accounts = await web3.eth.getAccounts();
        try {
          await icotoken.methods.invest().send({
              from: accounts[0],
              value: web3.utils.toWei(this.state.investAmount, 'ether')
            });
        } catch (err) {
          this.setState({ errorMessage1: err.message });
        }

        if (this.state.errorMessage1 == '')
          this.setState({
            investLimit: web3.utils.fromWei(
              await icotoken.methods.getInvestLimit().call(), 'ether'),
            availableTokens: addCommas(
              await icotoken.methods.getAvailableTokens().call()),
            tokenBalance: addCommas(
              await icotoken.methods.balanceOf(accounts[0]).call()),
            investBalance: addCommas(
              web3.utils.fromWei(await icotoken.methods.getInvestment(accounts[0]).call(), 'ether'))
          });

        this.setState({ loading1: false });
    }

    //Transfers tokens between the owner and a recepient
    onTransferSubmit = async event => {
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();
      const { transferAddress, transferAmount }= this.state;

      this.setState({ loading2: true, errorMessage2: '' });

      try {
        await icotoken.methods.transfer(
          transferAddress,
          transferAmount
        ).send({ from: accounts[0] });
      } catch (err) {
        this.setState({ errorMessage2: err.message });
      }

      this.setState({ loading2: false });
    }

    //Transfers tokens between another owner and a recipient
    onTransferFromSubmit = async event => {
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();
      const { transferFromAddress, transferToAddress, transferFromAmount } = this.state;

      this.setState({ loading3: true, errorMessage3: '' });

      try {
        await icotoken.methods.transferFrom(
          transferFromAddress,
          transferToAddress,
          transferFromAmount
        ).send({ from: accounts[0] });
      } catch (err) {
        this.setState({ errorMessage3: err.message });
      }

      this.setState({ loading3: false })
    }

    //Approve a spender and set the allowance
    onApproveSubmit = async event => {
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();
      const { spenderAddress, approvedAmount } = this.state;

      this.setState({ loading4: true, errorMessage4: '' });

      try {
        await icotoken.methods.approveSpender(
          spenderAddress,
          approvedAmount
        ).send({ from: accounts[0] });
      } catch (err) {
        this.setState({ errorMessage4: err.message });
      }

      if (this.state.errorMessage4 == '')
        this.setState(this.renderSpenders());

      this.setState({ loading4: false });
    }

    //Cancel spender's allowance - resets to zero
    onCancelSubmit = async event => {
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();
      const { cancelledSpender } = this.state;

      this.setState({ loading5: true, errorMessage5: '' })

      try {
        await icotoken.methods.cancelAllowance(cancelledSpender)
          .send({ from: accounts[0] });
      } catch (err) {
        this.setState({ errorMessage5: err.message });
      }

      if (this.state.errorMessage5 == '')
        this.setState(this.renderSpenders());

      this.setState({ loading5: false });

    }

    render() {
      const _tokenLimit = addCommas((this.state.investLimit / this.props.tokenPrice).toFixed());
      const { Header, Row, HeaderCell, Body, Cell } = Table;

        return (
          <Container>
            <PageHeader
                start={this.props.startTime}
                end={this.props.endTime}
            />
            <label><h2>Account Control Panel</h2></label>
            <br />

            <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <Segment>
                  {this.renderCards()}
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
              <Segment>
                <label><h3>List of Approved Spenders:</h3></label>
                <Table>
                  <Header>
                    <Row>
                      <HeaderCell>ID</HeaderCell>
                      <HeaderCell textAlign='left'>Spender Address</HeaderCell>
                      <HeaderCell textAlign='right'>Allowance</HeaderCell>
                    </Row>
                  </Header>
                  <Body>{this.renderSpenders()}</Body>
                </Table>
              </Segment>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <label><h3>List of Approvers:</h3></label>
                  <Table>
                    <Header>
                      <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell textAlign='left'>Approver Address</HeaderCell>
                        <HeaderCell textAlign='right'>Allowance</HeaderCell>
                      </Row>
                    </Header>
                    <Body>{this.renderApprovers()}</Body>
                  </Table>
                </Segment>
              </Grid.Column>
            </Grid.Row>

              <Grid.Row>
                <Grid.Column width={16}>
                  <Segment>
                    <Form onSubmit={this.onInvestSubmit} error={!!this.state.errorMessage1}>
                      <Form.Field inline>
                        <label><h3>Purchase tokens</h3></label><br></br>
                        <label>
                          Enter the amount you would like to invest (in ether, or fractions thereof)
                          and press Submit. The investment amount should be in multiples
                          of {this.props.tokenPrice} ether (1 token) and not exceed the total
                          of {this.state.investLimit} ether ({_tokenLimit} tokens).
                          <br /><br />
                        </label>
                        <Input
                          label="ether"
                          labelPosition="right"
                          value={this.state.investAmount}
                          onChange={event => this.setState({ investAmount: event.target.value })}
                        />
                        <Button
                          loading={this.state.loading1}
                          type='submit'
                          floated="right"
                          primary
                        >Submit
                        </Button>
                      </Form.Field>
                      <Message error header="Oops!" content={this.state.errorMessage1} />
                    </Form>
                  </Segment>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={16}>
                  <Segment>
                    <Form onSubmit={this.onTransferSubmit} error={!!this.state.errorMessage2}>
                      <Form.Field >
                        <label><h3>Transfer tokens</h3></label>
                        <label>Enter the recipient address and the number of tokens and press Submit:</label>
                        <Input
                          label="Recipient Address:"
                          labelPosition="left"
                          value={this.state.transferAddress}
                          onChange={event => this.setState({ transferAddress: event.target.value })}
                        />
                        <br /><br />
                        <Input
                          label="Number of Tokens: "
                          labelPosition="left"
                          value={this.state.transferAmount}
                          onChange={event => this.setState({ transferAmount: event.target.value })}
                        />
                        <br /><br />
                        <Button
                          loading={this.state.loading2}
                          type='submit'
                          floated="right"
                          primary
                        >Submit
                        </Button>
                        <br />
                      </Form.Field>
                      <Message error header="Oops!" content={this.state.errorMessage2} />
                    </Form>
                  </Segment>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={16}>
                  <Segment>
                    <Form onSubmit={this.onTransferFromSubmit} error={!!this.state.errorMessage3}>
                      <Form.Field >
                        <label><h3>Transfer approved tokens from another account</h3></label>
                        <label>Enter the sending and receiving addresses and the number of tokens and press Submit:</label>
                        <Input
                          label="Sender's Address:"
                          labelPosition="left"
                          value={this.state.transferFromAddress}
                          onChange={event => this.setState({ transferFromAddress: event.target.value })}
                        />
                        <br /><br />
                        <Input
                          label="Receiving Address:"
                          labelPosition="left"
                          value={this.state.transferToAddress}
                          onChange={event => this.setState({ transferToAddress: event.target.value })}
                        />
                        <br /><br />
                        <Input
                          label="Number of Tokens: "
                          labelPosition="left"
                          value={this.state.transferFromAmount}
                          onChange={event => this.setState({ transferFromAmount: event.target.value })}
                        />
                        <br /><br />
                        <Button
                          loading={this.state.loading3}
                          type='submit'
                          floated="right"
                          primary
                        >Submit
                        </Button>
                        <br />
                      </Form.Field>

                      <Message error header="Oops!" content={this.state.errorMessage3} />

                    </Form>
                  </Segment>

                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={16}>
                  <Segment>
                    <Form onSubmit={this.onApproveSubmit} error={!!this.state.errorMessage4}>
                      <Form.Field >
                        <label><h3>Approve a spender</h3></label>
                        <label>Enter the spender address and the number of approved tokens and press Submit:</label>
                        <Input
                          label="Spender's Address:"
                          labelPosition="left"
                          value={this.state.spenderAddress}
                          onChange={event => this.setState({ spenderAddress: event.target.value })}
                        />
                        <br /><br />
                        <Input
                          label="Approved Amount: "
                          labelPosition="left"
                          value={this.state.approvedAmount}
                          onChange={event => this.setState({ approvedAmount: event.target.value })}
                        />
                        <br /><br />
                        <Button
                          loading={this.state.loading4}
                          type='submit'
                          floated="right"
                          primary
                        >Submit
                        </Button>
                        <br></br>
                      </Form.Field>
                      <Message error header="Oops!" content={this.state.errorMessage4} />
                    </Form>
                  </Segment>
                  <Segment>
                    <Form onSubmit={this.onCancelSubmit} error={!!this.state.errorMessage5}>
                      <Form.Field>
                        <label><h3>Cancel Allowance</h3></label>
                        <label>Enter the address of the spender whose allowance you would like to cancel
                          and press the red Submit button below:
                        </label>
                        <Input
                          label="Spender's Address"
                          labelPosition="left"
                          value={this.state.cancelledSpender}
                          onChange={event => this.setState({ cancelledSpender: event.target.value })}
                        />
                        <br /><br />
                        <Button
                          loading={this.state.loading5}
                          type="submit"
                          floated="right"
                          negative
                        >Submit
                        </Button>
                        <br /><br />
                      </Form.Field>
                      <Message error header="Oops!" content={this.state.errorMessage5} />
                    </Form>
                  </Segment>
                </Grid.Column>
              </Grid.Row>

            </Grid>
          </Container>
        );
    }

  };

  export default AccountInfo;
