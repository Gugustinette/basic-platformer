export default class CoinCounter {
  public coinCount: number;
  private coinElement: HTMLElement;

  constructor() {
    this.coinCount = 0;
    this.coinElement = document.createElement('div');
    this.coinElement.innerText = 'Coin : 0';
    this.coinElement.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      font-family: Arial, sans-serif;
      font-size: 16px;
      color: #000;
      background-color: #f0f0f0;
      padding: 10px;
      border-radius: 5px;
    `;
    document.body.appendChild(this.coinElement);
  }

  public update(count: number): void {
    this.coinCount = count;
    this.coinElement.innerText = `Coin : ${this.coinCount}`;
  }

  public remove(): void {
    document.body.removeChild(this.coinElement);
  }
}
