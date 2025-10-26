document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    ['ano', 'ano2', 'ano3'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = year;
    });

    // Máscaras para formulário de cadastro
    const applyMasks = () => {
        const cpf = document.getElementById('cpf');
        if (cpf) {
            cpf.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                e.target.value = value;
            });
        }

        const telefone = document.getElementById('telefone');
        if (telefone) {
            telefone.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                e.target.value = value;
            });
        }

        const cep = document.getElementById('cep');
        if (cep) {
            cep.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 8) value = value.slice(0, 8);
                value = value.replace(/(\d{5})(\d{3})/, '$1-$3');
                e.target.value = value;
            });
        }
    };

    applyMasks();

    // Menu hambúrguer para mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('main-nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !expanded);
            nav.classList.toggle('nav-hidden');
        });
    }

    // Funcionalidades do modal de doação
    const openModal = () => {
        const modal = document.getElementById('donationModal');
        if (modal) {
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');
            document.getElementById('nomeDoador').focus();
        }
    };

    const closeModal = () => {
        const modal = document.getElementById('donationModal');
        if (modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
    };

    const copyPix = () => {
        const pixKey = '8c651631-ea65-4aa8-ad11-88113d6b60c5';
        navigator.clipboard.writeText(pixKey).then(() => {
            const btn = document.querySelector('button[onclick="copyPix()"]');
            btn.textContent = 'Chave Copiada!';
            setTimeout(() => {
                btn.textContent = 'Copiar Chave Pix';
            }, 2000);
        }).catch(() => {
            alert('Erro ao copiar a chave Pix.');
        });
    };

    // Adicionar eventos aos botões de doação
    document.querySelectorAll('.btn-doar').forEach(button => {
        button.addEventListener('click', () => {
            openModal();
        });
    });

    // Simulação de envio de formulários com validação visual
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;
            form.querySelectorAll('input[required], select[required]').forEach(input => {
                if (!input.value) {
                    input.classList.add('invalid');
                    valid = false;
                } else {
                    input.classList.remove('invalid');
                }
            });
            if (valid) {
                const messages = document.getElementById('form-messages') || document.createElement('div');
                messages.textContent = 'Formulário enviado com sucesso! (Simulação)';
                messages.classList.add('alert', 'alert-success');
                if (form.id === 'donationForm') {
                    closeModal();
                }
            } else {
                const messages = document.getElementById('form-messages') || document.createElement('div');
                messages.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                messages.classList.add('alert', 'alert-error');
            }
        });
    });

    // Expor funções globais para o modal
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.copyPix = copyPix;
});