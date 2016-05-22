contract MyContract {
  address public owner;

  function MyContract() {
    owner = msg.sender;
  }
}
