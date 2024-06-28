const createStatisticsButton = async() => {
    const config = await getConfigData();
    if(!config || !config?.active) return;
    const language = await getLanguageData(config?.lang);
    const server = await getServerData();
    if(!language || !server) return;

    $(`#main-view div.pt-4.pb-16.text-white nav a[href="${window?.location?.pathname?.slice(0, 4)}panel/profil/free-gold"]`)?.eq(0)
        ?.after($(document.createElement('a'))
            ?.addClass('relative flex justify-center whitespace-nowrap bg-[#17171C] px-5 text-white opacity-90 transition-colors duration-200 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-gold-500')
            ?.addClass(window?.location?.href?.includes('/panel/profil/statistics') ? '!text-gold hover:!text-gold is-active' : '')
            ?.attr({ 'id': 'statistics_button', 'href': '/panel/profil/statistics' })
            ?.html(`<div class="flex items-center border-b border-transparent px-0.5 py-5 transition-colors duration-200 in-active:border-gold"><span viewbox="0 0 24 24" class="w-5 h-5 mr-2 fill-current" style="width: 24px;height: 22px;"><img style="transition-duration: 1.6s; filter: ${window?.location?.href?.includes('/panel/profil/statistics') ? 'invert(65%) sepia(55%) saturate(351%) hue-rotate(358deg) brightness(99%) contrast(90%)' : 'invert(99%) sepia(27%) saturate(184%) hue-rotate(127deg) brightness(108%) contrast(100%)'}" src="${githubUrl}${server?.iconsPath}KD%2B_Icon.svg"></span>${language?.statistics_title}</div>`)
        );

    const panel = document?.querySelector('#main-view div.pt-4.pb-16.text-white');
    const observer = new MutationObserver(function () {
        if(window?.location?.href?.includes('/panel/profil/statistics')) return;
        $('#statistics_button')?.removeClass('!text-gold hover:!text-gold is-active');
        $('#statistics_button img')?.css('filter', 'invert(99%) sepia(27%) saturate(184%) hue-rotate(127deg) brightness(108%) contrast(100%)');
        $('.statistics_container')?.css('display', 'none');
    });
    observer.observe(panel, { childList: true });
};

waitForElm('div.sticky.top-0.z-40.mx-auto.max-w-screen-xxl.p-0').then(() => {
    $('section div.mx-auto.max-w-screen-xxl.xl\\:px-5 div.mr-auto.w-1\\/2.p-4.sm\\:w-auto.md\\:px-3.xl\\:w-auto').css('margin-left', '60px');
    createStatisticsButton();
});