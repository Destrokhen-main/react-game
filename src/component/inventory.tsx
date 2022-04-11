import s from "../style/inventory.module.css";

function inventory(props: any) {
  return (
    <div className={s.body}>
      {
        props.invent.map((e: any) => {
          return (
            <div
              className={s.itemInvent}
              key={e.id}
              onClick={() => props.sell(e)}
              title={"Купил по " + e.price + "y.e"}
            >
              <div className="text-center">
                {
                  (e.name !== null
                    ? e.name + " " + e.count
                    : ""
                  )
                }
                <br />
                {
                  (e.name !== null
                    ? "Купил по " + e.price
                    : ""
                  )
                }
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

export default inventory;
