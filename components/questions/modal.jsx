import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "flowbite-react";
import { toast } from "react-toastify";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { addQuestion, updateQuestion } from "@services/question";
import { uploadFile } from "@services/azure";
import { Dropdown, Input } from "@components/common";
import { enabledFilters, questionFilters } from "@filters";
import { isEmpty, pick } from "lodash";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

const initialFormData = {
  name: "",
  description: "",
  difficulty: "",
  constraints: "",
  max_score: null,
  enabled: "",
  creator_lock: "",
  codebase_url: "",
};

const QuestionModal = ({ question, show, setShow, refresh = () => {} }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState(
    question
      ? {
          ...question,
          constraints: question.constraints?.join(","),
        }
      : initialFormData
  );

  const onSubmit = async () => {
    const payload = {
      ...formData,
      constraints: formData.constraints?.split(",")?.map((c) => c.trim()),
    };
    if (question) {
      await updateQuestion(
        question._id,
        pick(payload, Object.keys(initialFormData))
      ).then((res) => {
        if (res.success) {
          toast.success("Question updated successfully");
        }
      });
    } else {
      await addQuestion(payload).then((res) => {
        if (res.success) {
          toast.success("Question added successfully");
          setFormData(initialFormData);
        }
      });
    }
    setShow(false);
    refresh();
  };

  const handleEditorChange = ({ text }) => {
    onChange(
      {
        target: {
          value: text,
        },
      },
      "description"
    );
  };

  const onChange = (e, key) => {
    setFormData({
      ...formData,
      [key || e.target.name]: e.target.value,
    });
  };

  const onFileChange = (e) => {
    if (!isEmpty(e.target.files)) {
      uploadFile(formData.name, e.target.files[0])
        .then((res) => {
          setFormData({
            ...formData,
            codebase_url: res,
          });
        })
        .catch((e) => {
          console.error(`Error during file upload - message: `, e.message);
          toast.error("Error during file upload");
        });
    }
  };

  return (
    <Modal
      show={show}
      size="7xl"
      onClose={() => {
        setShow(false);
      }}
    >
      <Modal.Header color="white">
        {question ? "Update" : "Add"} Question
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="flex flex-col gap-y-4 mb-4">
            <div className="w-full flex justify-center items-center gap-x-4">
              <Input
                placeholder="Question Name"
                name="name"
                value={formData.name}
                wrapperclasses="w-full md:w-1/2"
                className="h-12 sm:h-14 light"
                theme="light"
                onChange={onChange}
              />
              <Input
                placeholder="Upload Sample Code"
                name="codebase_url"
                value={formData.codebase_url}
                wrapperclasses="w-full md:w-1/2"
                className="h-12 sm:h-14 cursor-pointer light"
                theme="light"
                disabled={!formData.name}
                onClick={() => {
                  formData.name &&
                    document.getElementById("question-file-upload").click();
                }}
                readOnly
              />
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-y-4 md:gap-y-0 gap-x-4">
              <Dropdown
                filterkey="difficulty"
                placeholder="Select Difficulty"
                options={
                  questionFilters.find((filter) => filter.key === "difficulty")
                    .options
                }
                wrapperclasses="w-full md:w-4/12"
                className="w-full h-12 sm:h-14"
                theme="light"
                value={formData.difficulty}
                onChange={onChange}
              />
              <Dropdown
                filterkey="enabled"
                placeholder="Status"
                options={enabledFilters}
                wrapperclasses="w-full md:w-4/12"
                className="w-full h-12 sm:h-14 light"
                theme="light"
                value={formData.enabled}
                onChange={onChange}
              />
              {(!question || question.creator === currentUser._id) && (
                <Dropdown
                  filterkey="creator_lock"
                  placeholder="Creator Lock"
                  options={enabledFilters}
                  wrapperclasses="w-full md:w-4/12"
                  className="w-full h-12 sm:h-14 light"
                  theme="light"
                  value={formData.creator_lock}
                  onChange={onChange}
                />
              )}
              <Input
                placeholder="Maximum Score"
                name="max_score"
                value={formData.max_score}
                type="number"
                wrapperclasses="w-full md:w-4/12"
                className="w-full h-12 sm:h-14 light"
                theme="light"
                onChange={onChange}
              />
            </div>
            <Input
              placeholder="Constraints (Comma Separated)"
              name="constraints"
              value={formData.constraints}
              className="h-12 sm:h-14 light"
              theme="light"
              onChange={onChange}
            />
            <MdEditor
              style={{ height: "300px" }}
              placeholder="Enter question description"
              value={formData.description}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
            <input
              id="question-file-upload"
              type="file"
              className="hidden"
              onChange={onFileChange}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>{question ? "Update" : "Add"}</Button>
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

export default QuestionModal;
