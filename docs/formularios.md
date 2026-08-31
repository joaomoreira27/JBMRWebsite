# Formulários do site

## O que havia antes

| Formulário | Estado |
|---|---|
| `orcamento.html` | Abria o cliente de email do visitante via `mailto:`. Num telemóvel sem app de mail configurada, não acontecia nada e o pedido perdia-se sem aviso. |
| `contactos.html` | **Não tinha handler nenhum**, nem `action`, nem `method`. Carregar em "Enviar Mensagem" recarregava a página e a mensagem desaparecia. Nunca funcionou. |

## O que passa a haver

Ambos submetem por HTTP para o **Web3Forms**, que reencaminha o conteúdo
para o email da oficina. O visitante fica na página e vê confirmação.

- Sucesso: mensagem verde e formulário limpo
- Falha: mensagem vermelha com o telefone e o email da oficina
- Spam: campo-armadilha `botcheck`, invisível para pessoas
- Sem JavaScript: o `action` e o `method` ficam definidos, por isso o
  browser submete de forma nativa e o visitante cai em `obrigado.html`

## Configuração (uma vez, um minuto)

1. Ir a https://web3forms.com
2. Escrever `joaobritoprd@gmail.com` e submeter
3. A *access key* chega por email
4. Colar em `script.js`, na constante `WEB3FORMS_KEY`, no topo do ficheiro

É o **único** sítio a alterar. Enquanto a chave não for colada, os
formulários mostram uma mensagem a pedir para ligar, em vez de falharem
em silêncio.

A chave ser pública no código é normal e assumido pelo serviço: não dá
acesso a nada, apenas identifica o destinatário.

O plano gratuito cobre 250 submissões por mês, muito acima do que uma
oficina recebe.

## Alternativa, se um dia se quiser sair do Web3Forms

O alojamento da OVH tem PHP. Um script próprio a enviar por SMTP
autenticado da caixa `@jbmr.pt` eliminava a dependência de terceiros,
mas exige gerir credenciais e a entregabilidade passa a ser problema
nosso. Só compensa se o volume crescer muito.

## Testes

Cobertos por Playwright, com o CDN externo bloqueado, ou seja no pior
cenário de rede:

- envio do orçamento, com as checkboxes reunidas numa lista
- envio da mensagem de contacto
- comportamento quando a rede falha
- menu mobile e ano do rodapé, como teste de regressão
