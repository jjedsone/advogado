// Tratamento global de erros para ignorar erros de extensões do navegador e YouTube API
export const setupErrorHandler = () => {
  // Suprimir avisos de violação do console
  const originalWarn = console.warn;
  const originalError = console.error;
  
  console.warn = (...args: any[]) => {
    const message = args.join(' ');
    // Ignorar avisos de violação do YouTube Player e extensões
    if (
      message.includes('[Violation]') ||
      message.includes('non-passive event listener') ||
      message.includes('scroll-blocking') ||
      message.includes('setTimeout') && message.includes('handler took') ||
      message.includes('proxy.js') ||
      message.includes('disconnected port') ||
      message.includes('chrome-extension') ||
      message.includes('moz-extension') ||
      message.includes('base.js') ||
      message.includes('www-embed-player.js')
    ) {
      // Silenciar esses avisos
      return;
    }
    originalWarn.apply(console, args);
  };

  console.error = (...args: any[]) => {
    const message = args.join(' ');
    // Ignorar erros relacionados a extensões do navegador e YouTube API
    if (
      message.includes('proxy.js') ||
      message.includes('disconnected port') ||
      message.includes('chrome-extension') ||
      message.includes('moz-extension') ||
      (message.includes('base.js') && message.includes('Violation'))
    ) {
      // Silenciar esses erros
      return;
    }
    originalError.apply(console, args);
  };

  // Capturar erros não tratados
  window.addEventListener('error', (event) => {
    // Ignorar erros relacionados a extensões do navegador e YouTube API
    if (
      event.message?.includes('proxy.js') ||
      event.message?.includes('disconnected port') ||
      event.message?.includes('chrome-extension') ||
      event.message?.includes('moz-extension') ||
      event.message?.includes('base.js') ||
      event.message?.includes('www-embed-player.js')
    ) {
      event.preventDefault();
      return false;
    }
  }, { passive: true });

  // Capturar promessas rejeitadas não tratadas
  window.addEventListener('unhandledrejection', (event) => {
    const message = event.reason?.message || String(event.reason);
    
    // Ignorar erros relacionados a extensões do navegador e YouTube API
    if (
      message.includes('proxy.js') ||
      message.includes('disconnected port') ||
      message.includes('chrome-extension') ||
      message.includes('moz-extension') ||
      message.includes('base.js') ||
      message.includes('www-embed-player.js')
    ) {
      event.preventDefault();
      return false;
    }
  });
};

