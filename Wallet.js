class Wallet {
    constructor(money) {
        let _money = money;

        //pobieranie aktualnej zawartosci portfela
        this.getWalletValue = () => _money;

        //sprawdzanie czy ma hajs na granie
        this.checkCanPlay = value => {
            if (_money >= value) return true;
            return false
        }

        //aktualizuje zawartosc portfela/ zwieksza/zmniejsza/lub pokazuje blad
        this.changeWallet = (value, type = "+") => {
            if (typeof value === "number" && !isNaN(value)) {
                if (type === "+") {
                    return _money += value;
                } else if (type === "-") {
                    return _money -= value;
                } else {
                    throw new Error("nieprawdiłowy typ działania")
                }
            } else {
                console.log(typeof value);
                throw new Error("nieprawidłowa liczba")
            }
        }
    }
}

//const wallet = new Wallet(200)