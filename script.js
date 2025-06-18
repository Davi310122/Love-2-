document.addEventListener('DOMContentLoaded', () => {
    // Elementos DOM
    const heart = document.getElementById('heart');
    const text = document.getElementById('text');
    const pulseRing = document.querySelector('.pulse-ring');
    const heartSound = document.getElementById('heartSound');
    
    // Configurações
    const settings = {
        animationDuration: 800,
        soundEnabled: true,
        vibrationEnabled: true
    };
    
    // Verifica recursos do dispositivo
    const supportsVibration = 'vibrate' in navigator;
    const supportsAudio = !!heartSound && heartSound.canPlayType('audio/mpeg');
    
    // Eventos de interação
    const addInteractionEvents = () => {
        // Eventos de toque
        heart.addEventListener('touchstart', handleInteraction, { passive: false });
        
        // Eventos de mouse
        heart.addEventListener('click', handleInteraction);
    };
    
    // Manipulador de interação
    const handleInteraction = (e) => {
        if (e.type === 'touchstart') {
            e.preventDefault(); // Previne scroll durante o toque
        }
        
        triggerAnimations();
        playEffects();
    };
    
    // Dispara animações
    const triggerAnimations = () => {
        // Reset para permitir animações repetidas
        resetAnimations();
        
        // Força recálculo do layout
        void heart.offsetWidth;
        
        // Aplica animações
        heart.classList.add('animate');
        pulseRing.classList.add('pulse');
        text.classList.add('visible');
        
        // Remove classes após animação
        setTimeout(() => {
            heart.classList.remove('animate');
            pulseRing.classList.remove('pulse');
        }, settings.animationDuration);
    };
    
    // Reseta animações
    const resetAnimations = () => {
        heart.classList.remove('animate');
        pulseRing.classList.remove('pulse');
        text.classList.remove('visible');
    };
    
    // Efeitos sonoros e táteis
    const playEffects = () => {
        // Vibração (se suportado)
        if (settings.vibrationEnabled && supportsVibration) {
            navigator.vibrate([100, 50, 100]);
        }
        
        // Som (se suportado)
        if (settings.soundEnabled && supportsAudio) {
            try {
                heartSound.currentTime = 0;
                heartSound.volume = 0.3;
                heartSound.play().catch(e => {
                    console.log("Reprodução de áudio preventida:", e);
                    settings.soundEnabled = false;
                });
            } catch (e) {
                console.log("Erro no áudio:", e);
                settings.soundEnabled = false;
            }
        }
    };
    
    // Inicialização
    const init = () => {
        addInteractionEvents();
        
        // Verifica se é um dispositivo touch
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            document.body.classList.add('touch-device');
        } else {
            document.body.classList.add('no-touch-device');
        }
        
        console.log("Animação do coração carregada com sucesso!");
    };
    
    init();
});