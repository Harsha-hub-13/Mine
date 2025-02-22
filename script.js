let highestZ = 1;

class Paper {
    constructor(paper) {
        this.paper = paper;
        this.holdingPaper = false;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;

        this.init();
    }

    init() {
        // Mouse Events
        this.paper.addEventListener("mousedown", (e) => this.startDrag(e.clientX, e.clientY));
        document.addEventListener("mousemove", (e) => this.drag(e.clientX, e.clientY));
        window.addEventListener("mouseup", () => this.stopDrag());

        // Touch Events
        this.paper.addEventListener("touchstart", (e) => {
            const touch = e.touches[0];
            this.startDrag(touch.clientX, touch.clientY);
        });

        document.addEventListener("touchmove", (e) => {
            const touch = e.touches[0];
            this.drag(touch.clientX, touch.clientY);
        });

        window.addEventListener("touchend", () => this.stopDrag());
    }

    startDrag(x, y) {
        this.holdingPaper = true;
        this.startX = x;
        this.startY = y;
        this.paper.style.zIndex = highestZ++;
    }

    drag(x, y) {
        if (!this.holdingPaper) return;

        let deltaX = x - this.startX;
        let deltaY = y - this.startY;

        this.currentX += deltaX;
        this.currentY += deltaY;

        this.startX = x;
        this.startY = y;

        requestAnimationFrame(() => {
            this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
        });
    }

    stopDrag() {
        this.holdingPaper = false;
    }
}

// Apply drag to all .paper elements
document.querySelectorAll(".paper").forEach(paper => new Paper(paper));
