pragma solidity ^0.4.25;

contract GsDynamic{
    uint public frequency;
    uint public transaction;
    uint public tax;
    uint public dayCounter = 0;
    event new_message(uint value);
    constructor(uint initialfrequency,uint intialtransaction) public{
        frequency = initialfrequency;
        transaction = intialtransaction;
        calculateTax();
    }
    function calculateTax() private{
        if(dayCounter>31){
            dayCounter = 0;
            frequency = 0;
        }
        frequency++;
        dayCounter++;
        tax = transaction/20; //5% Base Tax
        if(frequency>10){
            tax = transaction/10; //10%
        }
        if(frequency>20){
            tax = transaction/5; //20%
        }
        emit new_message(tax);
    }
    function simulateTransaction(uint nextTransaction) public{
        transaction = nextTransaction;
        calculateTax();
    }
    function advanceTenDays() public{
        dayCounter += 10;
    }
}
