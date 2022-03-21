pragma solidity ^0.5.0;

contract Marketplace {
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string farmerName;
        uint premium;
        string insuranceType;
        address payable owner;
    }

    function createProduct(string memory _name, uint _premium, string memory insuranceType,  address payable _a) public payable {
        
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_premium > 0);
        // Increment product count
        productCount ++;
        address(_a).transfer(msg.value);

        // Create the product
        products[productCount] = Product(productCount, _name, _premium, insuranceType, msg.sender);
    }

    function purchaseProduct(uint _id) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        // require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        // require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _product.owner = msg.sender;
        // Mark as purchased
        // Update the product
        products[_id] = _product;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
    }
}
