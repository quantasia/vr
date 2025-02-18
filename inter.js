document.querySelector('a-scene').addEventListener('loaded', function () {
      console.log("A-Frame scene loaded! Now running script...");
      const rightHand = document.querySelector('#right-hand');
      const leftHand = document.querySelector('#left-hand');
      const squareTemplate = document.querySelector('#square-template');

      // Function to create and position a box
      function createBox(color) {
        // Clone the square template
        const square = squareTemplate.cloneNode(true);
        square.setAttribute('visible', true);

        // Find the <a-box> child inside the cloned template and set its color
        const box = square.querySelector('a-box');
        box.setAttribute('color', color);

        // Position the square in front of the controller
        const controllerPosition = rightHand.getAttribute('position');
        const controllerRotation = rightHand.getAttribute('rotation');
        square.setAttribute('position', {
          x: controllerPosition.x,
          y: controllerPosition.y,
          z: controllerPosition.z - 1
        });
        square.setAttribute('rotation', controllerRotation);

        // Add the square to the scene
        square.removeAttribute('id'); // Remove the template ID
        document.querySelector('a-scene').appendChild(square);
      }

      // Function to create and position a ball
      function createBall(color) {
        // Clone the square template (acts as a base container)
        const ball = squareTemplate.cloneNode(true);
        ball.setAttribute('visible', true);

        // Replace the <a-box> in the template with a <a-sphere>
        const box = ball.querySelector('a-box');
        const sphere = document.createElement('a-sphere');
        sphere.setAttribute('radius', 0.25);
        sphere.setAttribute('color', color);
        ball.replaceChild(sphere, box);

        // Position the ball in front of the controller
        const controllerPosition = rightHand.getAttribute('position');
        const controllerRotation = rightHand.getAttribute('rotation');
        ball.setAttribute('position', {
          x: controllerPosition.x,
          y: controllerPosition.y,
          z: controllerPosition.z - 1
        });
        ball.setAttribute('rotation', controllerRotation);

        ball.removeAttribute('id'); // Remove the template ID
        document.querySelector('a-scene').appendChild(ball);
      }

      // Function to create falling particles from the sky for 5 seconds
      function createFallingParticles() {
        const scene = document.querySelector('a-scene');
        const particles = [];
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('a-sphere');
          particle.setAttribute('radius', 0.1);
          particle.setAttribute('color', '#FFF');
          const x = Math.random() * 4 - 2;
          const z = Math.random() * 4 - 2;
          particle.setAttribute('position', { x: x, y: 5, z: z });
          particle.setAttribute('animation', `property: position; to: ${x} 0 ${z}; dur: 5000; easing: linear;`);
          scene.appendChild(particle);
          particles.push(particle);
        }
        // Remove particles after 5 seconds
        setTimeout(() => {
          particles.forEach(particle => particle.parentNode.removeChild(particle));
        }, 5000);
      }

      // Create a blue ball on A button press
      rightHand.addEventListener('abuttondown', () => {
         createBall('blue');
      });

      // Play sound on B button press
      rightHand.addEventListener('bbuttondown', () => {
        var enti = document.querySelector('#riverSound');
        enti.components.sound.playSound();
      });

      // Create falling particles from the sky for 5 seconds on axis move
      rightHand.addEventListener('axismove', () => {
         createFallingParticles();
      });

      // Create a green box on trigger button press
      rightHand.addEventListener('triggerdown', () => {
        createBox('green');        
      });

      // Create a blue box on grip button press
      rightHand.addEventListener('gripdown', () => {
        createBox('blue');        
      });

      leftHand.addEventListener('triggerdown', () => {
         const scene = document.querySelector('a-scene');
         const numbers = [];
         const count = 50;
         for (let i = 0; i < count; i++) {
           const numberEl = document.createElement('a-text');
           const randomNumber = Math.floor(Math.random() * 10);
           numberEl.setAttribute('value', randomNumber);
           numberEl.setAttribute('color', 'green');
           numberEl.setAttribute('position', {
             x: (Math.random() - 0.5) * 10,
             y: Math.random() * 5 + 1,
             z: (Math.random() - 0.5) * 10
           });
           numberEl.setAttribute('opacity', 1);
           numberEl.setAttribute('animation', {
             property: 'opacity',
             to: 0,
             dur: 3000,
             easing: 'linear'
           });
           scene.appendChild(numberEl);
           numbers.push(numberEl);
         }
         // Remove the green numbers after 3 seconds
         setTimeout(() => {
           numbers.forEach(el => {
             if (el.parentNode) {
               el.parentNode.removeChild(el);
             }
           });
         }, 3000);
      }
      );
});
