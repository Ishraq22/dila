pragma solidity >=0.4.21 <0.6.2;

import "./ERC721Full.sol";


contract DILA is ERC721Full {
    string public constant name = "DILA Real Estate Tokenization";
    string public constant symbol = "DILA";

    constructor() public ERC721Full(name, symbol) {}

    /*** DATA TYPES ***/

    struct Token {
        // string mintedBy;
        // uint64 mintedAt;
        string property_address;
        string apt_no;
        string city;
        string postal_code;
        string province;
        // string country;
        // string property_type;
        // string size;
        string mls_number;
    }

    /*** STORAGE ***/

    Token[] public tokens;
    mapping(string => bool) _mlsExists;

    mapping(uint256 => address) public tokenIndexToOwner;
    mapping(address => uint256) public ownershipTokenCount;
    mapping(uint256 => address) public tokenIndexToApproved;

    // mapping(string => bool) _colorExists;

    // E.G. color = "#FFFFFF"
    function mint(
        string memory property_address,
        string memory apt_no,
        string memory city,
        string memory postal_code,
        string memory province,
        string memory mls_number
    ) public {
        require(!_mlsExists[mls_number]);
        Token memory token = Token({
            property_address: property_address,
            apt_no: apt_no,
            city: city,
            postal_code: postal_code,
            province: province,
            mls_number: mls_number
        });
        uint256 tokenId = tokens.push(token) - 1;
        _mint(msg.sender, tokenId);
        _mlsExists[mls_number] = true;

        _transfer(msg.sender, msg.sender, tokenId);
    }

    function _owns(address _claimant, uint256 _tokenId)
        internal
        view
        returns (bool)
    {
        return tokenIndexToOwner[_tokenId] == _claimant;
    }

    function _approvedFor(address _claimant, uint256 _tokenId)
        internal
        view
        returns (bool)
    {
        return tokenIndexToApproved[_tokenId] == _claimant;
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        ownershipTokenCount[_to]++;
        tokenIndexToOwner[_tokenId] = _to;

        if (_from != address(0)) {
            ownershipTokenCount[_from]--;
            delete tokenIndexToApproved[_tokenId];
        }

        // Transfer(_from, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public {
        // require(_to != address(0));
        // require(_to != address(this));
        // require(_approvedFor(msg.sender, _tokenId));
        // require(_owns(_from, _tokenId));

        _transfer(_from, _to, _tokenId);
    }
}
