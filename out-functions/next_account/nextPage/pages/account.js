/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 82113:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ account; }
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(85893);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/semantic-ui-react/dist/commonjs/index.js
var commonjs = __webpack_require__(15048);
// EXTERNAL MODULE: ./components/PageHeader.js
var PageHeader = __webpack_require__(99388);
// EXTERNAL MODULE: ./ethereum/icotoken.js + 1 modules
var icotoken = __webpack_require__(54357);
// EXTERNAL MODULE: ./ethereum/web3.js
var web3 = __webpack_require__(61483);
// EXTERNAL MODULE: ./node_modules/web3/lib/index.js
var lib = __webpack_require__(3283);
;// CONCATENATED MODULE: ./components/scripts.js


 //import { Link } from '../routes';

 //converts Unix time to standard hh:mm:ss format (UTI)

function formatTime(s) {
  return new Date(s * 1e3).toISOString().slice(11, -5);
} //converts ICO Starting date from unix time to standard ddd/mm/yyyy notaion

function formatStartDate(s) {
  let _date = new Date(s * 1e3).toISOString().slice(8, -14);

  let _month = new Date(s * 1e3).toISOString().slice(5, -17);

  let _year = new Date(s * 1e3).toISOString().slice(2, -20);

  return [_date, _month, _year].join('/');
} //converts ICO Ending date from unix time to standard ddd/mm/yyyy notaion

function formatEndDate(s) {
  let _date = new Date(s * 1e3).toISOString().slice(8, -14);

  let _month = new Date(s * 1e3).toISOString().slice(5, -17);

  let _year = new Date(s * 1e3).toISOString().slice(2, -20);

  return [_date, _month, _year].join('/');
} //returns current ICO status

function formatStatus(statIndex) {
  const statusArray = ["Pending", "Active", "Paused", "Ended"];
  return statusArray[statIndex];
} //adds commas to numbers greater than 999

function addCommas(nStr) {
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
function formatTrading(tradeIndex) {
  const tradingArray = ["Pending", "Permitted"];
  return tradingArray[tradeIndex];
} //calculates days/hours left until ICO starts

function timeToStart() {
  const timeLeft = Date.now() - this.props.startTime;
  const daysToStart = formatDay(timeleft);
  const hoursToStart = formatTime(timeleft % 24);
  return {
    daysToStart,
    hoursToStart
  };
}
;// CONCATENATED MODULE: ./components/ApprovedList.js



function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class ApprovedList extends react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      approvedBalance: 0
    });
  }

  async componentDidMount() {
    const {
      id,
      spender
    } = this.props;
    const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();
    const approvedSpendingBalance = await icotoken/* default.methods.allowance */.Z.methods.allowance(accounts[0], this.props.spender).call();
    this.setState({
      approvedBalance: addCommas(approvedSpendingBalance)
    });
  }

  render() {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Table.Row */.iA.Row, {
      children: [/*#__PURE__*/jsx_runtime.jsx(commonjs/* Table.Cell */.iA.Cell, {
        children: this.props.id + 1
      }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Table.Cell */.iA.Cell, {
        children: this.props.spender
      }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Table.Cell */.iA.Cell, {
        textAlign: "right",
        children: /*#__PURE__*/jsx_runtime.jsx("div", {
          children: this.state.approvedBalance
        })
      })]
    });
  }

}

/* harmony default export */ var components_ApprovedList = (ApprovedList);
;// CONCATENATED MODULE: ./components/ApproverList.js



function ApproverList_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class ApproverList extends react.Component {
  constructor(...args) {
    super(...args);

    ApproverList_defineProperty(this, "state", {
      approvedAllowance: 0
    });
  }

  async componentDidMount() {
    const {
      id,
      approver
    } = this.props;
    const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();
    const approvedSpendingAllowance = await icotoken/* default.methods.allowance */.Z.methods.allowance(this.props.approver, accounts[0]).call();
    this.setState({
      approvedAllowance: addCommas(approvedSpendingAllowance)
    });
  }

  render() {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Table.Row */.iA.Row, {
      children: [/*#__PURE__*/jsx_runtime.jsx(commonjs/* Table.Cell */.iA.Cell, {
        children: this.props.id + 1
      }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Table.Cell */.iA.Cell, {
        children: this.props.approver
      }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Table.Cell */.iA.Cell, {
        textAlign: "right",
        children: /*#__PURE__*/jsx_runtime.jsx("div", {
          children: this.state.approvedAllowance
        })
      })]
    });
  }

}

/* harmony default export */ var components_ApproverList = (ApproverList);
;// CONCATENATED MODULE: ./pages/account.js



function account_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










const Web3 = __webpack_require__(3283);

class AccountInfo extends react.Component {
  constructor(...args) {
    super(...args);

    account_defineProperty(this, "state", {
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
      errorMessage1: '',
      //error message = empty string (falsish - convert to true bool by !!)
      errorMessage2: '',
      errorMessage3: '',
      errorMessage4: '',
      errorMessage5: '',
      loading1: false,
      //button spinner
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false
    });

    account_defineProperty(this, "onInvestSubmit", async event => {
      event.preventDefault();
      this.setState({
        loading1: true,
        errorMessage1: ''
      });
      const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();

      try {
        await icotoken/* default.methods.invest */.Z.methods.invest().send({
          from: accounts[0],
          value: web3/* default.utils.toWei */.Z.utils.toWei(this.state.investAmount, 'ether')
        });
      } catch (err) {
        this.setState({
          errorMessage1: err.message
        });
      }

      if (this.state.errorMessage1 == '') this.setState({
        investLimit: web3/* default.utils.fromWei */.Z.utils.fromWei(await icotoken/* default.methods.getInvestLimit */.Z.methods.getInvestLimit().call(), 'ether'),
        availableTokens: addCommas(await icotoken/* default.methods.getAvailableTokens */.Z.methods.getAvailableTokens().call()),
        tokenBalance: addCommas(await icotoken/* default.methods.balanceOf */.Z.methods.balanceOf(accounts[0]).call()),
        investBalance: addCommas(web3/* default.utils.fromWei */.Z.utils.fromWei(await icotoken/* default.methods.getInvestment */.Z.methods.getInvestment(accounts[0]).call(), 'ether'))
      });
      this.setState({
        loading1: false
      });
    });

    account_defineProperty(this, "onTransferSubmit", async event => {
      event.preventDefault();
      const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();
      const {
        transferAddress,
        transferAmount
      } = this.state;
      this.setState({
        loading2: true,
        errorMessage2: ''
      });

      try {
        await icotoken/* default.methods.transfer */.Z.methods.transfer(transferAddress, transferAmount).send({
          from: accounts[0]
        });
      } catch (err) {
        this.setState({
          errorMessage2: err.message
        });
      }

      this.setState({
        loading2: false
      });
    });

    account_defineProperty(this, "onTransferFromSubmit", async event => {
      event.preventDefault();
      const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();
      const {
        transferFromAddress,
        transferToAddress,
        transferFromAmount
      } = this.state;
      this.setState({
        loading3: true,
        errorMessage3: ''
      });

      try {
        await icotoken/* default.methods.transferFrom */.Z.methods.transferFrom(transferFromAddress, transferToAddress, transferFromAmount).send({
          from: accounts[0]
        });
      } catch (err) {
        this.setState({
          errorMessage3: err.message
        });
      }

      this.setState({
        loading3: false
      });
    });

    account_defineProperty(this, "onApproveSubmit", async event => {
      event.preventDefault();
      const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();
      const {
        spenderAddress,
        approvedAmount
      } = this.state;
      this.setState({
        loading4: true,
        errorMessage4: ''
      });

      try {
        await icotoken/* default.methods.approveSpender */.Z.methods.approveSpender(spenderAddress, approvedAmount).send({
          from: accounts[0]
        });
      } catch (err) {
        this.setState({
          errorMessage4: err.message
        });
      }

      if (this.state.errorMessage4 == '') this.setState(this.renderSpenders());
      this.setState({
        loading4: false
      });
    });

    account_defineProperty(this, "onCancelSubmit", async event => {
      event.preventDefault();
      const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();
      const {
        cancelledSpender
      } = this.state;
      this.setState({
        loading5: true,
        errorMessage5: ''
      });

      try {
        await icotoken/* default.methods.cancelAllowance */.Z.methods.cancelAllowance(cancelledSpender).send({
          from: accounts[0]
        });
      } catch (err) {
        this.setState({
          errorMessage5: err.message
        });
      }

      if (this.state.errorMessage5 == '') this.setState(this.renderSpenders());
      this.setState({
        loading5: false
      });
    });
  }

  static async getInitialProps() {
    const statIndex = await icotoken/* default.methods.getIcoStatus */.Z.methods.getIcoStatus().call();
    const tradeIndex = await icotoken/* default.methods.getTradingStatus */.Z.methods.getTradingStatus().call();
    const startTime = await icotoken/* default.methods.icoStartTime */.Z.methods.icoStartTime().call();
    const endTime = await icotoken/* default.methods.icoEndTime */.Z.methods.icoEndTime().call();
    const maxInvest = web3/* default.utils.fromWei */.Z.utils.fromWei(await icotoken/* default.methods.maxInvest */.Z.methods.maxInvest().call(), 'ether');
    const tokenPrice = web3/* default.utils.fromWei */.Z.utils.fromWei(await icotoken/* default.methods.tokenPrice */.Z.methods.tokenPrice().call(), 'ether');
    const investLimit = web3/* default.utils.fromWei */.Z.utils.fromWei(await icotoken/* default.methods.getInvestLimit */.Z.methods.getInvestLimit().call(), 'ether');
    const tokens = await icotoken/* default.methods.getAvailableTokens */.Z.methods.getAvailableTokens().call();
    const tokenMax = maxInvest / tokenPrice;
    const limitToken = investLimit / tokenPrice;
    const tokenLimit = addCommas(limitToken);
    const availableTokens = addCommas(tokens);
    const maxTokens = addCommas(tokenMax);
    const formattedEndTime = formatTime(endTime);
    const formattedStatus = formatStatus(statIndex);
    const formattedTrading = formatTrading(tradeIndex);
    const endDate = formatEndDate(endTime);
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
      endTime
    };
  }

  async componentDidMount() {
    const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();
    const balance = await icotoken/* default.methods.balanceOf */.Z.methods.balanceOf(accounts[0]).call();
    const investment = web3/* default.utils.fromWei */.Z.utils.fromWei(await icotoken/* default.methods.getInvestment */.Z.methods.getInvestment(accounts[0]).call(), 'ether');

    const _spendersList = await icotoken/* default.methods.getSpenders */.Z.methods.getSpenders(accounts[0]).call();

    const _approversList = await icotoken/* default.methods.getApprovers */.Z.methods.getApprovers(accounts[0]).call();

    this.setState({
      accounts: accounts,
      investBalance: addCommas(investment),
      tokenBalance: addCommas(balance),
      spendersList: _spendersList,
      approversList: _approversList
    });
  } //Itiratively fetch and render a list of approved spenders for a given owner and their respective allowances


  renderSpenders() {
    if (this.state.spendersList) {
      return this.state.spendersList.map((spender, index) => {
        return /*#__PURE__*/jsx_runtime.jsx(components_ApprovedList, {
          id: index,
          spender: spender
        }, index);
      });
    }
  } //Itiratively fetch and render a list of approving owners for a given spender and their respective balances


  renderApprovers() {
    if (this.state.approversList) {
      return this.state.approversList.map((approver, index) => {
        return /*#__PURE__*/jsx_runtime.jsx(components_ApproverList, {
          id: index,
          approver: approver
        }, index);
      });
    }
  } //Render cards with account information


  renderCards() {
    const accountItems = [{
      key: 'tokenbalance',
      header: this.state.tokenBalance,
      meta: 'Token Balance',
      style: {
        overflowWrap: 'break-word'
      }
    }, {
      key: 'investbalance',
      header: this.state.investBalance,
      meta: 'Amount investment (in ether)',
      style: {
        overflowWrap: 'break-word'
      }
    }, {
      key: 'icostatus',
      header: this.props.formattedStatus,
      meta: 'Current ICO status',
      style: {
        overflowWrap: 'break-word'
      }
    }, {
      key: 'tradingstatus',
      header: this.props.formattedTrading,
      meta: 'Current Trading Status',
      style: {
        overflowWrap: 'break-word'
      }
    }, {
      key: 'enddate',
      header: this.props.endDate,
      meta: 'ICO End date',
      style: {
        overflowWrap: 'break-word'
      }
    }, {
      key: 'endtime',
      header: this.props.formattedEndTime,
      meta: 'End time (UTC)',
      style: {
        overflowWrap: 'break-word'
      }
    }, {
      key: 'tokenprice',
      header: this.props.tokenPrice,
      meta: 'Token price (in ether)',
      style: {
        overflowWrap: 'break-word'
      }
    }, {
      key: 'availabletokens',
      header: this.state.availableTokens,
      meta: 'Number of tokens currently available',
      style: {
        overflowWrap: 'break-word'
      }
    }];
    return /*#__PURE__*/jsx_runtime.jsx(commonjs/* Card.Group */.Zb.Group, {
      items: accountItems
    });
  } //Handles additional investment in tokens


  render() {
    const _tokenLimit = addCommas((this.state.investLimit / this.props.tokenPrice).toFixed());

    const {
      Header,
      Row,
      HeaderCell,
      Body,
      Cell
    } = commonjs/* Table */.iA;
    return /*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Container */.W2, {
      children: [/*#__PURE__*/jsx_runtime.jsx(PageHeader/* default */.Z, {
        start: this.props.startTime,
        end: this.props.endTime
      }), /*#__PURE__*/jsx_runtime.jsx("label", {
        children: /*#__PURE__*/jsx_runtime.jsx("h2", {
          children: "Account Control Panel"
        })
      }), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Grid */.rj, {
        children: [/*#__PURE__*/jsx_runtime.jsx(commonjs/* Grid.Row */.rj.Row, {
          children: /*#__PURE__*/jsx_runtime.jsx(commonjs/* Grid.Column */.rj.Column, {
            width: 16,
            children: /*#__PURE__*/jsx_runtime.jsx(commonjs/* Segment */.XX, {
              children: this.renderCards()
            })
          })
        }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Grid.Row */.rj.Row, {
          children: /*#__PURE__*/jsx_runtime.jsx(commonjs/* Grid.Column */.rj.Column, {
            children: /*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Segment */.XX, {
              children: [/*#__PURE__*/jsx_runtime.jsx("label", {
                children: /*#__PURE__*/jsx_runtime.jsx("h3", {
                  children: "List of Approved Spenders:"
                })
              }), /*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Table */.iA, {
                children: [/*#__PURE__*/jsx_runtime.jsx(Header, {
                  children: /*#__PURE__*/(0,jsx_runtime.jsxs)(Row, {
                    children: [/*#__PURE__*/jsx_runtime.jsx(HeaderCell, {
                      children: "ID"
                    }), /*#__PURE__*/jsx_runtime.jsx(HeaderCell, {
                      textAlign: "left",
                      children: "Spender Address"
                    }), /*#__PURE__*/jsx_runtime.jsx(HeaderCell, {
                      textAlign: "right",
                      children: "Allowance"
                    })]
                  })
                }), /*#__PURE__*/jsx_runtime.jsx(Body, {
                  children: this.renderSpenders()
                })]
              })]
            })
          })
        }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Grid.Row */.rj.Row, {
          children: /*#__PURE__*/jsx_runtime.jsx(commonjs/* Grid.Column */.rj.Column, {
            children: /*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Segment */.XX, {
              children: [/*#__PURE__*/jsx_runtime.jsx("label", {
                children: /*#__PURE__*/jsx_runtime.jsx("h3", {
                  children: "List of Approvers:"
                })
              }), /*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Table */.iA, {
                children: [/*#__PURE__*/jsx_runtime.jsx(Header, {
                  children: /*#__PURE__*/(0,jsx_runtime.jsxs)(Row, {
                    children: [/*#__PURE__*/jsx_runtime.jsx(HeaderCell, {
                      children: "ID"
                    }), /*#__PURE__*/jsx_runtime.jsx(HeaderCell, {
                      textAlign: "left",
                      children: "Approver Address"
                    }), /*#__PURE__*/jsx_runtime.jsx(HeaderCell, {
                      textAlign: "right",
                      children: "Allowance"
                    })]
                  })
                }), /*#__PURE__*/jsx_runtime.jsx(Body, {
                  children: this.renderApprovers()
                })]
              })]
            })
          })
        }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Grid.Row */.rj.Row, {
          children: /*#__PURE__*/jsx_runtime.jsx(commonjs/* Grid.Column */.rj.Column, {
            width: 16,
            children: /*#__PURE__*/jsx_runtime.jsx(commonjs/* Segment */.XX, {
              children: /*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Form */.l0, {
                onSubmit: this.onInvestSubmit,
                error: !!this.state.errorMessage1,
                children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Form.Field */.l0.Field, {
                  inline: true,
                  children: [/*#__PURE__*/jsx_runtime.jsx("label", {
                    children: /*#__PURE__*/jsx_runtime.jsx("h3", {
                      children: "Purchase tokens"
                    })
                  }), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/(0,jsx_runtime.jsxs)("label", {
                    children: ["Enter the amount you would like to invest (in ether, or fractions thereof) and press Submit. The investment amount should be in multiples of ", this.props.tokenPrice, " ether (1 token) and not exceed the total of ", this.state.investLimit, " ether (", _tokenLimit, " tokens).", /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx("br", {})]
                  }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Input */.II, {
                    label: "ether",
                    labelPosition: "right",
                    value: this.state.investAmount,
                    onChange: event => this.setState({
                      investAmount: event.target.value
                    })
                  }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Button */.zx, {
                    loading: this.state.loading1,
                    type: "submit",
                    floated: "right",
                    primary: true,
                    children: "Submit"
                  })]
                }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Message */.v0, {
                  error: true,
                  header: "Oops!",
                  content: this.state.errorMessage1
                })]
              })
            })
          })
        }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Grid.Row */.rj.Row, {
          children: /*#__PURE__*/jsx_runtime.jsx(commonjs/* Grid.Column */.rj.Column, {
            width: 16,
            children: /*#__PURE__*/jsx_runtime.jsx(commonjs/* Segment */.XX, {
              children: /*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Form */.l0, {
                onSubmit: this.onTransferSubmit,
                error: !!this.state.errorMessage2,
                children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Form.Field */.l0.Field, {
                  children: [/*#__PURE__*/jsx_runtime.jsx("label", {
                    children: /*#__PURE__*/jsx_runtime.jsx("h3", {
                      children: "Transfer tokens"
                    })
                  }), /*#__PURE__*/jsx_runtime.jsx("label", {
                    children: "Enter the recipient address and the number of tokens and press Submit:"
                  }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Input */.II, {
                    label: "Recipient Address:",
                    labelPosition: "left",
                    value: this.state.transferAddress,
                    onChange: event => this.setState({
                      transferAddress: event.target.value
                    })
                  }), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Input */.II, {
                    label: "Number of Tokens: ",
                    labelPosition: "left",
                    value: this.state.transferAmount,
                    onChange: event => this.setState({
                      transferAmount: event.target.value
                    })
                  }), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Button */.zx, {
                    loading: this.state.loading2,
                    type: "submit",
                    floated: "right",
                    primary: true,
                    children: "Submit"
                  }), /*#__PURE__*/jsx_runtime.jsx("br", {})]
                }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Message */.v0, {
                  error: true,
                  header: "Oops!",
                  content: this.state.errorMessage2
                })]
              })
            })
          })
        }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Grid.Row */.rj.Row, {
          children: /*#__PURE__*/jsx_runtime.jsx(commonjs/* Grid.Column */.rj.Column, {
            width: 16,
            children: /*#__PURE__*/jsx_runtime.jsx(commonjs/* Segment */.XX, {
              children: /*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Form */.l0, {
                onSubmit: this.onTransferFromSubmit,
                error: !!this.state.errorMessage3,
                children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Form.Field */.l0.Field, {
                  children: [/*#__PURE__*/jsx_runtime.jsx("label", {
                    children: /*#__PURE__*/jsx_runtime.jsx("h3", {
                      children: "Transfer approved tokens from another account"
                    })
                  }), /*#__PURE__*/jsx_runtime.jsx("label", {
                    children: "Enter the sending and receiving addresses and the number of tokens and press Submit:"
                  }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Input */.II, {
                    label: "Sender's Address:",
                    labelPosition: "left",
                    value: this.state.transferFromAddress,
                    onChange: event => this.setState({
                      transferFromAddress: event.target.value
                    })
                  }), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Input */.II, {
                    label: "Receiving Address:",
                    labelPosition: "left",
                    value: this.state.transferToAddress,
                    onChange: event => this.setState({
                      transferToAddress: event.target.value
                    })
                  }), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Input */.II, {
                    label: "Number of Tokens: ",
                    labelPosition: "left",
                    value: this.state.transferFromAmount,
                    onChange: event => this.setState({
                      transferFromAmount: event.target.value
                    })
                  }), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Button */.zx, {
                    loading: this.state.loading3,
                    type: "submit",
                    floated: "right",
                    primary: true,
                    children: "Submit"
                  }), /*#__PURE__*/jsx_runtime.jsx("br", {})]
                }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Message */.v0, {
                  error: true,
                  header: "Oops!",
                  content: this.state.errorMessage3
                })]
              })
            })
          })
        }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Grid.Row */.rj.Row, {
          children: /*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Grid.Column */.rj.Column, {
            width: 16,
            children: [/*#__PURE__*/jsx_runtime.jsx(commonjs/* Segment */.XX, {
              children: /*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Form */.l0, {
                onSubmit: this.onApproveSubmit,
                error: !!this.state.errorMessage4,
                children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Form.Field */.l0.Field, {
                  children: [/*#__PURE__*/jsx_runtime.jsx("label", {
                    children: /*#__PURE__*/jsx_runtime.jsx("h3", {
                      children: "Approve a spender"
                    })
                  }), /*#__PURE__*/jsx_runtime.jsx("label", {
                    children: "Enter the spender address and the number of approved tokens and press Submit:"
                  }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Input */.II, {
                    label: "Spender's Address:",
                    labelPosition: "left",
                    value: this.state.spenderAddress,
                    onChange: event => this.setState({
                      spenderAddress: event.target.value
                    })
                  }), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Input */.II, {
                    label: "Approved Amount: ",
                    labelPosition: "left",
                    value: this.state.approvedAmount,
                    onChange: event => this.setState({
                      approvedAmount: event.target.value
                    })
                  }), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Button */.zx, {
                    loading: this.state.loading4,
                    type: "submit",
                    floated: "right",
                    primary: true,
                    children: "Submit"
                  }), /*#__PURE__*/jsx_runtime.jsx("br", {})]
                }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Message */.v0, {
                  error: true,
                  header: "Oops!",
                  content: this.state.errorMessage4
                })]
              })
            }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Segment */.XX, {
              children: /*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Form */.l0, {
                onSubmit: this.onCancelSubmit,
                error: !!this.state.errorMessage5,
                children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(commonjs/* Form.Field */.l0.Field, {
                  children: [/*#__PURE__*/jsx_runtime.jsx("label", {
                    children: /*#__PURE__*/jsx_runtime.jsx("h3", {
                      children: "Cancel Allowance"
                    })
                  }), /*#__PURE__*/jsx_runtime.jsx("label", {
                    children: "Enter the address of the spender whose allowance you would like to cancel and press the red Submit button below:"
                  }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Input */.II, {
                    label: "Spender's Address",
                    labelPosition: "left",
                    value: this.state.cancelledSpender,
                    onChange: event => this.setState({
                      cancelledSpender: event.target.value
                    })
                  }), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Button */.zx, {
                    loading: this.state.loading5,
                    type: "submit",
                    floated: "right",
                    negative: true,
                    children: "Submit"
                  }), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx("br", {})]
                }), /*#__PURE__*/jsx_runtime.jsx(commonjs/* Message */.v0, {
                  error: true,
                  header: "Oops!",
                  content: this.state.errorMessage5
                })]
              })
            })]
          })
        })]
      })]
    });
  }

}

;
/* harmony default export */ var account = (AccountInfo);

/***/ }),

/***/ 66955:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStaticProps": function() { return /* binding */ getStaticProps; },
/* harmony export */   "getStaticPaths": function() { return /* binding */ getStaticPaths; },
/* harmony export */   "getServerSideProps": function() { return /* binding */ getServerSideProps; },
/* harmony export */   "unstable_getStaticParams": function() { return /* binding */ unstable_getStaticParams; },
/* harmony export */   "unstable_getStaticProps": function() { return /* binding */ unstable_getStaticProps; },
/* harmony export */   "unstable_getStaticPaths": function() { return /* binding */ unstable_getStaticPaths; },
/* harmony export */   "unstable_getServerProps": function() { return /* binding */ unstable_getServerProps; },
/* harmony export */   "config": function() { return /* binding */ config; },
/* harmony export */   "_app": function() { return /* binding */ _app; },
/* harmony export */   "renderReqToHTML": function() { return /* binding */ renderReqToHTML; },
/* harmony export */   "render": function() { return /* binding */ render; }
/* harmony export */ });
/* harmony import */ var next_dist_next_server_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3660);
/* harmony import */ var next_dist_next_server_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_next_server_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35706);
/* harmony import */ var private_dot_next_build_manifest_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32738);
/* harmony import */ var private_dot_next_react_loadable_manifest_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19392);
/* harmony import */ var next_dist_build_webpack_loaders_next_serverless_loader_page_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(99436);

      
      
      
      

      
      const { processEnv } = __webpack_require__(72333)
      processEnv([])
    
      
      const runtimeConfig = {}
      ;

      const documentModule = __webpack_require__(88881)

      const appMod = __webpack_require__(93857)
      let App = appMod.default || appMod.then && appMod.then(mod => mod.default);

      const compMod = __webpack_require__(82113)

      const Component = compMod.default || compMod.then && compMod.then(mod => mod.default)
      /* harmony default export */ __webpack_exports__["default"] = (Component);
      const getStaticProps = compMod['getStaticProp' + 's'] || compMod.then && compMod.then(mod => mod['getStaticProp' + 's'])
      const getStaticPaths = compMod['getStaticPath' + 's'] || compMod.then && compMod.then(mod => mod['getStaticPath' + 's'])
      const getServerSideProps = compMod['getServerSideProp' + 's'] || compMod.then && compMod.then(mod => mod['getServerSideProp' + 's'])

      // kept for detecting legacy exports
      const unstable_getStaticParams = compMod['unstable_getStaticParam' + 's'] || compMod.then && compMod.then(mod => mod['unstable_getStaticParam' + 's'])
      const unstable_getStaticProps = compMod['unstable_getStaticProp' + 's'] || compMod.then && compMod.then(mod => mod['unstable_getStaticProp' + 's'])
      const unstable_getStaticPaths = compMod['unstable_getStaticPath' + 's'] || compMod.then && compMod.then(mod => mod['unstable_getStaticPath' + 's'])
      const unstable_getServerProps = compMod['unstable_getServerProp' + 's'] || compMod.then && compMod.then(mod => mod['unstable_getServerProp' + 's'])

      let config = compMod['confi' + 'g'] || (compMod.then && compMod.then(mod => mod['confi' + 'g'])) || {}
      const _app = App

      const combinedRewrites = Array.isArray(private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg)
        ? private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg
        : []

      if (!Array.isArray(private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg)) {
        combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.beforeFiles */ .Dg.beforeFiles)
        combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.afterFiles */ .Dg.afterFiles)
        combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.fallback */ .Dg.fallback)
      }

      const { renderReqToHTML, render } = (0,next_dist_build_webpack_loaders_next_serverless_loader_page_handler__WEBPACK_IMPORTED_MODULE_4__/* .getPageHandler */ .u)({
        pageModule: compMod,
        pageComponent: Component,
        pageConfig: config,
        appModule: App,
        documentModule: documentModule,
        errorModule: __webpack_require__(3359),
        notFoundModule: undefined,
        pageGetStaticProps: getStaticProps,
        pageGetStaticPaths: getStaticPaths,
        pageGetServerSideProps: getServerSideProps,

        assetPrefix: "",
        canonicalBase: "",
        generateEtags: true,
        poweredByHeader: true,

        runtimeConfig,
        buildManifest: private_dot_next_build_manifest_json__WEBPACK_IMPORTED_MODULE_2__,
        reactLoadableManifest: private_dot_next_react_loadable_manifest_json__WEBPACK_IMPORTED_MODULE_3__,

        rewrites: combinedRewrites,
        i18n: undefined,
        page: "/account",
        buildId: "a503ks4uhPkJroqGYpdj7",
        escapedBuildId: "a503ks4uhPkJroqGYpdj7",
        basePath: "",
        pageIsDynamic: false,
        encodedPreviewProps: {previewModeId:"a99d9cd03c9da5e6aaf4a978f8d7c1c8",previewModeSigningKey:"0fc664f06f7cadf53637ad2f32b8f87cbc27c30a043216885cec557f616277c8",previewModeEncryptionKey:"58f1ad0c10b6c52cdd0bb1457b4525f07c3277e97c6d8e54200458f1770a2a0f"}
      })
      
    

/***/ }),

/***/ 42357:
/***/ (function(module) {

module.exports = require("assert");;

/***/ }),

/***/ 77303:
/***/ (function(module) {

module.exports = require("async_hooks");;

/***/ }),

/***/ 64293:
/***/ (function(module) {

module.exports = require("buffer");;

/***/ }),

/***/ 63129:
/***/ (function(module) {

module.exports = require("child_process");;

/***/ }),

/***/ 27619:
/***/ (function(module) {

module.exports = require("constants");;

/***/ }),

/***/ 45532:
/***/ (function(module) {

module.exports = require("critters");;

/***/ }),

/***/ 76417:
/***/ (function(module) {

module.exports = require("crypto");;

/***/ }),

/***/ 28614:
/***/ (function(module) {

module.exports = require("events");;

/***/ }),

/***/ 35747:
/***/ (function(module) {

module.exports = require("fs");;

/***/ }),

/***/ 98605:
/***/ (function(module) {

module.exports = require("http");;

/***/ }),

/***/ 57211:
/***/ (function(module) {

module.exports = require("https");;

/***/ }),

/***/ 11631:
/***/ (function(module) {

module.exports = require("net");;

/***/ }),

/***/ 33700:
/***/ (function(module) {

module.exports = require("next/dist/compiled/@ampproject/toolbox-optimizer");;

/***/ }),

/***/ 12087:
/***/ (function(module) {

module.exports = require("os");;

/***/ }),

/***/ 85622:
/***/ (function(module) {

module.exports = require("path");;

/***/ }),

/***/ 94213:
/***/ (function(module) {

module.exports = require("punycode");;

/***/ }),

/***/ 71191:
/***/ (function(module) {

module.exports = require("querystring");;

/***/ }),

/***/ 92413:
/***/ (function(module) {

module.exports = require("stream");;

/***/ }),

/***/ 24304:
/***/ (function(module) {

module.exports = require("string_decoder");;

/***/ }),

/***/ 33867:
/***/ (function(module) {

module.exports = require("tty");;

/***/ }),

/***/ 78835:
/***/ (function(module) {

module.exports = require("url");;

/***/ }),

/***/ 31669:
/***/ (function(module) {

module.exports = require("util");;

/***/ }),

/***/ 78761:
/***/ (function(module) {

module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = function() {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [257,111,48,404,374], function() { return __webpack_require__(66955); })
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	!function() {
/******/ 		__webpack_require__.amdO = {};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = function(chunkId) {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	                // Font manifest declaration
/******/ 	                __webpack_require__.__NEXT_FONT_MANIFEST__ = [];
/******/ 	            // Enable feature:
/******/ 	            process.env.__NEXT_OPTIMIZE_FONTS = JSON.stringify(true);/* webpack/runtime/require chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			966: 1
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.O.require = function(chunkId) { return installedChunks[chunkId]; };
/******/ 		
/******/ 		var installChunk = function(chunk) {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 			__webpack_require__.O();
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = function(chunkId, promises) {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("../chunks/" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	!function() {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = function() {
/******/ 			__webpack_require__.e(257);
/******/ 			__webpack_require__.e(111);
/******/ 			__webpack_require__.e(48);
/******/ 			__webpack_require__.e(404);
/******/ 			__webpack_require__.e(374);
/******/ 			return next();
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;