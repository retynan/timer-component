const app = Vue.createApp({});

app.component('timer-component', {
    data()
    {
        return {
            interval: null,

            microsecond:     0,
            timeToSeconds:   0,
            timeToFormatted: '00:00:00',
        }
    },
    methods: {
        timerStart()
        {
            if (this.interval)
                return;

            this.interval = setInterval(this.timerHandler, 10);
        },
        timerStop()
        {
            clearInterval(this.interval);
            this.interval = null;
        },
        timerClear()
        {
            clearInterval(this.interval);

            this.interval        = null;
            this.timeToSeconds   = 0;
            this.timeToFormatted = '00:00:00';
        },
        timerHandler()
        {
            this.microsecond += 1;

            if (this.microsecond === 100)
            {
                this.timeToSeconds += 1;

                let date = new Date(this.timeToSeconds * 1000);

                let hours   = date.getUTCHours().toString().padStart(2, '0');
                let minutes = date.getUTCMinutes().toString().padStart(2, '0');
                let seconds = date.getSeconds().toString().padStart(2, '0');

                this.timeToFormatted = `${hours}:${minutes}:${seconds}`;

                this.microsecond = 0;
            }
        }
    },
    template: `
        <div class="timer-component">
            <div class="time">{{ timeToFormatted }}</div>
            <div class="buttons">
                <button class="green" v-on:click="timerStart">Start</button>
                <button class="blue" v-on:click="timerStop">Stop</button>
                <button class="red" v-on:click="timerClear">Clear</button>
            </div>
        </div>
    `
});

app.mount('#app');