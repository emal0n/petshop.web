document.querySelector('#mode-tema').addEventListener('click', () => {
    const body = document.querySelector('body');
    const button = document.querySelector('#mode-tema');
    
    body.classList.toggle('dark-mode');
  });