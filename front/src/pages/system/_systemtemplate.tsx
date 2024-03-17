import Sidebar from "@/components/system/Sidebar";
import Header from "@/components/system/Header";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/AuthContext";
import { useRouter } from "next/router";

// The SystemTemplate will be used mostly, since it will be in almost all the screens
// It is the logged part of the system
export default function SystemTemplate({ children }: React.PropsWithChildren<{}>) {
  const auth = useContext(AuthContext).loggedUser;
  const router = useRouter();
  
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  })
  {
    return (
      <>
        <div className="row bg-purple g-0">
          <div className="col-md-3 d-none d-md-block">
            <Sidebar></Sidebar>
          </div>
          <div className="d-md-none">
            <Header />
          </div>
          <div className="col-md-9 col-12 min-vh-100 text-white p-5">
            {children}
          </div>
        </div>
      </>
    );
  }
}
