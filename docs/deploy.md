# Publicar o site

## Ordem das operações

O domínio é o primeiro dominó. Nada avança sem ele.

```
jbmr.pt publicado no registo .pt
        |
        v
OVH provisiona o alojamento gratuito  ->  aparece em "Alojamentos"
        |
        v
Associar jbmr.pt ao alojamento (Multisite) + ativar SSL
        |
        v
Credenciais FTP  ->  segredos no GitHub  ->  push para main publica
```

## 1. Destravar o domínio

Verificar em `Nomes de domínio > Operações em curso`.

Se o registo estiver parado há mais de 48 horas, abrir pedido no apoio ao
cliente da OVH. Registos `.pt` que ficam presos em verificação costumam
precisar de intervenção manual, e ninguém avisa por iniciativa própria.

Para confirmar de fora, sem depender do painel:

```bash
dig +short NS jbmr.pt @a.dns.pt
```

Sem resposta significa que o registo ainda não publicou o domínio.

## 2. Associar o domínio ao alojamento

Painel OVH > `Alojamentos` > o alojamento > separador **Multisite**
> *Adicionar um domínio*:

- Domínio: `jbmr.pt`
- Pasta raiz: a pasta servida (tipicamente `www`)
- Ativar o certificado SSL gratuito

Repetir para `www.jbmr.pt`, ou marcar a opção que trata das duas.

O `.htaccess` do site já força HTTPS através de `%{ENV:HTTPS}`, que é a
convenção do alojamento partilhado da OVH. Não é preciso configurar
redireccionamento no painel.

## 3. Primeira publicação, à mão

Antes de automatizar, convém ver o site de pé. Com um cliente FTP
(FileZilla, WinSCP) e as credenciais do separador **FTP-SSH**:

- Enviar **o conteúdo** do repositório para a pasta servida, não a pasta
  do repositório em si. O `index.html` tem de ficar na raiz.
- Não enviar `docs/`, `README.md`, `.github/` nem `.git/`.

Testar antes de divulgar:
- `https://jbmr.pt` e `https://www.jbmr.pt` abrem
- O cadeado do HTTPS aparece
- O formulário de orçamento envia e o email chega
- Um endereço inventado, `jbmr.pt/xyz`, mostra a página 404

## 4. Automatizar

`.github/workflows/deploy.yml` publica a cada push para `main`.

Definir em **GitHub > Settings > Secrets and variables > Actions**:

| Segredo | Onde encontrar |
|---|---|
| `FTP_SERVER` | Painel OVH, separador FTP-SSH. Algo como `ftp.cluster0XX.hosting.ovh.net` |
| `FTP_USERNAME` | Utilizador FTP do alojamento |
| `FTP_PASSWORD` | Password definida no painel |

O workflow recusa-se a publicar enquanto a `WEB3FORMS_KEY` em `script.js`
for o valor por omissão, para o site não ir para o ar com os formulários
mortos.

Se a pasta servida não for `www`, corrigir `server-dir` no workflow.

## 5. Depois de online

- [ ] Submeter `https://jbmr.pt/sitemap.xml` no Google Search Console
- [ ] Google Business Profile da oficina com o link para jbmr.pt
- [ ] Confirmar que a renovação automática do domínio está ligada
- [ ] Apagar a zona DNS morta do `jbmr.com`, que já não é vossa
