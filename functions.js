document.getElementById('feriadoForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const ano = document.getElementById('anoInput').value;
    const loading = document.querySelector('.loading');
    const feriadosList = document.getElementById('feriadosList');
    
    // Limpar resultados anteriores
    feriadosList.style.display = 'none';
    feriadosList.innerHTML = '';
    loading.style.display = 'block';
  
    fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`)
      .then(response => response.json())
      .then(data => {
        loading.style.display = 'none';
  
        if (data.length === 0) {
          alert('Nenhum feriado encontrado para o ano informado.');
        } else {
          data.forEach(feriado => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerText = `${feriado.date} - ${feriado.name}`;
            feriadosList.appendChild(listItem);
          });
  
          feriadosList.style.display = 'block';
        }
      })
      .catch(error => {
        loading.style.display = 'none';
        alert('Erro ao consultar os feriados. Tente novamente mais tarde.');
      });
  });
  