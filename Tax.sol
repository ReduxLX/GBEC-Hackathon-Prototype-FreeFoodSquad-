pragma solidity ^0.4.25;

contract Tax{

    int public frequency;
    uint public transaction;
    uint public finalTransaction;
    uint public day = 0;
    event new_transaction(uint value);
    event new_frequency(int value);
    event old_transaction(uint value);
    event new_day(uint value);

    constructor(int initialFrequency, uint initialTransaction) public{
        frequency = initialFrequency;
        transaction = initialTransaction;
    }

     function setFrequency(int _frequency) public{
        frequency = _frequency;
        emit new_frequency(frequency);
    }

    function setTransaction(uint _transaction) public{
        transaction = _transaction;
        emit old_transaction(transaction);
    }

   function setDay(uint _day) public{
        day = _day;
        emit new_day(day);
    }

    function transactionAfterTax() public constant returns(uint){
        if (frequency >= 0 && frequency < 10 ){
            finalTransaction = transaction * 105;
        }
        else if (frequency >= 10 && frequency <= 15){
            finalTransaction = transaction * 110;
        }
        else if (frequency > 15 && frequency < 20){
            finalTransaction = transaction * 115;
        }
        else if (frequency >= 20){
            finalTransaction = transaction * 120;
        }
        return finalTransaction;

    }
}
