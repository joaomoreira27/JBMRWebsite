# JBMR: site institucional

Site estático da **JBMR Oficina de Automóveis Unipessoal, Lda** (Paredes, Porto).
Publicado em `https://jbmr.pt` por FTP a partir do GitHub (`.github/workflows/deploy.yml`).

## Como editar

Os dados da oficina (telefone, email, morada, horário, anos de experiência, títulos
e descrições das páginas) estão num único ficheiro: **`site.config.json`**.

O conteúdo de cada página está em **`src/paginas/`**. O cabeçalho, o menu, o rodapé e
a barra de contacto estão em **`src/partials/`**, e a estrutura comum em **`src/layout.html`**.

Depois de alterar qualquer destes ficheiros:

```bash
npm run build
```

Isto gera as páginas HTML da raiz (`index.html`, `servicos.html`, etc.), o `sitemap.xml`
e o `.well-known/security.txt`. **Não editar os HTML da raiz à mão**: são sobrescritos.
Fazer commit das alterações, incluindo os HTML gerados. O deploy recusa publicar se os
HTML não corresponderem à configuração.

## Campos por preencher

Procurar `A PREENCHER`. O deploy não publica enquanto existirem.

- `nipc` em `site.config.json`: o NIPC da empresa (aparece na política de privacidade).
- `WEB3FORMS_KEY` em `script.js`: a chave do Web3Forms para receber os pedidos.

## Documentação

- `docs/deploy.md`: como publicar no alojamento OVH e os segredos do GitHub.
- `docs/formularios.md`: formulários e Web3Forms.
- `docs/seo-local.md`: Perfil de Empresa no Google, avaliações e Search Console.
- `docs/diagnostico-dns.md`: histórico do domínio jbmr.com.

## Segurança

- Sem dependências externas em produção (sem CDN, sem frameworks).
- Política de conteúdo (CSP), cabeçalhos de segurança e bloqueio de ficheiros internos em `.htaccess`.
- Formulários com campo-armadilha, tempo mínimo de preenchimento e pausa entre pedidos.
- Nenhum segredo no repositório: as credenciais do FTP estão nos segredos do GitHub.
