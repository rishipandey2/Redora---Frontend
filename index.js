
        // Custom cursor
        const cursor = document.querySelector('.cursor');
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor interactions
        document.querySelectorAll('a, button, .feature-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('reading'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('reading'));
        });

        // Floating words
        const words = ['adventure', 'mystery', 'romance', 'fantasy', 'knowledge', 'wisdom', 'escape', 'journey', 'imagination', 'discovery'];
        const floatingContainer = document.getElementById('floatingWords');

        function createFloatingWord() {
            const word = document.createElement('div');
            word.className = 'word';
            word.textContent = words[Math.floor(Math.random() * words.length)];
            word.style.left = Math.random() * 100 + '%';
            word.style.animationDuration = (Math.random() * 10 + 15) + 's';
            word.style.animationDelay = Math.random() * 5 + 's';
            floatingContainer.appendChild(word);

            setTimeout(() => {
                word.remove();
            }, 25000);
        }

        setInterval(createFloatingWord, 3000);

        // Morphing text
        const changingWords = ['Stories', 'Dreams', 'Adventures', 'Worlds', 'Ideas'];
        let currentIndex = 0;
        const changingWordEl = document.getElementById('changingWord');

        setInterval(() => {
            currentIndex = (currentIndex + 1) % changingWords.length;
            changingWordEl.style.opacity = '0';
            setTimeout(() => {
                changingWordEl.textContent = changingWords[currentIndex];
                changingWordEl.style.opacity = '1';
            }, 300);
        }, 3000);

        // Scroll reveals
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    if (entry.target.id === 'stats') {
                        animateNumbers();
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });

        // Animate numbers
        function animateNumbers() {
            const numbers = document.querySelectorAll('.stat-number');
            
            numbers.forEach(number => {
                const target = parseInt(number.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    number.textContent = Math.floor(current).toLocaleString();
                }, 30);
            });
        }

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Initialize floating words
        for (let i = 0; i < 8; i++) {
            setTimeout(createFloatingWord, i * 2000);
        }
 