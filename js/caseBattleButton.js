$( document ).ready(function(){
    waitForElm('[data-testid="bttls-create-bttl-btn"]').then(()=>{
        createCaseBattleButton();
    });
});

const createCaseBattleButton = async() => {
    const config = await getConfigData();
    const server = await getServerData();
    const language = await getLanguageData(config?.lang);

    $('[data-testid="bttls-create-bttl-btn"]')
        .before($(document.createElement('a'))
            .addClass('keydrop-plus-auto-casebattle-button order-5 mt-5 flex cursor-pointer items-center whitespace-nowrap p-2 text-center font-semibold uppercase text-white sm:p-3 xl:order-7 xl:mt-0 xl:w-auto css-9c7r58')
            .attr('href', `https://key-drop.com/panel/profil/fast-case-battle`)
            .append($(document.createElement('svg'))
                .addClass('w-5 h-5 mr-2 fill-current keydrop-plus-svg')
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