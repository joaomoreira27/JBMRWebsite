# Setup: jbmr.pt

O `jbmr.com` está perdido (ver [`diagnostico-dns.md`](diagnostico-dns.md)).
O caminho é registar **jbmr.pt**, verificado como livre a 2026-08-31.

O site antigo precisa de alojamento, por isso a encomenda faz-se em conjunto:
a OVH oferece o domínio no primeiro ano a quem subscreve um plano de
alojamento web.

---

## 0. Ordem da encomenda (importante)

**Começar pelo ALOJAMENTO, não pelo domínio.**

O domínio gratuito faz parte do fluxo de encomenda do alojamento. Comprar o
domínio primeiro, em separado, perde a oferta: fica pago e a oferta já não
tem onde ser aplicada.

Caminho: Painel → *Encomendar* → **Alojamentos** (não *Nomes de domínio*) →
escolher o plano → o formulário pergunta o domínio a associar → indicar
`jbmr.pt` como domínio novo.

### Confirmar antes de pagar

- [ ] No carrinho, `jbmr.pt` aparece a **0,00 € no primeiro ano**.
      Se aparecer a 16,99 €, a extensão `.pt` não está abrangida pela oferta.
      Nesse caso a poupança não existe e a decisão do plano deve ser tomada
      só pelo mérito do alojamento.
- [ ] Qual o **preço de renovação** do domínio e do alojamento no 2.º ano.
      O primeiro ano é promocional, o segundo é o preço real.
- [ ] Período de compromisso do alojamento (mensal costuma ser mais caro
      por mês do que 12 meses).

---

## 1. Escolher o plano de alojamento

Depende do que o site antigo for. Requisitos a validar na ficha do plano:

| Se o site for | Precisa de |
|---|---|
| WordPress ou PHP + MySQL | PHP 8.x e **pelo menos 1 base de dados MySQL**. Os planos de entrada mais baratos por vezes não incluem base de dados nenhuma. |
| HTML/CSS/JS estático | Qualquer plano serve. Ou nem sequer alojamento pago: Cloudflare Pages faz isto de graça. |

- [ ] Confirmar que o plano inclui base de dados, se for preciso
- [ ] Confirmar espaço em disco suficiente para os ficheiros do site
- [ ] Confirmar SSL gratuito (Let's Encrypt) incluído

---

## 2. Contacto de titular

- [ ] Titular = **a JBMR**, com o NIF da empresa. Não o programador.
- [ ] Email do titular = email da oficina lido diariamente, e **nunca**
      um `@jbmr.pt`
- [ ] Morada e telefone da empresa

Mudar o titular depois é um procedimento formal, não a edição de um campo.

---

## 3. Depois de pagar

- [ ] **Renovação automática ligada nos DOIS serviços**, domínio e
      alojamento, separadamente. São renovações independentes.
- [ ] Proteção contra transferência (*transfer lock*) no domínio
- [ ] Validar o email de confirmação do contacto de titular, se for enviado
- [ ] Verificar se ficaram dois produtos de email ativos (o Zimbra que vem
      com o domínio e o email que vem com o alojamento). Não pagar dois.

---

## 4. Migração do site

O alojamento novo vem **vazio**. Comprar alojamento não recupera nada do
alojamento antigo, que já expirou.

- [ ] Ficheiros do site antigo (upload para o repositório)
- [ ] **Dump da base de dados**, se o site for WordPress ou tiver CMS.
      Sem a base de dados existe o tema e o código, mas não existem os
      conteúdos: páginas, textos, imagens, definições. Ficheiros sozinhos
      não são um site WordPress.
- [ ] Verificar compatibilidade do código antigo com PHP 8.x
- [ ] Testar no URL temporário da OVH antes de apontar o DNS
- [ ] Só depois: apontar o DNS e ativar SSL

---

## 5. DNS

Deixar os nameservers da OVH. A zona configura-se quando o alojamento
estiver ativo, e o painel costuma criar os registos automaticamente ao
associar o domínio ao alojamento.

---

## Estado

| Item | Estado |
|---|---|
| jbmr.com | Perdido, registado por terceiros |
| jbmr.pt | Livre a 2026-08-31, por registar com o alojamento |
| Alojamento | Necessário, plano por escolher |
| Código do site antigo | Por carregar |
| Base de dados do site antigo | **Por confirmar se existe** |
| Email no domínio | Incluído na encomenda |
