import classes from "./Spinner.module.css";
function Spinner() {
  const list_bars = {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
  };
  return (
    <div className={classes.section_loading}>
      <ul style={list_bars}>
        <li className={classes.list_item}></li>
        <li className={classes.list_item}></li>
        <li className={classes.list_item}></li>
        <li className={classes.list_item}></li>
      </ul>
    </div>
  );
}

export default Spinner;
