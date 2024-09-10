const Login = () => {
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
            />
            <input
              className="rounded-full pl-2 w-full
        "
              placeholder="Нууц үг"
              name="password"
            />
            <button className="px-4 py-2 border w-full text-white bg-[#2563EB] rounded-full">
              Нэвтрэх
            </button>
            <div className="text-[#71717A] underline text-sm self-center">
              Нууц үг мартсан
            </div>
          </div>
          <div className="w-1/2">
            <button className="px-4 py-2 border  border-[#2563EB] rounded-full w-full">
              Бүртгүүлэх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
