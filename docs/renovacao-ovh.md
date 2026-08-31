# Recuperação do domínio e alojamento — JBMR (OVH)

**LER PRIMEIRO:** [`diagnostico-dns.md`](diagnostico-dns.md) — o domínio `jbmr.com` não
aponta para a OVH. A secção 1 abaixo está resolvida em parte por esse diagnóstico.

Checklist por ordem de urgência.
tempo**: quanto mais tempo passar, maior a probabilidade de perda irreversível.

---

## 1. Domínio — URGENTE (risco de perda definitiva)

Um domínio expirado passa por fases: período de graça (renovação normal) →
período de restauro/redemption (renovação possível, com custo extra) →
libertação (fica disponível para qualquer pessoa registar).

**A fazer, por esta ordem:**

- [ ] Confirmar em que fase está o domínio. Fontes:
      - Painel OVH → *Domínios* (mostra estado e data-limite de restauro)
      - `whois <dominio>` ou, para `.pt`, a pesquisa em https://www.dns.pt
- [ ] Se ainda estiver em graça/restauro: **renovar já**. É a ação mais barata
      e mais rápida de todas.
- [ ] Se já não aparecer na conta OVH: verificar se ainda está livre.
      - Livre → registar imediatamente (não esperar pela decisão do alojamento).
      - Registado por terceiros → avaliar alternativas de nome (ver abaixo).
- [ ] Confirmar quem é o **titular registado** (owner/contacto administrativo).
      Se estiver em nome pessoal e devia estar em nome da JBMR, aproveitar para
      corrigir — a mudança de titular é mais simples de fazer agora do que mais tarde.

**Se o domínio se perdeu:** alternativas antes de assumir o pior — variação do
nome, `.pt` vs `.com`, ou nome com localidade/serviço. Decisão do cliente, mas
convém apresentar 2–3 opções já verificadas como livres.

---

## 2. Dados do alojamento — URGENTE (risco de apagamento)

Os alojamentos OVH não expirados guardam os dados durante um período limitado
após o fim do contrato; depois são apagados de forma definitiva.

- [ ] Verificar no painel OVH se o alojamento ainda existe e se os dados estão lá.
- [ ] **Fazer backup completo antes de qualquer outra decisão:**
      - Ficheiros: FTP/SFTP (ou o gestor de ficheiros do painel OVH)
      - Base de dados: exportar via phpMyAdmin ou `mysqldump`
      - Contas de email associadas ao domínio (se existirem)
- [ ] Guardar o backup em local seguro **fora da OVH**.
- [ ] Importar o código-fonte para este repositório (sem credenciais nem
      ficheiros de configuração com passwords — esses ficam em `.env` ignorado).

Se os dados já tiverem sido apagados, o site tem de ser reconstruído — daí a
importância de ter o código versionado desta vez.

---

## 3. Alojamento — decidir onde fica o site

Não é obrigatório renovar o alojamento OVH. Depende do que o site é:

| Tipo de site | Recomendação |
|---|---|
| HTML/CSS/JS estático | **Não renovar alojamento.** Alojar em Cloudflare Pages / Netlify / Vercel (plano gratuito, HTTPS incluído, deploy automático a partir deste repositório). Só se paga o domínio. |
| WordPress ou outro CMS com PHP+MySQL | Renovar alojamento OVH (ou equivalente). Precisa de servidor com PHP e base de dados. |
| Site com formulário de contacto | Estático continua a servir — usar um serviço de formulários (Formspree, Web3Forms) ou uma função serverless. |

**Nota sobre email:** se a JBMR usa email `@dominio`, isso é um serviço
separado do alojamento web. Confirmar se existe e garantir que não se perde —
mudar o site de alojamento **não** implica mudar o email, desde que os
registos MX no DNS se mantenham.

---

## 4. Depois de recuperado

- [ ] Apontar o DNS do domínio para o alojamento escolhido
- [ ] Confirmar certificado HTTPS ativo
- [ ] Configurar renovação **automática** do domínio na OVH (evita repetir isto)
- [ ] Ativar deploy automático a partir deste repositório
- [ ] Verificar Google Business Profile da oficina (morada, horário, telefone,
      link para o site) — para uma oficina local, tem tanto ou mais impacto
      que o próprio site
- [ ] Rever conteúdos: horários, contactos, serviços — podem estar
      desatualizados desde a última versão

---

## Informação em falta

Preencher à medida que se confirma:

- Domínio: `________________`
- Estado do domínio: `________________`
- Alojamento OVH ainda ativo/com dados: `________________`
- Tecnologia do site: `________________`
- Email no domínio: `________________`
