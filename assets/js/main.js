/**
 * MIX CAPITAL - Main JavaScript Interactions (StoneX Style)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Setup FAQ Accordions
    initFaqAccordion();

    // 3. Setup Cookie Consent
    initCookieConsent();

    // 4. Setup Contact Form
    initContactForm();

    // 5. Setup Smooth Scrolling
    initSmoothScroll();
});

/* ==========================================================================
   Mobile Menu Toggle
   ========================================================================== */
function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-menu-drawer');
    if (drawer) {
        drawer.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const drawer = document.getElementById('mobile-menu-drawer');
    if (drawer) {
        drawer.classList.remove('active');
    }
}

/* ==========================================================================
   FAQ Accordion (StoneX Style)
   ========================================================================== */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const body = item.querySelector('.faq-body');

        if (!header || !body) return;

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherBody = otherItem.querySelector('.faq-body');
                    if (otherBody) otherBody.style.maxHeight = null;
                }
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                body.style.maxHeight = null;
            }
        });
    });
}

/* ==========================================================================
   Contact Modal
   ========================================================================== */
function openContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* ==========================================================================
   Legal Modals (Privacy & Terms)
   ========================================================================== */
function openPrivacyModal() {
    showSimpleModal(
        'Política de Privacidade',
        `<p><strong>1. Coleta de Informações</strong><br>A MIX CAPITAL coleta dados cadastrais e operacionais estritamente necessários para a prestação de serviços de pagamentos, gestão de conta e cumprimento das normas do Banco Central do Brasil.</p>
        <br>
        <p><strong>2. Segurança dos Dados</strong><br>Adotamos os mais rigorosos padrões mundiais de segurança da informação, incluindo certificação PCI DSS Level 1, criptografia de dados em trânsito e em repouso, e controle restrito de acesso.</p>
        <br>
        <p><strong>3. Compartilhamento</strong><br>Não vendemos nem alugamos informações pessoais a terceiros. Informações são compartilhadas exclusivamente com parceiros autorizados e autoridades regulatórias na forma da legislação aplicável (LGPD - Lei nº 13.709/2018).</p>
        <br>
        <p><strong>4. Seus Direitos</strong><br>Você pode solicitar a qualquer momento a confirmação, acesso, correção ou exclusão de seus dados através do nosso canal de atendimento oficial: <em>suporte@mixcapital.com.br</em>.</p>`
    );
}

function openTermsModal() {
    showSimpleModal(
        'Termos e Condições de Uso',
        `<p><strong>1. Objeto</strong><br>Estes termos regem o acesso e utilização da plataforma, gateway de pagamentos e serviços financeiros oferecidos pela MIX CAPITAL GTW LTDA (CNPJ 61.853.820/0001-10).</p>
        <br>
        <p><strong>2. Cadastro e Acesso</strong><br>O credenciamento e abertura de conta estão condicionados à análise documental e conformidade regulatória (KYC/KYB/PLD-FT).</p>
        <br>
        <p><strong>3. Taxas e Tarifas</strong><br>As taxas aplicáveis a transações (PIX, Cartão, Boleto, Câmbio) são fixadas em contrato específico ou tabela de tarifas aceita no momento da contratação.</p>
        <br>
        <p><strong>4. Responsabilidades</strong><br>O usuário é responsável pela veracidade dos dados informados e pelo uso seguro de suas credenciais de acesso à plataforma.</p>`
    );
}

function showSimpleModal(title, contentHtml) {
    const existing = document.getElementById('legal-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'legal-modal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-header">
                <h3 class="modal-title">${title}</h3>
                <button class="modal-close-btn" onclick="closeLegalModal()">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <div class="modal-body" style="font-size: 0.9375rem; color: #4A5568; line-height: 1.7; max-height: 60vh; overflow-y: auto;">
                ${contentHtml}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    if (window.lucide) window.lucide.createIcons();

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLegalModal();
    });
}

function closeLegalModal() {
    const modal = document.getElementById('legal-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Global modal overlay click close
document.addEventListener('click', (e) => {
    const contactModal = document.getElementById('contact-modal');
    if (contactModal && e.target === contactModal) {
        closeContactModal();
    }
});

// Escape key listener
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeContactModal();
        closeLegalModal();
    }
});

/* ==========================================================================
   Cookie Consent Banner (LGPD)
   ========================================================================== */
function initCookieConsent() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    const consent = localStorage.getItem('mixcapital_cookie_consent');
    if (!consent) {
        banner.classList.add('active');
    }
}

function acceptCookies() {
    localStorage.setItem('mixcapital_cookie_consent', 'accepted');
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.remove('active');
}

function declineCookies() {
    localStorage.setItem('mixcapital_cookie_consent', 'essential_only');
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.remove('active');
}

/* ==========================================================================
   Contact Form Handling
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = form.querySelector('[name="name"]').value;
        const email = form.querySelector('[name="email"]').value;
        const phone = form.querySelector('[name="phone"]').value;
        const message = form.querySelector('[name="message"]').value;

        if (!name || !email || !phone || !message) {
            showToast('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Simular envio ou preparar request
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Enviando...';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            closeContactModal();
            form.reset();
            showToast('Mensagem enviada com sucesso! Nossa equipe entrará em contato.');
        }, 800);
    });
}

function showToast(msg) {
    let toast = document.getElementById('toast-notice');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notice';
        toast.className = 'toast-notice';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <span>${msg}</span>
    `;

    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
}

/* ==========================================================================
   Smooth Scrolling for Anchor Links
   ========================================================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                closeMobileMenu();
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
