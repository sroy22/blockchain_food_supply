pragma solidity ^0.5.0;

contract Insurance {

    uint public insuranceCompanyCount = 0; // keep count of total insurance policies 
    uint public insuranceFarmerCount = 0; // keep count of total deals of farmers with insurance companies

    // struct object to store insurance policies
    struct InsuranceCompany {
        uint insuranceCompanyId; // policy id
        string name; // name of the insurance
        string typeOf; // type of the insurance policy in terms of weather condition
        uint trigger; // trigger value of the insurance polcity
        uint payoutValue; // total amount of payout to be given
        address payable insuranceCompanyAddress; // insurance company address
    }

    // struct object to store the insurance deals with the farmers
    struct InsuranceFarmer{

        uint insuranceFarmerId; // id of the deal
        uint farmerId; // id of the farmer
        uint insuranceCompanyId; // id of the insurance Company
        address payable farmerAddress; // address of the farmer
        uint premium; // premium paid by the farmer
        bool triggered; // whether the policy has been triggered
    }

    mapping(uint => InsuranceCompany) public insuranceCompanies; // storing all insurance policies
    mapping(uint => InsuranceFarmer) public insuranceFarmers; // storing all insurance deals
 
    // function to create insurance policy
    function createInsuranceCompany(
                        string memory _name,
                        string memory _type,
                        uint trigger,
                        uint payback
                        ) public  {
        
        //Require a valid name
        require(bytes(_name).length > 0);
        // updating the insurance policy count
        insuranceCompanyCount ++;
        // Create the insurance policy
        insuranceCompanies[insuranceCompanyCount] = InsuranceCompany(insuranceCompanyCount, _name, _type, trigger, payback, msg.sender);
    }

    // function to purchase insurance policy by the farmers
    function purchaseProduct(uint _insuranceId, 
                            uint _farmerId) public payable {

        // Fetch the insurance policy
        InsuranceCompany memory _insuranceCompany = insuranceCompanies[_insuranceId];
        // Fetch the owner
        address payable _seller = _insuranceCompany.insuranceCompanyAddress;
        // increase the total farmer dealings
        insuranceFarmerCount++;
        // create the deal with the insurance
        insuranceFarmers[insuranceFarmerCount] = InsuranceFarmer(insuranceFarmerCount, _insuranceId,
                                                _farmerId, msg.sender, msg.value, false);
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
    }

    // function to pay back to the farmer
    function payToInvestor(uint _id) public payable {

        // fetch the required deal between the farmer and the insurance company
        InsuranceFarmer memory _insurance = insuranceFarmers[_id];
        // fetch the seller address
        address payable _seller = _insurance.farmerAddress;
        // transfer the amount of ether to be paid
        address(_seller).transfer(msg.value);
        }
}


