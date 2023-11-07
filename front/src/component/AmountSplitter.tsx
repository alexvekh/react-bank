class AmountSplitter {
  static splitAmount(amount: number): { dollars: number; cents: number } {
    const dollars = Math.floor(amount);
    const cents = Math.round((amount - dollars) * 100);

    return { dollars, cents };
  }
}

export default AmountSplitter;
