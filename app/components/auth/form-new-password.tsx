"use client";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import { NewPasswordShema } from "@/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormErros } from "../form-erros";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";

import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const form = useForm<zod.infer<typeof NewPasswordShema>>({
    resolver: zodResolver(NewPasswordShema),
    defaultValues: {
      password: "",
    },
  });
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: zod.z.infer<typeof NewPasswordShema>) => {
    setSuccess("");
    setError("");

    console.log(values);

    startTransition(() => {
      newPassword(values, token).then(data => {
        setSuccess(data?.success);
        setError(data?.error);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Entrar com o novo password"
      backButtonLabel="Voltar para o login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="*******" type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormErros message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={isPending}>
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
