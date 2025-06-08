import { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { Search, X } from "react-bootstrap-icons";

const SearchBar = ({ width = "75%", onSearchChange }) => {
  const [searchValue, setsearchValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setsearchValue(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()} className="mt-2">
      <InputGroup style={{ width }}>
        <FormControl
          className="border-0 border-bottom border-dark border-2 rounded-0 shadow-none"
          style={{ backgroundColor: "transparent" }}
          placeholder="Search"
          value={searchValue}
          onChange={handleChange}
        />
        <Button
          className="border-0 border-bottom border-dark border-2 rounded-0"
          style={{ backgroundColor: "transparent", color: "black" }}
          type="submit"
        >
          <Search size={20} />
        </Button>
        <Button
          className="border-0 border-bottom border-dark border-2 rounded-0"
          style={{ backgroundColor: "transparent", color: "black" }}
          onClick={() => {
            setsearchValue("");
            onSearchChange(""); // Clear filter on X
          }}
        >
          <X size={20} />
        </Button>
      </InputGroup>
    </Form>
  );
};


export default SearchBar;
