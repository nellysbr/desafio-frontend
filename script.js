const avatarUrls = [
    'https://storage.googleapis.com/mokaly_public/assets/avatars/mokaly-avatar-cup-2.png',
    'https://storage.googleapis.com/mokaly_public/assets/avatars/mokaly-avatar-cup-3.png',
    'https://storage.googleapis.com/mokaly_public/assets/avatars/mokaly-avatar-cup-4.png',
    'https://storage.googleapis.com/mokaly_public/assets/avatars/mokaly-avatar-cup-5.png',
    'https://storage.googleapis.com/mokaly_public/assets/avatars/mokaly-avatar-cup-6.png'
];

// Seleção dos elementos DOM necessários
const avatarContainer = document.getElementById('avatarContainer');
const audioEffect = document.getElementById('audioEffect');
const repeatButton = document.getElementById('repeatButton');

// Função para gerar uma posição horizontal aleatória para o avatar
function getRandomPosition() {
    // Retorna um número aleatório entre 0 e a largura da janela menos 48px (largura do avatar)
    return Math.random() * (window.innerWidth - 48);
}

// Função para criar e animar um avatar
function createAvatar(url) {
    // Cria um elemento de imagem para o avatar
    const avatar = document.createElement('img');
    avatar.src = url;
    avatar.classList.add('avatar');
    // Define a posição horizontal aleatória
    avatar.style.left = `${getRandomPosition()}px`;
    // Adiciona o avatar ao container
    avatarContainer.appendChild(avatar);

    const duration = 3000; // Duração da animação em milissegundos
    const isMobile = window.innerWidth <= 768; // Verifica se é uma tela móvel

    // Anima o avatar
    avatar.animate([
        // Posição inicial (topo para mobile, base para desktop)
        { [isMobile ? 'top' : 'bottom']: isMobile ? '-48px' : '-48px' },
        // Posição final (move para fora da tela)
        { [isMobile ? 'top' : 'bottom']: `${window.innerHeight + 48}px` }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => avatar.remove(); // Remove o avatar após a animação
}

// Função principal para executar a sequência de animação
function playAnimation(delay = 4000) {
    // Esconde o botão de repetição
    repeatButton.style.display = 'none';
    
    // Inicia a sequência após o delay especificado
    setTimeout(() => {
        let avatarIndex = 0;
        // Cria um intervalo para exibir os avatares sequencialmente
        const intervalId = setInterval(() => {
            if (avatarIndex < avatarUrls.length) {
                // Cria e anima um novo avatar
                createAvatar(avatarUrls[avatarIndex]);
                avatarIndex++;
            } else {
                // Todos os avatares foram exibidos
                clearInterval(intervalId);
                // Aguarda 3 segundos e então toca o áudio
                setTimeout(() => {
                    audioEffect.play();
                    // Exibe o botão de repetição após 1 segundo
                    setTimeout(() => {
                        repeatButton.style.display = 'block';
                    }, 1000);
                }, 3000);
            }
        }, 2000); // Intervalo de 2 segundos entre cada avatar
    }, delay);
}

repeatButton.addEventListener('click', () => playAnimation(0));

// Garante que o áudio seja carregado antes de iniciar a animação
audioEffect.addEventListener('canplaythrough', () => {
    playAnimation();
}, { once: true }); // Garante que o evento só seja disparado uma vez

audioEffect.load();