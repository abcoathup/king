const King = artifacts.require('King')
const TestBuxx = artifacts.require('TESTBUXX')
const { time } = require('openzeppelin-test-helpers');

contract('King', function([admin, anotherAccount, yetAnotherAccount, buxxAccount]) {
  let buxx;
  let king;
  const kingPlay = 758;
  const kingFee = 230;
  
  beforeEach(async function() {
    buxx = await TestBuxx.new(0, "TestBuxx", 0, "BUX", {from: buxxAccount});
    await buxx.mint(anotherAccount, kingPlay, {from: buxxAccount})
    await buxx.mint(yetAnotherAccount, kingPlay, {from: buxxAccount})
    king = await King.new(buxx.address)
  });

  describe('King functions', function() {
    it('details', async function() {
      var _balance = await buxx.balanceOf(king.address);
      assert.equal(_balance, 0);
      var _king = await king.king();
      assert.equal(admin, _king) 
    })
    
    it('king', async function() {
      var _balance = await buxx.balanceOf(king.address);
      assert.equal(_balance, 0);
      await buxx.methods['transfer(address,uint256,bytes)'](king.address, kingPlay, "0x", {from: anotherAccount} )
      var _king = await king.king();
      assert.equal(anotherAccount, _king) 
      _balance = await buxx.balanceOf(king.address);
      assert.equal(_balance, kingPlay);
    })

    it('new king', async function() {
      await buxx.methods['transfer(address,uint256,bytes)'](king.address, kingPlay, "0x", {from: anotherAccount} )
      await buxx.methods['transfer(address,uint256,bytes)'](king.address, kingPlay, "0x", {from: yetAnotherAccount} )
      var _king = await king.king();
      assert.equal(yetAnotherAccount, _king) 
      var _prize = await king.prize();
      assert.equal(_prize, kingPlay - kingFee + kingPlay - kingFee)
    })

    it('new king with prize', async function() {
      await buxx.methods['transfer(address,uint256,bytes)'](king.address, kingPlay, "0x", {from: anotherAccount} )
      await time.increase(time.duration.minutes(5))
      await buxx.methods['transfer(address,uint256,bytes)'](king.address, kingPlay, "0x", {from: yetAnotherAccount} )
      var _king = await king.king();
      assert.equal(yetAnotherAccount, _king);
      var _balance = await buxx.balanceOf(anotherAccount);
      assert.equal(_balance, kingPlay - kingFee)
      var _prize = await king.prize();
      assert.equal(_prize, kingPlay - kingFee)
    })

    it('withdraw', async function() {
      await buxx.methods['transfer(address,uint256,bytes)'](king.address, kingPlay, "0x", {from: anotherAccount} )
      await buxx.methods['transfer(address,uint256,bytes)'](king.address, kingPlay, "0x", {from: yetAnotherAccount} )
      await king.withdraw({from: admin});
      var _balance = await buxx.balanceOf(admin)
      assert.equal(_balance, kingFee + kingFee);
    })
  });
});