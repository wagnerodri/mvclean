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
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});
