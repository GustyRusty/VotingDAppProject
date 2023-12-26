const web3 = new Web3(window.ethereum);
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_candidateId","type":"uint256"}],"name":"votedEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidates","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"candidatesCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_candidateId","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"voters","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];  // Replace with your ABI
const contractAddress = '0xD26E2Bc5578Db6E698C6ACA2D5B5E34441051E26';  // Replace with your contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);

document.getElementById('voteButton').addEventListener('click', async () => {
    const candidateName = document.getElementById('candidateName').value;
    console.log('Selected candidate name:', candidateName);

    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if (accounts.length === 0) {
                document.getElementById('message').innerText = 'Please connect to MetaMask.';
                return;
            }

            const candidateId = await getCandidateIdByName(candidateName);
            await contract.methods.vote(candidateId).send({ from: accounts[0] });
            document.getElementById('message').innerText = `Vote cast for ${candidateName}`;
        } catch (error) {
            document.getElementById('message').innerText = `Error: ${error.message}`;
        }
    } else {
        document.getElementById('message').innerText = 'MetaMask not detected. Please install MetaMask.';
    }
});

async function getCandidateIdByName(candidateName) {
    const formattedCandidateName = "Candidate " + candidateName.charAt(candidateName.length - 1);

    const candidateMapping = {
        "Candidate 1": 1,
        "Candidate 2": 2,
        "Candidate 3": 3,
        // Add more candidates as needed
    };

    if (candidateMapping.hasOwnProperty(formattedCandidateName)) {
        return candidateMapping[formattedCandidateName];
    } else {
        throw new Error(`Candidate not found: ${candidateName}`);
    }
}