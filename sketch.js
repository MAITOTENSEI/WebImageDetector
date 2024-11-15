function detectObject(video, canvas){
    const render = canvas.getContext("2d");

    render.beginPath();
    render.lineWidth = 2;
    render.strokeStyle = "#2fad09";

    render.font = "16px consolas";

    render.fillStyle = "#ffffff";
    render.fillRect(0, 0, canvas.width, canvas.height);
    render.fillStyle = "#000000";
    render.fillText("Model Loading...", 4, 14);
    render.fillStyle = "#2fad09";

    return ml5.YOLO({
        filterBoxesThreshold: 0.01,
        IOUThreshold: 0.2,
        classProbThreshold: 0.5
    }).ready
    .then((model)=>{
        render.clearRect(0, 0, canvas.width, canvas.height);
        video.play();

        return setInterval(()=>{
            if(!model.isPredicting){
                model.detect(video)
                .then((results)=>{
                    render.clearRect(0, 0, canvas.width, canvas.height);

                    for(const result of results){
                        render.strokeRect(result.x * canvas.width, result.y * canvas.height, result.w * canvas.width, result.h * canvas.height);
                        render.fillText(`${result.label}: ${Math.round(result.confidence * 100)} %`, result.x * canvas.width + 4, result.y * canvas.height + 14);
                    }
                });
            }
        }, 67);
    });
}
