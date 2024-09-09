import { useFormik } from "formik";
import * as yup from "yup";

export const Register = () => {
  const initialValues = {
    //Ymr ymr medeelel back ruu shidehee todorhoilno
    userName: "",
    email: "",
    password: "",
    confirm: "",
  };

  const validationSchema = yup.object({
    //yup ashiglan ymr ymr utga avj bloh requirements-g oruulna
    userName: yup.string().required("Нэвтрэх нэрээ оруулна уу"),
    email: yup.string().email("Алдаатай имэйл").required("Имэйлээ оруулна уу"),
    password: yup
      .string()
      .min(8)
      .matches(/[0-9]/, "Тоо оруулна уу")
      .matches(/[A-Z]/, "Том үсэг оруулна уу")
      .matches(/[^\w]/, "Тэмдэгт оруулна уу")
      .required("Нууц үгээ оруулна уу"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), "Нууц үг зөрүүтэй байна"])
      .required("Нууц үгээ давтан оруулна уу"),
  });

  //   const onSubmit = async (values) => {
  //     try {
  //       // Log the form values for debugging purposes
  //       console.log(values);

  //       //   await register(values.userName, values.email, values.password);

  //       // Optionally, you could handle success here (e.g., redirect, show a success message)
  //     } catch (error) {
  //       // Handle errors (e.g., show an error message to the user)
  //       console.error("Registration error:", error);
  //     }
  //   };

  //   const formik = useFormik({
  //     initialValues,
  //     validationSchema,
  //   });
  return (
    <div className="bg-[#F4F4F5]">
      <div className="w-[1280px] m-auto h-[550px] flex items-center">
        <div className="flex flex-col w-[30%] m-auto gap-6 ">
          <div className="text-2xl font-semibold self-center">Бүртгүүлэх</div>
          <div className="flex flex-col gap-4">
            <input
              className="rounded-full pl-2 w-full
            "
              placeholder="Нэр"
              name="userName"
              //   value={formik.values.userName}
              //   onChange={formik.handleChange}
            />
            <input
              className="rounded-full pl-2 w-full
            "
              placeholder="Имэйл"
              //   value={formik.values.email}
              //   onChange={formik.handleChange}
            />
            <input
              className="rounded-full pl-2 w-full
          "
              placeholder="Нууц үг"
              name="password"
              //   value={formik.values.password}
              //   onChange={formik.handleChange}
            />
            <input
              className="rounded-full pl-2 w-full
        "
              placeholder="Нууц үг давтах"
              name="confirm"
              //   value={formik.values.confirm}
              //   onChange={formik.handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[#71717A] text-xs">Том үсэг орсон байх</div>
            <div className="text-[#71717A] text-xs">Жижиг үсэг орсон байх</div>
            <div className="text-[#71717A] text-xs">Тоо орсон байх</div>
            <div className="text-[#71717A] text-xs">Тэмдэгт орсон байх</div>
          </div>
          <div className="flex flex-col gap-12">
            <button className="px-4 py-2 bg-[#2563EB] text-white rounded-full">
              Үүсгэх
            </button>
            <button className="px-4 py-2 border border-[#2563EB] rounded-full">
              Нэвтрэх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
