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
import { LoginShema } from "@/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormErros } from "../form-erros";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";

export const FormLogin = () => {
  const form = useForm<zod.infer<typeof LoginShema>>({
    resolver: zodResolver(LoginShema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: zod.z.infer<typeof LoginShema>) => {
    setSuccess("");
    setError("");
    startTransition(() => {
      login(values).then(data => {
        setSuccess(data?.success);
        setError(data?.error);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Login Form"
      backButtonLabel="Não tem uma conta"
      showSocial
      backButtonHref="/auth/register"
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
          <Button className="w-full">Login</Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
