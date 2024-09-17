// "use client";

// import { createContext } from "react";

// const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//   const register = async (name, email, password) => {
//     try {
//       await api.post("/auth/register", {
//         //ene path-ruu edgeer medeeleltei REQ ilgeene
//         name,
//         email,
//         password,
//       });
//       router.push("/LogIn"); //REQ buren yvj duussani daraa login hesegruu yvulna
//     } catch (err) {
//       console.log(err);
//       toast.error(err.response.data.message);
//     }
//   };
//   return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
// };
