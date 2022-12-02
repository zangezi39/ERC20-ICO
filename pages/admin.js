import React, { Component } from 'react';
import { Card, Form, Checkbox, Container, Grid, Button, Input, Message, Segment } from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';
import icotoken from '../ethereum/icotoken';
import web3 from '../ethereum/web3';
//import { Link } from '../routes';

import {
  formatTime,
  formatStartDate,
  formatEndDate,
  formatStatus,
  addCommas,
  formatTrading
} from '../components/scripts';

const Web3 = require('web3');

class adminControl extends Component {

    static async getInitialProps() {
          const icoAdmin = icotoken.methods.admin().call();
          const tokenPrice = web3.utils
            .fromWei(await icotoken.methods.tokenPrice().call(), 'ether');
          const availableTokens = addCommas(await icotoken.methods.getAvailableTokens().call());
          const statIndex = await icotoken.methods.getIcoStatus().call();
          const balanceProceeds = web3.utils
            .fromWei(await icotoken.methods.fundsReceived().call(), 'ether');
          const formattedStatus = formatStatus( statIndex );
          const startTime = await icotoken.methods.icoStartTime().call();
          const endTime = await icotoken.methods.icoEndTime().call();

        return {
            icoAdmin,
            tokenPrice,
            availableTokens,
            balanceProceeds,
            statIndex,
            formattedStatus,
            startTime,
            endTime
        };
  }

  state = {
      errorMessage1: '',
      errorMessage2: '',
      loading1: false,
      loading2: false,
      icoState: this.props.statIndex,
      tokens: this.props.availableTokens
  };

  onSubmitStatus = async event => {
      event.preventDefault();

      this.setState({
          loading1: true,
          errorMessage1: ''
      });

    const accounts = await web3.eth.getAccounts();

    try {
      if (this.state.value == 1)
        await icotoken.methods.setRunStatus().send({ from: accounts[0] });
      else if (this.state.value == 2)
        await icotoken.methods.setStopStatus().send({ from: accounts[0] });
      else if (this.state.value == 3)
        await icotoken.methods.setCompletedStatus().send({ from: accounts[0] });
    } catch (err) {
      this.setState({ errorMessage1: err.message })
    }

    if (this.state.errorMessage1 == '')
      this.setState({icoState: this.state.value});

    this.setState({
      loading1: false,
    });


  }


  handleClick = async event => {
    event.preventDefault();

    this.setState({ loading2: true, errorMessage2: '' });
    const accounts = await web3.eth.getAccounts();
    try {
      await icotoken.methods.burnTokens().send({ from: accounts[0] });
    } catch (err) {
      this.setState({ errorMessage2: err.message })
    }

    if (this.errorMessage2 == '')
      this.setState({ tokens: 0 });

    this.setState({ loading2: false });

  };


  handleChange = (e, { value }) => this.setState({ value });

  renderCards() {

    const _status = formatStatus(this.state.icoState);

    const items = [
      {
        key: 'icostatus',
        header: _status,
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
        key: 'avilabletokens',
        header: this.state.tokens,
        meta: 'Currently available number of tokens',
        style: { overflowWrap: 'break-word' }
      },
      {
        key: 'icoproceeds',
        header: this.props.balanceProceeds,
        meta: 'Current ICO proceeds (in ether)',
        style: { overflowWrap: 'break-word' }
      },
    ];

    return <Card.Group items={items} />;
  }


  render() {
    const { value } = this.state;

    return (

      <Container>
        <PageHeader
            start={this.props.startTime}
            end={this.props.endTime}
        />

        <h2>ICO Admin Control Panel</h2>

        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment>
                {this.renderCards()}
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Segment>
                <Form onSubmit={this.onSubmitStatus} error={!!this.state.errorMessage1}>
                  <Form.Group inline>
                    <label><h3>Select the ICO Status:</h3></label>
                    <Form.Radio
                      label='Activate'
                      value='1'
                      checked={value === '1'}
                      onChange={this.handleChange}
                    />
                    <Form.Radio
                      label='Pause'
                      value='2'
                      checked={value === '2'}
                      onChange={this.handleChange}
                    />
                    <Form.Radio
                      label='Finish'
                      value='3'
                      checked={value === '3'}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Message error header="Oops!" content={this.state.errorMessage1} />
                  <Button type ="submit" loading={this.state.loading1}>Submit</Button>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Segment attached='top'>
                <Form error={!!this.state.errorMessage2}>
                <div style={{ alignItems:'center', justifyContent: 'center' }}>
                <h3>Burn the remaining tokens (active only after the ICO has been completed)</h3>
                  <Button
                    negative
                    type="submit"
                    loading={this.state.loading2}
                    attached='bottom'
                    content='Click to Confirm'
                    onClick={this.handleClick}
                  />
                  <Message error header="Oops!" content={this.state.errorMessage2} />
                  </div>
                </Form>


              </Segment>
            </Grid.Column>
          </Grid.Row>

        </Grid>

      </Container>
    );
  }

};

export default adminControl;
