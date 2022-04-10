// SPDX-License-Identifier: GPL-3.0
        
pragma solidity >=0.4.22 <0.9.0;

// This import is automatically injected by Remix
import "remix_tests.sol"; 

// This import is required to use custom transaction context
// Although it may fail compilation in 'Solidity Compiler' plugin
// But it will work fine in 'Solidity Unit Testing' plugin
import "remix_accounts.sol";
import "src/contracts/FarmExchange.sol";

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract TestFarmExchange is FarmExchange{
    address acc0 = TestsAccounts.getAccount(0); //farmer(default)
    address acc1 = TestsAccounts.getAccount(1); //investor
    address acc2 = TestsAccounts.getAccount(2); //processor
    address acc3 = TestsAccounts.getAccount(3); //customer
    address acc4 = TestsAccounts.getAccount(4); //backup 

    /// 'beforeAll' runs before all other tests
    /// More special functions are: 'beforeEach', 'beforeAll', 'afterEach' & 'afterAll'
    function beforeAll() public {     
    }

    /// #value: 1000000000000000000
    /// #sender: account-0
    function createFarmerTest() public {
        uint farmerCountCurrent = farmerCount; 
        createFarmer("Bob", "Eggplant", 100, 10, 100, 1);
        Assert.equal(farmerCount - farmerCountCurrent, 1, "farmer count should increment by 1");
        Farmer memory createdFarmer = farmers[farmerCount]; //test object successfully created 
        Assert.equal(createdFarmer.crop, "Eggplant", "farmer object should have correct crop type"); 
        Assert.equal(createdFarmer.quantity, 100 , "farmer object should have correct crop quantity"); 
        Assert.equal(createdFarmer.costToProduce, 1 , "farmer object should have correct cost to produce"); 
        Assert.equal(createdFarmer.expectedPrice, 10 , "farmer object should have correct expected price"); 
        Assert.equal(createdFarmer.processorPrice, 0, "farmer object should have initialize with processor price as 0"); 
        Assert.equal(createdFarmer.farmerRating, 0, "farmer object should have initialize with rating as 0"); 
        Assert.equal(createdFarmer.totalRatings, 0, "farmer object should have initialize number of ratings received as 0"); 
        Assert.equal(createdFarmer.owner, acc0, "check the farmer address is the indeed the account creator's address");
    } 

    /// #value: 1000000000000000000
    /// #sender: account-0
    function createInsuranceTest() public {
        uint insuranceCountCurrent = insuranceCount; 
        createInsurance("Bob", 100, "Rain"); 
        Assert.equal(insuranceCount - insuranceCountCurrent, 1, "insurance count should increment by 1");
        Insurance memory createdInsurance = insurances[insuranceCount]; //test object successfully created 
        Assert.equal(createdInsurance.farmerName, "Bob", "Insurance object should have correct farmer name"); 
        Assert.equal(createdInsurance.premium, 100 , "Insurance object should have correct premium"); 
        Assert.equal(createdInsurance.typeOfInsurance, "Rain", "Insurance object should the current insurance type"); 
    }

    /// #value: 100
    /// #sender: account-1
    function purchaseFarmerShareTest() public {
        uint prev = acc0.balance; 
        purchaseFarmerShare(1);
        Farmer memory farmer = farmers[1]; 
        uint post = acc0.balance; 
        Assert.equal(farmer.investmentMade, true, "validate investment has been made on the farmer");
        Assert.equal(farmer.processor, acc1, "validate farmer's processor has been set correctly");
    }

    /// #value: 1000000000000000000
    /// #sender: account-1
    function createAgreementTest() public {
        uint dealCountCurrent = dealCount; 
        Farmer memory investedFarmer = farmers[1]; 
        uint farmerHolding = investedFarmer.holding; //get farmer's holding before the investment is made
        createAgreement(1, 50, 10); //farmer id 0, invested amount 50, holding percentage 10
        Assert.equal(dealCount - dealCountCurrent, 1, "agreement count should increment by 1");
        Agreement memory createdAgreement = deals[dealCount]; //test object successfully created  
        Assert.equal(createdAgreement.farmerID, 1, "Agreement object should have the correct farmer ID"); 
        Assert.equal(createdAgreement.farmerAddress, investedFarmer.owner, "Agreement object should reference the invested farmer wallet address"); 
        Assert.equal(createdAgreement.investorAddress, acc1, "Agreement object should reference the correct investor wallet address"); 
        Assert.equal(createdAgreement.amount, 50, "Agreement object should reflect the correct amount invested"); 
        Assert.equal(createdAgreement.holdingPercent, 10, "Agreement object should reflect the correct holding percentage"); 
        Assert.equal(farmerHolding - farmers[1].holding, 10, "Verify the holding percentage has been deducted from farmer's account");
    }

    /// #value: 12
    /// #sender: account-0
    function payToInvestorTest() public payable{
        uint prev = acc1.balance;
        payToInvestor(1); //test paying back to the investor for the investment created in the last test 
        uint post = acc1.balance;
        Assert.equal(post - prev, 12, "verify the payment has been sent from farmer to investor"); 
    }

    /// #value: 1000000000000000000
    /// #sender: account-2
    function purchaseProductTest() public payable{
        Farmer memory farmer = farmers[1]; 
        uint256 quantity_prev = farmer.quantity;
        purchaseProduct(1, 1); //from farmerId 1, quantity 1
        Farmer memory farmer1 = farmers[1];
        uint256 quantity = farmer1.quantity;
        Assert.equal(quantity_prev - quantity, 1, "verify the correct crop quantity has been taken from farmer");
        Assert.equal(farmer1.processor, acc2, "verify the the farmer object's processor address is set to buyer's address");
        Assert.equal(farmer1.processorPrice, msg.value, "verify the farmer's processor price is reset to purchase product's message value");
        Assert.equal(farmer1.boughtByProcessor, true, "verify the farmer's bought by processor is set to true"); 
    }

    /// #value: 1000000000000000000
    /// #sender: account-2
    function createProcessedItemTest() public {
        uint processedItemsCountCurrent = processedItemsCount; 
        createProcessedItem("Fries", 1, 15, 10); 
        Assert.equal(processedItemsCount - processedItemsCountCurrent, 1, "processed item count should increment by 1");
        ProcessedItem memory createdprocessedItem = processedItems[processedItemsCount]; //test object successfully created 
        Assert.equal(createdprocessedItem.farmerId, 1, "processed item object should reflect the corrent farmer ID who produced the raw ingredient"); 
        Assert.equal(createdprocessedItem.item, "Fries" , "processed item object should have correct name"); 
        Assert.equal(createdprocessedItem.processorId, processedItemsCount, "processed item object have the correct ID"); 
        Assert.equal(createdprocessedItem.quantity, 10, "processed item object have the right quantity");
        Assert.equal(createdprocessedItem.processorAddress, acc2, "processed item object gets assigned the correct owner(processor)");  
        Assert.equal(createdprocessedItem.productPosted, false, "market product is not posted when the item is just processed");  
    }
    
    /// #value: 0
    /// #sender: account-2
    function createFarmerRatingTest() public {
        createFarmerRating(1, 4); //Rate farmer 1 by 4
        Assert.equal(farmers[1].totalRatings, 1, "farmer's total ratings received should be 1"); 
        Assert.equal(farmers[1].farmerRating, 4, "farmer's average rating should be 4"); 
    }

    /// #value: 1000000000000000000
    /// #sender: account-2
    function createMarketProductTest() public {
        uint marketProductCountCurrent = marketProductCount; 
        createMarketProduct(1, 20, 10, "Fries"); 
        Assert.equal(marketProductCount - marketProductCountCurrent, 1, "market product count should increment by 1");
        MarketProduct memory createdMarketProduct = marketProducts[marketProductCount]; //test object successfully created
        Assert.equal(createdMarketProduct.marketProductId, marketProductCount, "market product object should have the correct product id"); 
        Assert.equal(createdMarketProduct.processorId, 1, "market product object should have the correct processor id");  
        Assert.equal(createdMarketProduct.price, 20, "market product object should have correct price"); 
        Assert.equal(createdMarketProduct.quantity, 10 , "market product object should have correct starting quantity"); 
        Assert.equal(createdMarketProduct.name, "Fries", "market product object should have the right name"); 
        Assert.equal(createdMarketProduct.processorAddress, acc2, "payment receiving wallet address reflects the correct processor address"); 
        Assert.equal(createdMarketProduct.productRating, 0, "market product has 0 as average rating when initiated"); 
        Assert.equal(createdMarketProduct.productTotalRatings, 0, "market product has 0 total ratings when initiated"); 
    }
    

    /// #value: 1000000000000000000
    /// #sender: account-3
    function purchaseMarketProductTest() public payable{
        MarketProduct memory product = marketProducts[1]; 
        uint256 quantity_prev = product.quantity;
        purchaseMarketProduct(1, 1); //from marketProductId 1, quantity 1
        MarketProduct memory product1 = marketProducts[1]; 
        uint256 quantity = product1.quantity;
        Assert.equal(quantity_prev - quantity, 1, "verify the correct crop quantity has been taken from  processor");
    }

    /// #value: 0
    /// #sender: account-3
    function createMarketProductRatingTest() public {
        createMarketProductRating(1, 4); //Rate farmer 1 by 4
        Assert.equal(marketProducts[1].productTotalRatings, 1, "farmer's total ratings received should be 1"); 
        Assert.equal(marketProducts[1].productRating, 4, "farmer's average rating should be 4"); 
    }
}
  
