class Draw {
    constructor() {
        this.options = ['red', 'green', 'blue'];
        let _result = this.drawResult()
        this.getDrawResult = () => _result;
    }


    drawResult() {
        let colors = [];
        //losowanie
        for (let i = 0; i < this.options.length; i++) {
            const index = Math.floor(Math.random() * this.options.length)
            const color = this.options[index];
            colors.push(color)
            //  console.log(color)
        }
        return colors
    }

}

//const draw = new Draw()


// Pętla
// losujemy jednorazowo index trzy razy (liczbe od 0 do 2) np 0, 0, 1... 1,2,2
// 