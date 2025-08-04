# Caderno31 – Frontend

Plataforma para criadores publicarem conteúdo exclusivo para assinantes. Aqui é possível compartilhar posts gratuitos ou pagos, vender materiais extras e distribuir atualizações para a comunidade.  
O layout foi desenvolvido para ser moderno e responsivo, priorizando usabilidade e performance.

---

## ✨ Principais recursos

- **Página inicial dinâmica**: banners em carrossel, criadores em destaque e seção “Best of the Month”.
- **Cadastro de usuários** e autenticação integrada ao backend.
- **Publicação de conteúdo**:
  - Descrição, categorias e idiomas.
  - Tipos de post: gratuito ou pago.
  - Campo de preço para posts monetizados.
  - Upload de arquivos com feedback visual.
- **Integração com API** via Axios e validação de formulários com Zod.
- **Estilização** usando Styled‑Components e animações com Framer‑Motion.

---

## 🛠️ Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Styled‑Components](https://styled-components.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)

---

## 📦 Instalação

1. **Clone o repositório**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd Caderno31NewVersion


2. **Crie o arquivo de variáveis de ambiente**
   ```bash
   cp .env_example .env
  
3. **Ajuste os valores conforme o endereço do seu backend**
 ```bash
  VITE_BACKEND_HOST="localhost"
  VITE_BACKEND_PORT="3003"
  VITE_BACKEND_PROTOCOAL="https"
 ```

4. **Instale as dependências**
   ```bash
   npm install
   ```

   5.**Execute o servidor de desenvolvimento**
   ```bash
   npm run dev

O projeto estará disponível em http://localhost:5173 (ou porta indicada pelo Vite).


## 📜 Scripts disponíveis
| Comando           | Descrição                                           |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento com hot-reload |
| `npm run build`   | Gera o build de produção em `dist/`                 |
| `npm run preview` | Serve o build gerado para inspeção local            |
| `npm run lint`    | Executa o ESLint para análise estática do código    |

