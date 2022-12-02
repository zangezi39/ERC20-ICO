/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 54204:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15048);
/* harmony import */ var _components_PageHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(99388);
/* harmony import */ var _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54357);
/* harmony import */ var _ethereum_web3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(61483);
/* harmony import */ var _components_scripts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41207);



function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const Web3 = __webpack_require__(3283);

class IcoInvest extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      investAmount: '',
      tokenBalance: 0,
      investBalance: '',
      investLimit: this.props.investLimit,
      availableTokens: (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .addCommas */ .OD)(this.props.availableTokens),
      errorMessage: '',
      //error message = empty string (falsish - convert to true bool by !!)
      loading: false //button spinner

    });

    _defineProperty(this, "onSubmit", async event => {
      event.preventDefault(); //prevents submitting to the server

      this.setState({
        loading: true,
        errorMessage: ''
      });
      const accounts = await _ethereum_web3__WEBPACK_IMPORTED_MODULE_4__/* .default.eth.getAccounts */ .Z.eth.getAccounts();

      try {
        await _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__/* .default.methods.invest */ .Z.methods.invest().send({
          from: accounts[0],
          value: _ethereum_web3__WEBPACK_IMPORTED_MODULE_4__/* .default.utils.toWei */ .Z.utils.toWei(this.state.investAmount, 'ether')
        });
      } catch (err) {
        this.setState({
          errorMessage: err.message
        });
      }

      if (this.state.errorMessage == '') this.setState({
        investLimit: _ethereum_web3__WEBPACK_IMPORTED_MODULE_4__/* .default.utils.fromWei */ .Z.utils.fromWei(await _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__/* .default.methods.getInvestLimit */ .Z.methods.getInvestLimit().call(), 'ether'),
        availableTokens: (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .addCommas */ .OD)(await _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__/* .default.methods.getAvailableTokens */ .Z.methods.getAvailableTokens().call()),
        tokenBalance: (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .addCommas */ .OD)(await _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__/* .default.methods.balanceOf */ .Z.methods.balanceOf(accounts[0]).call()),
        investBalance: (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .addCommas */ .OD)(_ethereum_web3__WEBPACK_IMPORTED_MODULE_4__/* .default.utils.fromWei */ .Z.utils.fromWei(await _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__/* .default.methods.getInvestment */ .Z.methods.getInvestment(accounts[0]).call(), 'ether'))
      });
      this.setState({
        loading: false
      });
    });
  }

  static async getInitialProps() {
    const statIndex = await _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__/* .default.methods.getIcoStatus */ .Z.methods.getIcoStatus().call();
    const startTime = await _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__/* .default.methods.icoStartTime */ .Z.methods.icoStartTime().call();
    const endTime = await _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__/* .default.methods.icoEndTime */ .Z.methods.icoEndTime().call();
    const maxInvest = _ethereum_web3__WEBPACK_IMPORTED_MODULE_4__/* .default.utils.fromWei */ .Z.utils.fromWei(await _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__/* .default.methods.maxInvest */ .Z.methods.maxInvest().call(), 'ether');
    const tokenPrice = _ethereum_web3__WEBPACK_IMPORTED_MODULE_4__/* .default.utils.fromWei */ .Z.utils.fromWei(await _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__/* .default.methods.tokenPrice */ .Z.methods.tokenPrice().call(), 'ether');
    const investLimit = _ethereum_web3__WEBPACK_IMPORTED_MODULE_4__/* .default.utils.fromWei */ .Z.utils.fromWei(await _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__/* .default.methods.getInvestLimit */ .Z.methods.getInvestLimit().call(), 'ether');
    const tokens = await _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__/* .default.methods.getAvailableTokens */ .Z.methods.getAvailableTokens().call();
    const tokenMax = maxInvest / tokenPrice;
    const limitToken = investLimit / tokenPrice;
    const tokenLimit = (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .addCommas */ .OD)(limitToken);
    const availableTokens = (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .addCommas */ .OD)(tokens);
    const maxTokens = (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .addCommas */ .OD)(tokenMax);
    const formattedStartTime = (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .formatTime */ .mr)(startTime);
    const formattedEndTime = (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .formatTime */ .mr)(endTime);
    const formattedStatus = (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .formatStatus */ .LR)(statIndex);
    const startDate = (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .formatStartDate */ .Oh)(startTime);
    const endDate = (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .formatEndDate */ .Lu)(endTime);
    const icoTarget = (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .addCommas */ .OD)(_ethereum_web3__WEBPACK_IMPORTED_MODULE_4__/* .default.utils.fromWei */ .Z.utils.fromWei(await _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__/* .default.methods.icoTarget */ .Z.methods.icoTarget().call(), 'ether'));
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

  //Fetch the initial values of token and eth investment balances
  async componentDidMount() {
    const accounts = await _ethereum_web3__WEBPACK_IMPORTED_MODULE_4__/* .default.eth.getAccounts */ .Z.eth.getAccounts();
    const balance = await _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__/* .default.methods.balanceOf */ .Z.methods.balanceOf(accounts[0]).call();
    const investment = _ethereum_web3__WEBPACK_IMPORTED_MODULE_4__/* .default.utils.fromWei */ .Z.utils.fromWei(await _ethereum_icotoken__WEBPACK_IMPORTED_MODULE_3__/* .default.methods.getInvestment */ .Z.methods.getInvestment(accounts[0]).call(), 'ether');
    this.setState({
      tokenBalance: (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .addCommas */ .OD)(balance),
      investBalance: (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .addCommas */ .OD)(investment)
    });
  }

  renderCards() {
    const items = [{
      key: 'mininvest',
      header: this.props.tokenPrice,
      meta: 'Minimum Investment Amount (in ether)',
      style: {
        overflowWrap: 'break-word'
      }
    }, {
      key: 'investlimit',
      header: this.state.investLimit,
      meta: 'Maximum Investment Amount (in ether)',
      style: {
        overflowWrap: 'break-word'
      }
    }, {
      key: 'icoenddate',
      header: this.props.endDate,
      meta: 'ICO End date',
      style: {
        overflowWrap: 'break-word'
      }
    }, {
      key: 'icoendtime',
      header: this.props.formattedEndTime,
      meta: 'ICO End time (UTC)',
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
    }, {
      key: 'icotarget',
      header: this.props.icoTarget,
      meta: 'ICO target (in ether)',
      style: {
        overflowWrap: 'break-word'
      }
    }, {
      key: 'tokensowned',
      header: this.state.tokenBalance,
      meta: 'Tokens owned',
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
    }];
    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Card.Group */ .Zb.Group, {
      items: items
    });
  }

  render() {
    const _tl = this.state.investLimit / this.props.tokenPrice;

    const _tokenLimit = (0,_components_scripts__WEBPACK_IMPORTED_MODULE_5__/* .addCommas */ .OD)(_tl.toFixed());

    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Container */ .W2, {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_PageHeader__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z, {
        start: this.props.startTime,
        end: this.props.endTime
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
        children: "Get your SailTokens!"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
        children: ["Please enter the amount of ether you would like to invest. Make sure that it is in multiples of ", this.props.tokenPrice, " ether and does not exceed the total of ", this.state.investLimit, " ether (", _tokenLimit, " tokens)."]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Grid */ .rj, {
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Grid.Row */ .rj.Row, {
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Grid.Column */ .rj.Column, {
            width: 16,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Segment */ .XX, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Form */ .l0, {
                onSubmit: this.onSubmit,
                error: !!this.state.errorMessage,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Form.Field */ .l0.Field, {
                  inline: true,
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                    children: "Enter the investment amount and press Submit"
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Input */ .II, {
                    label: "ether",
                    labelPosition: "right",
                    value: this.state.investAmount,
                    onChange: event => this.setState({
                      investAmount: event.target.value
                    })
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Button */ .zx, {
                    loading: this.state.loading,
                    type: "submit",
                    floated: "right",
                    children: "Submit"
                  })]
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Message */ .v0, {
                  error: true,
                  header: "Oops!",
                  content: this.state.errorMessage
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {})]
              })
            })
          })
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Grid.Row */ .rj.Row, {
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Grid.Column */ .rj.Column, {
            width: 16,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Segment */ .XX, {
              children: this.renderCards()
            })
          })
        })]
      })]
    });
  }

}

;
/* harmony default export */ __webpack_exports__["default"] = (IcoInvest);

/***/ }),

/***/ 17979:
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

      const compMod = __webpack_require__(54204)

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
        page: "/invest",
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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [257,111,488,404,374,207], function() { return __webpack_require__(17979); })
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
/******/ 			468: 1
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
/******/ 			__webpack_require__.e(488);
/******/ 			__webpack_require__.e(404);
/******/ 			__webpack_require__.e(374);
/******/ 			__webpack_require__.e(207);
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