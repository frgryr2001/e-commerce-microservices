import classes from "./Spinner.module.css";
function Spinner() {
  const list_bars = {
    "list-style": "none",
    display: "flex",
    "align-items": "center",
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
