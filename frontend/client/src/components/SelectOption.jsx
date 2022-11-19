import React from "react";
import { Select } from "antd";
const SelectOption = ({
  listProvinceIdName,
  listDistrictIdName,
  listWardIdName,
  setProvinceChoice = () => {},
  setDistrictChoice = () => {},
  setWardsChoice = () => {},
}) => (
  <Select
    showSearch
    style={{
      width: "100%",
    }}
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? "").includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? "")
        .toLowerCase()
        .localeCompare((optionB?.label ?? "").toLowerCase())
    }
    options={listProvinceIdName || listDistrictIdName || listWardIdName || []}
    onChange={(value) => {
      if (listProvinceIdName) {
        setProvinceChoice(value);
      } else if (listDistrictIdName) {
        setDistrictChoice(value);
      } else if (setWardsChoice) {
        setWardsChoice(value);
      }
    }}
  />
);
export default SelectOption;
