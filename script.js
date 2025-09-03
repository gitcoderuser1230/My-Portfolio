        // Initialize AOS animations with scroll-up detection
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: true
        });

        // Add scroll direction detection for smarter animations
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop){
                // Downscroll code
                document.body.setAttribute('data-scroll-direction', 'down');
            } else {
                // Upscroll code
                document.body.setAttribute('data-scroll-direction', 'up');
                // Trigger animations on scroll up
                const elements = document.querySelectorAll('[data-aos]');
                elements.forEach(el => {
                    if (el.getBoundingClientRect().top < window.innerHeight * 0.75) {
                        el.classList.add('aos-animate');
                    }
                });
            }
            lastScrollTop = st <= 0 ? 0 : st;
        }, false);

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !expanded);
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        mobileMenuButton.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });

        // Animate skill pills on hover
        const skillPills = document.querySelectorAll('.skill-pill');
        skillPills.forEach(pill => {
            pill.addEventListener('mouseenter', () => {
                anime({
                    targets: pill,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
            
            pill.addEventListener('mouseleave', () => {
                anime({
                    targets: pill,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
        });

        // Floating animation for hero image with scroll direction awareness
        const floatingEl = document.querySelector('.floating');
        let floatingAnim = anime({
            targets: floatingEl,
            translateY: ['0px', '-15px'],
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
            duration: 3000,
            autoplay: true
        });

        window.addEventListener('scroll', function() {
            const scrollDir = document.body.getAttribute('data-scroll-direction');
            if (scrollDir === 'up') {
                floatingAnim.reverse();
                floatingAnim.play();
            } else {
                floatingAnim.play();
            }
        });

        // Replace feather icons
        feather.replace();
