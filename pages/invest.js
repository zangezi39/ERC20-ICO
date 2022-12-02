import React, { Component } from 'react';
import { Card, Container, Form, Button, Input, Message, Grid, Segment } from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';
import icotoken from '../ethereum/icotoken';
import web3 from '../ethereum/web3';
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

class IcoInvest extends Component {

    static async getInitialProps() {
        const statIndex = await icotoken.methods.getIcoStatus().call();
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
        const formattedStartTime = formatTime( startTime );
        const formattedEndTime = formatTime( endTime );
        const formattedStatus = formatStatus( statIndex );
        const startDate = formatStartDate( startTime );
        const endDate = formatEndDate( endTime );
        const icoTarget = addCommas(web3.utils
          .fromWei(await icotoken.methods.icoTarget().call(), 'ether'));

        return {
            tokenPrice,
            availableTokens,
            investLimit,
            tokenLimit,
            maxTokens,
            endDate,
            startDate,
            statIndex,
            formattedStatus,
            icoTarget,
            formattedStartTime,
            formattedEndTime,
            startTime,
            endTime
        };
    }

    state = {
        investAmount: '',
        tokenBalance: 0,
        investBalance: '',
        investLimit: this.props.investLimit,
        availableTokens: addCommas(this.props.availableTokens),
        errorMessage: '', //error message = empty string (falsish - convert to true bool by !!)
        loading: false    //button spinner
    };

    //Fetch the initial values of token and eth investment balances
    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        const balance = await icotoken.methods.balanceOf( accounts[0] ).call();
        const investment = web3.utils
          .fromWei(await icotoken.methods.getInvestment( accounts[0] ).call(), 'ether');

        this.setState ({
          tokenBalance: addCommas(balance),
          investBalance: addCommas(investment),
        });
    }


    onSubmit = async event => {
        event.preventDefault(); //prevents submitting to the server

        this.setState({ loading: true, errorMessage: '' });

        const accounts = await web3.eth.getAccounts();
        try {
          await icotoken.methods.invest().send({
              from: accounts[0],
              value: web3.utils.toWei(this.state.investAmount, 'ether')
            });
        } catch (err) {
          this.setState({ errorMessage: err.message });
        }

        if (this.state.errorMessage == '')
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

        this.setState({ loading: false });
    }

    renderCards() {

      const items = [
        {
          key: 'mininvest',
          header: this.props.tokenPrice,
          meta: 'Minimum Investment Amount (in ether)',
          style: { overflowWrap: 'break-word' }
        },
        {
          key: 'investlimit',
          header: this.state.investLimit,
          meta: 'Maximum Investment Amount (in ether)',
          style: { overflowWrap: 'break-word' }
        },
        {
          key: 'icoenddate',
          header: this.props.endDate,
          meta: 'ICO End date',
          style: { overflowWrap: 'break-word' }
        },
        {
          key: 'icoendtime',
          header: this.props.formattedEndTime,
          meta: 'ICO End time (UTC)',
          style: { overflowWrap: 'break-word' }
        },
        {
          key: 'icostatus',
          header: this.props.formattedStatus,
          meta: 'Current ICO status',
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
        },
        {
          key: 'icotarget',
          header: this.props.icoTarget,
          meta: 'ICO target (in ether)',
          style: { overflowWrap: 'break-word' }
        },
        {
          key: 'tokensowned',
          header: this.state.tokenBalance,
          meta: 'Tokens owned',
          style: { overflowWrap: 'break-word' }
        },
        {
          key: 'investbalance',
          header: this.state.investBalance,
          meta: 'Amount investment (in ether)',
          style: { overflowWrap: 'break-word' }
        }
      ];

      return <Card.Group items={items} />;
    }

    render() {
      const _tl = this.state.investLimit / this.props.tokenPrice;
      const _tokenLimit = addCommas(_tl.toFixed());
        return (
          <Container>
            <PageHeader
                start={this.props.startTime}
                end={this.props.endTime}
            />
            <h2>Get your SailTokens!</h2>
            <p></p>
            <h3>
              Please enter the amount of ether you would like to invest. Make sure
              that it is in multiples of { this.props.tokenPrice } ether and does not
              exceed the total of { this.state.investLimit } ether ({ _tokenLimit } tokens).
            </h3>
            <p></p>

              <Grid>
                <Grid.Row>
                  <Grid.Column width={16}>

                    <Segment>
                      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field inline>
                          <label>Enter the investment amount and press Submit</label>
                          <Input
                            label="ether"
                            labelPosition="right"
                            value={this.state.investAmount}
                            onChange={event => this.setState({ investAmount: event.target.value })}
                          />
                          <Button
                            loading={this.state.loading}
                            type='submit'
                            floated="right"
                          >Submit
                          </Button>
                        </Form.Field>

                        <Message error header="Oops!" content={this.state.errorMessage} />

                        <p></p>
                      </Form>
                    </Segment>

                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width={16}>
                    <Segment>
                      {this.renderCards()}
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
          </Container>
        );
    }
};

export default IcoInvest;
