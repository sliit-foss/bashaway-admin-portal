import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GoSync, GoKey } from "react-icons/go";
import { Button, Input } from "../components/common";
import Layout from "../components/layout";
import { getCurrentUser } from "../services/auth";
import { updateUser } from "../services/user";
import { useEffectOnce } from "../hooks";
import { setUser } from "../store/user";

const Register = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState(user);

  useEffectOnce(() => {
    getCurrentUser().then((res) => {
      dispatch(setUser(res.data));
    });
  });

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(user._id, {
      name: formData.name,
    }).then((res) => {
      if (res.success) {
        dispatch(setUser(formData));
        toast.success("Team details updated successfully", {
          autoClose: 3500,
        });
      }
    });
  };

  return (
    <Layout title="Profile | Bashaway">
      <form
        className="w-full h-full flex flex-col justify-center items-center p-8 md:p-12"
        onSubmit={handleSubmit}
      >
        <div className="h-full flex flex-col w-full md:w-10/12 justify-center items-center pt-28">
          <Input
            placeholder="Name"
            name="name"
            className={`p-4 transition duration-300 opacity-100 block mb-12`}
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="sticky mb-20 left-[93%] flex">
          <Button
            className="p-5 mr-8"
            type="button"
            style={{ borderRadius: "100%" }}
            onClick={() => {
              router.push("/change-password");
            }}
          >
            <GoKey className="w-[3.1rem] h-[3rem]" />
          </Button>
          <Button
            className="p-4 animate-spin"
            type="submit"
            style={{ borderRadius: "100%" }}
          >
            <GoSync className="w-14 h-14" />
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
