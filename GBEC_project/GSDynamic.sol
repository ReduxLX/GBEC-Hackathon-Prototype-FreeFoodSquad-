pragma solidity ^0.4.25;

contract GsDynamic{
    uint public frequency;
    uint public transaction;
    uint public tax;
    address public buyerAddress;
    uint public dayCounter = 0;

    struct Person{
        int idCardNumber;
        uint purchaseNumber;
    }

    mapping (address => Person) public persons;

    constructor(uint intialtransaction,address initialAddress) public{
        transaction = intialtransaction;
        buyerAddress = initialAddress;
        calculateTax();
    }

    function addPerson(address _address, int _idCardNumber, uint _purchaseNumber)public{
        persons[_address] = Person(_idCardNumber, _purchaseNumber);
    }

    function simulateTransaction(address _buyerAddress, uint nextTransaction) public{
        transaction = nextTransaction;
        buyerAddress = _buyerAddress;
        calculateTax();
    }

    function calculateTax() private{
        if (persons[buyerAddress].idCardNumber != 0){
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
        }
        else{
            if(dayCounter>31){
                dayCounter = 0;
                frequency = 0;
            }
            else if (dayCounter>=0 && dayCounter<=31){
            frequency = 1;//the first time purchase
            tax = transaction/20;
            dayCounter++;
            addPerson(buyerAddress, 16122018, frequency);
            }
        }

    }

    //For Video Demonstration, To get to 11 Frequency
    function addTenFrequency() public{
        frequency += 10;
    }
}
