pragma solidity ^0.5.0;


contract Rating  {

uint public farmerCount = 0;
    
uint public processorCount = 0;

mapping(uint => FarmerRating) public farmerRatings;
mapping(uint => ProcessorRating) public processorRatings;



struct FarmerRating {

uint  farmerId;

uint ratingFarmer;

uint numberOfRatings;

}

struct ProcessorRating {

uint processorId;

uint ratingProcessor;

uint numberOfRatings;
}

    function createFarmerRating(
                        uint _farmerId,
                        uint _farmerRating) public  {
        
        //Require a valid name
        require( _farmerId > 0);

        // Require a valid price
        require(_farmerRating > 0);

        if (_farmerId > farmerCount) {
            farmerCount++;
            farmerRatings[farmerCount] = FarmerRating(_farmerId, _farmerRating, 1);
        } else {
                FarmerRating memory _rating = farmerRatings[_farmerId];
                
                uint rateCalculation = _rating.numberOfRatings * _rating.ratingFarmer;
                _rating.numberOfRatings = _rating.numberOfRatings + 1;
                uint finalRate = rateCalculation/_rating.numberOfRatings;
                _rating.ratingFarmer = finalRate;
                farmerRatings[_farmerId] = _rating;
            
    }

}
}