
export class Timer{
    constructor(el){
        this.timer = 0;
        this.timerId = setInterval(() => {
            el.innerHTML = this.timer;
            this.timer++;
        }, 1000);
    }

    restart(){
        this.timer = 0;
    }
}