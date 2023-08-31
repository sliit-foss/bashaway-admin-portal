import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { startCase } from "lodash";
import { default as Terms } from "@/components/register/terms";
import { useTitle } from "@/hooks";
import { useRegisterMutation } from "@/store/api";
import { getRegexPatternFromKey } from "@/utils";
import { Badge, Button, Input, toast } from "@sliit-foss/bashaway-ui/components";
import { Caption, Title } from "@sliit-foss/bashaway-ui/typography";

const steps = ["Team Details", "Member 01", "Member 02", "Member 03", "Member 04"];

const Register = () => {
  const [step, setStep] = useState(1);

  const [modalVisibility, setModalVisibility] = useState(false);

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState(
    [1, 2, 3, 4, 5].reduce((acc, curr, index) => {
      if (index === 0) {
        acc[1] = {
          name: "",
          email: "",
          password: "",
          university: ""
        };
        return acc;
      }
      acc[index + 1] = {
        name: "",
        email: "",
        phone: "",
        academic_year: ""
      };
      return acc;
    }, {})
  );

  const handleSubmit = async (e, isConfirmation) => {
    e?.preventDefault();
    if (step === steps.length) {
      if (isConfirmation) {
        await register({
          name: formData[1].name,
          email: formData[1].email,
          password: formData[1].password,
          university: formData[1].university,
          members: Object.values(formData)
            .slice(1)
            .filter((member) => !!member.name)
        })
          .unwrap()
          .then((res) => {
            navigate("/login");
            toast({ title: res.message });
          });
      } else {
        setModalVisibility(true);
      }
    } else {
      setStep(step + 1);
    }
  };

  const checkPasswordMatch = (e, id) => {
    if (e.target.value !== document.getElementById(id).value) {
      document.getElementById("confirm-password").setCustomValidity("Passwords do not match");
    } else {
      document.getElementById("confirm-password").setCustomValidity("");
    }
  };

  useTitle("Register | Bashaway");

  return (
    <>
      <form
        className={`w-full max-w-form min-h-[70vh] flex flex-col justify-center items-center gap-5`}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-3 md:gap-2 mb-6 pointer-events-none">
          <Title>Register your team</Title>
          <Badge className="min-w-[130px]">{steps[step - 1]}</Badge>
        </div>
        <div className={`w-full mb-10 relative flex justify-between items-center mt-3 h-1 bg-[#cccccc]`}>
          {steps.map((_, index) => (
            <div
              key={index}
              className={`relative z-50 w-5 h-5 md:w-6 md:h-6 rounded-full transition-all duration-medium ${
                step > index ? "bg-black" : "bg-[#cccccc]"
              }`}
            />
          ))}
          <div
            className="absolute h-full left-0 bg-black transition-all duration-medium"
            style={{
              width: `calc(0% + ${25 * (step - 1)}%)`
            }}
          />
        </div>
        <div className="w-full flex flex-col items-end">
          {Object.keys(formData).reduce((acc, _, index, arr) => {
            acc = [
              ...acc,
              ...Object.keys(formData[arr[index]]).map((key, i) => {
                const show = index + 1 === step;
                const required =
                  show &&
                  (step <= 2 || Object.keys(formData[step]).find((memberKey) => formData[step][memberKey] !== ""));
                const elementKey = key === "password" ? key : `${key}-${index},${i}`;
                return (
                  <div
                    key={elementKey}
                    className={`w-full ${
                      key === "password" ? "md:flex justify-between items-center" : "flex flex-col"
                    }`}
                  >
                    <Input
                      id={elementKey}
                      placeholder={`${key === "name" && step === 1 ? "Team Name" : startCase(key)}${
                        required ? " *" : ""
                      }`}
                      type={key === "password" || key === "email" ? key : "text"}
                      pattern={getRegexPatternFromKey(key).regex}
                      title={getRegexPatternFromKey(key).title}
                      name={key}
                      className={`p-4 my-2.5 transition duration-300 ${
                        show ? "opacity-100 block" : "opacity-0 hidden"
                      }`}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          [step]: {
                            ...formData[step],
                            [key]: e.target.value
                          }
                        });
                        if (key === "password") checkPasswordMatch(e, "confirm-password");
                      }}
                      required={required}
                      wrapperclasses={key === "password" ? "w-full md:w-11/12 md:mr-2" : "w-full"}
                    />
                    {key === "password" && (
                      <Input
                        id="confirm-password"
                        placeholder="Confirm Password *"
                        type="password"
                        pattern={getRegexPatternFromKey(key).regex}
                        title={getRegexPatternFromKey(key).title}
                        name={key}
                        className={`transition duration-300 ${show ? "opacity-100 block" : "opacity-0 hidden"}`}
                        required={required}
                        wrapperclasses="w-full md:w-11/12 md:ml-2"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            e.target.setCustomValidity("Please fill out this field.");
                            return;
                          }
                          checkPasswordMatch(e, elementKey);
                        }}
                      />
                    )}
                  </div>
                );
              })
            ];
            return acc;
          }, [])}
          <span className="w-full text-center text-black/40 mt-4 mb-6">
            * From 2<sup>nd</sup> member onwards please fill all fields or leave all fields empty
          </span>
          <div className="w-full flex gap-4">
            {step !== 1 && (
              <Button
                className="w-full h-14 sm:h-16 text-[20px]"
                type="button"
                onClick={() => {
                  setStep(step - 1);
                }}
              >
                Back
              </Button>
            )}
            <Button
              className="w-full h-14 sm:h-16 text-[20px]"
              type="submit"
              data-modal-toggle="terms-and-conditions"
              loading={isLoading}
            >
              {step === steps.length ? "Register" : "Next"}
            </Button>
          </div>
        </div>
        <span>
          <Caption className="text-black/40 mr-1.5">Already have an account?</Caption>
          <Link to="/login">
            <Caption className="link">Login here</Caption>
          </Link>
        </span>
      </form>
      <Terms open={modalVisibility} setOpen={setModalVisibility} onConfirm={handleSubmit} />
    </>
  );
};

export default Register;
