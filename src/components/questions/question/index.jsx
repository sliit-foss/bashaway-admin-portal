import { useMemo } from "react";
import { default as ReactMarkdown } from "react-markdown";
import { Link } from "react-router-dom";
import { startCase } from "lodash";
import { twMerge } from "tailwind-merge";
import { challengeColor } from "@/utils";
import { Body3, Footnote } from "@sliit-foss/bashaway-ui/typography";

export { default as QuestionGridSkeleton } from "./skeleton";

export const Question = ({ question }) => {
  const cardStyles = useMemo(() => challengeColor(question), [question]);

  const cleanedDescription = useMemo(() => {
    if (question.description) {
      return question.description
        .replace(/^#+\s.*$/gm, "")
        .trim()
        .split("\n")[0];
    }
    return "";
  }, [question.description]);

  return (
    <Link
      to={`/questions/${question._id}`}
      className="group h-full w-full animated-border text-border from-black/20 to-border p-5 rounded-3xl"
    >
      <div
        className={twMerge(
          "w-full h-full flex flex-col p-5 gap-6 rounded-2xl transition-all duration-medium",
          cardStyles
        )}
      >
        <Body3 className="font-bold transition-all duration-medium">{question.name}</Body3>
        <ReactMarkdown className="markdown [&>p]:font-semibold line-clamp-3">{cleanedDescription}</ReactMarkdown>
        <div className="flex flex-wrap gap-3 [&>span]:px-3 [&>span]:py-2 [&>span]:rounded-lg [&>span]:transition-all [&>span]:duration-medium">
          <Footnote>{startCase(question.difficulty.toLowerCase())}</Footnote>
          <Footnote>{question.max_score}PT</Footnote>
          <Footnote>{question.constraints?.join(", ")}</Footnote>
        </div>
      </div>
    </Link>
  );
};

export default Question;
