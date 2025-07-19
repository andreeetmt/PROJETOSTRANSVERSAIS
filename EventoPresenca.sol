// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventoPresenca {
    address public organizador;
    string public nomeEvento;
    uint256 public dataEvento;

    mapping(address => string) public comprovantes;
    mapping(address => bool) public jaRegistrado;

    event PresencaRegistrada(address participante, string hashPresenca);

    constructor(string memory _nomeEvento, uint256 _dataEvento) {
        organizador = msg.sender;
        nomeEvento = _nomeEvento;
        dataEvento = _dataEvento;
    }

    function registrarPresenca(string memory hashPresenca) public {
        require(!jaRegistrado[msg.sender], "Presenca ja registrada");

        comprovantes[msg.sender] = hashPresenca;
        jaRegistrado[msg.sender] = true;

        emit PresencaRegistrada(msg.sender, hashPresenca);
    }

    function obterComprovante(address participante) public view returns (string memory) {
        return comprovantes[participante];
    }

    function jaCompareceu(address participante) public view returns (bool) {
        return jaRegistrado[participante];
    }
}