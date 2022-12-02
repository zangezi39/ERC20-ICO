//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

interface IERC20 {
    //totalSupply - returns initial quantity of rolled out tokens
    function totalSupply() external view returns(uint256);

    //balanceOf - returns the number of tokens held by any particular address
    function balanceOf(address _owner) external view returns (uint256 balance);

    //transfer - to transfer the token between accounts
    function transfer(address _to, uint256 _value) external returns(bool success);

    //approve - owner approves a spender to use its own token
    function approve(address _spender, uint _value) external returns (bool success);

    //transferFrom - once approved, it is used to transfer all or partial allowed/approved tokens to spender
    function transferFrom(address _from, address _to, uint256 _value) external returns(bool success);

    //allowance - to keep track of the remaining approved tokens
    function allowance(address _owner, address _spender) external view returns(uint256 remaining);

    //transfer event - used to log transfer function activity and amounts between accounts
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    //approval event - used inside the approved functions to log its activity
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

contract SailToken is IERC20 {
    mapping (address => uint256) public balances;
    mapping (address => mapping(address => uint256)) approved;

	//name, symbol, decimal
	string public name = "SailToken";
	string public symbol = "SAIL";
	uint8 public decimals = 0;

	//uint256 intital totalSupply
	uint256 private tokenSupply = 100000000;
  uint256 public heldTokens;

	//address - creator's address
	address public creator;
    //define the ICO admin
    address public admin;

    modifier adminOnly() {
        require(msg.sender == admin || msg.sender == creator);
        _;
    }

	constructor() {
	    creator = msg.sender;
	    heldTokens = tokenSupply;
	}

	function totalSupply() public view override returns(uint) {
	    return tokenSupply;
	}

    function balanceOf(address _owner) public view override returns (uint balance) {
        return balances[_owner];
    }

    function transfer(address _to, uint _value) public override returns(bool success) {
        require(_value > 0 && balances[msg.sender] >= _value);

        balances[_to] = balances[_to] + _value;
        balances[msg.sender] = balances[msg.sender] - _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint _value) public override returns (bool success) {
        require(_value > 0);
        require(balances[msg.sender] + approved[msg.sender][_spender] >= _value);
        require(_spender != msg.sender);
        require(_spender != creator);

        if (approved[msg.sender][_spender]==0) {
            approved[msg.sender][_spender] = _value;
        } else {
            approved[msg.sender][_spender] = approved[msg.sender][_spender] + _value;
        }

        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint _value) public override returns(bool success) {
        require(_value > 0);
        require(balances[_from] >= _value);
        require(approved[_from][msg.sender] >= _value);

        balances[_to] = balances[_to] + _value;
        balances[_from] = balances[_from] - _value;
        approved[_from][msg.sender] = approved[_from][msg.sender] - _value;

        return true;
    }

    function allowance(address _owner, address _spender) external view override returns(uint remaining) {
        return approved[_owner][_spender];
    }
}

contract SailICO is SailToken {
    mapping (address => bool) public exists;
    mapping (address => address[]) public spenders;
    mapping (address => address[]) public approvers;
    mapping (address => uint256) public investment;

    //define the recipient account
    address payable public recipient;

    //initial token price 0.0001 ether = 100,000,000,000,000 wei
    uint public tokenPrice = 100000000000000;

    //hardcap 5,000 ether
    uint public icoTarget = 5000000000000000000000;


    uint public tokenTarget = icoTarget / tokenPrice;

    //amount of funding
    uint public fundsReceived;

    //maximum investment for each individual investor 100 ether
    uint public maxInvest = 100000000000000000000;

    //minimum investment for each individual investor 0.00001 ether (1 token)
    uint public minInvest = 100000000000000;

    enum icoStatus { Pending, Active, Stopped, Completed }
    icoStatus public status;

    enum tradingStatus { Pending, Active }
    tradingStatus public trading;

    uint public icoStartTime = (block.timestamp + 3600) - (block.timestamp % 3600);

    //set the duration time 10 days (in seconds)
    uint public icoDuration = 864000;

    uint public icoEndTime = icoStartTime + icoDuration;

    //set the period between ICO end and beginning of trading at 5 days
    uint public startTrading = icoEndTime + 432000;

    string remainAmount;

    constructor (address payable _recipient) {
        admin = msg.sender;
        recipient = _recipient;
        balances[admin] = balances[admin] + tokenTarget;
        heldTokens = heldTokens - tokenTarget;
        emit Transfer(address(0), msg.sender, tokenTarget);
    }

    //ICO status setter functions
    function setStopStatus() external adminOnly {
        require(status == icoStatus.Active);
        status = icoStatus.Stopped;
    }

    function setRunStatus() external adminOnly {
        require(status == icoStatus.Stopped || status == icoStatus.Pending);
        status = icoStatus.Active;
    }

    function setCompletedStatus() public adminOnly {
        require(status != icoStatus.Completed);
        status = icoStatus.Completed;
    }

    function getIcoStatus() public view returns(icoStatus) {
        if (status == icoStatus.Stopped && block.timestamp < icoEndTime) {
            return icoStatus.Stopped;
        } else if (block.timestamp >= icoStartTime
          && block.timestamp <icoEndTime
          && status!=icoStatus.Stopped) {
            return icoStatus.Active;
        } else if (block.timestamp < icoStartTime) {
            return icoStatus.Pending;
        } else {
            return icoStatus.Completed;
        }
    }

    function getTradingStatus() public view returns(tradingStatus) {
        if (startTrading > block.timestamp) {
            return tradingStatus.Pending;
        } else {
            return tradingStatus.Active;
        }
    }

    //checks available tokens and returns either maxInvest or available tokens * price
    function getInvestLimit() public view returns(uint) {
        uint _at = getAvailableTokens();

        if (block.timestamp >= icoEndTime) {
            return 0;
        } else if (_at >= maxInvest / tokenPrice) {
            return maxInvest;
        } else {
            return _at * tokenPrice;
        }
    }

    function getInvestment(address _account) external view returns(uint) {
        uint _investment = investment[_account];
        return _investment;
    }

    function getAvailableTokens() public view returns(uint) {
        if (block.timestamp >= icoEndTime) {
            return 0;
        } else {
            uint _availableTokens = balances[admin];
            return _availableTokens;
        }
    }

    function getExists(address _owner) external view returns (bool) {
        return exists[_owner];
    }

    function getSpenders(address _approver) external view returns(address[] memory) {
        return spenders[_approver];
    }

    function getApprovers(address _spender) external view returns(address[] memory) {
        return approvers[_spender];
    }

    //calculates amount remaining for investment
    function remainInvestAmount() public view returns(uint) {
        uint remainInvest = (icoTarget - fundsReceived) / tokenPrice;
        return remainInvest;
    }

    function invest() payable public returns (bool) {
        status = getIcoStatus();
        uint _tokensAwarded = msg.value / tokenPrice;

        require(status == icoStatus.Active, "ICO is not active");
        require(fundsReceived < icoTarget, "Target has been achieved - investment no longer accepted");
        require(msg.value >= minInvest && msg.value <= maxInvest, "The amount must be between 0.00001 and the maximum");
        require(fundsReceived + msg.value <= icoTarget, "Please enter amount that is lower than the maximum");

        balances[admin] = balances[admin] - _tokensAwarded;      //decrease admin's token balance
        balances[msg.sender] = balances[msg.sender] + _tokensAwarded;
        investment[msg.sender] = investment[msg.sender] + msg.value;

        if (exists[msg.sender] == false) {
            exists[msg.sender] = true;
        }

        recipient.transfer(msg.value);               //transfer ether received from investor to the receiving account
        fundsReceived = fundsReceived + msg.value;   //increment the funds received balance by the amount of ether received

        return true;
    }

    function approveSpender(address _spender, uint _value) external returns (bool success) {
        require(_value > 0);
        require(balances[msg.sender] + approved[msg.sender][_spender] >= _value);
        require(_spender != msg.sender);
        require(_spender != admin);

        if (approved[msg.sender][_spender]==0) {
            spenders[msg.sender].push(_spender);
            approvers[_spender].push(msg.sender);
        }

        return approve(_spender, _value);
    }

    //destroys the unsold tokens
    function burnTokens() external adminOnly returns(bool success) {
        status = getIcoStatus();
        require(status == icoStatus.Completed, "ICO is not yet completed");

        balances[admin] = 0;
        return true;
    }

    function transferTo(address _to, uint _value) external adminOnly returns(bool success) {
        require(block.timestamp >= startTrading, "Trading is not allowed at present time");

        return transfer(_to, _value);
    }

    function transferFromTo(address _from, address _to, uint256 _value) external returns(bool success) {
        require(block.timestamp >= startTrading, "Trading is not allowed at present time");

        return transferFrom(_from, _to, _value);
    }
}
