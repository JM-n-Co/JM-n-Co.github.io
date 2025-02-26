document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    const POINTS_COUNT = 50;
    const MAX_DISTANCE = 200;
    const VELOCITY_SCALE = 0.05;
    const BOUNCE_FACTOR = 0.3;
    let mx = -9999, my = -9999;
    const points = [];

    function resizeCanvas() {
        const section = document.querySelector('.contact-section');
        if (section) {
            width = section.clientWidth;
            height = section.clientHeight;
            canvas.width = width;
            canvas.height = height;
        }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < POINTS_COUNT; i++) {
        let x = Math.random() * width;
        let y = Math.random() * height;
        points.push({
            x,
            y,
            vx: (Math.random() - 0.5) * VELOCITY_SCALE,
            vy: (Math.random() - 0.5) * VELOCITY_SCALE
        });
    }

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let p of points) {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -BOUNCE_FACTOR;
            if (p.y < 0 || p.y > height) p.vy *= -BOUNCE_FACTOR;

            ctx.fillStyle = "rgba(235, 11, 77, 0.8)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        for (let i = 0; i < POINTS_COUNT; i++) {
            for (let j = i + 1; j < POINTS_COUNT; j++) {
                const dx = points[i].x - points[j].x;
                const dy = points[i].y - points[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DISTANCE) {
                    ctx.strokeStyle = `rgba(235, 11, 77, ${1 - dist / MAX_DISTANCE})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }
    animate();

    // Scroll to Top Button
    const scrollUpButton = document.getElementById("scroll-up");
    if (scrollUpButton) {
        scrollUpButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
        window.addEventListener("scroll", () => scrollUpButton.style.display = window.scrollY > 200 ? "block" : "none");
    }
});
