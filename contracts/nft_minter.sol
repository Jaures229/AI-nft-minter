// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AINFT is ERC721URIStorage, ERC2981, Ownable {
    uint256 private _nextTokenId;

    // Le constructeur configure les royalties (ex: 500 = 5%)
    constructor(address initialOwner) ERC721("AINFT", "AINFT") Ownable(initialOwner) {
        _setDefaultRoyalty(initialOwner, 500);
    }

    function mintAINFT(string memory tokenURI) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }

    // Nécessaire pour résoudre les conflits d'héritage entre ERC721 et ERC2981
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
