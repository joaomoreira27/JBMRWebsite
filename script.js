// ---------------------------------------------------------------
// CONFIGURAÇÃO
//
// Chave de acesso do Web3Forms. Para a obter:
//   1. Ir a https://web3forms.com
//   2. Escrever o email onde os pedidos devem chegar
//      (joaobritoprd@gmail.com) e submeter
//   3. A chave chega por email. Colar aqui em baixo.
//
// É o único sítio a alterar. A chave é pública por desenho do
// serviço: não dá acesso a nada, só identifica o destinatário.
// ---------------------------------------------------------------
const WEB3FORMS_KEY = 'COLAR-AQUI-A-ACCESS-KEY';

const EMAIL_OFICINA = 'joaobritoprd@gmail.com';
const ENDPOINT = 'https://api.web3forms.com/submit';

document.addEventListener('DOMContentLoaded', function () {
    // ----- Menu mobile -----
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            const aberto = mobileMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', String(aberto));
            menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
        });

        document.addEventListener('click', function (event) {
            if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                mobileMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menu');
            }
        });
    }

    // ----- Ano no rodapé -----
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ----- Anos de experiência (contam a partir do ano indicado no HTML) -----
    document.querySelectorAll('[data-anos-desde]').forEach(function (el) {
        el.textContent = new Date().getFullYear() - Number(el.dataset.anosDesde);
    });

    // ----- Estado da oficina (aberto / fechado) -----
    atualizarEstadoOficina();

    // ----- Barra de contacto: escondida enquanto se escreve num campo -----
    document.addEventListener('focusin', function (event) {
        if (event.target.matches('input, textarea, select')) document.body.classList.add('teclado-aberto');
    });
    document.addEventListener('focusout', function () {
        document.body.classList.remove('teclado-aberto');
    });

    // ----- Formulários -----
    ligarFormulario(document.querySelector('.orcamento-form'), 'Pedido de Orçamento');
    ligarFormulario(document.querySelector('.contact-form'), 'Mensagem do site');
});

function ligarFormulario(form, assuntoBase) {
    if (!form) return;

    // Preenchido a partir da constante acima, para haver um só sítio a editar.
    // Serve também de alternativa nativa se o envio por fetch falhar.
    form.action = ENDPOINT;
    form.method = 'POST';
    definirCampoOculto(form, 'access_key', WEB3FORMS_KEY);
    definirCampoOculto(form, 'from_name', 'Site JBMR');
    definirCampoOculto(form, 'redirect', new URL('obrigado.html', location.href).href);

    // Armadilha anti-spam: os humanos não a veem, os bots preenchem-na.
    const armadilha = definirCampoOculto(form, 'botcheck', '');
    armadilha.setAttribute('tabindex', '-1');
    armadilha.setAttribute('autocomplete', 'off');

    const estado = document.createElement('p');
    estado.className = 'form-status';
    estado.setAttribute('role', 'status');
    estado.setAttribute('aria-live', 'polite');
    estado.hidden = true;
    form.appendChild(estado);

    const botao = form.querySelector('button[type="submit"]');
    const textoBotao = botao ? botao.textContent : '';

    // Proteções antes do envio: campo-armadilha, tempo mínimo e pausa entre pedidos.
    const carregadoEm = Date.now();
    let ultimoEnvio = 0;

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Bots preenchem o campo escondido e submetem logo a seguir a abrir a página.
        if (armadilha.value || Date.now() - carregadoEm < 3000) return;

        if (Date.now() - ultimoEnvio < 15000) {
            mostrar(estado, 'aviso', 'Já recebemos o seu pedido. Aguarde uns segundos antes de enviar outro.');
            return;
        }
        ultimoEnvio = Date.now();


        if (WEB3FORMS_KEY.startsWith('COLAR-AQUI')) {
            mostrar(estado, 'aviso',
                'O formulário ainda não está configurado. Ligue ' +
                '936 850 763 ou escreva para ' + EMAIL_OFICINA + '.');
            return;
        }

        if (botao) { botao.disabled = true; botao.textContent = 'A enviar...'; }
        mostrar(estado, 'a-enviar', 'A enviar o pedido...');

        try {
            const resposta = await fetch(ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(recolherCampos(form, assuntoBase))
            });
            const resultado = await resposta.json();

            if (resposta.ok && resultado.success) {
                form.reset();
                mostrar(estado, 'sucesso',
                    'Pedido enviado. Entramos em contacto com a maior brevidade.');
            } else {
                falhou(estado);
            }
        } catch (erro) {
            falhou(estado);
        } finally {
            if (botao) { botao.disabled = false; botao.textContent = textoBotao; }
        }
    });
}

// Junta os campos do formulário. Os grupos de checkboxes (servicos[])
// aparecem várias vezes, por isso são reunidos numa lista legível.
function recolherCampos(form, assuntoBase) {
    const dados = {};
    for (const [chave, valor] of new FormData(form).entries()) {
        if (chave === 'botcheck' || chave === 'redirect') continue;
        if (chave.endsWith('[]')) {
            const nome = chave.slice(0, -2);
            (dados[nome] = dados[nome] || []).push(valor);
        } else {
            dados[chave] = valor;
        }
    }

    for (const chave in dados) {
        if (Array.isArray(dados[chave])) {
            dados[chave] = dados[chave].join(', ');
        }
    }
    if ('servicos' in dados === false && form.querySelector('input[name="servicos[]"]')) {
        dados.servicos = 'Nenhum serviço selecionado';
    }

    dados.subject = dados.nome ? `${assuntoBase} - ${dados.nome}` : assuntoBase;
    return dados;
}

function definirCampoOculto(form, nome, valor) {
    let campo = form.querySelector(`[name="${nome}"]`);
    if (!campo) {
        campo = document.createElement('input');
        campo.type = 'hidden';
        campo.name = nome;
        form.appendChild(campo);
    }
    campo.value = valor;
    return campo;
}

function mostrar(elemento, tipo, texto) {
    elemento.className = 'form-status form-status--' + tipo;
    elemento.textContent = texto;
    elemento.hidden = false;
}

function falhou(estado) {
    mostrar(estado, 'erro',
        'Não foi possível enviar. Ligue 936 850 763 ou escreva para ' + EMAIL_OFICINA + '.');
}

// ---------------------------------------------------------------
// Horário da oficina: vem de site.config.json, gerado para a página
// (elemento #horario-oficina). Domingo sem intervalos = fechado.
// ---------------------------------------------------------------
const HORARIO_OFICINA = lerHorarioOficina();

function lerHorarioOficina() {
    const elemento = document.getElementById('horario-oficina');
    if (!elemento) return {};
    const paraMinutos = hora => {
        const [h, m] = hora.split(':').map(Number);
        return h * 60 + m;
    };
    const dados = JSON.parse(elemento.textContent);
    const horario = {};
    for (const dia of Object.keys(dados)) {
        horario[Number(dia)] = dados[dia].map(([abre, fecha]) => [paraMinutos(abre), paraMinutos(fecha)]);
    }
    return horario;
}

const DIAS_SEMANA = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
const DIA_ABREV = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function horaLegivel(minutos) {
    return String(Math.floor(minutos / 60)).padStart(2, '0') + 'h' + String(minutos % 60).padStart(2, '0');
}

function atualizarEstadoOficina() {
    const elementos = document.querySelectorAll('[data-estado-oficina]');
    if (!elementos.length) return;

    let dia, minutos;
    try {
        const partes = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Europe/Lisbon', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
        }).formatToParts(new Date());
        const valor = tipo => partes.find(p => p.type === tipo).value;
        dia = DIA_ABREV[valor('weekday')];
        minutos = (Number(valor('hour')) % 24) * 60 + Number(valor('minute'));
    } catch (erro) {
        return; // sem Intl com fuso horário, o texto por omissão fica tal como está
    }

    const intervalo = (HORARIO_OFICINA[dia] || []).find(([abre, fecha]) => minutos >= abre && minutos < fecha);
    let texto, aberto = Boolean(intervalo);

    if (intervalo) {
        texto = 'Aberto agora · fecha às ' + horaLegivel(intervalo[1]);
    } else {
        // Procura o próximo intervalo de abertura nos próximos 7 dias
        for (let k = 0; k < 7 && !texto; k++) {
            const d = (dia + k) % 7;
            const proximo = (HORARIO_OFICINA[d] || []).find(([abre]) => k > 0 || abre > minutos);
            if (proximo) {
                const quando = k === 0 ? 'hoje' : k === 1 ? 'amanhã' : DIAS_SEMANA[d];
                texto = 'Fechado · abre ' + quando + ' às ' + horaLegivel(proximo[0]);
            }
        }
        texto = texto || 'Fechado';
    }

    elementos.forEach(function (el) {
        el.textContent = texto;
        el.classList.toggle('estado-oficina--aberto', aberto);
        el.classList.toggle('estado-oficina--fechado', !aberto);
    });
}
