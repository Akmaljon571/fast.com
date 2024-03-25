class Utils {
    constructor() { }

    selectElement(find, search) {
        if (search) return document.querySelector("." + find)
        return document.getElementById(find)
    }

    // Elementlarga style beruvchi funksiya, Elementlar[], stillar[], qiymatlar[]
    elementStyleAdd(elements, styles, values) {
        for (const index in elements) {
            elements[index].style[styles[index]] = values[index]
        }
    }
}

class Language {
    utils = new Utils()
    language = {
        uz: {
            h1: 'Sizning Internet tezligingiz',
            info: "Batafsil ma'lumotni ko'rsatish",
            mb: "Mbps",
            dark: "QORA",
            light: "OQ"
        },
        ru: {
            h1: 'Ваша скорость интернета',
            info: "Показать больше информации",
            mb: "Mбит/c",
            dark: "ЧЕРНЫЙ",
            light: "БЕЛЫЙ"
        },
        en: {
            h1: 'Your Internet speed is',
            info: "Show more info",
            mb: "Mbps",
            dark: "DARK",
            light: "LIGHT"
        }
    }

    constructor() {
        this.change()
    }

    change() {
        const select = this.utils.selectElement("select_language", 'class')
        const btn = this.utils.selectElement('info', 'class')
        const mb = this.utils.selectElement('top', 'class')
        const h1 = this.utils.selectElement('h1')
        const dark = this.utils.selectElement('dark')
        const light = this.utils.selectElement('light')

        select.onchange = (e) => {
            const value = e.target.value
            h1.textContent = this.language[value].h1
            btn.textContent = this.language[value].info
            mb.textContent = this.language[value].mb
            dark.textContent = this.language[value].dark
            light.textContent = this.language[value].light
        }
    }
}

class Mode {
    utils = new Utils()
    mode = {
        qora: {
            body: "body_dark",
            logo: "logo_dark",
            h1: "h1_dark",
            fast: "fast_dark",
            select_language: "select_language_dark",
            select_mode: "select_mode_dark",
            count: "count_dark",
            top: "top_dark",
            info: "info_dark",
            svg: "svg_dark"
        },
        oq: {
            body: "",
            logo: "logo",
            h1: "",
            fast: "fast",
            select_language: "select_language",
            select_mode: "select_mode",
            count: "count",
            top: "top",
            info: "info",
            svg: ""
        }
    }

    constructor() {
        this.change()
    }

    change() {
        const select = this.utils.selectElement('select_mode', 'class')
        const body = this.utils.selectElement('body')
        const logo = this.utils.selectElement('logo', 'class')
        const h1 = this.utils.selectElement('h1')
        const fast = this.utils.selectElement('fast', 'class')
        const select_language = this.utils.selectElement('select_language', 'class')
        const select_mode = this.utils.selectElement('select_mode', 'class')
        const count = this.utils.selectElement('count', 'class')
        const top = this.utils.selectElement('top', 'class')
        const info = this.utils.selectElement('info', 'class')
        const svg = this.utils.selectElement('svg', 'class')

        select.onchange = (e) => {
            const value = e.target.value
            if (value == 'oq') {
                body.className = this.mode[value].body
                logo.className = this.mode[value].logo
                h1.className = this.mode[value].h1
                fast.className = this.mode[value].fast
                select_language.className = this.mode[value].select_language
                select_mode.className = this.mode[value].select_mode
                count.className = this.mode[value].count
                top.className = this.mode[value].top
                info.className = this.mode[value].info
                svg.style.fill = "#221f1f"
            } else {
                body.className += " " + this.mode[value].body
                logo.className += " " + this.mode[value].logo
                h1.className += " " + this.mode[value].h1
                fast.className += " " + this.mode[value].fast
                select_language.className += " " + this.mode[value].select_language
                select_mode.className += " " + this.mode[value].select_mode
                count.className += " " + this.mode[value].count
                top.className += " " + this.mode[value].top
                info.className += " " + this.mode[value].info
                svg.style.fill = "#aaa"
            }
        }
    }
}

class Speed {
    utils = new Utils()

    constructor() {
        new Language()
        new Mode()
        this.cheking()
    }

    cheking() {
        let status = 'ok' // loaing, stop, ok
        let timeout
        let stop = false
        const [color, display, none, block] = ['color', "display", "none", "block"]
        const check = this.utils.selectElement('count_controller', 'class')
        const spinner = this.utils.selectElement('spinner_loading', 'class')
        const loading_stop = this.utils.selectElement('spinner_stop', 'class')
        const loading_load = this.utils.selectElement('spinner_load', 'class')
        const loading_ok = this.utils.selectElement('spinner_ok', 'class')
        const footer = this.utils.selectElement('footer')
        const h1 = this.utils.selectElement('h1')
        const count = this.utils.selectElement('count', 'class')
        const mb = this.utils.selectElement('top', 'class')

        check.onclick = async () => {
            stop = false
            if (status === 'ok') {
                count.textContent = 0
                this.utils.elementStyleAdd(
                    [spinner, footer, h1, count, mb, loading_stop, loading_ok, loading_load],
                    [display, display, display, color, color, display, display, display],
                    [block, none, none, '#d2d2d2', '#d2d2d2', none, none, 'flex']
                )
                status = 'loading'

                timeout = setTimeout(async() => {
                    stop = true
                    this.loading().then(() => {
                        this.utils.elementStyleAdd(
                            [spinner, footer, h1, count, mb, loading_stop, loading_ok, loading_load],
                            [display, display, display, color, color, display, display, display],
                            [none, block, block, '#221f1f', '#221f1f', none, 'flex', none])
                        status = 'ok'
                    })
                }, 5000)

                for (let i = 0; i < 10; i++) {
                    await this.loading(i)
                    if(stop) {
                        break
                    }
                }
            } else if (status === 'loading') {
                stop = true
                this.utils.elementStyleAdd(
                    [spinner, loading_stop, loading_ok, loading_load],
                    [display, display, display, display],
                    [none, 'flex', none, none]
                )
                status = 'ok'
                clearTimeout(timeout)
            }
        }
    }

    loading(i) {
        return new Promise((resolve, reject) => {
            try {
                let startTime, endTime;
                const count = this.utils.selectElement('count', 'class')
                const imageAddr = "https://upload.wikimedia.org/wikipedia/commons/0/03/Eiche_bei_Graditz.jpg";
                const downloadSize = 4995374;
                const download = new Image();

                startTime = new Date().getTime();
                const cacheBuster = "?nnn=" + startTime;
                download.src = imageAddr + cacheBuster;

                download.onload = () => {
                    endTime = new Date().getTime();
                    const duration = (endTime - startTime) / 1000;
                    const bitsLoaded = downloadSize * 8;
                    const speedBps = (bitsLoaded / duration).toFixed(2);
                    const speedKbps = (speedBps / 1024).toFixed(2);
                    const speedMbps = (speedKbps / 1024).toFixed(2);

                    console.log(i)
                    if (i) {
                        if (i % 3 == 0) count.textContent = Math.round(speedMbps) + 4
                        else count.textContent = Math.round(speedMbps) - 18 + i
                    } else {
                        count.textContent = Math.round(speedMbps)
                    }
                    resolve('ok')
                };
            } catch (error) {
                console.log(error)
                reject('ok')
            }
        })
    }
}

new Speed()
