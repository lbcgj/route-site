/* ==========================================================================
   ROUTE Marketing Site - Master Interactive Engine
   Interactive Bus Simulator, ROI Calculator, Accordion, Tabs, Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Backdrop Blur
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

        mobileDrawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('active');
            });
        });
    }

    // 3. Scroll Reveal Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
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

    // 5. Interactive Bus Route Simulator (Home Page)
    const simStepBoxes = document.querySelectorAll('.simulator-step-box');
    const simRiderCheckBtn = document.getElementById('sim-check-rider-btn');
    const simStatusText = document.getElementById('sim-status-text');
    const simSmsAlert = document.getElementById('sim-sms-alert');

    if (simStepBoxes.length && simRiderCheckBtn) {
        let currentStep = 1;

        simRiderCheckBtn.addEventListener('click', () => {
            currentStep = (currentStep % 3) + 1;

            simStepBoxes.forEach(box => box.classList.remove('active'));
            const activeStepBox = document.getElementById(`sim-step-${currentStep}`);
            if (activeStepBox) {
                activeStepBox.classList.add('active');
            }

            if (currentStep === 1) {
                simStatusText.textContent = 'Bus Route Started • Driver En Route to Stop 1';
                if (simSmsAlert) simSmsAlert.style.display = 'none';
            } else if (currentStep === 2) {
                simStatusText.textContent = '3 Riders Checked-In at Stop 2 • Parent Alert Triggered';
                if (simSmsAlert) simSmsAlert.style.display = 'block';
            } else if (currentStep === 3) {
                simStatusText.textContent = 'All Riders Arrived Safely at Church • Route Complete!';
                if (simSmsAlert) simSmsAlert.style.display = 'block';
            }
        });
    }

    // 6. Interactive Time & Savings Calculator (Pricing Page)
    const routeSlider = document.getElementById('routes-slider');
    const routeCountDisplay = document.getElementById('routes-count-display');
    const hoursSavedDisplay = document.getElementById('hours-saved-display');
    const callsAvoidedDisplay = document.getElementById('calls-avoided-display');

    if (routeSlider && routeCountDisplay && hoursSavedDisplay && callsAvoidedDisplay) {
        const updateCalculator = () => {
            const routes = parseInt(routeSlider.value, 10);
            routeCountDisplay.textContent = routes === 1 ? '1 Route' : `${routes} Routes`;

            // Calculate estimated monthly savings
            const hoursSaved = routes * 12; // ~12 hours saved per route per month
            const callsAvoided = routes * 65; // ~65 frantic parent phone calls avoided per month

            hoursSavedDisplay.textContent = `${hoursSaved} Hrs / mo`;
            callsAvoidedDisplay.textContent = `${callsAvoided} Calls`;
        };

        routeSlider.addEventListener('input', updateCalculator);
        updateCalculator(); // Initialize on load
    }

    // 7. Pricing Billing Toggle
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

    // 8. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(other => other.classList.remove('active'));

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 9. Preview Access Modal Handler
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

    // 10. Forms Submission Handler
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

            setTimeout(() => {
                if (previewForm) previewForm.style.display = 'none';
                if (formSuccessMessage) formSuccessMessage.style.display = 'block';
            }, 800);
        });
    }

    const contactMainForm = document.getElementById('contact-main-form');
    if (contactMainForm) {
        contactMainForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactMainForm.querySelector('button[type="submit"]');
            if (btn) {
                btn.disabled = true;
                btn.textContent = 'Sending Message...';
            }
            setTimeout(() => {
                contactMainForm.innerHTML = `
                    <div style="text-align:center; padding:2.5rem 1rem;">
                        <svg style="width:52px; height:52px; color:#34d399; margin-bottom:1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                        <h3 style="font-size:1.6rem; color:#fff; margin-bottom:0.5rem;">Message Received</h3>
                        <p style="font-size:0.95rem; color:#94a3b8; max-width:450px; margin:0 auto 1.5rem auto;">
                            Thank you for reaching out! Our team will review your ministry inquiry and follow up shortly. You can also apply directly at <strong>app.routeapp.org</strong>.
                        </p>
                        <a href="https://app.routeapp.org" class="btn btn-primary" target="_blank">Visit app.routeapp.org</a>
                    </div>
                `;
            }, 800);
        });
    }
});
