export function createArrayWithRandomNumber(n) {
    const array = Array.from(Array(n).keys());

    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}


export async function getRandomImages(n) {
    return Promise.all(Array(n).fill(0).map(getRandomImageUrl));
}

async function getRandomImageUrl() {
    const blob = await getRandomImageBlob();
    return window.URL.createObjectURL(blob);
}

async function getRandomImageBlob() {
    const res = await fetch('https://picsum.photos/200/300');
    return res.blob();
}