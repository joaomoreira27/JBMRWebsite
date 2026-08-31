// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuToggle.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    });

    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Form submission - gerar email com os dados preenchidos
    const form = document.querySelector('.orcamento-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const marca = document.getElementById('marca').value;
            const modelo = document.getElementById('modelo').value;
            const ano = document.getElementById('ano').value;
            const matricula = document.getElementById('matricula').value;
            const descricao = document.getElementById('descricao').value;

            const servicosSelecionados = Array.from(
                document.querySelectorAll('input[name="servicos[]"]:checked')
            )
                .map(cb => cb.labels[0].innerText.trim())
                .join(', ');

            const assunto = encodeURIComponent(`Pedido de Orçamento - ${nome}`);
            const corpo = encodeURIComponent(
                `--- DADOS PESSOAIS ---\n` +
                `Nome: ${nome}\n` +
                `Email: ${email}\n` +
                `Telefone: ${telefone}\n\n` +
                `--- DADOS DO VEÍCULO ---\n` +
                `Marca: ${marca}\n` +
                `Modelo: ${modelo}\n` +
                `Ano: ${ano}\n` +
                `Matrícula: ${matricula}\n\n` +
                `--- SERVIÇOS PRETENDIDOS ---\n` +
                `${servicosSelecionados || "Nenhum serviço selecionado"}\n\n` +
                `--- DESCRIÇÃO ---\n${descricao}`
            );

            const mailtoLink = `mailto:joaobritoprd@gmail.com;joaomoreira2727@gmail.com?subject=${assunto}&body=${corpo}`;
            window.location.href = mailtoLink;
        });
    }
});
