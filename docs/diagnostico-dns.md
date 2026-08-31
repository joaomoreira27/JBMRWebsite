# Diagnóstico DNS — jbmr.com

Data: 2026-08-31

## Conclusão

**A zona DNS visível no painel OVH não está a ser usada.** O domínio `jbmr.com`
está delegado a servidores de nomes que não são da OVH. Qualquer alteração
feita nessa zona OVH não tem efeito nenhum na Internet.

## Evidência

Consulta direta a um servidor de raiz do registo `.com`
(`a.gtld-servers.net`, 192.5.6.30) — esta é a fonte autoritativa da delegação,
não uma cache:

```
jbmr.com.  NS  ns97.worldnic.com
jbmr.com.  NS  ns98.worldnic.com
```

`worldnic.com` = servidores da **Network Solutions / Web.com**.

Resolução pública efetiva:

| Registo | Zona OVH (painel) | Realidade pública |
|---|---|---|
| NS | `dns20.ovh.net`, `ns20.ovh.net` | `ns97.worldnic.com`, `ns98.worldnic.com` |
| A | `213.186.33.5` (OVH) | `208.91.197.128` (gama de parking Web.com) |
| MX | `mx1/mx2/mx3.mail.ovh.net` | **nenhum** (NODATA) |

Sem registos MX publicados, **o email `@jbmr.com` não funciona** — mensagens
enviadas para o domínio não chegam a lado nenhum.

## Interpretação — dois cenários

**A) O domínio expirou, caiu e foi re-registado por terceiros.**
O IP `208.91.197.128` pertence a uma gama tipicamente usada para *parking* de
domínios pela Web.com. É o padrão clássico de um domínio apanhado após expirar.
Neste caso o domínio está perdido e não é recuperável por renovação.

**B) O domínio continua registado (na OVH ou noutro registrar), mas com
servidores de nomes externos apontados para a Network Solutions.**
A OVH permite registar um domínio e usar NS externos — nesse caso a aba
"Zona DNS" continua a mostrar uma zona que não é usada. Aqui o domínio ainda é
recuperável: bastaria repor os NS da OVH.

**Não foi possível distinguir os dois cenários a partir deste ambiente** — as
consultas WHOIS/RDAP e o acesso a `jbmr.com` estão bloqueados pela política de
rede da sessão.

## Como distinguir (30 segundos, no browser)

1. Painel OVH → *Nomes de domínio* → **Os meus nomes de domínio**
   - Se `jbmr.com` aparecer com **data de expiração e botão de renovar** →
     cenário B, o domínio é vosso.
   - Se aparecer só como zona DNS, sem data nem renovação → cenário A.
2. Painel OVH → `jbmr.com` → aba **Servidores DNS** (não "Zona DNS")
   - Mostra se os NS configurados são os da OVH ou os `worldnic`.
3. WHOIS público (ex.: whois.com, who.is) → ver **registrar** e **data de
   expiração**. Se o registrar for "Network Solutions" e a data de registo for
   recente, é cenário A.

## Alternativa já verificada

`jbmr.pt` **não existe** (NXDOMAIN no registo `.pt`) — está livre.
É a alternativa mais óbvia se o `.com` estiver perdido, e para uma oficina
com clientela local em Portugal é indiscutivelmente melhor domínio que o `.com`.

## Recuperar o site antigo

Se o código não aparecer e o alojamento OVH já tiver sido limpo, verificar a
Wayback Machine em `web.archive.org/web/*/jbmr.com` — dá para recuperar HTML,
CSS, imagens e textos de versões antigas. (Não verificável a partir desta
sessão; a rede está bloqueada para esse domínio.)
