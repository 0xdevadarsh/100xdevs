function recursiveClock() {
    setTimeout(() => {
        let currentTime = new Date().toTimeString().slice(0, 8);
        console.log(currentTime);
        recursiveClock();
    }, 1000);
}

function counter() {
    console.log("Starting counter ...")
    let currentTime = new Date().toTimeString().slice(0, 8);
    console.log(`Starting time of the counter: ${currentTime}`);
    recursiveClock();  


}

counter()