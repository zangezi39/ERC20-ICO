import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import icotoken from '../ethereum/icotoken';
import 'semantic-ui-css/semantic.min.css';

class PageHeader extends Component {

  render() {
    const { start, end } = this.props;

    if (
      this.props.start <= Date.now()/1000 &&
      this.props.end >= Date.now()/1000
    ) {
      return (
        <div>
          <Menu style={{ marginTop: '10px', marginBottom: '15px' }} >
            <Menu.Menu position="left" >
              <Link className="item" href='/' passHref><h1>&nbsp;&nbsp;SailToken</h1></Link>
            </Menu.Menu>
            <Menu.Menu position="right">
              <Menu.Item className="item" href='/about'>About Us</Menu.Item>
              <Menu.Item className="item" href='/invest'>Invest Now</Menu.Item>
              <Menu.Item className="item" href='/account'>My Account</Menu.Item>
            </Menu.Menu>

          </Menu>
        </div>
      );
    } else {
      return (
        <div>
          <Menu style={{ marginTop: '10px', marginBottom: '15px' }} >
            <Menu.Menu position="left" >
              <Link className="item" href='/' passHref><h1>&nbsp;&nbsp;SailToken</h1></Link>
            </Menu.Menu>
            <Menu.Menu position="right">
              <Menu.Item className="item" href='/about'>About Us</Menu.Item>
              <Menu.Item className="disabled item">Invest Now</Menu.Item>
              <Menu.Item className="item" href='/account'>My Account</Menu.Item>
            </Menu.Menu>
          </Menu>
        </div>
      );
    }
  }
}

export default PageHeader;
