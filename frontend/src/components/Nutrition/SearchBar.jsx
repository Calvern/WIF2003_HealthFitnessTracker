import { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { Search, X } from "react-bootstrap-icons";

const SearchBar = ({ width = "75%" }) => {
  const [searchValue, setsearchValue] = useState("");
  return (
    <Form onSubmit={(e) => e.preventDefault()} className="mt-5">
      <InputGroup style={{ width }}>
        <FormControl
          className="border-0 border-bottom border-dark border-2 rounded-0 shadow-none"
          style={{backgroundColor: "transparent"}}
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setsearchValue(e.target.value)}
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
          onClick={() => setsearchValue("")}
        >
          <X size={20} />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
