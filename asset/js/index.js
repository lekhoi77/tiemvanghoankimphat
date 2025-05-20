// Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
//Hero
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('show');
    }, 300);

    setTimeout(() => {
        document.querySelector('.hero button').classList.add('show');
    }, 800);

    // Slide show
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slider .slide');

    function showSlide() {
        slides.forEach(slide => slide.classList.remove('active'));
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].classList.add('active');
        setTimeout(showSlide, 5000); // Change image every 5 seconds
    }

    if (slides.length > 0) {
        showSlide();
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

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.right');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a navigation item
        document.querySelectorAll('.right li').forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInsideNav = event.target.closest('.right');
            const isClickOnHamburger = event.target.closest('.hamburger');
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Mobile chart interaction handling
    function setupChartInteraction() {
        const chartContainer = document.querySelector('.tradingview-widget-container');
        const chartOverlay = document.querySelector('.chart-overlay');
        const enableChartBtn = document.getElementById('enable-chart');
        
        if (!chartOverlay || !enableChartBtn) return;
        
        // Only show overlay on mobile devices
        if (window.innerWidth <= 480) {
            chartOverlay.classList.add('active');
        }
        
        // Enable chart interaction when button is clicked
        enableChartBtn.addEventListener('click', () => {
            chartOverlay.classList.remove('active');
            
            // Re-enable overlay after 30 seconds to allow user to scroll past
            setTimeout(() => {
                if (window.innerWidth <= 480) {
                    chartOverlay.classList.add('active');
                }
            }, 30000); // 30 seconds
        });
        
        // Re-check on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 480) {
                if (!chartOverlay.classList.contains('active')) {
                    chartOverlay.classList.add('active');
                }
            } else {
                chartOverlay.classList.remove('active');
            }
        });
    }
    
    // Initialize chart interaction after a delay to ensure TradingView widget is loaded
    setTimeout(setupChartInteraction, 2000);

    // Scroll reveal functionality
    const revealSections = document.querySelectorAll('.reveal-section');
    const staggerItems = document.querySelectorAll('.stagger-item');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85;
        
        // Check sections
        revealSections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('active');
                
                // Also check for stagger items within this section
                const staggerItemsInSection = section.querySelectorAll('.stagger-item');
                staggerItemsInSection.forEach((item) => {
                    item.classList.add('active');
                });
            }
        });
        
        // Check individual stagger items not in sections
        staggerItems.forEach((item) => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                item.classList.add('active');
            }
        });
    }
    
    // Initial check
    setTimeout(checkScroll, 300);
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // Handle menu clicks for navigation
    const menuLinks = document.querySelectorAll('.right li a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.right');
                
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Scroll to target section
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top functionality
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    
    // Show/hide the button based on scroll position
    function toggleScrollToTopButton() {
        if (window.pageYOffset > 300) { // Show the button after scrolling 300px
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    }
    
    // Smooth scroll to top when the button is clicked
    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Check scroll position on page load
        toggleScrollToTopButton();
        
        // Check scroll position on scroll
        window.addEventListener('scroll', toggleScrollToTopButton);
    }

    // Social action buttons functionality
    function handleSocialButtons() {
        const zaloButton = document.querySelector('.zalo-button');
        const messButton = document.querySelector('.mess-button');
        
        // Show/hide the buttons based on scroll position
        function toggleSocialButtons() {
            if (window.pageYOffset > 300) {
                // Show buttons with staggered delay
                setTimeout(() => {
                    zaloButton.classList.add('show');
                    zaloButton.style.pointerEvents = 'auto';
                }, 100);
                
                setTimeout(() => {
                    messButton.classList.add('show');
                    messButton.style.pointerEvents = 'auto';
                }, 200);
                
                // Scroll to top button handled by the existing toggleScrollToTopButton function
            } else {
                // Hide buttons with staggered delay
                setTimeout(() => {
                    messButton.classList.remove('show');
                    messButton.style.pointerEvents = 'none';
                }, 100);
                
                setTimeout(() => {
                    zaloButton.classList.remove('show');
                    zaloButton.style.pointerEvents = 'none';
                }, 200);
                
                // Scroll to top button handled by the existing toggleScrollToTopButton function
            }
        }
        
        // Check position on load
        toggleSocialButtons();
        
        // Check position on scroll
        window.addEventListener('scroll', toggleSocialButtons);
        
        // Add hover animation effects
        const actionButtons = document.querySelectorAll('.action-button');
        
        actionButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.1)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }
    
    // Initialize social buttons
    handleSocialButtons();

    // Notification popup functionality
    function handleNotificationPopup() {
        const notificationPopup = document.getElementById('notification-popup');
        const closeNotificationBtn = document.getElementById('close-notification');
        
        if (!notificationPopup || !closeNotificationBtn) return;
        
        // Get current time
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        
        // Check if time is between 7pm (19) and 9am (9)
        const isNotificationTime = (currentHour >= 19 || currentHour < 9);
        
        if (isNotificationTime) {
            // Show notification after a short delay
            setTimeout(() => {
                notificationPopup.classList.add('show');
            }, 1000);
            
            // Close notification when close button is clicked
            closeNotificationBtn.addEventListener('click', () => {
                notificationPopup.classList.remove('show');
            });
            
            // Also close notification when clicking outside the content
            notificationPopup.addEventListener('click', (e) => {
                if (e.target === notificationPopup) {
                    notificationPopup.classList.remove('show');
                }
            });
        }
    }
    
    // Initialize notification popup
    handleNotificationPopup();
});

// Hàm để lấy dữ liệu từ Google Sheets
async function fetchGoldPrices() {
    // ID của Google Sheet
    const sheetId = '1Mo-iwZLuSR0k7TCwhjzcSM0ZTIMgkWykytG_YpikST0';
    
    // Sử dụng URL xuất bản công khai thay vì API
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

    try {
        console.log('Đang tải dữ liệu từ Google Sheets...');
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        // Xử lý phản hồi đặc biệt từ Google Sheets
        // Tìm vị trí bắt đầu của JSON thực tế
        const jsonStartIndex = text.indexOf('{');
        const jsonEndIndex = text.lastIndexOf('}') + 1;
        // Cắt lấy phần JSON hợp lệ
        const jsonText = text.substring(jsonStartIndex, jsonEndIndex);
        const jsonData = JSON.parse(jsonText);
        console.log('Đã nhận dữ liệu từ Google Sheets:', jsonData);
        
        if (jsonData && jsonData.table && jsonData.table.rows) {
            const formattedData = formatGoogleSheetsData(jsonData);
            updateGoldPriceTable(formattedData);
            // Lấy ngày và giờ từ Google Sheet
            updatePriceDateFromSheet(jsonData); 
        } else {
            console.error('Không có dữ liệu trong Google Sheets hoặc định dạng không đúng');
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ Google Sheets:', error);
        // Giữ nguyên dữ liệu hiện tại nếu có lỗi
        // alert('Không thể tải dữ liệu mới. Hiển thị dữ liệu cũ.');
    }
}

// Hàm chuyển đổi dữ liệu từ Google Sheets sang định dạng cần thiết
function formatGoogleSheetsData(jsonData) {
    const rows = jsonData.table.rows;
    const formattedData = [];
    
    // Thêm hàng tiêu đề
    formattedData.push(['Loại Vàng', 'Mua Vào', 'Bán Ra']);
    
    // Thêm dữ liệu
    rows.forEach(row => {
        const formattedRow = [];
        if (row.c) {
            row.c.forEach(cell => {
                formattedRow.push(cell ? (cell.v || '') : '');
            });
            formattedData.push(formattedRow);
        }
    });
    
    return formattedData;
}

//CÂP NHẬT GIÁ VÀNG

// Hàm để cập nhật bảng giá vàng từ dữ liệu Google Sheets
function updateGoldPriceTable(values) {
    // Bỏ qua hàng đầu tiên nếu đó là tiêu đề
    const dataRows = values.slice(1);
    const tableBody = document.querySelector('.pricetable-table tbody');
    
    if (dataRows.length === 0) {
        console.warn('Không có dữ liệu trong Google Sheets, giữ nguyên dữ liệu hiện tại');
        return; // Giữ nguyên dữ liệu hiện tại nếu không có dữ liệu mới
    }
    
    // Xóa dữ liệu cũ
    tableBody.innerHTML = '';
    
    // Thêm dữ liệu mới
    dataRows.forEach(row => {
        const tr = document.createElement('tr');
        
        // Tạo ô loại vàng
        const tdName = document.createElement('td');
        tdName.className = 'name';
        tdName.textContent = row[0]; // Loại vàng
        
        // Tạo ô giá mua vào
        const tdBuy = document.createElement('td');
        const buyPrice = document.createElement('b');
        buyPrice.textContent = row[1]; // Giá mua
        tdBuy.appendChild(buyPrice);
        
        // Tạo ô giá bán ra
        const tdSell = document.createElement('td');
        const sellPrice = document.createElement('b');
        sellPrice.textContent = row[2]; // Giá bán
        tdSell.appendChild(sellPrice);
        
        // Thêm các ô vào hàng
        tr.appendChild(tdName);
        tr.appendChild(tdBuy);
        tr.appendChild(tdSell);
        
        // Thêm hàng vào bảng
        tableBody.appendChild(tr);
    });
}

// Hàm cập nhật ngày giờ từ Google Sheet
function updatePriceDateFromSheet(jsonData) {
    try {
        console.log('Dữ liệu JSON nhận được:', jsonData);
        const rows = jsonData.table.rows;
        let dateValue = '';
        let timeValue = '';
        
        // Tìm tất cả các giá trị ngày trong dữ liệu (có thể nằm ở bất kỳ hàng nào)
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].c && rows[i].c.length > 4) {
                // Kiểm tra cột E (index 4)
                if (rows[i].c[4] && rows[i].c[4].v) {
                    console.log(`Tìm thấy giá trị ngày ở hàng ${i}, cột E:`, rows[i].c[4].v);
                    
                    // Xử lý giá trị ngày từ Google Sheets
                    let rawDateValue = rows[i].c[4].v;
                    
                    // Kiểm tra nếu là chuỗi 'Date(...)'
                    if (typeof rawDateValue === 'string' && rawDateValue.startsWith('Date(')) {
                        // Trích xuất các tham số từ Date(yyyy,m,d)
                        const params = rawDateValue.substring(5, rawDateValue.length - 1).split(',');
                        if (params.length >= 3) {
                            const year = parseInt(params[0]);
                            // Google Sheets tháng bắt đầu từ 0 nên cần +1
                            const month = parseInt(params[1]) + 1;
                            const day = parseInt(params[2]);
                            dateValue = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
                        } else {
                            dateValue = rawDateValue; // Giữ nguyên nếu không phân tích được
                        }
                    } else if (rows[i].c[4].f) {
                        // Nếu có giá trị định dạng, sử dụng nó
                        dateValue = rows[i].c[4].f;
                    } else {
                        // Nếu là ngày thực sự, định dạng lại
                        dateValue = rawDateValue;
                    }
                }
                
                // Kiểm tra cột F (index 5)
                if (rows[i].c.length > 5 && rows[i].c[5] && rows[i].c[5].v) {
                    console.log(`Tìm thấy giá trị giờ ở hàng ${i}, cột F:`, rows[i].c[5].v);
                    
                    // Xử lý giá trị giờ từ Google Sheets
                    let rawTimeValue = rows[i].c[5].v;
                    
                    // Kiểm tra nếu là chuỗi 'Date(...)'
                    if (typeof rawTimeValue === 'string' && rawTimeValue.startsWith('Date(')) {
                        // Trích xuất các tham số từ Date(yyyy,m,d,h,m,s)
                        const params = rawTimeValue.substring(5, rawTimeValue.length - 1).split(',');
                        if (params.length >= 6) {
                            const hour = parseInt(params[3]);
                            const minute = parseInt(params[4]);
                            timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                        } else {
                            timeValue = rawTimeValue; // Giữ nguyên nếu không phân tích được
                        }
                    } else if (rows[i].c[5].f) {
                        // Nếu có giá trị định dạng, sử dụng nó
                        timeValue = rows[i].c[5].f;
                    } else {
                        // Nếu đã là chuỗi giờ, giữ nguyên
                        timeValue = rawTimeValue;
                    }
                }
            }
        }
        
        // Nếu không tìm thấy ngày giờ, sử dụng thời gian hiện tại
        if (!dateValue) {
            console.warn('Không tìm thấy giá trị ngày trong Google Sheet, sử dụng thời gian hiện tại');
            const now = new Date();
            dateValue = now.toLocaleDateString('vi-VN');
        }
        
        if (!timeValue) {
            console.warn('Không tìm thấy giá trị giờ trong Google Sheet, sử dụng thời gian hiện tại');
            const now = new Date();
            timeValue = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        }
        
        // Cập nhật hiển thị
        document.querySelector('.pricetable-info span:first-child b').textContent = dateValue;
        document.querySelector('.pricetable-info span:nth-child(2) b').textContent = timeValue;
        
        console.log('Đã cập nhật ngày và giờ từ Google Sheet:', dateValue, timeValue);
    } catch (error) {
        console.error('Lỗi khi cập nhật ngày giờ:', error);
        // Sử dụng giờ hiện tại nếu có lỗi
        updatePriceDate();
    }
}

// Hàm cập nhật ngày giờ sử dụng thời gian hiện tại (dự phòng)
function updatePriceDate() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('vi-VN');
    const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    
    document.querySelector('.pricetable-info span:first-child b').textContent = dateStr;
    document.querySelector('.pricetable-info span:nth-child(2) b').textContent = timeStr;
}

// Gọi hàm lấy dữ liệu khi trang tải xong
document.addEventListener('DOMContentLoaded', fetchGoldPrices);

// CẬP NHẬT GIÁ VÀNG