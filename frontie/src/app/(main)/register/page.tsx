"use client";

import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirm: string;
}
export const Register = () => {
  const router = useRouter();
  const initialValues: FormValues = {
    //Ymr ymr medeelel back ruu shidehee todorhoilno
    username: "",
    email: "",
    password: "",
    confirm: "",
  };

  const validationSchema = yup.object({
    //yup ashiglan ymr ymr utga avj bloh requirements-g oruulna
    username: yup.string().required("Нэвтрэх нэрээ оруулна уу"),
    email: yup.string().email("Алдаатай имэйл").required("Имэйлээ оруулна уу"),
    password: yup
      .string()
      .min(8)
      .matches(/[0-9]/, "Тоо оруулна уу")
      .matches(/[A-Z]/, "Том үсэг оруулна уу")
      .matches(/[^\w]/, "Тэмдэгт оруулна уу")
      .matches(/[a-z]/, "Жижиг үсэг оруулна уу")
      .required("Нууц үгээ оруулна уу"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), "Нууц үг зөрүүтэй байна"])
      .required("Нууц үгээ давтан оруулна уу"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      createUser(values);
    },
  });

  const isValidationSymbol = /[^\w]/.test(formik.values.password);
  const isValidationNumber = /[0-9]/.test(formik.values.password);
  const isValidationUpperCase = /[A-Z]/.test(formik.values.password);
  const isValidationLowerCase = /[a-z]/.test(formik.values.password);

  const createUser = async (values: FormValues) => {
    try {
      const response = await axios.post("http://localhost:3004/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      router.push("/login");
      console.log("User created:", response.data.message);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="bg-[#F4F4F5]">
      <div className="w-[1280px] m-auto min-h-[70vh] flex items-center">
        <div className="flex flex-col w-[30%] m-auto gap-6 ">
          <div className="text-2xl font-semibold self-center">Бүртгүүлэх</div>
          <div className="flex flex-col gap-4">
            <input
              className="rounded-full pl-2 w-full
            "
              placeholder="Нэр"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <input
              className="rounded-full pl-2 w-full
            "
              placeholder="Имэйл"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <input
              className="rounded-full pl-2 w-full
          "
              placeholder="Нууц үг"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <input
              className="rounded-full pl-2 w-full
        "
              placeholder="Нууц үг давтах"
              name="confirm"
              type="password"
              value={formik.values.confirm}
              onChange={formik.handleChange}
            />
            {formik.errors.confirm ? (
              <p className="text-red-600">{formik.errors.confirm}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-1 px-2">
            <div
              className={`${
                formik.values.password === ""
                  ? "text-[#71717A]"
                  : isValidationUpperCase
                  ? "text-green-500"
                  : "text-red-500"
              } text-xs`}
            >
              Том үсэг орсон байх
            </div>
            <div
              className={`${
                formik.values.password === ""
                  ? "text-[#71717A]"
                  : isValidationLowerCase
                  ? "text-green-500"
                  : "text-red-500"
              } text-xs`}
            >
              Жижиг үсэг орсон байх
            </div>
            <div
              className={`${
                formik.values.password === ""
                  ? "text-[#71717A]"
                  : isValidationNumber
                  ? "text-green-500"
                  : "text-red-500"
              } text-xs`}
            >
              Тоо орсон байх
            </div>
            <div
              className={`${
                formik.values.password === ""
                  ? "text-[#71717A]"
                  : isValidationSymbol
                  ? "text-green-500"
                  : "text-red-500"
              } text-xs`}
            >
              Тэмдэгт орсон байх
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <button
              className="px-4 py-2 bg-[#2563EB] text-white rounded-full w-full"
              onClick={formik.submitForm}
              type="submit"
            >
              Үүсгэх
            </button>
            <Link href={`/login`}>
              <button className="px-4 py-2 border w-full border-[#2563EB] rounded-full">
                Нэвтрэх
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
