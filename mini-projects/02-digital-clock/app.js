function updateClock() {
  const now = new Date();
  
  // Extract hours, minutes, seconds
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  
  // Format 12-hour clock with AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const formattedHours = String(hours).padStart(2, "0");

  // Render to DOM using template literals
  const clockDisplay = document.querySelector("#clock-display");
  clockDisplay.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
}

// Run immediately, then repeat every 1 second
updateClock();
setInterval(updateClock, 1000);