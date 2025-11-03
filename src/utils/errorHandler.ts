// Tratamento global de erros para ignorar erros de extensões do navegador
export const setupErrorHandler = () => {
  // Capturar erros não tratados
  window.addEventListener('error', (event) => {
    // Ignorar erros relacionados a extensões do navegador
    if (
      event.message?.includes('proxy.js') ||
      event.message?.includes('disconnected port') ||
      event.message?.includes('chrome-extension') ||
      event.message?.includes('moz-extension')
    ) {
      event.preventDefault();
      console.debug('Erro de extensão do navegador ignorado:', event.message);
      return false;
    }
  });

  // Capturar promessas rejeitadas não tratadas
  window.addEventListener('unhandledrejection', (event) => {
    const message = event.reason?.message || String(event.reason);
    
    // Ignorar erros relacionados a extensões do navegador
    if (
      message.includes('proxy.js') ||
      message.includes('disconnected port') ||
      message.includes('chrome-extension') ||
      message.includes('moz-extension')
    ) {
      event.preventDefault();
      console.debug('Promise rejeitada de extensão ignorada:', message);
      return false;
    }
  });
};

