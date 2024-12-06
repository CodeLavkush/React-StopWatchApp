import React, {useState, useRef, useEffect} from "react";


function StopWatch(){

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(()=>{

        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10);
        }

        return ()=>{
            clearInterval(intervalIdRef.current);
        }
        
    }, [isRunning])


    function startTimer(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stopTimer(){
        setIsRunning(false);
    }

    function resetTimer(){
        setElapsedTime(0);
        setIsRunning(false)
    }

    function formatTime(){
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60)
        let miliseconds = Math.floor((elapsedTime % 1000) / 10)

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        miliseconds = String(miliseconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}:${miliseconds}`;
    }

    return(
        <>
            <div className="container">
                <div className="display">{formatTime()}</div>
                <div className="controls">
                    <button onClick={startTimer} className="start-btn">Start</button>
                    <button onClick={stopTimer} className="stop-btn">Stop</button>
                    <button onClick={resetTimer} className="reset-btn">Rest</button>
                </div>
            </div>
        </>
    )
}

export default StopWatch;