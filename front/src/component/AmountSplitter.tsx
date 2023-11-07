class AmountSplitter {
  static splitAmount(amount: number): { dollars: number; cents: string } {
    const dollars = Math.floor(amount);
    const cents = (amount - dollars).toFixed(2).substring(1);
    console.log("dollars", dollars, "cents", cents);

    return { dollars, cents };
  }
}

export default AmountSplitter;
