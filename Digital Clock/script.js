
        document.addEventListener('DOMContentLoaded', function() {
            const timeElement = document.getElementById('time');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');
            const dateElement = document.getElementById('date');
            const formatToggle = document.getElementById('formatToggle');
            
            let is24HourFormat = true;
            
            // Days and months arrays
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            // Format toggle event listener
            formatToggle.addEventListener('change', function() {
                is24HourFormat = !this.checked;
                updateTime();
            });
            
            // Update time every second
            function updateTime() {
                const now = new Date();
                
                // Get time components
                let hours = now.getHours();
                const minutes = now.getMinutes();
                const seconds = now.getSeconds();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                
                // Format hours based on 12/24 hour setting
                if (!is24HourFormat) {
                    hours = hours % 12 || 12;
                }
                
                // Format time with leading zeros
                const formattedHours = hours.toString().padStart(2, '0');
                const formattedMinutes = minutes.toString().padStart(2, '0');
                const formattedSeconds = seconds.toString().padStart(2, '0');
                
                // Update time display
                hoursElement.textContent = formattedHours;
                minutesElement.textContent = formattedMinutes;
                secondsElement.textContent = formattedSeconds;
                
                // Add AM/PM indicator if in 12-hour mode
                if (!is24HourFormat) {
                    if (!document.getElementById('ampm')) {
                        const ampmSpan = document.createElement('span');
                        ampmSpan.id = 'ampm';
                        ampmSpan.style.fontSize = '1.5rem';
                        ampmSpan.style.marginLeft = '10px';
                        ampmSpan.style.color = 'var(--secondary-color)';
                        timeElement.appendChild(ampmSpan);
                    }
                    document.getElementById('ampm').textContent = ampm;
                } else {
                    const ampmElement = document.getElementById('ampm');
                    if (ampmElement) {
                        ampmElement.remove();
                    }
                }
                
                // Update date display
                const dayName = days[now.getDay()];
                const monthName = months[now.getMonth()];
                const date = now.getDate();
                const year = now.getFullYear();
                
                dateElement.textContent = `${dayName}, ${monthName} ${date}, ${year}`;
                
                // Add smooth transition effect
                timeElement.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    timeElement.style.transform = 'scale(1)';
                }, 200);
            }
            
            // Initial call and set interval
            updateTime();
            setInterval(updateTime, 1000);
            
            // Add mouse move effect for parallax
            document.addEventListener('mousemove', function(e) {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                
                const clockContainer = document.querySelector('.clock-container');
                clockContainer.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * 5}deg) rotateY(${(x - 0.5) * 5}deg)`;
            });
        });
