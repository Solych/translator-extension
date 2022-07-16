const image = document.getElementById('image');
const inputFrom = document.getElementById('from');
const languagesImagesFrom = document.getElementsByClassName('languages__item-from');
const languagesImagesTo = document.getElementsByClassName('languages__item-to');
const activeClassFrom = 'languages__item-from--active';
const activeClassTo = 'languages__item-to--active';
addHighlighting(languagesImagesFrom, activeClassFrom);
addHighlighting(languagesImagesTo, activeClassTo);

const ul = document.getElementsByTagName('ul');

function addHighlighting(languagesImages, activeClass) {
    Array.from(languagesImages).forEach(lang => {
        lang.addEventListener('click', () => {
            Array.from(languagesImages).forEach(item => item.classList.remove(activeClass));
            lang.classList.add(activeClass);
        })
    });
}


image.addEventListener('click', () => {
    const valueFrom = inputFrom.value;
    if (!valueFrom) return;
    const url = new URL('https://api.mymemory.translated.net/get?');
    const to = document.getElementsByClassName(activeClassTo)[0].id.slice(0, 2);
    const from = document.getElementsByClassName(activeClassFrom)[0].id.slice(0, 2);

    fetch(url + new URLSearchParams({
        'langpair': `${from}|${to}`,
        'q': valueFrom,
    }), )
        .then(res => res.json())
        .then(res => {
            if (res && res.matches && res.matches.length > 0) {
                const translations = res.matches.map(translate => translate.translation);
                const unique = [...new Set(translations.map(item => item.toLowerCase()))];
                ul[0].innerText = null;
                unique.forEach(translate => {
                    const item = document.createElement('li');
                    item.classList.add('translate-list__item');
                    item.innerText = translate;
                    ul[0].appendChild(item);
                });
            } else {
                ul[0].innerText = res.responseDetails;
            }

        })
        .catch(error => {
            ul[0].innerText = error;
        });
});
