"use client";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../form-success";
import { FormErros } from "../form-erros";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if(error || success) return;
    if (!token) {
      setError("Token não encontrado");
      return;
    }
    newVerification(token)
      .then(data => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError("Erro ao verificar email");
      });
  }, [token, error, success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Verificação de Email"
      backButtonLabel="Voltar"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!error && !success && <BeatLoader />}
        <FormSuccess message={success} />
       {!success && <FormErros message={error} /> }
      </div>
    </CardWrapper>
  );
};
