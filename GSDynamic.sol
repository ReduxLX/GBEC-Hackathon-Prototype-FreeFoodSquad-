pragma solidity ^0.4.25;

contract GsDynamic{
    uint public frequency;
    uint public transaction;
    uint public tax;
    address public buyerAddress;
    uint public dayCounter = 0;

    struct Person{
        uint totalTax;
        int idCardNumber;
        uint purchaseNumber;
    }

    mapping (address => Person) public persons;

    constructor(uint intialtransaction,address initialAddress) public{
        transaction = intialtransaction;
        buyerAddress = initialAddress;
        calculateTax();
    }

    function registerPerson(address _address,int _idCardNumber) public {
        persons[_address] = Person(0,_idCardNumber,0);
    }

    function simulateTransaction(address _buyerAddress, uint nextTransaction) public{
        transaction = nextTransaction;
        buyerAddress = _buyerAddress;
        calculateTax();
    }

    function calculateTax() private{
        frequency = persons[buyerAddress].purchaseNumber;
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
        persons[buyerAddress].purchaseNumber = frequency;
        persons[buyerAddress].totalTax += tax;
    }

    //For Video Demonstration, To get to 11 Frequency
    function addTenFrequency() public{
        frequency += 10;
    }
}
