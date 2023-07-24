import { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { toast } from "react-toastify";
import { Input } from "@components/common";
import { gradeSubmission } from "@services/submission";

const initialFormData = {
  score: "",
};

const GradeModal = ({ submission, show, setShow, refresh = () => {} }) => {
  const [formData, setFormData] = useState(submission || initialFormData);

  const onSubmit = async () => {
    await gradeSubmission(submission._id, {
      score: Number(formData.score),
    }).then((res) => {
      if (res.success) {
        toast.success("Submission graded successfully");
        setFormData(initialFormData);
      }
    });
    setShow(false);
    refresh();
  };

  const onChange = (e, key) => {
    setFormData({
      ...formData,
      [key || e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      show={show}
      size="2xl"
      onClose={() => {
        setShow(false);
      }}
    >
      <Modal.Header color="white">Grade Submission</Modal.Header>
      <Modal.Body>
        <form>
          <div className="flex flex-col gap-y-4 mb-4">
            <Input
              placeholder="Score"
              name="score"
              value={formData.score}
              className="h-12 sm:h-14 light"
              theme="light"
              onChange={onChange}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>Grade</Button>
        <Button
          color="gray"
          onClick={() => {
            setShow(false);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GradeModal;
