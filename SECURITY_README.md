# 🛡️ Oliveira's Clean - Sistema de Segurança

## Visão Geral

Este projeto implementa um sistema abrangente de segurança para proteger o site contra ameaças comuns como XSS, CSRF, injeção de código, ataques de força bruta e outras vulnerabilidades web.

## 🛡️ Componentes de Segurança Implementados

### 1. Headers de Segurança (.htaccess)
- **X-Frame-Options**: Previne clickjacking
- **X-Content-Type-Options**: Previne MIME type sniffing
- **X-XSS-Protection**: Ativa proteção XSS do navegador
- **Content Security Policy (CSP)**: Controla recursos permitidos
- **Strict-Transport-Security**: Força HTTPS (quando habilitado)
- **Referrer-Policy**: Controla informações de referência
- **Permissions-Policy**: Restringe APIs do navegador

### 2. Sistema de Segurança JavaScript (security.js)
- **Validação de Formulários**: Campos obrigatórios, formatos válidos
- **Sanitização de Input**: Remove caracteres perigosos e scripts
- **Proteção CSRF**: Tokens únicos para cada formulário
- **Proteção XSS**: Bloqueio de scripts maliciosos em tempo real
- **Rate Limiting**: Limita tentativas de submissão (30/minuto)
- **CAPTCHA Simples**: Verificação matemática básica

### 3. Controle de Acesso (robots.txt)
- **Bloqueio de crawlers maliciosos**: AhrefsBot, MJ12bot, DotBot
- **Proteção de arquivos sensíveis**: .htaccess, .git/, logs, backups
- **Controle de indexação**: Permite apenas páginas públicas

### 4. Validação de Formulários
- **Campos obrigatórios**: Nome, email, mensagem
- **Validação de email**: Regex robusto
- **Validação de telefone**: Formatos portugueses
- **Sanitização automática**: Remove HTML e scripts
- **Feedback visual**: Mensagens de erro em tempo real

## 🚀 Como Usar

### Para Desenvolvedores

1. **Inclua o script de segurança** em páginas com formulários:
```html
<script src="assets/security.js"></script>
```

2. **Adicione CAPTCHA** onde necessário:
```html
<div id="captcha-container"></div>
```

3. **Configure o servidor** para usar o `.htaccess` (Apache)

### Para Usuários Finais

O sistema funciona automaticamente:
- Formulários são validados antes do envio
- Inputs são sanitizados em tempo real
- Tentativas excessivas são bloqueadas
- CAPTCHA previne spam automatizado

## 🔧 Configuração Avançada

### Modificar Rate Limiting
```javascript
// Em security.js, linha ~180
this.maxRequestsPerMinute = 30; // Altere este valor
```

### Personalizar Validações
```javascript
// Adicione validações customizadas em setupFormValidation()
validateField(input) {
    // Suas validações personalizadas aqui
}
```

### Headers de Segurança
Para modificar headers, edite o arquivo `.htaccess` conforme necessário para seu ambiente de hospedagem.

## 📊 Recursos de Monitoramento

O sistema registra eventos de segurança no console do navegador:
```
[SECURITY 2025-10-15T10:30:00.000Z] XSS Attempt: Script tag blocked
[SECURITY 2025-10-15T10:30:05.000Z] Rate Limit: Request blocked
```

## 🛠️ Tecnologias Utilizadas

- **JavaScript ES6+**: Classes modernas e Promises
- **HTML5**: Formulários semânticos e validação nativa
- **CSS3**: Estilos para feedback visual
- **Apache .htaccess**: Configuração de servidor
- **Web APIs**: sessionStorage, DOM manipulation

## 🔒 Boas Práticas Implementadas

### Segurança
- ✅ **Princípio do menor privilégio**
- ✅ **Defense in depth** (múltiplas camadas)
- ✅ **Fail-safe defaults**
- ✅ **Sanitização de input**
- ✅ **Validação de output**

### Performance
- ✅ **Lazy loading** de validações
- ✅ **Event delegation** para eficiência
- ✅ **Debounced input sanitization**

### Usabilidade
- ✅ **Feedback visual** imediato
- ✅ **Mensagens de erro** claras em português
- ✅ **Acessibilidade** mantida
- ✅ **Progressive enhancement**

## 🚨 Avisos de Segurança

1. **Este sistema não substitui** medidas de segurança do servidor
2. **Configure HTTPS** em produção para headers HSTS
3. **Monitore logs** regularmente para detectar ataques
4. **Atualize dependências** periodicamente
5. **Faça backup** regular do código e dados

## 📞 Suporte

Para questões de segurança ou implementação:
- Email: warodri1@gmail.com
- Documentação: Este arquivo README.md

## 📝 Licença

Este sistema de segurança é parte integrante do projeto Oliveira's Clean e está sujeito aos mesmos termos de uso.

---

**Última atualização**: Outubro 2025
**Versão**: 1.0.0
**Status**: 🟢 Produção Ready