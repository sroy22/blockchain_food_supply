pragma solidity ^0.5.0;

contract FarmExchange {
    uint public farmerCount = 0;
    uint public processedItemsCount = 0 ;
    uint public marketProductCount = 0;
    mapping(uint => Farmer) public farmers;
    mapping(uint => ProcessedItem) public processedItems;
    mapping(uint => MarketProduct) public marketProducts;

        struct Farmer{
        uint farmerId;
        string farmerName;
        string landLocation;
        string crop;
        uint256 quantity;
        uint256 expectedPrice;
        string expDate;
        address payable owner;
        address payable processor;
        uint holding;
        uint costToProduce;
    }

    struct ProcessedItem {
        uint processorId;
        string item;
        uint256 quantity;
        uint farmerId;
        address payable processorAddress;
        bool productPosted;
    }

    struct MarketProduct {
        uint marketProductId;
        uint processorId;
        uint quantity;
        uint price;
        string name;
        address payable processorAddress;
        address payable buyerAddress;
    }

    event FarmerCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    function createFarmer(
                        string memory _farmerName,
                        string memory _farmerLandLocation,
                        string memory _farmerCrop,
                        uint _farmerQuantity,
                        uint _farmerExpectedPrice,
                        string memory _farmerExpiryDate,
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
        // Create the farmer
        farmers[farmerCount] = Farmer(farmerCount, _farmerName, _farmerLandLocation, 
                                    _farmerCrop, _farmerQuantity, _farmerExpectedPrice,
                                    _farmerExpiryDate, msg.sender, msg.sender, holding, _costToProduce);
    }


    function createProcessedItem( string memory item,
                            uint _id, uint pricePerQuantity, uint quantity) public {
        // Require a valid price
        require(pricePerQuantity > 0);
        // Require a valid quantity
        require(quantity > 0);
        // Require a crop
        require(bytes(item).length > 0);
        //Increment product count
        processedItemsCount ++;
        // Create the farmer
        processedItems[processedItemsCount] = ProcessedItem(processedItemsCount, 
                                            item, quantity,
                                            _id, msg.sender,false);

    }

    function createMarketProduct(uint _id, uint price, uint quantity, string memory name) public {
        
        require(price > 0);
        // Require a valid quantity
        require(quantity > 0);
        // Require a crop
        require(bytes(name).length > 0);
        //Increment product count
        marketProductCount ++;
        // Create the farmer
        marketProducts[marketProductCount] = MarketProduct( marketProductCount,
                                                _id, quantity, price, name, msg.sender, msg.sender);
    }

    function purchaseProduct(uint _id, uint quantity) public payable {
        // Fetch the product
        Farmer memory _farmer = farmers[_id];
        // Fetch the owner
        address payable _seller = _farmer.owner;
        // Make sure the product has a valid id
        require(_farmer.farmerId > 0 && _farmer.farmerId <= farmerCount);
        require(_farmer.quantity >= quantity);        
        // Require that there is enough Ether in the transaction
        // require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        // require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _farmer.processor = msg.sender;
        _farmer.quantity = _farmer.quantity - quantity;
        // Update the product
        farmers[_id] = _farmer;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
    }

        function purchaseMarketProduct(uint _id, uint quantity) public payable {
        // Fetch the product
        MarketProduct memory _product = marketProducts[_id];
        // Fetch the owner
        address payable _seller = _product.processorAddress;
        // Make sure the product has a valid id
        require(_product.marketProductId > 0 && _product.marketProductId <= marketProductCount);
        require(_product.quantity >= quantity);        
        // Require that there is enough Ether in the transaction
        // require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        // require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _product.buyerAddress = msg.sender;
        _product.quantity = _product.quantity - quantity;
        // Update the product
        marketProducts[_id] = _product;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
    }
}
