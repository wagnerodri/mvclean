// Bolha Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
	var menuBubble = document.getElementById('menuBubble');
	var mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
	var closeMobileMenu = document.getElementById('closeMobileMenu');

	if (menuBubble && mobileMenuOverlay && closeMobileMenu) {
		menuBubble.addEventListener('click', function() {
			mobileMenuOverlay.style.display = 'flex';
			setTimeout(function() {
				mobileMenuOverlay.style.opacity = '1';
			}, 10);
		});
		closeMobileMenu.addEventListener('click', function() {
			mobileMenuOverlay.style.opacity = '0';
			setTimeout(function() {
				mobileMenuOverlay.style.display = 'none';
			}, 350);
		});
		// Fechar ao clicar fora do menu
		mobileMenuOverlay.addEventListener('click', function(e) {
			if (e.target === mobileMenuOverlay) {
				mobileMenuOverlay.style.opacity = '0';
				setTimeout(function() {
					mobileMenuOverlay.style.display = 'none';
				}, 350);
			}
		});
	}
});


// Menu sempre visível, sem JS necessário

// Script para funcionalidade do menu hambúrguer
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.nav-links.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }

  // Fechar menu ao clicar em um link
  const mobileLinks = document.querySelectorAll('.nav-links.mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    // Show button when scrolling down
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// Modal para imagens dos serviços
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('image-modal');
  const modalBefore = document.getElementById('modal-before');
  const modalAfter = document.getElementById('modal-after');
  const closeBtn = document.querySelector('.close');

  // Adicionar evento de clique aos cards de serviço
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Não abrir modal se clicar no botão de contato
      if (e.target.classList.contains('contact-btn') || e.target.closest('.contact-btn')) {
        return;
      }

      const beforeImg = card.querySelector('.before-after-item:first-child img');
      const afterImg = card.querySelector('.before-after-item:last-child img');

      if (beforeImg && afterImg) {
        modalBefore.src = beforeImg.src;
        modalAfter.src = afterImg.src;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Previne scroll
      }
    });
  });

  // Fechar modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  // Fechar modal ao clicar fora
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Fechar com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});
