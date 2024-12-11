$( document ).ready(async() => {
    const config = await getConfigData();
    const casesFetch = await fetchUrl('GET', `${githubUrl}/cases.json`)
    if(!casesFetch || !config) return;
    const cases = JSON.parse(`{"cases": ${casesFetch}}`)?.cases;
    if(!cases?.length) return;

    waitForElm('section#gold-area').then(async() => {
        refreshOdds(config, cases, true);
    });

    const observer = new MutationObserver(function () { refreshOdds(config, cases, true) });
    function addObserverIfDesiredNodeAvailable() {
        let panel = document.querySelectorAll(".slider-handles button");
        if(!panel?.length)
            return window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
        observer.observe(panel[0], { characterData: true, attributes: true });
        observer.observe(panel[1], { characterData: true, attributes: true });
    }
    addObserverIfDesiredNodeAvailable();
});

const refreshOdds = async(config, cases, init) => {
    const index = await getIndexData();
    const currencyRates = index?.currencyRates;
    const currency = await getCurrency();
    const currentRate = currencyRates?.filter(el => el?.id == currency)[0]?.rate || 1;

    $('section#youtubers-cases div.group.relative')?.attr('case-orginal', 'true');

    await createYTcases(currentRate, currency, cases);

    $('div.relative.grid.transform.grid-cols-1')?.each(function() {
        createCaseOdds(config, currentRate, currency, cases, this, false, init);
    });

    $('div[data-testid="case-card-container"]')?.each(function() {
        createCaseOdds(config, currentRate, currency, cases, this, true, init);
    });

    if(!config?.showAllYoutuberCases)
        $('.keydrop-plus-ytcases').css('display', 'none');
    else
        $('[case-orginal="true"').css('display', 'none');

    if(config?.hideCaseBattle) {
        $('#main-view section.container.mb-10')?.eq(0)?.css('display', 'none');
    }

    if(config?.hideFavourite) {
        $('section#favorite')?.eq(0)?.css('display', 'none');
    }

    waitForElm('section#favorite').then(() => {
        $('section#favorite div.relative.grid.transform.grid-cols-1')?.each(function() {
            createCaseOdds(config, currentRate, currency, cases, this, false, init);
        });
    });
}

const createCaseOdds = async(config, currentRate, currency, cases, thisElement, eventCase, init) => {
    const caseName = $(thisElement)?.find('div[data-testid=case-card-badge-btn] p')?.last()?.text();
    if(!caseName) return;

    let odds;
    const jokerCase = config?.showJokerOdds ? cases?.filter(el => el?.name == `${caseName} JOKER`) : null;
    const thisCase = config?.showJokerOdds && jokerCase && jokerCase?.length ? jokerCase : cases?.filter(el => el?.name == caseName);
    if(!thisCase || !thisCase?.length) return;
    if (thisCase[0]?.goldProfit !== undefined) {
        const profit = thisCase[0]?.goldProfit;
        if(profit <= 11111111)
            odds = `0/5`;
        else if(profit <= 13209876)
            odds = `0.5/5`;
        else if(profit <= 15308641)
            odds = `1/5`;
        else if(profit <= 17407407)
            odds = `1.5/5`;
        else if(profit <= 19506172)
            odds = `2/5`;
        else if(profit <= 21604937)
            odds = `2.5/5`;
        else if(profit <= 23703703)
            odds = `3/5`;
        else if(profit <= 25802468)
            odds = `3.5/5`;
        else if(profit <= 27901233)
            odds = `4/5`;
        else if(profit <= 29999999)
            odds = `4.5/5`;
        else
            odds = `5/5`;
    } else
        odds = `${thisCase[0]?.odds}%`;

    const isJoker = thisCase[0]?.name?.endsWith(' JOKER') || false;
    const cardEl = $(thisElement)?.find(eventCase ? 'div[data-testid="case-card-price-btn"]' : 'div.absolute.right-3.rounded.bg-navy-900.px-3.text-xs.font-semibold.text-gold-500')
        ?.eq(0);
        
    if (init)
        $(cardEl).after($(document?.createElement('div'))
            ?.addClass(eventCase ? 'cardOdds absolute right-3 top-3 rounded bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white' : 'cardOdds absolute right-3 rounded bg-navy-900 px-3 py-1.5 text-xs font-semibold text-gold-500')
            ?.css({ 'margin-top': eventCase ? '35px' : '45px', 'background': isJoker ? 'rgb(129 72 234)' : 'rgb(23 23 28)' })
            ?.text($(thisElement)?.attr('case-orginal') ? odds : (thisCase[0]?.lang || odds))
        );

    $(thisElement)?.find('.cardOdds')?.text($(thisElement)?.attr('case-orginal') ? odds : (thisCase[0]?.lang || odds))
    $(thisElement)?.find('.cardOdds')?.css({ 'background': isJoker ? 'rgb(129 72 234)' : 'rgb(23 23 28)' })

    $(thisElement)?.find('div[data-testid=case-card-badge-btn] p')
        ?.eq(0)
        ?.removeClass('min-w-[8rem] max-w-full rounded-lg bg-navy-700 p-2 text-center text-sm font-normal uppercase leading-none text-white')
        ?.html(`<p style="text-align: center;width: 60px;margin-left: calc(50% - 30px);border-radius: 10px 10px 0px 0px;color: rgb(220, 174, 100);height: 20px;" class="rounded-lg p-2 text-center text-sm font-normal uppercase leading-none text-white">${odds}</p><p class="rounded-lg min-w-[8rem] max-w-full p-2 text-center text-sm font-normal uppercase leading-none text-white" style="margin-top: -4px;">${caseName}</p>`)

    $(thisElement)?.find('[data-testid="case-card-badge-btn"]')
        ?.css({ 'background': isJoker ? 'rgb(129 72 234)' : 'rgb(23 23 28)' })

    $(thisElement)?.find('[data-testid="case-card-price-btn"]')
        ?.css({ 'background': isJoker ? 'rgb(129 72 234)' : 'rgb(23 23 28)' })

    $(thisElement)?.find('div.css-hmmmg1')
        ?.css({ 'background': isJoker ? 'rgb(129 72 234)' : 'rgb(23 23 28)' })

    const formattedPrice = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        }).format(thisCase[0]?.price_USD * currentRate);

    const priceText = `${formattedPrice} ${currency}`;
    if (isJoker || !init)
        $(thisElement)?.find('[data-testid="case-card-price-btn"]')
            ?.text(priceText);
};

const createYTcases = async(currentRate, currency, cases) => {

    const YTcases = cases?.filter(el => el?.youtuber && !el?.name?.endsWith(' JOKER'));
    if(!YTcases || !YTcases?.length) return;

    YTcases?.forEach(el => {
        const formattedPrice = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            }).format(el?.price_USD * currentRate);
    
        const priceText = `${formattedPrice} ${currency}`;
        $('section#youtubers-cases div.grid.gap-6')?.eq(0)?.append($(document.createElement('div'))
            ?.addClass("keydrop-plus-ytcases group relative transition-all duration-200 will-change-transform hover:-translate-y-0.5 aspect-[270/375] col-span-2")
            ?.html(`<div data-testid="case-card-container" class="grid h-full w-full transform grid-cols-1 grid-rows-1 rounded-[6px] hover:shadow-case-hover shadow-case"><a href="${el?.url}" class="z-20 col-start-1 row-start-1 row-end-3 h-full w-full"><div class="group"><img alt="" class="absolute right-0 top-0 w-full h-full object-cover rounded-[6px]" loading="lazy" src="${el?.img}"></div><div class="z-10 flex w-full flex-col" style="height: 100%;"><div data-testid="case-card-price-btn" class="absolute right-3 top-3 rounded bg-navy-800 px-3 py-1.5 text-sm font-semibold text-gold-500">${priceText}</div><div class="absolute right-3 top-3 rounded bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white" style="margin-top: 35px;">${el?.odds}%</div><div data-testid="case-card-badge-btn" class="z-10 mx-auto mb-4 mt-auto flex min-w-[8rem] max-w-full items-center rounded bg-navy-800 text-sm font-semibold uppercase text-white justify-between p-0 pl-3 text-left css-lh0t43"><div><p class="rounded-lg min-w-[8rem] max-w-full p-2 text-center text-sm font-normal uppercase leading-none text-white" style="margin-top: -4px;">${el?.name}</p></div><div><button class="button button-primary flex h-[36px] w-[36px] items-center justify-center rounded-md p-0 text-white transition-all duration-300 hover:text-gold group border-none bg-transparent hover:bg-transparent" data-testid="favorite-button"><img src="https://key-drop.com/web/KD/static/images/favorite-off.svg?v=159" alt="favorite icon not checked" class="object-contain transition-all group-hover:brightness-75 h-4 w-4"></button></div></div></div></a></div>`)
        );
    });
};