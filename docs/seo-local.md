# SEO local: o que fazer fora do código

O site já tem a parte técnica (títulos, dados estruturados, sitemap, horário).
Estes passos dependem da conta Google da oficina e não se fazem a partir do repositório.

---

## 1. Perfil de Empresa no Google (Google Business Profile)

É o fator com mais peso na pesquisa local ("oficina chaparia Paredes" e semelhantes).
Criar em https://www.google.com/business/ com a conta Google da oficina.

Usar **exatamente** estes dados, iguais aos do site e da placa:

| Campo | Valor |
|---|---|
| Nome | JBMR Oficina de Automóveis Unipessoal, Lda |
| Categoria principal | Oficina de reparação automóvel |
| Categorias secundárias | Oficina de chapa e pintura automóvel, Serviço de polimento de automóveis |
| Morada | Rua Tapada do Sousa, Nº 38, 4580-208 Paredes, Porto |
| Telefone | 936 850 763 |
| Website | https://jbmr.pt |
| Horário | Seg a Sex 08:30–12:30 e 14:00–19:00 · Sáb 09:00–13:00 · Dom fechado |

**Descrição** (até 750 caracteres, pode colar tal como está):

> A JBMR é uma oficina de automóveis em Paredes, Porto, com mais de 30 anos a
> reparar viaturas. Especializada em chaparia, pintura automóvel e polimentos,
> trabalha também em reparações mecânicas, revisões, travões e suspensão,
> diagnóstico eletrónico, mudança de óleo e filtros e ar condicionado. Peça um
> orçamento gratuito pelo 936 850 763 ou pelo site jbmr.pt.

**Serviços** (adicionar um a um no perfil): Chaparia · Pintura automóvel ·
Polimentos e retoques · Revisões gerais · Travões e suspensão · Diagnóstico
eletrónico · Mudança de óleo e filtros · Ar condicionado · Reparações mecânicas.
Alinhamento e pneus são feitos por parceiros: indicar como serviço externo ou não listar.

**Fotografias** (o perfil com fotos reais recebe muito mais contactos):
- Fachada e entrada, com o letreiro visível
- Interior da oficina e zona de trabalho
- Um ou dois trabalhos de chaparia/pintura, antes e depois (com autorização do cliente)
- Equipa, se quiserem aparecer

No repositório já existem duas fotos da oficina (`public/images/jbmroficina.webp` e
`public/images/hero.webp`). Se forem fotos reais, servem para o perfil desde já.

**Verificação**: o Google pede verificação (carta com código ou vídeo). Fazer logo,
porque sem ela o perfil não aparece no mapa.

---

## 2. Pedir avaliações aos clientes

Quantas mais avaliações recentes e detalhadas, melhor. Pedir sempre depois da entrega,
com o link direto (no perfil: *Pedir avaliação* → copiar o link curto).

Modelo de mensagem (SMS ou WhatsApp):

> Olá [nome], obrigado por confiar na JBMR. Se tiver um minuto, deixe-nos uma
> avaliação no Google, ajuda muito outros clientes a encontrar-nos: [link].
> Obrigado!

**Não oferecer desconto nem vantagem em troca de avaliação.** As regras do Google
proíbem-no e o perfil pode ser suspenso. Responder a todas as avaliações, incluindo
as negativas, com calma e sem entrar em discussões públicas.

---

## 3. Google Search Console

Depois de o site estar online:

1. Ir a https://search.google.com/search-console e escolher **Adicionar propriedade**
   → **Prefixo do URL** → `https://jbmr.pt/`
2. Verificar a propriedade. A opção mais simples é o registo **TXT** na zona DNS do
   domínio (painel OVH). Também serve o ficheiro HTML, se preferirem.
3. Em **Sitemaps**, submeter `sitemap.xml`.
4. Em **Inspeção de URL**, pedir indexação de `https://jbmr.pt/`.
5. Verificar uma semana depois: páginas indexadas, consultas que trazem visitas e erros.

Ao submeter, o Search Console mostra a versão `www` como propriedade separada: não é
preciso verificá-la, porque o site já a redireciona para `jbmr.pt`.

---

## 4. Outros sítios a registar (gratuitos)

- **Bing Places** (https://www.bingplaces.com), importa o perfil do Google.
- **Páginas Amarelas** (https://www.paginasamarelas.pt), listagem com o mesmo nome, morada e telefone.
- Pedir à oficina que confirme o nome e a morada nestes sítios iguais aos do site.
