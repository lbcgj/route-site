/* ==========================================================================
   ROUTE Marketing Site - Core JavaScript Engine
   Handles scroll reveal animations, interactive tabs, pricing toggle, 
   FAQ accordion, mobile menu, and modal preview access handlers.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll-sensitive Navigation Bar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Menu Navigation Drawer Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');

    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', () => {
            mobileDrawer.classList.toggle('active');
            const isOpen = mobileDrawer.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close drawer on link click
        mobileDrawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('active');
            });
        });
    }

    // 3. Scroll Reveal Animations (IntersectionObserver)
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: keep observed or unobserve after revealing
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Feature Showcase Tab Switcher
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length && tabContents.length) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');

                tabButtons.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const activeContent = document.getElementById(`tab-${targetTab}`);
                if (activeContent) {
                    activeContent.classList.add('active');
                }
            });
        });
    }

    // 5. Pricing Billing Toggle (Monthly vs Billed Annually)
    const billingToggle = document.getElementById('pricing-toggle');
    const monthlyLabel = document.getElementById('label-monthly');
    const annualLabel = document.getElementById('label-annual');
    const priceAmounts = document.querySelectorAll('.pricing-amount[data-monthly]');

    if (billingToggle) {
        billingToggle.addEventListener('click', () => {
            billingToggle.classList.toggle('checked');
            const isAnnual = billingToggle.classList.contains('checked');

            if (monthlyLabel && annualLabel) {
                if (isAnnual) {
                    annualLabel.classList.add('active');
                    monthlyLabel.classList.remove('active');
                } else {
                    monthlyLabel.classList.add('active');
                    annualLabel.classList.remove('active');
                }
            }

            priceAmounts.forEach(elem => {
                const monthlyPrice = elem.getAttribute('data-monthly');
                const annualPrice = elem.getAttribute('data-annual');
                elem.textContent = isAnnual ? annualPrice : monthlyPrice;
            });
        });
    }

    // 6. FAQ Accordion Items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close other FAQ items
                faqItems.forEach(other => other.classList.remove('active'));

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 7. Preview Request Modal Handler
    const modalOverlay = document.getElementById('preview-modal');
    const openModalBtns = document.querySelectorAll('[data-open-modal="preview"]');
    const closeModalBtns = document.querySelectorAll('.modal-close, [data-close-modal]');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modalOverlay) {
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Form Submission Handling
    const previewForm = document.getElementById('preview-access-form');
    const formSuccessMessage = document.getElementById('form-success-message');

    if (previewForm) {
        previewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = previewForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting Request...';
            }

            // Simulate quick validation & response redirect signal
            setTimeout(() => {
                if (previewForm) previewForm.style.display = 'none';
                if (formSuccessMessage) formSuccessMessage.style.display = 'block';
            }, 800);
        });
    }
});
