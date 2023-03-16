
class Switcher {
    flag = 1
    mySwitch() {
        this.flag = parseInt(sessionStorage.getItem('move') || '0')
        const pre_box: HTMLDivElement | null = document.querySelector('.pre-box')
        const img: HTMLImageElement | null = document.querySelector("#avatar")
        if (this.flag) {
            pre_box!.style.transform = "translateX(100%)"
            pre_box!.style.backgroundColor = "#c9e0ed"
            // img!.src = import.meta.url("@/assets/img/wuwu.jpeg")
        }
        else {
            pre_box!.style.transform = "translateX(0%)"
            pre_box!.style.backgroundColor = "#edd4dc"
            // img!.src = require("@/assets/img/waoku.jpg")
        }

        this.flag = this.flag ? 0 : 1

        sessionStorage.setItem('move', String(this.flag))
    }
}

export const swicher = new Switcher()