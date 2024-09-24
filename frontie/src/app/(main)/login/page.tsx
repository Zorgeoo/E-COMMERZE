"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); //Localstorage deer token-r SETelne./browser deer hadgalagdsn/
      setUser(response.data);
      console.log(response.data);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[70vh] bg-[#F4F4F5]">
      <div className="w-[1280px] m-auto">
        <div className="flex flex-col w-2/3 m-auto gap-8 items-center pt-[100px]">
          <div className="font-semibold text-2xl">Нэвтрэх</div>
          <div className="flex flex-col gap-4 w-1/2">
            <input
              className="rounded-full pl-2 w-full
        "
              placeholder="Имэйл"
              name="name"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="rounded-full pl-2 w-full
        "
              placeholder="Нууц үг"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="px-4 py-2 border w-full text-white bg-[#2563EB] rounded-full"
              onClick={() => login(email, password)}
            >
              Нэвтрэх
            </button>
            <div className="text-[#71717A] underline text-sm self-center">
              Нууц үг мартсан
            </div>
          </div>
          <div className="w-1/2">
            <Link href={`/register`}>
              <button className="px-4 py-2 border  border-[#2563EB] rounded-full w-full">
                Бүртгүүлэх
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
