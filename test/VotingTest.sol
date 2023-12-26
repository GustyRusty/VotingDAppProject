// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "ds-test/test.sol";
import "../src/Voting.sol";

contract VotingTest is DSTest {
    Voting voting;
    function setUp() public {
        voting = new Voting();
    }

    function testInitialCandidateCount() public {
        assertEq(voting.candidatesCount(), 2);
    }

    function testInitialCandidateDetails() public {
        (uint id, string memory name, uint voteCount) = voting.candidates(1);
        assertEq(id, 1);
        assertEq(name, "Candidate 1");
        assertEq(voteCount, 0);

        (id, name, voteCount) = voting.candidates(2);
        assertEq(id, 2);
        assertEq(name, "Candidate 2");
        assertEq(voteCount, 0);
    }

    function testVoteFunctionality() public {
        voting.vote(1);
        (, , uint voteCount) = voting.candidates(1);
        assertEq(voteCount, 1);
    }
}