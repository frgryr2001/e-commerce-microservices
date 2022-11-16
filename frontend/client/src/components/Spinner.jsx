function Spinner() {
  const list_bars = {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
  };
  return (
    <div className={"section_loading"}>
      <ul style={list_bars}>
        <li className={"list_item"}></li>
        <li className={"list_item"}></li>
        <li className={"list_item"}></li>
        <li className={"list_item"}></li>
      </ul>
    </div>
  );
}

export default Spinner;
