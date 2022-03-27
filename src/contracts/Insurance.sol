pragma solidity ^0.5.0;

contract Insurance {

    uint public insuranceCompanyCount = 0;
    uint public insuranceFarmerCount = 0;

    struct InsuranceCompany {
        uint insuranceCompanyId;
        string name;
        string typeOf;
        uint trigger;
        uint payoutValue;
        address payable insuranceCompanyAddress;
    }

    struct InsuranceFarmer{

        uint insuranceFarmerId;
        uint farmerId;
        uint insuranceCompanyId;
        address payable farmerAddress;
        uint premium;
        bool triggered;
    }


    mapping(uint => InsuranceCompany) public insuranceCompanies;
    mapping(uint => InsuranceFarmer) public insuranceFarmers;
 
    function createInsuranceCompany(
                        string memory _name,
                        string memory _type,
                        uint trigger,
                        uint payback
                        ) public  {
        
        //Require a valid name
        require(bytes(_name).length > 0);
        insuranceCompanyCount ++;
        // Create the farmer
        insuranceCompanies[insuranceCompanyCount] = InsuranceCompany(insuranceCompanyCount, _name, _type, trigger, payback, msg.sender);
    }

        function purchaseProduct(uint _insuranceId, uint _farmerId) public payable {
        // Fetch the product
        InsuranceCompany memory _insuranceCompany = insuranceCompanies[_insuranceId];
        // Fetch the owner
        address payable _seller = _insuranceCompany.insuranceCompanyAddress;
        insuranceFarmerCount++;
        insuranceFarmers[insuranceFarmerCount] = InsuranceFarmer(insuranceFarmerCount, _insuranceId,
        _farmerId, msg.sender, msg.value, false);
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
    }

    function payToInvestor(uint _id) public payable {
        InsuranceFarmer memory _insurance = insuranceFarmers[_id];
        address payable _seller = _insurance.farmerAddress;
        address(_seller).transfer(msg.value);
        }
}


