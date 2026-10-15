#!/usr/bin/env node
// Verificações do site que não precisam de browser. Uso: npm test
// 1. Ligações e imagens internas apontam para ficheiros que existem
// 2. O sitemap tem as páginas indexáveis e nenhuma página de erro
// 3. Só existem campos "A PREENCHER" conhecidos
// 4. Os HTML da raiz estão de acordo com o build (regenera e compara)
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const RAIZ = path.join(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(RAIZ, 'site.config.json'), 'utf8'));
const paginasHtml = fs.readdirSync(RAIZ).filter(f => f.endsWith('.html'));
const erros = [];

// 1. Referências internas
for (const ficheiro of paginasHtml) {
    const html = fs.readFileSync(path.join(RAIZ, ficheiro), 'utf8');
    const refs = [...html.matchAll(/(?:href|src)="([^"#?]+)"/g)].map(m => m[1]);
    for (const ref of refs) {
        if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
        const alvo = ref.startsWith('/') ? ref.slice(1) : ref;
        if (!fs.existsSync(path.join(RAIZ, alvo))) erros.push(`${ficheiro}: referência inexistente "${ref}"`);
    }
    for (const [, ancora] of html.matchAll(/href="#([^"]+)"/g)) {
        if (!html.includes(`id="${ancora}"`)) erros.push(`${ficheiro}: âncora "#${ancora}" sem destino`);
    }
}

// 2. Sitemap
const sitemap = fs.readFileSync(path.join(RAIZ, 'sitemap.xml'), 'utf8');
const indexaveis = config.paginas.filter(p => p.indexar);
for (const p of indexaveis) {
    const url = p.ficheiro === 'index.html' ? `${config.url}/` : `${config.url}/${p.ficheiro}`;
    if (!sitemap.includes(`<loc>${url}</loc>`)) erros.push(`sitemap.xml: falta ${url}`);
}
for (const p of config.paginas.filter(p => !p.indexar)) {
    if (sitemap.includes(p.ficheiro)) erros.push(`sitemap.xml: página não indexável incluída (${p.ficheiro})`);
}

// 3. Campos por preencher: só o NIPC na política de privacidade
for (const ficheiro of paginasHtml) {
    const html = fs.readFileSync(path.join(RAIZ, ficheiro), 'utf8');
    if (html.includes('A PREENCHER') && ficheiro !== 'politica-privacidade.html') {
        erros.push(`${ficheiro}: campo "A PREENCHER" inesperado`);
    }
}
if (config.nipc === '[A PREENCHER]') {
    console.log('Aviso: NIPC ainda por preencher em site.config.json (o deploy não publica até estar preenchido).');
}

// 4. Regenerar e comparar com o que estava no disco
const geradosAntes = new Map();
for (const f of [...paginasHtml, 'sitemap.xml']) {
    geradosAntes.set(f, fs.readFileSync(path.join(RAIZ, f), 'utf8'));
}
try {
    execSync('node scripts/build.js', { cwd: RAIZ, stdio: 'ignore' });
    const desatualizados = [...geradosAntes.keys()]
        .filter(f => fs.readFileSync(path.join(RAIZ, f), 'utf8') !== geradosAntes.get(f));
    if (desatualizados.length) {
        erros.push('páginas geradas estavam desatualizadas (já foram regeneradas; falta fazer commit): ' + desatualizados.join(', '));
    }
} catch (e) {
    erros.push('o build falhou: ' + e.message.split('\n')[0]);
}

if (erros.length) {
    console.error('Falhas:\n- ' + erros.join('\n- '));
    process.exit(1);
}
console.log(`OK: ${paginasHtml.length} páginas, ${indexaveis.length} no sitemap, ligações internas válidas, build atualizado.`);
