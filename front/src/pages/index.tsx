import { useRouter } from "next/router";
import LoginAndPassword from "./login";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/AuthContext";

export default function Index() {
  const router = useRouter();
  const isLogged = useContext(AuthContext).loggedUser;

  useEffect(() => {
    if (isLogged === undefined) return;
    
    if (isLogged) {
      router.push("/login");
    } else {
      router.push("/system");
    }
  }, [isLogged]);
  return null;
}