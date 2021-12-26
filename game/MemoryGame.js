import {
    createArrayWithRandomNumber,
    getRandomImages
} from '../utils.js'

export class MemoryGame {
    constructor(elm, {
        level,
        onStart = () => {},
        onWrongGuessChange = () => {},
        onEnd = () => {}
    }) {
        this.elm = elm;
        this.level = level;
        this.onStart = onStart;
        this.onWrongGuessChange = onWrongGuessChange
        this.onEnd = onEnd;

    }

    async start() {
        this.cardId2image = new Map();
        this.currentOpenCardId = null;
        this.cardIdToCardContainerElm = new Map();
        this.isBlocked = false;
        this.firstCardIdThatIsOpen = null;
        this.nOfOpen = 0;
        this.nOfWrongGuess = 0;

        const that = this;
        const images = await getRandomImages(this.level / 2);
        const randomNumbers = createArrayWithRandomNumber(this.level);
        const cardContainers = [];
        for (let i = 0; i < randomNumbers.length; i++) {
            const cardId = randomNumbers[i];
            const imageId = Math.floor(i / 2);

            const cardContainer = createCardContainerElement(cardId, imageId, images[imageId]);
            this.cardIdToCardContainerElm.set(cardId, cardContainer);

            cardContainer.addEventListener('click', function(){
                that.onClick.call(that, this)
            });
            cardContainers.push(cardContainer);
        }
        cardContainers.sort((a,b) => a.dataset.cardId - b.dataset.cardId);
        cardContainers.forEach(c=> this.elm.append(c))
    }
    onClick(cardContainerElm) {
        if (this.isBlocked) {
            return;
        }

        cardContainerElm.classList.add('show');

        const currentClickedCardId = parseInt(cardContainerElm.dataset.cardId);

        if (this.firstCardIdThatIsOpen === null) {
            this.firstCardIdThatIsOpen = currentClickedCardId;
        } else if (this.firstCardIdThatIsOpen !== currentClickedCardId) {
            if (this.cardId2ImageId(this.firstCardIdThatIsOpen) !== this.cardId2ImageId(currentClickedCardId)) {
                this.isBlocked = true;
                this.nOfWrongGuess++;
                this.onWrongGuessChange(this.nOfWrongGuess);
                setTimeout(() => {
                    this.cardIdToCardContainerElm.get(currentClickedCardId).classList.remove('show');
                    this.cardIdToCardContainerElm.get(this.firstCardIdThatIsOpen).classList.remove('show');
                    this.isBlocked = false;
                    this.firstCardIdThatIsOpen = null;
                }, 1000);
            } else {
                this.firstCardIdThatIsOpen = null;
                this.nOfOpen += 2;
                if (this.nOfOpen === this.level) {
                    this.onEnd();
                }
            }
        } else {
            return;
        }
    }

    destroy() {
        this.elm.innerHTML = '';
    }

    cardId2ImageId(cardId) {
        const container = this.cardIdToCardContainerElm.get(cardId)
        return parseInt(container.dataset.imageId);
    }
}


function createCardContainerElement(cardId, imageId, img) {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'flip-card';
    cardContainer.dataset.cardId = cardId;
    cardContainer.dataset.imageId = imageId;
    cardContainer.innerHTML = `
        <div class="flip-card-inner">
            <div class="flip-card-front">
              click me
            </div>
            <div class="flip-card-back">
                <img>
            </div>
        </div>
    `;
    const imgEl = cardContainer.querySelector('img');
    imgEl.src = img;
    return cardContainer;
}