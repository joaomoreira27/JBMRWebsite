#!/usr/bin/env node
// Gera as páginas HTML públicas a partir de:
//   site.config.json  (dados da oficina: contactos, morada, horário, páginas)
//   src/layout.html   (estrutura comum)
//   src/partials/     (cabeçalho, menu, rodapé, barra, ícones)
//   src/paginas/      (conteúdo de cada página)
// Uso: npm run build   (ou: node scripts/build.js)
// Não editar os .html da raiz à mão: são gerados e sobrescritos.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const RAIZ = path.join(__dirname, '..');
const ler = p => fs.readFileSync(path.join(RAIZ, p), 'utf8');
const config = JSON.parse(ler('site.config.json'));

// Escapa texto para atributos e conteúdo (valores de configuração são sempre texto).
const escapar = s => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

function lerPartial(nome) {
    for (const extensao of ['.html', '.svg']) {
        const caminho = path.join('src', 'partials', nome + extensao);
        if (fs.existsSync(path.join(RAIZ, caminho))) return ler(caminho);
    }
    throw new Error(`Parcial não encontrado: ${nome}`);
}

function renderizar(modelo, valores) {
    const comParciais = modelo.replace(/\{\{>\s*(\w+)\s*\}\}/g, (_, nome) => renderizar(lerPartial(nome), valores));
    return comParciais.replace(/\{\{(\w+)\}\}/g, (_, chave) => {
        if (!(chave in valores)) throw new Error(`Campo sem valor: {{${chave}}}`);
        return valores[chave];
    });
}

// ----- Horário a partir da configuração -----
const DIAS = { 1: 'Segunda', 2: 'Terça', 3: 'Quarta', 4: 'Quinta', 5: 'Sexta', 6: 'Sábado', 0: 'Domingo' };
const ORDEM = [1, 2, 3, 4, 5, 6, 0];
const horaCurta = h => h.replace(':', 'h');

function formatarIntervalos(intervalos) {
    if (!intervalos.length) return 'Fechado';
    return intervalos.map(([abre, fecha]) => `${horaCurta(abre)} - ${horaCurta(fecha)}`).join(' / ');
}

function linhasDeHorario() {
    const grupos = [];
    for (const dia of ORDEM) {
        const chave = JSON.stringify(config.horario[dia]);
        const ultimo = grupos[grupos.length - 1];
        if (ultimo && ultimo.chave === chave) ultimo.dias.push(dia);
        else grupos.push({ chave, dias: [dia] });
    }
    return grupos.map(g => {
        const nome = g.dias.length > 1 ? `${DIAS[g.dias[0]]} a ${DIAS[g.dias[g.dias.length - 1]]}` : DIAS[g.dias[0]];
        return `${nome}: ${formatarIntervalos(config.horario[g.dias[0]])}`;
    });
}

// ----- Valores globais (iguais em todas as páginas) -----
const m = config.morada;
const moradaLinha = `${m.rua}, ${m.codigoPostal} ${m.localidade}, ${m.distrito}`;
const moradaContacto = [m.rua, `${m.codigoPostal} ${m.localidade}`, `${m.distrito}, ${m.pais}`].join('<br>');
const anosExperiencia = new Date().getFullYear() - config.anoFundacao;

const globais = {
    nome: escapar(config.nome),
    nome_curto: escapar(config.nomeCurto),
    nomeCompleto: escapar(config.nomeCompleto),
    telefone: escapar(config.telefone).replace(/ /g, '&nbsp;'),
    telefone_simples: escapar(config.telefone),
    telefoneTel: escapar(config.telefoneTel),
    email: escapar(config.email),
    nipc: escapar(config.nipc),
    morada_linha: escapar(moradaLinha),
    morada_html: moradaContacto,
    horario_html: '<p>' + linhasDeHorario().map(l => escapar(l)).join('<br>\n                                    ') + '</p>',
    anoFundacao: String(config.anoFundacao),
    anosExperiencia: String(anosExperiencia),
    imagem_og: escapar(config.url + config.imagemOg),
    versao_css: crypto.createHash('sha1').update(ler('styles.css')).digest('hex').slice(0, 8),
    versao_js: crypto.createHash('sha1').update(ler('script.js')).digest('hex').slice(0, 8),
    horario_json: JSON.stringify(config.horario),
};

// ----- Navegação -----
const NAVEGACAO = [
    { chave: 'inicio', href: 'index.html', texto: 'Início' },
    { chave: 'servicos', href: 'servicos.html', texto: 'Serviços' },
    { chave: 'sobre', href: 'sobre.html', texto: 'Sobre Nós' },
    { chave: 'contactos', href: 'contactos.html', texto: 'Contactos' },
];
const navDesktop = ativo => NAVEGACAO.map(n =>
    `<li><a href="${n.href}"${n.chave === ativo ? ' class="active"' : ''}>${n.texto}</a></li>`).join('\n                    ');
const navMobile = () => NAVEGACAO.map(n => `<li><a href="${n.href}">${n.texto}</a></li>`).join('\n            ');

// ----- Dados estruturados (Schema.org) -----
function dadosEstruturados(pagina, url) {
    const negocio = {
        '@context': 'https://schema.org',
        '@type': ['AutoBodyShop', 'AutoRepair'],
        '@id': `${config.url}/#negocio`,
        name: config.nomeCompleto,
        legalName: config.nomeCompleto,
        url: `${config.url}/`,
        logo: `${config.url}/public/images/jbmrlogo.webp`,
        image: `${config.url}${config.imagemOg}`,
        telephone: config.telefoneInternacional,
        openingHoursSpecification: Object.keys(config.horario)
            .filter(d => config.horario[d].length)
            .flatMap(d => config.horario[d].map(([abre, fecha]) => ({
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: DIA_INGLES[d],
                opens: abre,
                closes: fecha,
            }))),
        address: {
            '@type': 'PostalAddress',
            streetAddress: m.rua.replace('Nº ', ''),
            postalCode: m.codigoPostal,
            addressLocality: m.localidade,
            addressRegion: m.distrito,
            addressCountry: 'PT',
        },
        areaServed: [{ '@type': 'City', name: 'Paredes' }, { '@type': 'AdministrativeArea', name: 'Porto' }],
        knowsAbout: ['Chaparia', 'Pintura automóvel', 'Polimentos', 'Reparação de automóveis'],
    };
    const blocos = [negocio];
    if (pagina.migalhas) {
        blocos.push({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Início', item: `${config.url}/` },
                { '@type': 'ListItem', position: 2, name: pagina.migalhas, item: url },
            ],
        });
    }
    return blocos.map(b => `    <script type="application/ld+json">\n    ${JSON.stringify(b)}\n    </script>`).join('\n');
}
const DIA_INGLES = { 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday', 0: 'Sunday' };

// ----- Construção -----
const escreveu = [];
for (const pagina of config.paginas) {
    const urlPagina = pagina.ficheiro === 'index.html' ? `${config.url}/` : `${config.url}/${pagina.ficheiro}`;
    const conteudo = renderizar(ler(path.join('src', 'paginas', pagina.slug + '.html')), globais);
    const valores = {
        ...globais,
        titulo: escapar(pagina.titulo),
        descricao: escapar(renderizar(pagina.descricao, globais)),
        robots: pagina.indexar ? '' : '<meta name="robots" content="noindex">',
        canonico: pagina.canonico ? `<link rel="canonical" href="${urlPagina}">` : '',
        url_pagina: urlPagina,
        nav_desktop: navDesktop(pagina.ativo),
        nav_mobile: navMobile(),
        precarregar: pagina.slug === 'index' ? '    <link rel="preload" as="image" href="public/images/hero.webp" fetchpriority="high">' : '',
        dados_estruturados: pagina.indexar ? dadosEstruturados(pagina, urlPagina) : '',
        conteudo,
    };
    const html = renderizar(ler('src/layout.html'), valores);
    fs.writeFileSync(path.join(RAIZ, pagina.ficheiro), html.split('\n').map(l => l.replace(/[ \t]+$/, '')).join('\n'));
    escreveu.push(pagina.ficheiro);
}

// Sitemap: só as páginas indexáveis
const entradas = config.paginas.filter(p => p.indexar).map(p => {
    const loc = p.ficheiro === 'index.html' ? `${config.url}/` : `${config.url}/${p.ficheiro}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${config.dataAtualizacao}</lastmod>\n    <priority>${p.prioridade}</priority>\n  </url>`;
});
fs.writeFileSync(path.join(RAIZ, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entradas.join('\n')}\n</urlset>\n`);

// security.txt (RFC 9116): como reportar uma vulnerabilidade
fs.mkdirSync(path.join(RAIZ, '.well-known'), { recursive: true });
const expira = config.securityExpira;
fs.writeFileSync(path.join(RAIZ, '.well-known', 'security.txt'),
    [
        'Contact: mailto:' + config.email,
        'Expires: ' + expira,
        'Preferred-Languages: pt, en',
        'Canonical: ' + config.url + '/.well-known/security.txt',
        ''
    ].join('\n'));

console.log(`Gerado: ${escreveu.join(', ')} e sitemap.xml`);
