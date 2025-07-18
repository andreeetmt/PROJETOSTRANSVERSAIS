const contratoEndereco = "0xDA0bab807633f07f013f94DD0E6A4F96F8742B53; // contrato implantado

const abiContrato = [
  {
    "inputs": [{ "internalType": "string", "name": "hashPresenca", "type": "string" }],
    "name": "registrarPresenca",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

async function registrarPresenca() {
  const hash = document.getElementById("hash").value.trim();

  if (!hash) {
    alert("Por favor, digite seu nome.");
    return;
  }

  if (!window.ethereum) {
    alert("MetaMask não encontrada. Instale para continuar.");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log("Registrando com endereço:", address); // log para verificar no Remix

    const contrato = new ethers.Contract(contratoEndereco, abiContrato, signer);
    const tx = await contrato.registrarPresenca(hash);
    await tx.wait();

    alert("✅ Presença registrada com sucesso!");
  } catch (error) {
    console.error(error);
    alert("❌ Erro ao registrar presença. Verifique se já registrou ou se a MetaMask está conectada.");
  }
}
