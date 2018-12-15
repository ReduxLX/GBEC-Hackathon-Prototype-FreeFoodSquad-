// address of your smart contract deployed on the blockchain
var smartContractAddress = "0xfe74a0eae72bf8aa8ed602dcc7e573fdcece1124";

// ABI is a JSON formatted list of contract's function and arguments required to create the EVM bytecode required to call the function
var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_day",
				"type": "uint256"
			}
		],
		"name": "setDay",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_frequency",
				"type": "int256"
			}
		],
		"name": "setFrequency",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_transaction",
				"type": "uint256"
			}
		],
		"name": "setTransaction",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "initialFrequency",
				"type": "int256"
			},
			{
				"name": "initialTransaction",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "new_transaction",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "value",
				"type": "int256"
			}
		],
		"name": "new_frequency",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "old_transaction",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "new_day",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "day",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "finalTransaction",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "frequency",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "transaction",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "transactionAfterTax",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];


var myAccount;
var web3;

function initApp(){
  myAccount = web3.eth.accounts[0];
  myContract = web3.eth.contract(abi);
  contractInstance = myContract.at(smartContractAddress);
}

function updateTransactionValue() {
  transactionAmount = parseFloat(document.getElementById("transaction_value").value);
  transactionAmount = transactionAmount * 100;
  if(transactionAmount == 0){
    return window.alert("No TRANSACTION!");
  }

  contractInstance.setTransaction(transactionAmount,{ 
    from: myAccount,
    gasPrice: "20000000000", // amount of wei you're paying for every unit of gas
    gas: "41000", //maximum gas to be spent on this transaction
    //to: textetheraddress, 
    //value: textetheramount,
    //data: ""
   }, function(err, result) {
    if (!err){
      console.log('TRANSACTION UPDATED IN BLOCKCHIAN SUCCESSFULLY',result); 
    }
    else{
      console.log(err);
    }
  });
  updateFrequencyValue();
}

function refreshTransactionValue(transactionAmount) {
  contractInstance.transaction({
    from: myAccount
   }, function(err, result) {
    if (!err){
      console.log('Fetched transaction value from blockchain:',result); 
      document.getElementById("transaction").innerText=result;
    }
    else{
      console.log(err);
    }
  });
}

function updateFrequencyValue() {
  dayPurchase = contractInstance.day;
  if (dayPurchase < 31 && dayPurchase >= 0){
    frequencyPurchase = contractInstance.frequency;
    frequencyPurchase ++;
    contractInstance.setFrequency(frequencyPurchase,{ 
    from: myAccount,
    gasPrice: "20000000000", // amount of wei you're paying for every unit of gas
    gas: "41000", //maximum gas to be spent on this transaction
    //to: textetheraddress, 
    //value: textetheramount,
    //data: ""
   }, function(err, result) {
    if (!err){
      console.log('FREQUENCY UPDATED IN BLOCKCHIAN SUCCESSFULLY',result); 
    }
    else{
      console.log(err);
    }
  });
  }
  else if (dayPurchase > 30){
    contractInstance.setDay(0,{ 
    from: myAccount,
    gasPrice: "20000000000", // amount of wei you're paying for every unit of gas
    gas: "41000", //maximum gas to be spent on this transaction
    //to: textetheraddress, 
    //value: textetheramount,
    //data: ""
   }, function(err, result) {
    if (!err){
      console.log('FREQUENCY UPDATED IN BLOCKCHIAN SUCCESSFULLY',result); 
    }
    else{
      console.log(err);
    }
  });
  contractInstance.setFrequency(0,{ 
    from: myAccount,
    gasPrice: "20000000000", // amount of wei you're paying for every unit of gas
    gas: "41000", //maximum gas to be spent on this transaction
    //to: textetheraddress, 
    //value: textetheramount,
    //data: ""
   }, function(err, result) {
    if (!err){
      console.log('FREQUENCY UPDATED IN BLOCKCHIAN SUCCESSFULLY',result); 
    }
    else{
      console.log(err);
    }
  });
  }
}



function refreshFrequencyValue(frequencyPurchase) {
  contractInstance.frequency({ 
    from: myAccount
   }, function(err, result) {
    if (!err){
      console.log('Fetched transaction value from blockchain:',result); 
      document.getElementById("frequency").innerText=result;
    }
    else{
      console.log(err);
    }
  });
}

function updateTransactionAfterTax(transactionAmount, frequencyAmount){
  result = contractInstance.transactionAfterTax()
  contractInstance.finalTransaction({ 
    from: myAccount
   }, function(err, result) {
    if (!err){
      console.log('Fetched transaction value from blockchain:',result); 
      document.getElementById("transactionAfterTax").innerText=result/100;
    }
    else{
      console.log(err);
    }
  });
}



window.addEventListener('load', function() {
// Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.currentProvider);
  } else {
    // Handle the case where the user doesn't have web3. Probably 
    // show them a message telling them to install Metamask in 
    // order to use our app.
    // For example
    // connect to eth node running locally
    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    // or connect the web3 to the ethereum node running on infura.io
    //var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
    console.log('METAMASK NOT DETECTED');
  }
  // Now you can start your app & access web3js freely:
  initApp();
})


