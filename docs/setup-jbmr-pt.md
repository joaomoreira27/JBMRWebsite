# Setup: jbmr.pt

O `jbmr.com` está perdido (ver [`diagnostico-dns.md`](diagnostico-dns.md)).
O caminho é registar **jbmr.pt**, verificado como livre a 2026-08-31.

**O site antigo é estático (HTML/CSS/JS), sem base de dados.** Isso elimina
a necessidade de alojamento pago: não é preciso PHP nem MySQL.

---

## 1. Comprar apenas o domínio

Painel OVH → *Encomendar* → *Nomes de domínio* → `jbmr.pt`

O alojamento gratuito da OVH (1 site, 100 MB SSD, 1 email) vem **incluído
com a compra de qualquer domínio**. Não é preciso encomendar plano nenhum.

Custo:

| | Valor |
|---|---|
| 1.º ano | 16,99 € s/IVA (20,90 € c/IVA) |
| Renovação | 13,39 € s/IVA por ano |

Os planos Starter (2,59 €/mês na renovação) e Perso (5,99 €/mês) oferecem o
domínio grátis no primeiro ano, mas custam 31 € a 72 € por ano a partir do
segundo. Para um site estático não trazem nada de útil.

### Não comprar

- Starter, Perso ou qualquer plano da Gama Business/Agencies
- Outras extensões: `jbmr.shop` renova a 30,89 €/ano, `jbmr.tech` a 56,29 €

---

## 2. Contacto de titular

- [ ] Titular = **a JBMR**, com o NIF da empresa. Não o programador.
- [ ] Email do titular = email da oficina lido diariamente, e **nunca**
      um `@jbmr.pt`
- [ ] Morada e telefone da empresa

Mudar o titular depois é um procedimento formal, não a edição de um campo.
Foi por os avisos irem para quem não renovava que o `.com` se perdeu.

---

## 3. Depois de pagar

- [ ] Renovação automática ligada, com meio de pagamento válido na conta
- [ ] Proteção contra transferência (*transfer lock*)
- [ ] Alertas de expiração ativos
- [ ] Validar o email de confirmação do titular, se for enviado
- [ ] Confirmar que não ficam dois produtos de email a pagar (o Zimbra que
      vem com o domínio e o que vem com o alojamento gratuito)

---

## 4. Onde fica o site (decidir depois do upload)

Ambas as opções custam zero.

| | A favor | Contra |
|---|---|---|
| **Alojamento gratuito OVH** | Já incluído. DNS automático, SSL grátis, email na mesma conta. Uma só conta para entregar ao cliente. | Limite de 100 MB. Exige imagens otimizadas. Deploy por FTP. |
| **Cloudflare Pages** | Deploy a cada `git push`, CDN, sem limite de espaço relevante. | Para o domínio de raiz apontar para lá, o mais limpo é mover os nameservers para a Cloudflare e recriar os registos MX do email. |

Inclinação atual: **alojamento OVH**, com otimização de imagens e deploy
automático por FTP a partir do GitHub. Decisão a fechar depois de medir o
peso real dos ficheiros.

---

## 5. Migração

- [ ] Upload do código do site antigo para o repositório
- [ ] Medir peso total dos ficheiros e das imagens
- [ ] Otimizar imagens (WebP) se o destino for o alojamento de 100 MB
- [ ] Testar no URL temporário antes de apontar o DNS
- [ ] Apontar o DNS e ativar SSL
- [ ] Rever conteúdos desatualizados: horários, contactos, serviços
- [ ] Google Business Profile da oficina, com link para jbmr.pt

---

## Estado

| Item | Estado |
|---|---|
| jbmr.com | Perdido, registado por terceiros |
| jbmr.pt | Livre a 2026-08-31, por registar |
| Stack do site antigo | Estático, HTML/CSS/JS |
| Base de dados | Não existe, não é necessária |
| Alojamento | Gratuito, incluído com o domínio |
| Email no domínio | Incluído |
