import { NextAuthRequest } from "./node_modules/next-auth/lib/index.d";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
const { auth } = NextAuth(authConfig);

export default auth(async (req: NextAuthRequest): Promise<void | Response> => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Verifica se a URL da requisição começa com o prefixo definido para rotas de API de autenticação.
  // Se a rota for uma rota de API de autenticação, não faz nada e permite que o servidor continue a processar a requisição.
  if (isApiAuthRoute) {
    return;
  }

  // Verifica se a URL está listada nas rotas que exigem autenticação.
  // Essas são rotas definidas onde a autenticação do usuário é necessária para acessar.
  if (isAuthRoute) {
    // Se o usuário estiver logado, redireciona-o para a página de redirecionamento padrão pós-login.
    // Isso pode ser útil para redirecionar usuários já autenticados que acessam páginas de login ou registro.
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // Se o usuário não estiver logado e tentar acessar uma rota que requer autenticação,
    // a função termina sem fazer nada, permitindo que outras regras ou o próprio Next.js gerencie a situação.
    return;
  }

  // Verifica se o usuário não está logado e se a URL da requisição não está listada nas rotas públicas.
  // Rotas públicas são aquelas que podem ser acessadas sem necessidade de autenticação.
  if (!isLoggedIn && !isPublicRoute) {
    // Redireciona o usuário para a página de login se ele tentar acessar uma rota não pública sem estar autenticado.
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // Se nenhuma das condições anteriores for atendida, a função termina sem fazer nada,
  // permitindo que o servidor continue a processar a requisição normalmente.
  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
