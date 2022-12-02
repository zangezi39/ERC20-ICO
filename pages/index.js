import React, { Component } from 'react';
import { Card, Container, Header, Button, Grid, Segment } from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';
import icotoken from '../ethereum/icotoken';
import web3 from '../ethereum/web3';
import Web3 from 'web3';
import {
  formatTime,
  formatStartDate,
  formatEndDate,
  formatStatus,
  addCommas,
  timeToStart
} from '../components/scripts';

class IcoData extends Component {

  static async getInitialProps() {
    const startTime = await icotoken.methods.icoStartTime().call();
    const endTime = await icotoken.methods.icoEndTime().call();
    const tokenPrice =  web3.utils.fromWei(await icotoken.methods.tokenPrice().call(), 'ether');
    const statIndex = await icotoken.methods.getIcoStatus().call();
    const availableTokens = addCommas(await icotoken.methods.getAvailableTokens().call());
    const icoTarget = addCommas(web3.utils
      .fromWei(await icotoken.methods.icoTarget().call(), 'ether'));
    const formattedStartTime = formatTime( startTime );
    const formattedEndTime = formatTime( endTime );
    const formattedStatus = formatStatus( statIndex );
    const startDate = formatStartDate( startTime );
    const endDate = formatEndDate( endTime );

    return {
      tokenPrice,
      statIndex,
      formattedStatus,
      availableTokens,
      icoTarget,
      formattedStartTime,
      formattedEndTime,
      endDate,
      startDate,
      startTime,
      endTime
    };
  }

  renderCards() {
    const items = [
      {
        key: 'startdate',
        header: this.props.startDate,
        meta: 'ICO Start date',
        style: { overflowWrap: 'break-word' }
      },
      {
        key: 'starttime',
        header: this.props.formattedStartTime,
        meta: 'Start time (UTC)',
        style: { overflowWrap: 'break-word' }
      },
      {
        key: 'enddate',
        header: this.props.endDate,
        meta: 'ICO End date',
        style: { overflowWrap: 'break-word' }
      },
      {
        key:'endtime',
        header: this.props.formattedEndTime,
        meta: 'End time (UTC)',
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
        header: this.props.availableTokens,
        meta: 'Currently available number of tokens',
        style: { overflowWrap: 'break-word' }
      },
      {
        key: 'icotarget',
        header: this.props.icoTarget,
        meta: 'ICO target (in ether)',
        style: { overflowWrap: 'break-word' }
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return  (
      <div>
      <Container>
        <PageHeader
            start={this.props.startTime}
            end={this.props.endTime}
        />
        <Segment>
            <p>
              You are invited to participate in the Initial Coin Offering of
              SailToken, an innovative instrument that will serve as an exchange
              medium of the most advanced blockchain-based system designed
              exclusively for yacht-related services. Using the SailToken you
              will be able to reserve and pay for charters, rentals, repairs,
              insurance, marina stays, partial-ownership and even boat purchases.
            </p>
            <p>
              Started by professionals with extensive experience in both yachting
              industry and the distributed ledger (blockchain) technology, our
              system is being designed to provide unprecedented security,
              integrity, speed, simplicity and significant savings over the competition.
            </p>
            <p>
              Do not miss this exciting opportunity to secure your SailTokens at
              pre-launch prices. We are making this one-time offer to you in order
              to raise funds for the completion and deployment of our system,
              providing you with a chance to enjoy significant savings on your
              future purchases.
              <br /><br />
            </p>
            <Grid>
              <Grid.Row>
                <Grid.Column width={16}>

                    {this.renderCards()}

                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </div>
    );
  }
}

export default IcoData;
