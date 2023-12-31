$( document ).ready(async() => {
    const config = await getConfigData();
    const server = await getServerData();
    if(!server || !config) return;

    waitForElm('section#gold-area').then(async() => {
        refreshOdds(config, server);
    });

    const observer = new MutationObserver(function () { refreshOdds(config, server) });
    function addObserverIfDesiredNodeAvailable() {
        let panel = document.querySelectorAll(".slider-handles button");
        if(!panel?.length)
            return window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
        observer.observe(panel[0], { characterData: true, attributes: true });
        observer.observe(panel[1], { characterData: true, attributes: true });
    }
    addObserverIfDesiredNodeAvailable();
});

const refreshOdds = async(config, server) => {
    $('section#youtubers-cases div.relative.grid.transform.grid-cols-1')?.attr('case-orginal', 'true');

    await createYTcases(server);

    $('div.relative.grid.transform.grid-cols-1')?.each(function() {
        createCaseOdds(server, this, false);
    });

    $('div.case__content')?.each(function() {
        createCaseOdds(server, this, true);
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
            createCaseOdds(server, this, false);
        });
    });
}

const createCaseOdds = async(server, thisElement, eventCase) => {
    const caseName = $(thisElement)?.find(eventCase ? 'div.case__name' : 'div[data-testid=case-card-badge-btn] p')?.text();
    if(!caseName) return;
console.log(caseName)
    let odds;
    const thisCase = server?.allCases?.filter(el => el?.name == caseName);
    if(!thisCase || !thisCase?.length) {
        const thisGoldCase = server?.goldArea?.filter(el => el?.name == caseName);
        if(!thisGoldCase || !thisGoldCase?.length) return;

        const profit = thisGoldCase[0]?.profit;
        if(profit <= 45454545)
            odds = `0/5`;
        else if(profit <= 90909091)
            odds = `0.5/5`;
        else if(profit <= 136363636)
            odds = `1/5`;
        else if(profit <= 181818182)
            odds = `1.5/5`;
        else if(profit <= 227272727)
            odds = `2/5`;
        else if(profit <= 272727273)
            odds = `2.5/5`;
        else if(profit <= 318181818)
            odds = `3/5`;
        else if(profit <= 363636364)
            odds = `3.5/5`;
        else if(profit <= 409090909)
            odds = `4/5`;
        else if(profit <= 454545455)
            odds = `4.5/5`;
        else
            odds = `5/5`;
    } else
        odds = `${thisCase[0]?.odds}%`;

    $(thisElement)?.find(eventCase ? 'div.case__label.case__price-label' : 'div.absolute.right-3.rounded.bg-navy-900.px-3.text-xs.font-semibold.text-gold-500')
        ?.eq(0)?.after($(document?.createElement('div'))
            ?.addClass(eventCase ? 'case__label case__price-label' : 'absolute right-3 rounded bg-navy-900 px-3 py-1.5 text-xs font-semibold text-gold-500')
            ?.css({ 'margin-top': eventCase ? '35px' : '45px' })
            ?.text($(thisElement)?.attr('case-orginal') ? odds : (thisCase[0]?.lang || odds))
        );

    $(thisElement)?.find(eventCase ? 'div.case__name' : 'div[data-testid=case-card-badge-btn] p')
        ?.eq(0)
        ?.removeClass('min-w-[8rem] max-w-full rounded-lg bg-navy-700 p-2 text-center text-sm font-normal uppercase leading-none text-white')
        ?.css({ 'background-color': eventCase ? 'transparent' : '' })
        ?.html(`<p style="text-align: center;width: 60px;margin-left: calc(50% - 30px);border-radius: 10px 10px 0px 0px;color: rgb(220, 174, 100);height: 20px;" class="rounded-lg bg-navy-700 p-2 text-center text-sm font-normal uppercase leading-none text-white">${odds}</p><p class="rounded-lg bg-navy-700 min-w-[8rem] max-w-full p-2 text-center text-sm font-normal uppercase leading-none text-white">${caseName}</p>`)
};

const createYTcases = async(server) => {
    const YTcases = server?.allCases?.filter(el => el?.lang?.length );
    if(!YTcases || !YTcases?.length) return;
    const index = await getIndexData();
    const currencyRates = index?.currencyRates;
    const currency = $('button.hidden.items-center.justify-center.gap-2.whitespace-nowrap.text-xs.uppercase.leading-none.text-navy-100 span.font-bold').eq(0).text()?.toString() || 'USD';
    const currentRate = currencyRates?.filter(el => el?.id == currency)[0]?.rate || 1;

    YTcases?.forEach(el => {
        const priceText = `${(el?.price_USD * currentRate)?.toFixed(2)} ${currency}`.replace('.',',');
        $('section#youtubers-cases div.grid.gap-6')?.eq(0)?.append($(document.createElement('div'))
            ?.addClass("keydrop-plus-ytcases relative grid transform grid-cols-1 grid-rows-1 transition-all duration-200 will-change-transform hover:-translate-y-0.5 rounded-lg aspect-[1/1.12] css-1g6zit4")
            ?.html(`<a href="${el.url}" class="z-20 col-start-1 row-start-1 row-end-3 h-full w-full"><img srcset="${el.img}" alt="" class="absolute right-0 top-0 w-full object-cover rounded-lg css-10klw3m" loading="lazy"><div class="z-10 flex w-full flex-col" style="height: 100%;"><div data-testid="case-price" class="absolute right-3 top-3 rounded bg-navy-900 px-3 py-1.5 text-xs font-semibold text-gold-500">${priceText}</div><div class="absolute right-3 rounded bg-navy-900 px-3 py-1.5 text-xs font-semibold text-gold-500" style="margin-top: 45px;">${el.odds}%</div><div data-testid="case-card-badge-btn" class="z-10 mx-auto mb-4 mt-auto min-w-[8rem] max-w-full rounded-lg bg-navy-700 text-sm font-normal uppercase leading-none text-white flex items-center justify-between p-0 pl-0 text-left"><div><p style="text-align: center;width: 60px;margin-left: calc(50% - 30px);border-radius: 10px 10px 0px 0px;color: rgb(220, 174, 100);height: 20px;" class="rounded-lg bg-navy-700 p-2 text-center text-sm font-normal uppercase leading-none text-white">${el.odds}%</p><p class="rounded-lg bg-navy-700 min-w-[8rem] max-w-full p-2 text-center text-sm font-normal uppercase leading-none text-white">${el.name}</p></div></div></div></a>`)
        );
    });
};