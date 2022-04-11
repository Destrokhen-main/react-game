import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from "./component/body";
import Inventory from './component/inventory';
import Market from "./component/blockMarket";

import {InventoryInterface, MarketInterface} from "./type";

const random = (min: number, max: number) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function App() {
  const [inventory, setInventory] = useState<InventoryInterface[]>([]);
  const [balance, setBalance] = useState<number>(100);
  const [market, setMarket] = useState<MarketInterface[]>([]);

  const [win, setWin] = useState<boolean>(false);

  useEffect(() => {
    const array: Array<InventoryInterface> = [];

    for (let i = 0; i !== 18; i++) {
      array.push({
        id: i + 1,
        name: null,
        count: 0,
        price: 0,
      });
    }

    setInventory(array);

    const itemAr: Array<string> = ["Хлеб","Масло","Сахар","Гречка","Соус","Хуй"];

    const ar: Array<MarketInterface> = [];

    for (let i = 0; i !== itemAr.length; i++) {
      const firstPrice = random(1,100);
      ar.push({
        id: i,
        name: itemAr[i],
        price: firstPrice,
        history: [firstPrice],
      });
    }

    setMarket(ar);
  }, []);

  const BuyItem = (e: MarketInterface) => {
    const oldPrice: number = balance;
    const price: number = e.price;
    const array: Array<InventoryInterface> = inventory;

    if (oldPrice - price >= 0) {
      let check = false;
      for(let i = 0; i !== array.length; i++) {
        if (array[i].name === e.name) {
          array[i].count += 1;
          check = true;
          break;
        } else if (array[i].name === null) {
          array[i].name = e.name;
          array[i].price = e.price;
          array[i].count = 1;
          check = true;
          break;
        }
      }
      if (check) {
        const newB = oldPrice - price;
        setBalance(newB);
        setInventory(array);
      }
    } else {
      alert("Нехватает денег");
    }
  }

  const Sell = (e: InventoryInterface) => {
    const invent: Array<InventoryInterface> = inventory;
    let bal : number = balance;

    const index = invent.findIndex((j) => j.id === e.id);
    const findOnObjectPrice: any = market.find((j: any) => j.name === e.name);

    if (invent[index].count - 1 > 0) {
      invent[index].count -= 1;
      bal += findOnObjectPrice.price;
    } else if (invent[index].count - 1 <= 0) {
      invent[index].name = null;
      invent[index].count = 0;
      bal += findOnObjectPrice.price;
    }
    setInventory(invent);
    setBalance(bal);
  }

  useEffect(() => {
    setTimeout(() => {
      let ar: Array<any> = market;
      for (let i = 0;i !== ar.length; i++) {
        if (ar[i].price - 10 >= 0) {
          const newPrice = random(ar[i].price-10,ar[i].price+10);
          ar[i].price = newPrice;

          if (ar[i].history.length > 10) {
            ar[i].history.shift();
            ar[i].history.push(newPrice);
          } else {
            ar[i].history.push(newPrice);
          }
        } else if (ar[i].price - 10 < 0) {
          const newPrice = random(1,ar[i].price+20);
          ar[i].price = newPrice;
          if (ar[i].history.length > 10) {
            ar[i].history.shift();
            ar[i].history.push(newPrice);
          } else {
            ar[i].history.push(newPrice);
          }
        }
      }
      setMarket(ar);
    }, 5000);
  }, [market]);

  useEffect(() => {
    if(!win) {
      if (balance - 100 >= 1000) {
        alert("Ты выиграл");
        setWin(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance])

  return (
    <Body>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mt-2">
            <h3>Симулятор перекупа</h3>
          </div>
          <div className="col-12">
            <hr />
          </div>
          <div className="col-12">
            <Market
              market={market}
              invent={inventory}
              buy={BuyItem}
            />
          </div>
          <div className="col-10 mt-2 pb-2">
            <Inventory
              invent={inventory}
              sell={Sell}
            />
          </div>
          <div className="col-2 mt-2">
            <h5>Баланс: {balance} y.e</h5>
            <h5>Количество: {(inventory.filter((e: any) => e.name != null)).length}</h5>
            {
              (
                balance > 100
                  ? <h5>Выгода: {balance - 100}</h5>
                  : ""
              )
            }
          </div>
        </div>
      </div>
    </Body>
  );
}

export default App;
