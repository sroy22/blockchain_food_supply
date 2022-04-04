pragma solidity ^0.5.0;

import "./ConsumerRole.sol";

import "./FarmerRole.sol";
import "./ProcessorRole.sol";


contract FarmExchange  {
    uint public farmerCount = 0; // total farmer crop count
    uint public processedItemsCount = 0 ; // total processed item count
    uint public marketProductCount = 0; // total market product count
    uint public dealCount = 0; // total deals count
    uint public insuranceCount = 0; // total insurance policies count

    mapping(uint => Farmer) public farmers; // mapping object to store all farmer products
    mapping(uint => ProcessedItem) public processedItems; // mapping object to store all processed items
    mapping(uint => MarketProduct) public marketProducts; // mapping object to store all market products
    mapping(uint => Agreement) public deals; // mapping object to store all deals
    mapping(uint => Insurance) public insurances; // mapping object to store all insurance policies

    // struct object to represent a farmer crop
    struct Farmer{
        uint farmerId; // farmer id
        string crop; // farmer crop name
        uint256 quantity; // total units of crop
        uint256 expectedPrice; // price to be sold at farmer's end
        address payable owner; // farmer's address
        address payable processor; // processor's address
        uint holding; // holding of farmer available to be invested in
        uint costToProduce; // total cost of produce for the farmer
        bool investmentMade; // whether an investor has invested in the farmer
        bool boughtByProcessor; // whether a processor has bought from the farmer
        uint processorPrice; // the price at which the processor bought
        uint farmerRating; // average farmer rating received by farmer
        uint totalRatings; // total number of ratings received by farmer
    }

    // struct object to represent insurance policy
    struct Insurance {
        uint insuranceId; // insurance policy id
        string farmerName; // name of the farmer who bought this insurance
        string typeOfInsurance; // the type of weather condition for the insurance
        uint premium; // the insurance premium amount to be paid by the farmer
    }

    // struct object to represent the investment deal
    struct Agreement{
        uint farmerID; // id of the farmer
        address farmerAddress; // address of the farmer
        address payable investorAddress; // address of the investor
        uint256 amount; // amount invested in the farmer
        uint256 holdingPercent; // amount of holding percent held by the investor
    }
  
    // struct object to represent the processed item
    struct ProcessedItem {
        uint processorId; // id of the processor
        string item; // name of the processed item
        uint256 quantity; // quantity of items processed
        uint farmerId; // id of the origin farmer
        address payable processorAddress; // address of the processor
        bool productPosted; // whether the item has been posted to market or not
    }

    // struct object to represent the market product
    struct MarketProduct {
        uint marketProductId; // id of the market product
        uint processorId; // id of the processor
        uint quantity; // quantity of item to be sold
        uint price; // price of item being sold
        string name; // name of the market product
        address payable processorAddress; // address of the processor
        address payable buyerAddress; // address of the consumer
        uint productRating; // average product rating received by the market product
        uint productTotalRatings;// total product ratings received by the market product
    }

    event FarmerCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    // function to create a record of the farmer crop
    function createFarmer(
                        string memory _farmerName,
                        string memory _farmerCrop,
                        uint _farmerQuantity,
                        uint _farmerExpectedPrice,
                        uint holding,
                        uint _costToProduce) public  {
        
        //Require a valid name
        require(bytes(_farmerName).length > 0);

        // Require a valid price
        require(_farmerExpectedPrice > 0);
        // Require a valid quantity
        require(_farmerQuantity > 0);
        // Require a crop
        require(bytes(_farmerCrop).length > 0);
        // require cost to produce to be greater than 0
        require(_costToProduce > 0);
        //Increment product count
        farmerCount ++;
        // Create the farmer crop
        farmers[farmerCount] = Farmer(farmerCount,
                                    _farmerCrop, _farmerQuantity, _farmerExpectedPrice,
                                     msg.sender, msg.sender, holding, _costToProduce, false, false, 0, 0, 0);
    }


    // function to create an insurance policy
    function createInsurance(
                        string memory _farmerName,
                        uint premium,
                        string memory _insuranceType
                        ) public  {
        
        //Require a valid name
        require(bytes(_farmerName).length > 0);
        // Require a valid price
        require(premium > 0);
        // Require a valid insurance type
        require(bytes(_insuranceType).length > 0);
        //Increment insurance count
        insuranceCount ++;
        // Create the insurance policy
        insurances[insuranceCount] = Insurance(insuranceCount, _farmerName,_insuranceType, premium);
    }


    // function to pay back to the investor
    function payToInvestor(uint _id) public payable {
        
        // retrieve the deal of the farmer and the investor
        Agreement memory _deal = deals[_id];
        //assign the seller address
        address payable _seller = _deal.investorAddress;
        //transfer the amount
        address(_seller).transfer(msg.value);
        }

    // function to purchase farmer's share by the investor
    function purchaseFarmerShare(uint _id) public payable {
        
        // Fetch the farmer crop details
        Farmer memory _farmer = farmers[_id];
        // make investmentMade to be true
        _farmer.investmentMade = true;
        // Fetch the owner
        address payable _seller = _farmer.owner;
        // Make sure the crop has a valid id
        require(_farmer.farmerId > 0 && _farmer.farmerId <= farmerCount);
        // make sure the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _farmer.processor = msg.sender;
        // Update the product
        farmers[_id] = _farmer;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
    }

    // function to create the agreement
    function createAgreement(
                        uint _farmerId,
                        uint _amount,
                        uint _holding) public  {
        
        // Fetch the farmer crop
        Farmer memory _farmer = farmers[_farmerId];
        //update the holding
        _farmer.holding = _farmer.holding - _holding;
        // Require a valid holding
        require(_holding > 0);
        // Require a valid amount
        require(_amount > 0);
        // update the address
        _farmer.processor = msg.sender;
        // Fetch the owner
        address payable _farmerAddress = _farmer.owner;
        // update the object
        farmers[_farmerId] = _farmer;
        // increment the total deals
        dealCount++;
        // Create the agreement
        deals[dealCount] = Agreement(_farmerId, _farmerAddress, msg.sender, 
                                    _amount, _holding);
    }

    // function to create processed item records
    function createProcessedItem( string memory item,
                            uint _id, 
                            uint pricePerQuantity, 
                            uint quantity) public {

        // Require a valid price
        require(pricePerQuantity > 0);
        // Require a valid quantity
        require(quantity > 0);
        // Require a valid name
        require(bytes(item).length > 0);
        //Increment product count
        processedItemsCount ++;
        // Create the processed item record
        processedItems[processedItemsCount] = ProcessedItem(processedItemsCount, 
                                            item, quantity,
                                            _id, msg.sender,false);

    }

    // function to create market product records
    function createMarketProduct(uint _id, 
                                uint price, 
                                uint quantity, 
                                string memory name) public {

        // require a valid price
        require(price > 0);
        // Require a valid quantity
        require(quantity > 0);
        // Require a valid name
        require(bytes(name).length > 0);
        // fetch the required processed item
        ProcessedItem memory item = processedItems[_id];
        // update the quantity
        item.quantity = item.quantity - quantity;
        // update the mapping object
        processedItems[_id] = item;
        //Increment market product count
        marketProductCount ++;
        // Create market product
        marketProducts[marketProductCount] = MarketProduct( marketProductCount,
                                                _id, quantity, price, 
                                                name, msg.sender, msg.sender, 0, 0);
    }

    // function to buy farmer crop by the processor
    function purchaseProduct(uint _id, 
                            uint quantity) public payable   {

        // Fetch the product
        Farmer memory _farmer = farmers[_id];
        // Fetch the owner
        address payable _seller = _farmer.owner;
        // assign the processor price
        _farmer.processorPrice = msg.value;
        // assign boughtByProcessor to be true
        _farmer.boughtByProcessor = true;
        // Make sure the farmer crop has a valid id
        require(_farmer.farmerId > 0 && _farmer.farmerId <= farmerCount);
        // make sure that enough quantity is available
        require(_farmer.quantity >= quantity);        
        // make sure that the owner is not the buyer
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _farmer.processor = msg.sender;
        // update the quantity
        _farmer.quantity = _farmer.quantity - quantity;
        // Update the mapping object
        farmers[_id] = _farmer;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
    }

        // function to purchase market product by the consumer
        function purchaseMarketProduct(uint _id, 
                                        uint quantity) public payable {

        // Fetch the market product
        MarketProduct memory _product = marketProducts[_id];
        // Fetch the owner
        address payable _seller = _product.processorAddress;
        // Make sure the product has a valid id
        require(_product.marketProductId > 0 && _product.marketProductId <= marketProductCount);
        // make sure there is sufficient quantity to be bought
        require(_product.quantity >= quantity);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _product.buyerAddress = msg.sender;
        // update the quantity of the market product
        _product.quantity = _product.quantity - quantity;
        // Update the mapping object
        marketProducts[_id] = _product;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
    }

    // function to rate the farmer for their farmer crop
    function createFarmerRating(
                        uint _farmerId,
                        uint _farmerRating) public  {
        
        //Require a valid id
        require( _farmerId > 0);
        // Require a valid rating
        require(_farmerRating > 0);
        // fetch the required record of the farmer crop
        Farmer memory _farmer = farmers[_farmerId];
        // if no ratings have been submitted before then we assign the new rating and update total ratings
        if (_farmer.totalRatings == 0) {
            _farmer.totalRatings = 1;
            _farmer.farmerRating = _farmerRating;
        } 
        // if previously ratings have been available then we calculate the new average rating including the new rating
        else {
        uint total = _farmer.farmerRating * _farmer.totalRatings;
        _farmer.totalRatings = _farmer.totalRatings + 1;
        _farmer.farmerRating = (total + _farmerRating)/_farmer.totalRatings;
        }
        // update the mapping object
        farmers[_farmerId] = _farmer;
}

    // function to rate the market products by consumers
    function createMarketProductRating(
                        uint _marketProductId,
                        uint _marketProductRating) public  {
        
        //Require a valid product id
        require( _marketProductId > 0);
        // Require a valid rating
        require(_marketProductRating > 0);
        // fetch the required product
        MarketProduct memory _marketProduct = marketProducts[_marketProductId];
        // if no previous ratings have been assigned, then assign new rating and increase totalRatings
        if (_marketProduct.productTotalRatings == 0) {
            _marketProduct.productTotalRatings = 1;
            _marketProduct.productRating = _marketProductRating;
        } 
        // if there are previous ratings then take the average of the ratings
        else {
        uint total = _marketProduct.productRating * _marketProduct.productTotalRatings;
        _marketProduct.productTotalRatings = _marketProduct.productTotalRatings + 1;
        _marketProduct.productRating = (total + _marketProductRating)/_marketProduct.productTotalRatings;
        }
        // assign the updated object to the mapping object
        marketProducts[_marketProductId] = _marketProduct;
}
}
