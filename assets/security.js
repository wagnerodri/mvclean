/**
 * SECURITY.JS - Sistema de Segurança para Oliveira's Clean
 * Proteção contra XSS, validação de formulários e sanitização
 */

class SecurityManager {
    constructor() {
        this.init();
    }

    init() {
        // Inicializa proteções quando o DOM estiver pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupSecurity());
        } else {
            this.setupSecurity();
        }
    }

    setupSecurity() {
        this.setupFormValidation();
        this.setupInputSanitization();
        this.setupCSRFProtection();
        this.setupXSSProtection();
        this.setupRateLimiting();
    }

    // ========== VALIDAÇÃO DE FORMULÁRIOS ==========
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.validateForm(e, form));
        });
    }

    validateForm(event, form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;
        let errors = [];

        inputs.forEach(input => {
            // Remove mensagens de erro anteriores
            this.clearFieldError(input);

            // Validações específicas por tipo
            if (!this.validateField(input)) {
                isValid = false;
                errors.push(`${input.name || input.placeholder || 'Campo'}: ${this.getValidationMessage(input)}`);
                this.showFieldError(input, this.getValidationMessage(input));
            }
        });

        if (!isValid) {
            event.preventDefault();
            this.showFormErrors(form, errors);
            return false;
        }

        return true;
    }

    validateField(input) {
        const value = input.value.trim();
        const type = input.type;
        const name = input.name.toLowerCase();

        // Campos obrigatórios
        if (input.hasAttribute('required') && !value) {
            return false;
        }

        // Validações por tipo
        switch (type) {
            case 'email':
                return this.validateEmail(value);
            case 'tel':
            case 'phone':
                return this.validatePhone(value);
            default:
                // Validações por nome do campo
                if (name.includes('email')) return this.validateEmail(value);
                if (name.includes('phone') || name.includes('tel')) return this.validatePhone(value);
                if (name.includes('name') || name.includes('nome')) return value.length >= 2;
                break;
        }

        return true;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        // Aceita formatos: +351 123 456 789, 123 456 789, 912345678
        const phoneRegex = /^(\+351\s?)?[9|2|3]\d{1,2}\s?\d{3}\s?\d{3}$/;
        return phoneRegex.test(phone.replace(/\s+/g, ' '));
    }

    getValidationMessage(input) {
        const type = input.type;
        const name = input.name.toLowerCase();

        if (!input.value.trim()) return 'Campo obrigatório';

        if (type === 'email' || name.includes('email')) return 'Email inválido';
        if (type === 'tel' || name.includes('phone') || name.includes('tel')) return 'Telefone inválido';
        if (name.includes('name') || name.includes('nome')) return 'Nome deve ter pelo menos 2 caracteres';

        return 'Campo inválido';
    }

    showFieldError(input, message) {
        input.classList.add('error');
        input.style.borderColor = '#ff4444';

        // Cria mensagem de erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff4444';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '4px';

        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }

    clearFieldError(input) {
        input.classList.remove('error');
        input.style.borderColor = '';

        const errorDiv = input.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    showFormErrors(form, errors) {
        // Remove mensagens anteriores
        const existingErrors = form.querySelector('.form-errors');
        if (existingErrors) existingErrors.remove();

        // Cria container de erros
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-errors';
        errorContainer.style.backgroundColor = '#ffebee';
        errorContainer.style.border = '1px solid #ff4444';
        errorContainer.style.borderRadius = '4px';
        errorContainer.style.padding = '12px';
        errorContainer.style.marginBottom = '16px';

        const errorTitle = document.createElement('h4');
        errorTitle.textContent = 'Por favor, corrija os seguintes erros:';
        errorTitle.style.color = '#c62828';
        errorTitle.style.margin = '0 0 8px 0';
        errorTitle.style.fontSize = '0.9rem';

        const errorList = document.createElement('ul');
        errorList.style.margin = '0';
        errorList.style.paddingLeft = '20px';
        errorList.style.color = '#c62828';
        errorList.style.fontSize = '0.85rem';

        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            errorList.appendChild(li);
        });

        errorContainer.appendChild(errorTitle);
        errorContainer.appendChild(errorList);

        form.insertBefore(errorContainer, form.firstChild);
    }

    // ========== SANITIZAÇÃO DE INPUTS ==========
    setupInputSanitization() {
        const inputs = document.querySelectorAll('input[type="text"], textarea');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => this.sanitizeInput(e.target));
            input.addEventListener('paste', (e) => this.handlePaste(e));
        });
    }

    sanitizeInput(input) {
        let value = input.value;

        // Remove caracteres potencialmente perigosos
        value = value.replace(/[<>'"&]/g, '');

        // Remove scripts
        value = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        value = value.replace(/javascript:/gi, '');
        value = value.replace(/on\w+\s*=/gi, '');

        // Limita comprimento
        if (value.length > 1000) {
            value = value.substring(0, 1000);
        }

        input.value = value;
    }

    handlePaste(event) {
        setTimeout(() => {
            this.sanitizeInput(event.target);
        }, 0);
    }

    // ========== PROTEÇÃO CSRF ==========
    setupCSRFProtection() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            if (!form.querySelector('input[name="csrf_token"]')) {
                const csrfToken = this.generateCSRFToken();
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'csrf_token';
                hiddenInput.value = csrfToken;
                form.appendChild(hiddenInput);

                // Armazena token na sessionStorage
                sessionStorage.setItem('csrf_token', csrfToken);
            }
        });
    }

    generateCSRFToken() {
        return btoa(Math.random().toString()).substring(0, 32);
    }

    // ========== PROTEÇÃO XSS ==========
    setupXSSProtection() {
        // Protege contra XSS em tempo real
        document.addEventListener('DOMNodeInserted', (e) => {
            if (e.target.tagName === 'SCRIPT') {
                e.target.remove();
                console.warn('Tentativa de XSS detectada e bloqueada');
            }
        });

        // Protege contra eval()
        window.eval = function() {
            console.warn('Tentativa de usar eval() bloqueada por segurança');
            return null;
        };
    }

    // ========== RATE LIMITING ==========
    setupRateLimiting() {
        this.requestCount = 0;
        this.lastResetTime = Date.now();
        this.maxRequestsPerMinute = 30;

        // Intercepta submissões de formulários
        document.addEventListener('submit', (e) => {
            if (!this.checkRateLimit()) {
                e.preventDefault();
                alert('Muitas tentativas. Por favor, aguarde um momento.');
                return false;
            }
        });
    }

    checkRateLimit() {
        const now = Date.now();
        const timeWindow = 60000; // 1 minuto

        // Reset counter se passou 1 minuto
        if (now - this.lastResetTime > timeWindow) {
            this.requestCount = 0;
            this.lastResetTime = now;
        }

        if (this.requestCount >= this.maxRequestsPerMinute) {
            return false;
        }

        this.requestCount++;
        return true;
    }

    // ========== UTILITÁRIOS ==========
    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    static logSecurityEvent(event, details) {
        const timestamp = new Date().toISOString();
        console.log(`[SECURITY ${timestamp}] ${event}:`, details);

        // Em produção, isso poderia enviar para um serviço de logging
        // this.sendToSecurityLog({ event, details, timestamp, url: window.location.href });
    }
}

// ========== CAPTCHA SIMPLES ==========
class SimpleCaptcha {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (this.container) {
            this.init();
        }
    }

    init() {
        this.createCaptcha();
    }

    createCaptcha() {
        // Gera números aleatórios simples
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        this.answer = num1 + num2;

        this.container.innerHTML = `
            <div style="margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 4px; background: #f9f9f9;">
                <label style="display: block; margin-bottom: 8px; font-weight: bold;">
                    Verificação de Segurança: Quanto é ${num1} + ${num2}?
                </label>
                <input type="number" id="captcha-input" placeholder="Digite a resposta" required
                       style="padding: 8px; border: 1px solid #ccc; border-radius: 3px; width: 100px;">
                <span id="captcha-error" style="color: red; display: none; margin-left: 10px;">Resposta incorreta</span>
            </div>
        `;

        // Armazena resposta para validação
        this.container.dataset.answer = this.answer;
    }

    validate() {
        const input = document.getElementById('captcha-input');
        const error = document.getElementById('captcha-error');
        const userAnswer = parseInt(input.value);

        if (userAnswer === this.answer) {
            error.style.display = 'none';
            input.style.borderColor = '#4CAF50';
            return true;
        } else {
            error.style.display = 'inline';
            input.style.borderColor = '#f44336';
            return false;
        }
    }

    reset() {
        this.createCaptcha();
    }
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa sistema de segurança
    window.securityManager = new SecurityManager();

    // Inicializa CAPTCHA se houver container
    window.captcha = new SimpleCaptcha('captcha-container');

    console.log('🛡️ Sistema de Segurança Oliveira\'s Clean ativado');
});

// ========== EXPORT PARA USO GLOBAL ==========
window.SecurityManager = SecurityManager;
window.SimpleCaptcha = SimpleCaptcha;