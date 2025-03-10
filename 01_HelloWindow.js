// Global constants
const canvas = document.getElementById('glCanvas'); // Get the canvas element 
const gl = canvas.getContext('webgl2'); // Get the WebGL2 context

if (!gl) {
    console.error('WebGL 2 is not supported by your browser.');
}

// Set canvas size: 초기에는 500x500px
canvas.width = 500;
canvas.height = 500;

// Initialize WebGL settings: viewport and clear color
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0.1, 0.2, 0.3, 1.0);

// Start rendering
render();

// 각각의 영역의 배경색을 그림
function drawRegion(x, y, width, height, color) {
    gl.enable(gl.SCISSOR_TEST);
    gl.scissor(x, y, width, height);
    gl.clearColor(...color);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);
}

// Render loop
function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 각 영역의 색 정하기
    const colors = [
        [0.0, 1.0, 0.0, 1.0], // 1사분면: Green
        [1.0, 0.0, 0.0, 1.0], // 2사분면: Red
        [0.0, 0.0, 1.0, 1.0], // 3사분면: Blue
        [1.0, 1.0, 0.0, 1.0], // 4사분면: Yellow
    ];


    // 각각의 영역 그리기
    drawRegion(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2, colors[0]); // 1사분면
    drawRegion(0, canvas.height / 2, canvas.width / 2, canvas.height / 2, colors[1]); // 2사분면
    drawRegion(0, 0, canvas.width / 2, canvas.height / 2, colors[2]); // 3사분면
    drawRegion(canvas.width / 2, 0, canvas.width / 2, canvas.height / 2, colors[3]); // 4사분면
}

// Resize viewport when window size changes
// 가로세로 비율 유지
window.addEventListener('resize', () => {
    const minSize = Math.min(window.innerWidth, window.innerHeight);
    canvas.width = minSize;
    canvas.height = minSize;
    gl.viewport(0, 0, canvas.width, canvas.height);
    render();
});


