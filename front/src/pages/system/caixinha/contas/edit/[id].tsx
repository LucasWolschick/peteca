import React from "react";
import { useRouter } from "next/router";
import AccountForm from "../_AccountForm";

const EditarContas = () => {
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da conta da URL

  return <AccountForm accountId={id as string} />;
};

export default EditarContas;
