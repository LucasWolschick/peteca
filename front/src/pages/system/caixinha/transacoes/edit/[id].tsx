import React from "react";
import { useRouter } from "next/router";
import TransactionForm from "../_TransactionForm";

const EditTransaction = () => {
  const router = useRouter();
  const { id } = router.query;

  return <TransactionForm transactionId={id as string} />;
};

export default EditTransaction;
