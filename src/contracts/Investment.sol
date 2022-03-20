pragma solidity ^0.5.0;

contract Investment {
    string public name;
    uint public farmerCount = 0;
    uint public dealCount = 0;
    uint public insuranceCount = 0;

    struct Insurance {
        uint insuranceId;
        string farmerName;
        string typeOfInsurance;
        uint premium;
    }
        struct Farmer{
        uint farmerId;
        string farmerName;
        string landLocation;
        string crop;
        uint256 quantity;
        uint256 expectedPrice;
        string expDate;
        address payable owner;
        address payable investor;
        uint holding;
    }

        struct Agreement{
        uint farmerID;
        address farmerAddress;
        address investorAddress;
        uint256 amount;
        uint256 holdingPercent;
    }



    mapping(uint => Farmer) public farmers;
    mapping(uint => Agreement) public deals;
    mapping(uint => Insurance) public insurances;

    function createInsurance(
                        string memory _farmerName,
                        uint premium,
                        string memory _insuranceType
                        ) public  {
        
        //Require a valid name
        require(bytes(_farmerName).length > 0);
        // Require a valid price
        require(premium > 0);
        // Require a valid quantity
        require(bytes(_insuranceType).length > 0);
        //Increment product count
        insuranceCount ++;
        // Create the farmer
        insurances[insuranceCount] = Insurance(insuranceCount, _farmerName,_insuranceType, premium);
    }




    function createFarmer(
                        string memory _farmerName,
                        string memory _farmerLandLocation,
                        string memory _farmerCrop,
                        uint _farmerQuantity,
                        uint _farmerExpectedPrice,
                        string memory _farmerExpiryDate,
                        uint holding) public  {
        
        //Require a valid name
        require(bytes(_farmerName).length > 0);
        // Require a valid price
        require(_farmerExpectedPrice > 0);
        // Require a valid quantity
        require(_farmerQuantity > 0);
        // Require a crop
        require(bytes(_farmerCrop).length > 0);
        //Increment product count
        farmerCount ++;
        // Create the farmer
        farmers[farmerCount] = Farmer(farmerCount, _farmerName, _farmerLandLocation, 
                                    _farmerCrop, _farmerQuantity, _farmerExpectedPrice,
                                    _farmerExpiryDate, msg.sender, msg.sender, holding);
    }

        function createAgreement(
                        uint _farmerId,
                        uint _amount,
                        uint _holding) public  {
        
               // Fetch the product
        Farmer memory _farmer = farmers[_farmerId];

        _farmer.holding = _farmer.holding - _holding;
        _farmer.investor = msg.sender;
        // Fetch the owner
        address payable _farmerAddress = _farmer.owner;
        // Require a valid amount
        require(_amount > 0);

        farmers[_farmerId] = _farmer;
        // Require a valid holding
        require(_holding > 0);

        dealCount++;
        // Create the agreement
        deals[dealCount] = Agreement(_farmerId, _farmerAddress, msg.sender, 
                                    _amount, _holding);
    }

        function purchaseProduct(uint _id) public payable {
        // Fetch the product
        Farmer memory _farmer = farmers[_id];
        // Fetch the owner
        address payable _seller = _farmer.owner;
        // Make sure the product has a valid id
        require(_farmer.farmerId > 0 && _farmer.farmerId <= farmerCount);
        // Require that there is enough Ether in the transaction
        // require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        // require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        // Mark as purchased
        _farmer.investor = msg.sender;
        // Update the product
        farmers[_id] = _farmer;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
    }
    function repay(uint _id) public payable {
        // Fetch the product
        Farmer memory _farmer = farmers[_id];
        // Fetch the owner
        address payable _seller = _farmer.investor;
        // Make sure the product has a valid id
        require(_farmer.farmerId > 0 && _farmer.farmerId <= farmerCount);
        // Require that there is enough Ether in the transaction
        // require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        // require(!_product.purchased);
        // Require that the buyer is not the seller
        // Transfer ownership to the buyer
        //_product.owner = msg.sender;
        // Mark as purchased
        //_product.purchased = true;
        // Update the product
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
    }
}

    

