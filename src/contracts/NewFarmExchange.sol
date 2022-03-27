pragma solidity ^0.5.0; 

contract NewFarmExchange { 
    uint private farmerCount = 0;
    // uint private processorCount = 0;
    // uint private cropCount = 0; 
    // uint private productCount = 0; 
    // uint private customerCount = 0; 
    mapping(uint => Farmer) private farmers; 
    // mapping(uint => Processor) private processors; 
    // mapping(uint => Ownable) private crops; 
    // mapping(uint => Ownable) private products;
    // mapping(uint => Ownable) private customers; 

    //mapping(uint => ProcessedItem) public processedItems;
    //mapping(uint => MarketProduct) public marketProducts; 

    function getFarmerCount() public view returns (uint) {return farmerCount; }



    function getFarmers() public view returns (Farmer[] memory){
    Farmer[] memory ret = new Farmer[](farmerCount);
    for (uint i = 0; i < farmerCount; i++) {
        ret[i] = farmers[i];
    }
    return ret;
}
    

    function createFarmer(string memory name_, uint costToProduce_, uint quantity_, string memory cropName_, string memory landLocation_, uint holding_) public  {
        Farmer f = new Farmer(name_, costToProduce_, quantity_, cropName_, landLocation_, holding_, farmerCount);
        farmerCount++;
        farmers[farmerCount] = f;      
      
    } 

//     function createProcessor(string memory name_) public {
//         processorCount++;
//         Processor processor = new Processor(name_, processorCount);
//         processors[processorCount] = processor;    
//     }

//     function createCustomer(string memory name_) public {
//         customerCount++;
//         Account customer = new Customer(name_, customerCount);
//         customers[customerCount] = customer; 
//     }

//     function createCrop(uint farmerID, string memory name_,  uint price_, uint quantity_) public {
//         cropCount++; 
//         Account owner = farmers[farmerID]; 
//         Ownable c = new Ownable(name_, owner, price_, quantity_, cropCount, false, this); 
//         crops[cropCount] = c;   
//     } 

//     function createProduct(uint processorID, string memory name_, uint price_, uint quantity_) public { 
//         productCount++;
//         Account owner= processors[processorID]; 
//         Ownable p = new Ownable(name_, owner, price_, quantity_, productCount, true, this); 
//         products[productCount] = p; 
//     } 

//     function purchaseCrop(uint cropID,  uint processorID, uint quantity) public {                               //need to call create Processor first to get an processor ID optionally we could use account
//         Ownable crop = crops[cropID]; 
//         crop.purchase(quantity, processors[processorID]); 
//     }

//     function purchaseProduct(uint productID, uint customerID, uint quantity) public {
//         Ownable product = products[productID];
//         product.purchase(quantity, customers[customerID]); 
// }

}
contract Ownable { 
     //address creator; //important for tracking who supplies the product in real life but how to implement it? 
     uint private id; 
     address payable owner; 
     uint private price; 
     string private name;  
     uint private quantity; 
     bool private readyForMarket;  
     NewFarmExchange farm; 

    constructor(string memory name_, address payable owner_, uint price_, uint quantity_, uint id_, bool readyForMarket_, NewFarmExchange farm_) public { 
                                   //set the exchange 
        owner = owner_;
        require(bytes(name_).length > 0); 
        name = name_;  
        owner = owner_;
        require(price_ > 0);
        price = price_; 
        require(quantity_ > 0);
        quantity = quantity_; 
        id = id_; 
        readyForMarket = readyForMarket_;
        farm = farm_;
    }
    function getID() public view returns (uint) {return id; }
    function getOwner() public view returns (address) {return owner; } 
    function getPrice() public view returns (uint) {return price; }
    function getName() public view returns (string memory)  {return name; }
    function getQuantity() public view returns (uint) {return quantity;}
    // function purchase(uint quantity_, address payable buyer) external { 
    //     require(quantity_ > 0 && quantity_ < quantity); 
    //     if(msg.sender == owner)  return;  //can't purchase your own product 
    //     require(msg.value >= (price * quantity)); 
    //     address(owner).transfer(msg.value); 
    //     if(quantity == quantity_) {
    //         owner = buyer;  //exchange ownership when all is bought out; 
    //     }
    //     quantity -= quantity_;   //partial buying 
    //     if(readyForMarket) {
    //         //create a new ownable with requested quantity for the new owner; 
    //         farm.createProduct(name, getID(), price, quantity_); //should we set the price to zero? 
    //     } else {
    //         farm.createCrop(name, buyer.getID(), price, quantity_);
    //     }     
    // } 
}

contract Account {
    string private name; 
    uint private id; 
    address payable private accountAddress; 
    constructor(string memory name_, uint id_) internal {
        require(bytes(name_).length > 0); 
        name = name_;
        accountAddress = msg.sender;
        id = id_; 
    }
    function getAccountAddress() public view returns(address) {return accountAddress; } 
    function getName() public view returns(string memory)  {return name; } 
    function getID() public pure returns(uint ID) {return ID; }
} 

contract Farmer is Account {
    uint private costToProduce; 
    uint quantity;  
    string private cropName;  
    string private landLocation;
    uint private holding; 
    constructor(string memory name_, uint costToProduce_, uint quantity_, string memory cropName_, string memory landLocation_, uint holding_, uint id_) Account(name_, id_) public {
        costToProduce = costToProduce_;
        quantity = quantity_;
        cropName = cropName_;
        landLocation = landLocation_;
        holding = holding_; 
    } 
} 

// contract Processor is Account{ 
//     uint quantity;  
//     constructor(string memory name_, uint costToProduce_, uint quantity_, string memory cropName_, string memory landLocation_, uint holding_, uint id_) Account(name_, id_) public {
//         quantity = quantity_;
//     } 

// contract Customer is Account{  
//      constructor(string memory name_, uint id_) Account(name_, id_) public {
//     } 

// }

// contract Investor is Account{  
//      constructor(string memory name_, uint id_) Account(name_, id_) public {
//     } 

