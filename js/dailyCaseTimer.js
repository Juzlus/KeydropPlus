const getFreeCaseTimer = async(update) => {
    const config = await getConfigData();
    if(!config?.active) return;
    const language = await getLanguageData(config?.lang);
    const fetch = await fetchUrl('GET', "https://key-drop.com/pl/apiData/DailyFree/index");

    const langText = {
        waitTime: language?.dailyCase_waitTime,
        readyTime: language?.dailyCase_readyTime,
        dailyCase: language?.dailyCase_dailyCase
    };

    if(!fetch) return;
    const dailyCaseData = {
        deadlineTimestamp: fetch?.init?.levels[0]?.deadlineTimestamp,
        isAvailable: fetch?.init?.levels[0]?.isAvailable,
        completed: fetch?.init?.levels[0]?.tasks[0]?.completed
    }
    if(!dailyCaseData?.completed) return;

    if(!update)
        $('div[data-testid="header-balance-div"]')
                ?.eq(0)
                    ?.prepend($(document?.createElement('div'))
                        ?.addClass('flex h-full items-center gap-x-3 lg:pl-4 lg:pr-4')
                        ?.css({ 'margin-right': '-24px', background: 'rgb(37 37 45)', 'padding-right': '30px' })
                        ?.html(`<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#110515]"><svg class="icon h-4 w-4 flex-shrink-0 text-lightgreen lg:h-5 lg:w-5" viewBox="0 0 22 19" fill="currentColor"><use xlink:href="https://key-drop.com/web/KD/static/icons.svg?39#box" style="color: #ffff85;"></use></svg></div><div><p class="text-xs font-bold tabular-nums text-lightgreen lg:text-sm"><a href="/daily-case"><span id="dailyCaseTimer" style="color: #ffff85;">00:00:00</span></a></p><p class="whitespace-nowrap text-2xs font-semibold uppercase leading-none tracking-wider">${langText?.dailyCase}</p></div>`)
                    )
                    .end();

    const refreshInterval = setInterval(() => {
        refreshTime(dailyCaseData, langText, refreshInterval);
    }, 1000);
};

const refreshTime = (dailyCaseData, langText, refreshInterval) => {
    if(dailyCaseData?.deadlineTimestamp <= new Date()?.getTime()) {
        dailyCaseData.isAvailable = true;
        clearInterval(refreshInterval);
        setTimeout(() => {
            //openFreeCase(langText);
            getFreeCaseTimer(true);
        }, Math.floor(((Math.random() * 2) + 2) * 60 * 1000) );
    }
    const date = dailyCaseData?.isAvailable ? null : new Date(dailyCaseData?.deadlineTimestamp - new Date()?.getTime());
    $('#dailyCaseTimer')?.text(dailyCaseData?.isAvailable ? langText?.readyTime : `${langText?.waitTime} ${date?.getHours() == 0 ? `23` : `${date.getHours()-1 > 9 ? date.getHours()-1 : `0${date.getHours()-1}`}`}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}:${date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`}`);
};

const createSkinsValueDiv = async() => {
    setTimeout(async () => {
        const config = await getConfigData();
        if(!config?.active) return;
        const server = await getServerData();
        
        if(!server?.skinsValueEnable) return getFreeCaseTimer();
        const language = await getLanguageData(config?.lang);

        const langText = {
            skinsValue: language?.dailyCase_skinsValue || "Wartość skinów"
        };

        const fetch = await fetchUrl("GET", "https://key-drop.com/pl/panel/profil/eq_value");
        if(!fetch) return;
        const data = JSON.parse(fetch);
        const skinsValue = `${(data?.fullPrice).toFixed(2).toString().replace('.',',')} ${data?.currency}`;

        $('div[data-testid="balance"]')
        ?.eq(0)
            ?.prepend($(document?.createElement('div'))
                ?.addClass('flex items-center gap-x-2')
                ?.html(`<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#110515]"><svg class="icon h-4 w-4 flex-shrink-0 text-lightgreen lg:h-5 lg:w-5" viewBox="0 0 22 19" fill="currentColor"><use xlink:href="https://key-drop.com/web/KD/static/icons.svg?39#gun" style="color: #b585ff;"></use></svg></div><div><p class="text-xs font-bold tabular-nums text-lightgreen lg:text-sm"><span id="skinsValueText" style="color: #b585ff;">${skinsValue}</span></p><p class="whitespace-nowrap text-2xs font-semibold uppercase leading-none tracking-wider">${langText?.skinsValue}</p></div>`)
            )
            .end();

        getFreeCaseTimer();
    }, 1 * 500);
}

createSkinsValueDiv();