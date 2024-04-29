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
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const FormLogin = () => {
  const form = useForm<zod.infer<typeof LoginShema>>({
    resolver: zodResolver(LoginShema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Logar a conta com outro providers"
      : "";

  const onSubmit = (values: zod.z.infer<typeof LoginShema>) => {
    setSuccess("");
    setError("");
    startTransition(() => {
      login(values)
        .then(data => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Ocorreu um erro ao fazer login!"));
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
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123456" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
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
                        <Input
                          {...field}
                          placeholder="*******"
                          type="password"
                        />
                      </FormControl>
                      <Button
                        asChild
                        size="sm"
                        variant="link"
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Esqueceu a senha?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormErros message={error || urlError} />
          <FormSuccess message={success} />
          <Button className="w-full">
            {showTwoFactor ? "Confirmar" : "Login"}
            </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
