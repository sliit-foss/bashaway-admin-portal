import { useEffect, useState } from "react";
import { Paperclip } from "lucide-react";
import { default as MdEditor } from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useSelector } from "react-redux";
import { default as pick } from "lodash/pick";
import { default as MarkdownIt } from "markdown-it";
import { enabledFilters, questionFilters } from "@/filters";
import { uploadFile } from "@/services";
import { store } from "@/store";
import { questionApi, useAddQuestionMutation, useAuthUserQuery, useUpdateQuestionMutation } from "@/store/api";
import { toggleAddQuestionDialog } from "@/store/reducers/ui/question";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Dropdown,
  Input,
  toast
} from "@sliit-foss/bashaway-ui/components";

const mdParser = new MarkdownIt();

const close = () => store.dispatch(toggleAddQuestionDialog(false));

const initialFormData = {
  name: "",
  description: "",
  difficulty: "",
  constraints: "",
  max_score: 0,
  enabled: "",
  creator_lock: "",
  codebase_url: ""
};

const QuestionDialog = ({ refresh }) => {
  const selectedQuestion = useSelector((store) => store.ui.question.selected);
  const open = useSelector((store) => store.ui.question.showAddQuestionDialog);

  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (selectedQuestion) {
      setFormData({
        ...selectedQuestion,
        constraints: selectedQuestion.constraints?.join(",")
      });
      setFile(null);
    }
  }, [selectedQuestion]);

  const { data: { data: user } = {} } = useAuthUserQuery();

  const [addQuestion] = useAddQuestionMutation();
  const [updateQuestion] = useUpdateQuestionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const payload = {
        ...formData,
        constraints: formData.constraints?.split(",")?.map((c) => c.trim()),
        codebase_url: file ? await uploadFile(file) : formData.codebase_url
      };
      if (selectedQuestion) {
        await updateQuestion({ id: selectedQuestion._id, data: pick(payload, Object.keys(initialFormData)) })
          .unwrap()
          .then(() => toast({ title: `Question updated successfully` }));
      } else {
        await addQuestion(payload)
          .unwrap()
          .then(() => toast({ title: `Question added successfully` }));
      }
      store.dispatch(questionApi.util.resetApiState())
      close();
      refresh();
    } catch (e) {
      toast({ variant: "destructive", title: "Question upload failed" });
    } finally {
      setUploading(false);
    }
  };

  const onChange = (e, key) => {
    setFormData({
      ...formData,
      [key || e.target.name]: e.target.value
    });
  };

  const handleEditorChange = ({ text }) => {
    onChange(
      {
        target: { value: text }
      },
      "description"
    );
  };

  const onFileChange = (e) => setFile(e.target.files?.[0]);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <AlertDialogContent overlayClassName="z-[201]" className="z-[201] md:max-w-2xl lg:md:max-w-4xl xl:max-w-[1488px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <AlertDialogHeader>
            <AlertDialogTitle>{selectedQuestion ? "Edit" : "Add"} Question</AlertDialogTitle>
          </AlertDialogHeader>
          <Input placeholder="Name *" name="name" required className="sm:h-14" value={formData.name} onChange={onChange} />
          <div className="flex flex-col md:flex-row gap-3">
            <Dropdown
              filterkey="difficulty"
              label="Select Difficulty *"
              options={questionFilters.find((filter) => filter.key === "difficulty").options}
              className="sm:h-14"
              value={formData.difficulty}
              required
              onChange={onChange}
            />
            <Dropdown
              filterkey="enabled"
              label="Status *"
              options={enabledFilters}
              className="sm:h-14"
              value={formData.enabled}
              required
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            {(!selectedQuestion || selectedQuestion.creator === user._id) && (
              <Dropdown
                filterkey="creator_lock"
                label="Creator Lock"
                options={enabledFilters}
                className="sm:h-14"
                value={formData.creator_lock}
                onChange={onChange}
              />
            )}
            <Input
              placeholder="Maximum Score *"
              name="max_score"
              value={formData.max_score}
              type="number"
              className="sm:h-14"
              required
              onChange={onChange}
            />
          </div>
          <Input
            placeholder="Constraints (Comma Separated)"
            name="constraints"
            value={formData.constraints}
            className="sm:h-14"
            onChange={onChange}
          />
          <Input
            placeholder="Select Attachment *"
            name="codebase_url"
            value={file ? file.name : formData.codebase_url}
            required
            className="sm:h-14 cursor-pointer"
            onClick={() => document.getElementById("question-file-upload").click()}
            suffixIcon={<Paperclip className="text-gray-400 pointer-events-none" size={21} />}
            readOnly
          />
          <MdEditor
            style={{ height: "325px" }}
            placeholder="Enter description"
            value={formData.description}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
          <AlertDialogFooter className="mt-4">
            <Button type="submit" loading={uploading}>
              {selectedQuestion ? "Edit" : "Add"}
            </Button>
            <Button variant="secondary" type="button" onClick={close}>
              Cancel
            </Button>
          </AlertDialogFooter>
          <input id="question-file-upload" type="file" className="hidden" onChange={onFileChange} />
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QuestionDialog;
