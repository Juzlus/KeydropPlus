$( document ).ready(function(){
    waitForElm('.mx-auto.mb-5.max-w-screen-xxl.transition.duration-500.opacity-100 label').then(()=>{
        createCaseBattleButton();
    });
});

const createCaseBattleButton = async() => {
    const config = await getConfigData();
    const server = await getServerData();
    const language = await getLanguageData(config?.lang);

    $('.mx-auto.mb-5.max-w-screen-xxl.transition.duration-500.opacity-100 label')
        .before($(document.createElement('a'))
            .css({ 'font-weight': 'bolder', color: 'black' })
            .addClass('order-5 mt-5 flex cursor-pointer items-center whitespace-nowrap p-2 text-center font-semibold uppercase text-white sm:p-3 xl:order-7 xl:mt-0 xl:w-auto css-9c7r58 keydrop-plus-svg')
            .attr('href', `https://key-drop.com/panel/profil/fast-case-battle`)
            .append($(document.createElement('svg'))
                .addClass('w-5 h-5 mr-2 fill-current')
                .attr({ viewbox: "0 0 24 24" })
                .append($(document.createElement('img'))
                    .attr({ src: `${githubUrl}${server?.iconsPath}KD+_Icon.svg` })
                )
            )
            .append($(document.createElement('span'))
                .addClass('inline-block mt-0.5')
                .text(language?.autoJoinFreeCaseBattle_title)
            )
        )
};