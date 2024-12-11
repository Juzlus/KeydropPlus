const createStatisticsButton = async() => {
    const config = await getConfigData();
    if(!config || !config?.active) return;
    const language = await getLanguageData(config?.lang);
    const server = await getServerData();
    if(!language || !server) return;

    $(`div[data-testid="user-nav-bar"] nav a`)?.eq(2)
        ?.after($(document.createElement('a'))
            ?.addClass('focus-visible:gold-500 relative flex justify-center whitespace-nowrap bg-[#17171C] text-white opacity-90 transition-all duration-200 hover:opacity-100 focus-visible:ring-2')
            ?.addClass(window?.location?.href?.includes('/panel/profil/statistics') ? '!text-gold hover:!text-gold is-active' : '')
            ?.attr({ 'id': 'statistics_button', 'href': '/panel/profil/statistics' })
            ?.html(`<div class="flex items-center border-b border-transparent px-8 py-5 transition-all duration-200 in-active:border-gold-400"><span viewbox="0 0 24 24" class="w-5 h-5 mr-2 fill-current" style="width: 24px;height: 22px;"><img style="transition-duration: 1.6s; filter: ${window?.location?.href?.includes('/panel/profil/statistics') ? 'invert(65%) sepia(55%) saturate(351%) hue-rotate(358deg) brightness(99%) contrast(90%)' : 'invert(99%) sepia(27%) saturate(184%) hue-rotate(127deg) brightness(108%) contrast(100%)'}" src="${githubUrl}${server?.iconsPath}KD%2B_Icon.svg"></span>${language?.statistics_title}</div>`)
        );

    const panel = document?.querySelector('#main-view div.pt-4.pb-16.text-white');
    const observer = new MutationObserver(function () {
        if(window?.location?.href?.includes('/panel/profil/statistics')) return;
        $('#statistics_button')?.removeClass('!text-gold hover:!text-gold is-active');
        $('#statistics_button img')?.css('filter', 'invert(99%) sepia(27%) saturate(184%) hue-rotate(127deg) brightness(108%) contrast(100%)');
        $('.statistics_container')?.css('display', 'none');
    });
    try {
        observer.observe(panel, { childList: true });
    }
    catch {};
};

waitForElm('div[data-testid="user-nav-bar"]').then(() => {
    createStatisticsButton();
});