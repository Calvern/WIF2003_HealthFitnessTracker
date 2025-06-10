import { useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { Search, X } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";

const SearchBar = ({ width = "75%", query, setQuery, resetSearch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { query: query || "" },
  });

  useEffect(() => {
    reset({ query: query });
  }, [query]);

  const onSubmit = handleSubmit(setQuery);

  const onReset = () => {
    reset({ query: "" });
    resetSearch();
  };

  return (
    <Form onSubmit={onSubmit} className="mt-2">
      <InputGroup style={{ width }}>
        <FormControl
          {...register("query", {
            required: "This field is required",
          })}
          className="border-0 border-bottom border-dark border-2 rounded-0 shadow-none"
          style={{ backgroundColor: "transparent" }}
          placeholder="Search"
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
          onClick={onReset}
        >
          <X size={20} />
        </Button>
      </InputGroup>
      {errors.query && (
        <span className="text-danger">{errors.query.message}</span>
      )}
    </Form>
  );
};

export default SearchBar;
