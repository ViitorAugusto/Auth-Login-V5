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
import { ResetShema } from "@/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormErros } from "../form-erros";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { reset } from "@/actions/reset";

export const FormReset = () => {
  const form = useForm<zod.infer<typeof ResetShema>>({
    resolver: zodResolver(ResetShema),
    defaultValues: {
      email: "",
    },
  });
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: zod.z.infer<typeof ResetShema>) => {
    setSuccess("");
    setError("");

    console.log(values);

    startTransition(() => {
      reset(values).then(data => {
        setSuccess(data?.success);
        setError(data?.error);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Esqueçeu a senha ?"
      backButtonLabel="Voltar para o login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="joe@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormErros message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={isPending}>
            Mandar E-mail
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
