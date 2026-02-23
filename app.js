const defaultConfig = {
  background_color: '#050505', surface_color: '#121212', accent_color: '#0070FF',
  text_color: '#FFFFFF', secondary_text_color: '#9CA3AF', bank_name: 'BankUp',
  user_name: 'A11Y SV', performance_title: 'Asset Performance', crypto_title: 'Crypto Holdings',
  savings_title: 'Private Funds', footer_text: '© 2024 BankUp Global'
};

let config = { ...defaultConfig }, balance = 945809.00, chartData = [65, 78, 45, 89, 92, 70, 85, 60];
let isFluctuating = false, isSidebarOpen = false;

function toggleSidebar() {
  isSidebarOpen = !isSidebarOpen;
  const sidebar = document.getElementById('mobile-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const hamburger = document.getElementById('hamburger-btn');
  sidebar.classList.toggle('active');
  backdrop.classList.toggle('active');
  hamburger.classList.toggle('active');
  document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(amount);
}

function animateValue(element, start, end, duration) {
  const range = end - start, increment = range / (duration / 16);
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) { current = end; clearInterval(timer); }
    element.textContent = formatCurrency(current);
  }, 16);
}

function randomizeChartData() {
  chartData = chartData.map(() => Math.floor(Math.random() * 60) + 40);
  renderChart();
}

function renderChart() {
  const chartContainer = document.getElementById('chart-bars');
  if (!chartContainer) return;
  chartContainer.innerHTML = '';
  chartData.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.className = 'chart-bar flex flex-col items-center gap-2';
    bar.innerHTML = `<div class="relative w-12 rounded-t hover-lift" style="height: ${value}px; background: linear-gradient(to top, ${config.accent_color}, rgba(0, 112, 255, 0.3));"><div class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium" style="color: ${config.secondary_text_color}">${value}%</div></div><span class="text-xs" style="color: ${config.secondary_text_color}">Q${index + 1}</span>`;
    chartContainer.appendChild(bar);
  });
}

function startBalanceFluctuation() {
  if (isFluctuating) return;
  isFluctuating = true;
  setInterval(() => {
    const element = document.getElementById('main-balance');
    const oldBalance = balance;
    balance += (Math.random() - 0.5) * 20;
    if (element) animateValue(element, oldBalance, balance, 2000);
  }, 3000);
}

function initApp() {
  const root = document.getElementById('root');
  root.innerHTML = `<div class="w-full flex"><!-- Sidebar + Main --></div>`;
  renderChart();
  startBalanceFluctuation();
}

initApp();