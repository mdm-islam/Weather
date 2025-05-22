// Set Lottie animation based on weather condition
function setWeatherAnimation(condition) {
  const animation = document.getElementById('animation');
  animation.innerHTML = '';

  let animationURL = '';

  if (condition.toLowerCase().includes('rain')) {
    animationURL = 'https://assets9.lottiefiles.com/packages/lf20_kq5rGs.json';
  } else if (condition.toLowerCase().includes('clear')) {
    animationURL = 'https://assets2.lottiefiles.com/packages/lf20_jmBauI.json';
  } else if (condition.toLowerCase().includes('cloud')) {
    animationURL = 'https://assets2.lottiefiles.com/private_files/lf30_tdnzcd.json';
  } else if (condition.toLowerCase().includes('snow')) {
    animationURL = 'https://assets7.lottiefiles.com/packages/lf20_BSVgyt.json';
  }

  if (animationURL) {
    animation.innerHTML = `
      <lottie-player
        src="${animationURL}"
        background="transparent"
        speed="1"
        style="width: 250px; height: 250px;"
        loop
        autoplay>
      </lottie-player>`;
  }
}
