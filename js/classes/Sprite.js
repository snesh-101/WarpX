class Sprite {
  constructor({ position, imageSrc }) {
      this.position = position;
      this.image = new Image();
      this.width = 0;
      this.height = 0;
      this.image.onload = () => {
          this.width = this.image.width;
          this.height = this.image.height;
      };
      this.image.src = imageSrc;
  }

  draw() {
        if (!this.image) return;
        console.log(`Drawing ${this.image.src} at ${this.position.x}, ${this.position.y} - Time: ${performance.now()}`);
        console.trace();
      c.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
      this.draw();
  }
}

