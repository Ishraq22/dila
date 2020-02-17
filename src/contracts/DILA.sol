pragma solidity >=0.4.21 <0.6.2;

import "./ERC721Full.sol";

contract DILA is ERC721Full {
    string public constant name = "DILA Real Estate Tokenization";
    string public constant symbol = "DILA";

    mapping(string => bool) _addressExists;

    constructor() public ERC721Full(name, symbol) {}

    /*** DATA TYPES ***/

    struct Token {
        address mintedBy;
        uint64 mintedAt;
    }

    /*** STORAGE ***/

    Token[] tokens;

    mapping(uint256 => address) public tokenIndexToOwner;
    mapping(address => uint256) ownershipTokenCount;
    mapping(uint256 => address) public tokenIndexToApproved;

    /*** EVENTS ***/

    event Mint(address owner, uint256 tokenId);

    /*** INTERNAL FUNCTIONS ***/

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

    function _approve(address _to, uint256 _tokenId) internal {
        tokenIndexToApproved[_tokenId] = _to;

        Approval(
            tokenIndexToOwner[_tokenId],
            tokenIndexToApproved[_tokenId],
            _tokenId
        );
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        ownershipTokenCount[_to]++;
        tokenIndexToOwner[_tokenId] = _to;

        if (_from != address(0)) {
            ownershipTokenCount[_from]--;
            delete tokenIndexToApproved[_tokenId];
        }

        Transfer(_from, _to, _tokenId);
    }

    function _mint(address _owner) internal returns (uint256 tokenId) {
        Token memory token = Token({mintedBy: _owner, mintedAt: uint64(now)});
        tokenId = tokens.push(token) - 1;

        Mint(_owner, tokenId);

        _transfer(0, _owner, tokenId);
    }

    /*** ERC721 IMPLEMENTATION ***/

    function totalSupply() public view returns (uint256) {
        return tokens.length;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return ownershipTokenCount[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address owner) {
        owner = tokenIndexToOwner[_tokenId];

        require(owner != address(0));
    }

    function approve(address _to, uint256 _tokenId) external {
        require(_owns(msg.sender, _tokenId));

        _approve(_to, _tokenId);
    }

    function transfer(address _to, uint256 _tokenId) external {
        require(_to != address(0));
        require(_to != address(this));
        require(_owns(msg.sender, _tokenId));

        _transfer(msg.sender, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId)
        external
    {
        require(_to != address(0));
        require(_to != address(this));
        require(_approvedFor(msg.sender, _tokenId));
        require(_owns(_from, _tokenId));

        _transfer(_from, _to, _tokenId);
    }

    function tokensOfOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256 balance = balanceOf(_owner);
        uint256[] memory result = new uint256[](balance);

        if (balance == 0) {
            return new uint256[](0);
        } else {
            uint256 maxTokenId = totalSupply();
            uint256 idx = 0;

            uint256 tokenId;
            for (tokenId = 1; tokenId <= maxTokenId; tokenId++) {
                if (tokenIndexToOwner[tokenId] == _owner) {
                    result[idx] = tokenId;
                    idx++;
                }
            }
        }

        return result;
    }

    /*** OTHER EXTERNAL FUNCTIONS ***/

    function mint() external returns (uint256) {
        return _mint(msg.sender);
    }

    function getToken(uint256 _tokenId)
        external
        view
        returns (address mintedBy, uint64 mintedAt)
    {
        Token memory token = tokens[_tokenId];

        mintedBy = token.mintedBy;
        mintedAt = token.mintedAt;
    }

}
