/**
 * `publicRoutes` define uma lista de rotas que são acessíveis sem a necessidade de autenticação.
 * Estas são rotas abertas a todos os usuários, independentemente de estarem logados ou não.
 * Por exemplo, a rota raiz "/" é uma rota pública.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * `authRoutes` especifica as rotas que exigem que o usuário esteja autenticado para acessar.
 * Caso um usuário não autenticado tente acessar essas rotas, ele será redirecionado para a página de login.
 * Exemplos incluem rotas como "/auth/login" e "/auth/register", que são usadas para o processo de login e registro.
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  '/auth/new-password',
];

/**
 * `apiAuthPrefix` é um prefixo usado para identificar rotas de API que tratam de autenticação.
 * Este prefixo é usado para agrupar todas as chamadas de API relacionadas à autenticação sob um caminho comum.
 * Por exemplo, as rotas sob "/api/auth" podem incluir endpoints para login, registro, e verificação de status de sessão.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * `DEFAULT_LOGIN_REDIRECT` é o caminho de redirecionamento padrão para onde os usuários são enviados após um login bem-sucedido.
 * Esta rota é usada como destino padrão para garantir que os usuários autenticados sejam direcionados para uma página de uso comum,
 * como a página de configurações do usuário, após efetuar login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
