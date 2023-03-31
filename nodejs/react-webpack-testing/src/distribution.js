
class Distribution {
  constructor(){

  }

  factorial(n){
    if(n > 1) return n * this.factorial(n-1);
    else return 1;
  }

  combination(n, r){
    return this.factorial(n) / this.factorial(r) / this.factorial(n-r);
  }

  distBinomial(nSuccess, nTest, prob){
    return this.combination(nTest, nSuccess) * (prob**nSuccess)* (1 - prob)**(nTest - nSuccess);
  }

  distPoisson(nSuccess, nTest, prob){
    let expected = nTest * prob;
    return Math.exp(-expected) * expected**nSuccess / this.factorial(nSuccess)
  }
}

module.exports = Distribution;