export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.gridSize = 20;
    this.snake = [{ x: 10, y: 10 }];
    this.direction = { x: 0, y: 0 };
    this.food = this.generateFood();
    this.score = 0;
    this.gameOver = false;
    
    this.setupControls();
  }

  generateFood() {
    const x = Math.floor(Math.random() * (this.canvas.width / this.gridSize));
    const y = Math.floor(Math.random() * (this.canvas.height / this.gridSize));
    return { x, y };
  }

  setupControls() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (this.direction.y === 0) this.direction = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (this.direction.y === 0) this.direction = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (this.direction.x === 0) this.direction = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (this.direction.x === 0) this.direction = { x: 1, y: 0 };
          break;
      }
    });
  }

  update() {
    if (this.gameOver) return;

    // Move snake
    const head = { 
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y 
    };

    // Check wall collision
    if (
      head.x < 0 || 
      head.x >= this.canvas.width / this.gridSize ||
      head.y < 0 || 
      head.y >= this.canvas.height / this.gridSize
    ) {
      this.endGame();
      return;
    }

    // Check self collision
    for (const segment of this.snake) {
      if (head.x === segment.x && head.y === segment.y) {
        this.endGame();
        return;
      }
    }

    this.snake.unshift(head);

    // Check food collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      document.getElementById('score').textContent = this.score;
      this.food = this.generateFood();
    } else {
      this.snake.pop();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw snake
    this.ctx.fillStyle = '#4CAF50';
    for (const segment of this.snake) {
      this.ctx.fillRect(
        segment.x * this.gridSize,
        segment.y * this.gridSize,
        this.gridSize - 2,
        this.gridSize - 2
      );
    }

    // Draw food
    this.ctx.fillStyle = '#FF4136';
    this.ctx.fillRect(
      this.food.x * this.gridSize,
      this.food.y * this.gridSize,
      this.gridSize - 2,
      this.gridSize - 2
    );
  }

  endGame() {
    this.gameOver = true;
    document.getElementById('finalScore').textContent = this.score;
    document.getElementById('gameOver').style.display = 'block';
  }

  reset() {
    this.snake = [{ x: 10, y: 10 }];
    this.direction = { x: 0, y: 0 };
    this.food = this.generateFood();
    this.score = 0;
    this.gameOver = false;
    document.getElementById('score').textContent = '0';
    document.getElementById('gameOver').style.display = 'none';
  }
}