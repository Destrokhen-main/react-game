import w from "../style/window.module.css";

function body(props: any) {
  return (
    <div className={w.window}>
      <div className={w.block}>
        {props.children}
      </div>
    </div>
  );
}

export default body;
