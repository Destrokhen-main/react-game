import s from "../style/market.module.css"

function Marker(props: any) {
  const Style = {
    width: "10%",
  }
  const styleGreen = {
    color: "green"
  }

  const styleRed = {
    color: "red",
  }

  const empty = {}
  return (
    <div className={s.block}>
      <div className="container">
        <div className="row ps-0 pe-0">
          <div className="col-8">
            <table width="100%">
              {
              props.market.map((o: any) => {
                return (
                  <tr
                    key={o.id}
                    className={s.blockStat}
                  >
                    <td className="text-center" style={{
                      width: "20px",
                    }}>
                      <span>
                        {(props.invent.findIndex((e: any) => e.name === o.name) !== -1 ? "*" : "" )}
                      </span>
                    </td>
                    <td className="text-center" style={Style}>
                      <span
                       className={s.blockStat__span}
                       onClick={() => props.buy(o)}
                       style={
                         {
                           cursor: "pointer",
                         }
                       }
                      >
                        { o.name }
                      </span>
                    </td>
                    {
                      o.history.map((e: any, i : number) => {
                          return (
                            <td
                              style={
                                (i !== 0
                                  ? e > o.history[i-1] ? styleGreen : styleRed
                                  : empty
                                )
                              }
                            >
                              {e}
                            </td>
                          )
                        }
                      )
                    }
                  </tr>
                )
              })
            }
            </table>
          </div>
          <div className="col-4">
            <div className="row ps-0 pe-0 pt-1 pb-1">
              {
                props.market.map((o: any) => {
                  return (
                    <div
                      className="col-6"
                      key={o.id}
                    >
                      <div
                        onClick={() => props.buy(o)}
                        className={s.name + " ps-1 pe-1 mb-1 text-center"}
                      >
                        {o.name + " " + o.price}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marker;
