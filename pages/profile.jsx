import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";
import { Button, Input } from "@components/common";
import Layout from "@components/layout";
import { useEffectOnce } from "@hooks";
import { getCurrentUser } from "@services/auth";
import { updateUser } from "@services/user";
import { setCurrentUser } from "@store/user";

const Register = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { currentUser: user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState(user);

  useEffectOnce(() => {
    isEmpty(user) &&
      getCurrentUser().then((res) => {
        dispatch(setCurrentUser(res.data));
      });
  });

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(user._id, {
      name: formData.name
    }).then((res) => {
      if (res.success) {
        dispatch(setCurrentUser(formData));
        toast.success("User details updated successfully", {
          autoClose: 3500
        });
      }
    });
  };

  return (
    <Layout title="Profile | Bashaway">
      <form
        className="w-full min-h-screen flex flex-col justify-center items-center p-8 md:p-12"
        onSubmit={handleSubmit}
      >
        <div className="h-full flex flex-col w-full md:w-10/12 justify-center items-center pt-28">
          <Input
            placeholder="Name"
            name="name"
            className={`p-4 transition duration-300 opacity-100 block mb-6`}
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value
              });
            }}
          />
          <div className="w-full flex justify-center items-center">
            <Button
              className="h-14 w-1/2 mb-8 mr-2"
              onClick={() => {
                router.push("/change-password");
              }}
            >
              Change Password
            </Button>
            <Button className="h-14 w-1/2 mb-8 ml-2" type="submit">
              Update Name
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
