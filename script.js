document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header Effect on Scroll (For Home Page)
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        // Only toggle 'scrolled' if we aren't already on an internal page that forces it
        if (!header.classList.contains('force-scrolled')) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // 2. Mobile Menu Toggle Logic
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav a');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. Prevent selecting past dates in the appointment form
    const dateInput = document.getElementById('date');
    if (dateInput) {
        // Get today's date in YYYY-MM-DD format based on local time
        const today = new Date();
        // Adjust for timezone offset so the local date is correct
        const offset = today.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(today - offset)).toISOString().split('T')[0];
        
        dateInput.setAttribute('min', localISOTime);
    }

    // 4. Form Submission Success Popup (Toast)
    const forms = document.querySelectorAll('form');
    
    if (forms.length > 0) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = '✅ <span>Votre demande a été envoyée avec succès !</span>';
        document.body.appendChild(toast);

        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault(); 
                toast.classList.add('show');
                form.reset();
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3500);
            });
        });
    }
});