pragma solidity ^0.4.25;

contract Hello{
    string public message;
    event new_message(string value);
    constructor(string initialMessage) public{
        message = initialMessage;
    }
    function setMessage(string newMessage) public{
        message = newMessage;
        emit new_message(newMessage);
    }
}
