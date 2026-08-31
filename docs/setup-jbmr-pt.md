# Setup: jbmr.pt

O `jbmr.com` está perdido (ver [`diagnostico-dns.md`](diagnostico-dns.md)).
O caminho é registar **jbmr.pt**, verificado como livre a 2026-08-31.

---

## 1. Registar o domínio (fazer primeiro, hoje)

Painel OVH → *Encomendar* → *Nomes de domínio* → `jbmr.pt`

Três coisas a acertar no checkout, porque são difíceis de corrigir depois:

- [ ] **Titular = a empresa, não o programador.**
      Nome e NIF da JBMR nos dados do titular. Foi assim que o `.com` se
      perdeu: quem tinha de renovar não era quem recebia os avisos.
- [ ] **Email de contacto do titular = um email que a JBMR lê todos os dias.**
      Não pode ser um email do domínio que se está a registar (se o domínio
      expirar, os avisos de expiração deixam de chegar).
- [ ] **Renovação automática LIGADA**, com cartão válido associado à conta.

Registo mínimo recomendado: 2 anos. A diferença de preço é irrelevante e
reduz para metade as oportunidades de isto voltar a acontecer.

> Nota: o `.pt` é gerido pelo registo nacional (DNS.PT). Confirma no processo
> de encomenda que dados exigem para o titular. Não vale a pena registar
> variações defensivas (`jbmr.com.pt`, etc.) para uma oficina local.

Depois de registado, ativar nas definições do domínio:
- [ ] Alertas de expiração por email
- [ ] Proteção contra transferência (*transfer lock*)

---

## 2. DNS (só depois de sabermos onde fica o site)

Deixar os nameservers da OVH por omissão. A zona configura-se quando a
decisão de alojamento estiver tomada. Nesta fase não é preciso mexer.

Quando chegar a altura, os registos a criar são:
- `A` / `CNAME` para o alojamento do site
- `MX` + `SPF` para o email, se houver
- `TXT` de verificação, se o alojamento pedir

---

## 3. Email @jbmr.pt

Decisão à parte do site. A oficina usa email no domínio?

| Opção | Quando faz sentido |
|---|---|
| Nenhum | A oficina só usa telefone e um Gmail pessoal. Não se cria nada. |
| OVH (incluído / plano base) | Uma ou duas caixas, uso simples. Mais barato. |
| Google Workspace / Microsoft 365 | Já usam Gmail ou Outlook e querem manter os hábitos. Custo por caixa. |

Se ficar sem email, não se criam registos MX. Não deixar MX a apontar para
lado nenhum, como aconteceu no `.com`.

---

## 4. Alojamento (decidir depois do upload do código)

Depende do que o site antigo for:

| Site antigo | Destino |
|---|---|
| HTML/CSS/JS estático | Cloudflare Pages ou Netlify, plano gratuito, deploy automático a partir deste repositório. Só se paga o domínio. |
| WordPress ou PHP + MySQL | Alojamento OVH (ou equivalente) com PHP e base de dados. |

Não renovar alojamento antes de sabermos isto.

---

## 5. Para começar a trabalhar a partir do repositório

Depois do upload do código:

- [ ] Código na branch de trabalho, sem `wp-config.php`, `.env`, dumps de
      base de dados nem passwords (o `.gitignore` já bloqueia estes)
- [ ] Identificar a stack e registar em `README.md`
- [ ] Definir o destino de alojamento
- [ ] Ligar o deploy automático
- [ ] Apontar o DNS
- [ ] Rever conteúdos desatualizados: horários, contactos, serviços
- [ ] Google Business Profile da oficina, com link para jbmr.pt

---

## Estado

| Item | Estado |
|---|---|
| jbmr.com | Perdido, registado por terceiros |
| jbmr.pt | Livre a 2026-08-31, por registar |
| Código do site antigo | Por carregar |
| Alojamento | Por decidir |
| Email no domínio | Por decidir |
