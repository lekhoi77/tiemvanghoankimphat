// Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
//Hero
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('show');
        }
        var heroButton = document.querySelector('.hero button');
        if (heroButton) {
            heroButton.classList.add('show');
        }
    }, 600);

    // Auto slider
    const slides = document.querySelectorAll('.slider .slide');
    let current = 0;
    if (slides.length > 0) {
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 3000); // đổi slide mỗi 3 giây
    }

    // Lấy tất cả các liên kết có href bắt đầu bằng #
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    // Thêm sự kiện click cho mỗi liên kết
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Ngăn hành vi mặc định của trình duyệt
            e.preventDefault();
            
            // Lấy phần tử đích từ thuộc tính href
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll đến phần tử đích với hiệu ứng mượt
                window.scrollTo({
                    top: targetElement.offsetTop - 20, // Trừ 20px để có khoảng cách nhỏ ở trên
                    behavior: 'smooth'
                });
            }
        });
    });
});
