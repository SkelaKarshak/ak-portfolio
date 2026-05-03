document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('slideContainer');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot-nav li');
    
    // Dot navigation click
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetId = dot.getAttribute('data-target');
            const targetSlide = document.getElementById(`slide-${targetId}`);
            targetSlide.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Intersection Observer to update active dot
    const observerOptions = {
        root: container,
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slideId = entry.target.id.split('-')[1];
                
                // Update dots
                dots.forEach(dot => dot.classList.remove('active'));
                const activeDot = document.querySelector(`.dot-nav li[data-target="${slideId}"]`);
                if (activeDot) {
                    activeDot.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    slides.forEach(slide => observer.observe(slide));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Find current active slide
        let currentIndex = -1;
        dots.forEach((dot, index) => {
            if (dot.classList.contains('active')) {
                currentIndex = index;
            }
        });
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (currentIndex < dots.length - 1) {
                dots[currentIndex + 1].click();
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentIndex > 0) {
                dots[currentIndex - 1].click();
            }
        }
    });
});
