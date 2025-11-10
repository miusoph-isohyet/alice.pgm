    // Load image statically
    const img = new Image();
    img.crossOrigin = "anonymous"; // necessary if served from a server
    img.src = '0.png'; // image in the same directory

    img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const pixels = imageData.data;

        // Convert RGBA to PGM P5
        let pgmBinary = `P5\n${img.width} ${img.height}\n255\n`;
        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
            pgmBinary += String.fromCharCode(gray);
        }

        // Display as text (not readable as numbers, but technically correct PGM)
        document.getElementById("pgmOutput").textContent = pgmBinary;
    };

    img.onerror = () => {
        console.error("Failed to load image. Make sure '0.png' is in the same folder and you are using a web server.");
    };