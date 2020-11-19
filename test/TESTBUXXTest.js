const truffleAssert = require('truffle-assertions');
const King = artifacts.require('King');
const TESTBUXX = artifacts.require('TESTBUXX');

contract('TESTBUXX', (accounts) => {
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(759, 'jltrxn', 230, 'wzxpvq', {
      from: accounts[0],
    });
    if (trace)
      console.log(
        'SUCESSO: TESTBUXX.new(759,"jltrxn",230,"wzxpvq",{from:accounts[0]}',
      );
    contractKing = await King.new(accounts[0], {from: accounts[0]});
    if (trace) console.log('SUCESSO: King.new(accounts[0],{from:accounts[0]}');
  });

  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(
      contractTESTBUXX.mint(accounts[7], 11, {from: accounts[9]}),
      'revert',
    );
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(
      contractTESTBUXX.methods[
        'transfer(address,uint256)'
      ]('0x0000000000000000000000000000000000000000', 0, {from: accounts[0]}),
      'revert',
    );
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(
      contractTESTBUXX.transferFrom(
        accounts[9],
        '0x0000000000000000000000000000000000000000',
        10,
        {from: accounts[0]},
      ),
      'revert',
    );
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(
      contractTESTBUXX.methods[
        'transfer(address,uint256,bytes,string)'
      ](
        '0x0000000000000000000000000000000000000000',
        0,
        [
          21,
          234,
          195,
          85,
          120,
          88,
          120,
          113,
          77,
          112,
          203,
          182,
          85,
          82,
          129,
          218,
          32,
          19,
          113,
          41,
          69,
          154,
          109,
          116,
          150,
          109,
          72,
          216,
          191,
          235,
          192,
          177,
        ],
        'wzxpvq',
        {from: accounts[0]},
      ),
      'revert',
    );
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(
      contractTESTBUXX.methods[
        'transfer(address,uint256,bytes,string)'
      ](
        '0x0000000000000000000000000000000000000000',
        229,
        [
          206,
          81,
          98,
          36,
          125,
          25,
          42,
          180,
          222,
          47,
          158,
          173,
          139,
          232,
          111,
          155,
          65,
          235,
          246,
          48,
          10,
          246,
          151,
          174,
          32,
          187,
          246,
          211,
          77,
          107,
          9,
          106,
        ],
        'jltrxn',
        {from: accounts[0]},
      ),
      'revert',
    );
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(
      contractTESTBUXX.methods[
        'transfer(address,uint256,bytes)'
      ](
        '0x0000000000000000000000000000000000000000',
        230,
        [
          118,
          162,
          67,
          191,
          4,
          141,
          216,
          181,
          209,
          251,
          144,
          51,
          108,
          253,
          148,
          153,
          233,
          87,
          96,
          161,
          54,
          73,
          88,
          61,
          9,
          32,
          170,
          138,
          237,
          113,
          53,
          30,
        ],
        {from: accounts[0]},
      ),
      'revert',
    );
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(
      contractTESTBUXX.methods[
        'transfer(address,uint256,bytes)'
      ](
        '0x0000000000000000000000000000000000000000',
        757,
        [
          218,
          207,
          91,
          154,
          88,
          113,
          119,
          201,
          230,
          33,
          238,
          197,
          101,
          70,
          2,
          137,
          79,
          225,
          222,
          4,
          133,
          209,
          229,
          173,
          12,
          24,
          186,
          244,
          158,
          50,
          111,
          214,
        ],
        {from: accounts[0]},
      ),
      'revert',
    );
  });
});
