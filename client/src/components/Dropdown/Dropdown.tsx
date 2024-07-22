import React from "react";
import Select from "react-select";
import "./Dropdown.css";

interface DropdownProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: Function;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const parserOptions: any = options.map((option) => ({
    value: option,
    label: option,
  }));

  return (
    <Select
      defaultValue={selectedOption}
      name='colors'
      options={parserOptions}
      className='basic-single'
      classNamePrefix='select'
      placeholder='Filtrar por'
      onChange={(e: any) => setSelectedOption(e.value)}
    />
  );
};

export default Dropdown;
