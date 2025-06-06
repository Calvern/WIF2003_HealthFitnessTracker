import { Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

const RecommendModal = ({
  show,
  handleClose,
  submitRecommendation,
  isPending,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { targetCalorie: "" },
  });
  const onSubmit = handleSubmit((targetCalorie) => {
    submitRecommendation(targetCalorie);
  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Suggest meals</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Please tell us how much calorie you want for your today's meal!
        <Form onSubmit={onSubmit} className="mt-3">
          <InputGroup>
            <FormControl
              {...register("targetCalorie", {
                required: "This field is required",
              })}
              className="shadow-none"
              type="number"
              step="any"
              placeholder="Calories in kCal"
            ></FormControl>
            <InputGroup.Text>kCal</InputGroup.Text>
          </InputGroup>
          {errors.targetCalorie && (
            <span className="text-danger">{errors.targetCalorie.message}</span>
          )}
          <div className="mt-4 d-flex justify-content-end gap-3">
            <Button
              type="submit"
              className="rounded-4 px-4 py-2"
              style={{ backgroundColor: "#176087" }}
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Submit"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RecommendModal;
