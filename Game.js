class Game {
    constructor(start) {
        this.stats = new Statistics()
        this.wallet = new Wallet(start)
        //tracimy wiazanie na INPUCIE po wywołaniu
        document.getElementById('start').addEventListener('click', this.startGame.bind(this))

        this.spanWallet = document.querySelector('.panel span.wallet');
        this.boards = [...document.querySelectorAll('div.color')];
        this.inputBid = document.getElementById('bid')
        this.spanResult = document.querySelector('.score span.result')
        this.spanGames = document.querySelector('.score span.number')
        this.spanWins = document.querySelector('.score span.win')
        this.spanLosses = document.querySelector('.score span.loss')

        this.render()
    }



    // za kazdym wywowalaniem gry, bedzie wyswietlac nowe info (kolory, kasowanie stawki, wyswietlenie aktualnych srodkow, staty)
    render(colors = ['gray', 'gray', 'gray'], money = this.wallet.getWalletValue(), stats = [0, 0, 0], result = "", bid = 0, wonMoney = 0) {
        this.boards.forEach((board, index) => {
            board.style.backgroundColor = colors[index]
        })
        if (result) {
            result = `Wygrałeś ${wonMoney}$.`
        } else if (!result && result !== "") {
            result = `Przegrałeś ${bid}$.`
        }
        this.spanResult.textContent = result;
        this.spanWallet.textContent = money;
        this.spanGames.textContent = stats[0];
        this.spanWins.textContent = stats[1];
        this.spanLosses.textContent = stats[2];


        this.inputBid.value = "";
    }
    //startuje gre wszystko co ma sie wydarzyc znajdzie sie w tej metodzie
    startGame() {
        //1. sprawdza INPUTA /czy wartosc jest wieksza od 1
        if (this.inputBid.value < 1) return alert('Kwota jest za mała')
        const bid = Math.floor(this.inputBid.value) //zaokraglamy wartosc ale staje sie tez wartoscia NUMBER(wczesniej byla stringiem >> typeof game.inputBid.value)

        //sprawdzmy czy moze grac
        if (!this.wallet.checkCanPlay(bid)) { //odwracamy wynik zeby zwrocic FALSE
            return alert('masz za mało środków lub źle wpisałeś wartość')
        }
        //odejmujemy kase za ktora gramy
        this.wallet.changeWallet(bid, "-")


        this.draw = new Draw();
        const colors = this.draw.getDrawResult()
        const win = Result.checkWinner(colors)
        console.log(win)
        console.log(colors)
        const wonMoney = Result.moneyWinInGame(win, bid)
        console.log(wonMoney)

        //dodajemy srodki 
        this.wallet.changeWallet(wonMoney)

        //statystyki
        this.stats.addGameToStatistics(win, bid)

        this.render(colors, this.wallet.getWalletValue(), win, this.stats.showGameStatistics(), bid, wonMoney)

    }
}