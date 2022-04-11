export interface InventoryInterface {
  id: number,
  name: string | null,
  count: number,
  price: number,
}

export interface MarketInterface {
  id: number,
  name: string,
  price: number,
  history: Array<number>,
}
