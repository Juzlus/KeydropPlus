$( document ).ready(async() => {
    if($('#keydropPlus_accessDenied')?.length) return;

    const config = await getConfigData();
    if(!config?.active || !config?.token) return;
    const language = await getLanguageData(config?.lang);

    waitForElm('div.my-4.flex.items-center.justify-between').then(async() => {
        await createMenu(language);
        const panel1 = document?.getElementsByClassName('lg:w-2/5 px-8 mt-8 transition-opacity duration-300')[0];
        const panel2 = document?.getElementsByClassName('grid gap-3')[0];
        const observer = new MutationObserver(refreshPrices);
        observer.observe(panel1, { attributes: true });
        observer.observe(panel2,  { childList: true, attributes: false });

        const skinChangerPanel = $('#skinChanger-best-skins-panel');
        $(document).on('click', async(e) => {
            if(skinChangerPanel?.is(e?.target))
                skinChangerPanel?.css({ opacity: 0, 'pointer-events': 'none' });
        });
    });
});

const refreshPrices = async() => {
    const config = await getConfigData();
    if(!config?.active) return;

    const language = await getLanguageData(config?.lang);
    const steamMarket = await getStorageData('local', 'steamMarketJSON');
    const skinportMarket = await getStorageData('local', 'skinportMarketJSON');

    $('div.w-full')
        ?.find('div.grid.gap-3')
            ?.find('div.group.relative.flex.w-full.select-none.flex-col.items-center.justify-between.rounded-lg.border.border-solid.border-navy-500.bg-navy-600.bg-cover.bg-center.cursor-pointer')
                ?.each(function() {
                    const keydrop_price_text = $(this)?.find('.ml-auto.min-w-0.whitespace-nowrap.rounded-md.bg-navy-900.font-bold.leading-none.text-gold div')?.eq(0)?.text();
                    const typeText = $(this)?.find('.ml-2.font-bold.uppercase.leading-none.text-white')?.text();
                    let skinEx = null;
                    
                    if(typeText?.includes('FN'))
                        skinEx = "Factory New";
                    else if(typeText?.includes('MW'))
                        skinEx = 'Minimal Wear';
                    else if(typeText?.includes('FT'))
                        skinEx = 'Field-Tested';
                    else if(typeText?.includes('WW'))
                        skinEx = 'Well-Worn';
                    else if(typeText?.includes('BS'))
                        skinEx = 'Battle-Scarred';

                    skinCurrencyAndPrice = getCurrencyAndPrice(keydrop_price_text);
                    const skinData = {
                        type: skinEx || null,
                        stattrak: typeText?.includes('ST') ? true : false,
                        price_keydrop: skinCurrencyAndPrice[1],
                        currency_keydrop: skinCurrencyAndPrice[0],
                        price_steam: 0,
                        price_skinport: 0,
                        name: $(this)?.find('p.w-full.flex-shrink-0.truncate.px-1.text-center.font-bold.uppercase.leading-tight.text-white')?.text() || null,
                        name_second: $(this)?.find('p.mb-2.w-full.flex-shrink-0.truncate.text-center.uppercase.leading-tight.text-navy-300')?.text()?.trim() || null
                    };

                    if(config?.skinportPrice)
                        $('.customPrice.skinport')?.prop('checked', true);

                    if(config?.steamPrice)
                        $('.customPrice.steam')?.prop('checked', true);

                    if(!$(this)?.find('.keydrop-price')?.length)
                        $(this)?.find('div.text-gold')?.eq(0)?.addClass('keydrop-price flex')?.prepend($(document.createElement('img'))?.addClass('keydrop-price-icon'));

                    if(skinportMarket?.skins?.length)
                        refreshPriceText(this, skinData, skinportMarket, language, 'skinport', !config?.skinportPrice);

                    if(steamMarket?.skins?.length)
                        refreshPriceText(this, skinData, steamMarket, language, 'steam', !config?.steamPrice);
                })?.end();
};

const getCurrencyAndPrice = (text) => {
    text = text.trim();

    if(text.indexOf(',') != -1 && text.indexOf('.') != -1)
        text = text.replace(/\./g, '');
    else
        text = text.replace(/,/g, '.');

    currency = "";
    text.split('').forEach(el => {
        if(isNaN(el) && ![',', '.'].includes(el))
            currency += el;
    });

    return [currency || "USD", parseFloat(text.replace(currency, "")) || 0]
};

const convertPriceText = (currency, price) => {
    const leftSideLang = ["en", "pt", "br", "tr", "nl", "cn"];
    const langCode = window.location?.pathname?.split('/')[1];
    const priceText = price?.toFixed(2)?.toString()?.replace('.', ',')?.replace(/^(.{2})(.{6})(.*)$/, "$1 $2")

    if(!leftSideLang.includes(langCode))
        return `${priceText} ${currency}`;

    if(currency.length == 3)
        return `${currency} ${priceText}`;

    return `${currency}${priceText}`;
};

const refreshPriceText = async(tihsElement, skinData, market, language, cssName, hidden) => {
    const skinHashName = `${skinData?.stattrak ? 'StatTrak™ ' : ''}${skinData?.name_second} | ${skinData?.name?.slice(0, -2)}${skinData?.type ? ` (${skinData?.type})` : ''}`;
    const skinInfo = market?.skins?.filter(v => v.name === skinHashName);

    if (skinData?.currency_keydrop?.length != 3)
        switch(market?.currency) {
            case "USD":
                market.currency = "$";
                break;
            case "EUR":
                market.currency = "€";
                break;
            case "BRL":
                market.currency = "R$";
                break;
            case "GBP":
                market.currency = "£";
                break;
        }

    const priceText = skinInfo[0]?.price ? `${convertPriceText(market?.currency, skinInfo[0]?.price)}` : 'N/A';
    const hrefUrl = skinInfo[0]?.slink ? `https://skinport.com/item/${skinInfo[0]?.slink}` : `https://steamcommunity.com/market/listings/730/${skinInfo[0]?.name}`;
    let color = "whitesmoke";

    const langText = {
        refresh: `${language?.skinChanger_refresh}: `,
        currency: `${language?.skinChanger_currency}: `,
    };

    $(`#refreshButton${cssName?.charAt(0)?.toUpperCase()}${cssName?.slice(1)}`)?.attr('title', `${langText?.currency}${market?.currency || '-'}\n${langText?.refresh}${new Date(parseInt(market?.updateTime)).toLocaleString() || '-'}`)

    if(skinInfo?.length && skinData?.currency_keydrop == market?.currency) {
        if(skinData?.price_keydrop * 1.1 < skinInfo[0]?.price)
            color = "greenyellow";
        else if(skinData?.price_keydrop < skinInfo[0]?.price)
            color = "darkseagreen";
    }

    if(!$(tihsElement)?.find(`.${cssName}-price`)?.length)
        $(tihsElement)?.find('div.flex.w-full.items-center')?.eq(0)?.after($(document?.createElement('div'))
            ?.addClass(`flex w-full items-center ${cssName}-price-div`)
            ?.css({ display: hidden ? "none" : "flex" })
            ?.html(`<div class="${cssName}-price m-1.5 ml-auto min-w-0 whitespace-nowrap rounded-md bg-navy-900 p-1.5 font-bold leading-none text-gold" style="margin-top: -2px;font-size: 9px;"><div style="display: block; white-space: nowrap;"><img class="${cssName}-price-icon"><a ${skinInfo[0]?.price ? `href="${hrefUrl}" target="_blank"` : ''} style="color: ${color}">${priceText}</a></div></div>`)
        );
    else {
        $(tihsElement)?.find(`.${cssName}-price a`)?.text(priceText)?.css({ color: color });
        $(tihsElement)?.find(`.${cssName}-price-div`)?.css({ display: hidden ? "none" : "flex" });
    }
};

const createMenu = (language) => {
    const langText = {
        price: language?.skinChanger_price,
        refresh: `${language?.skinChanger_refresh}: `,
        currency: `${language?.skinChanger_currency}: `,
        steamInfo: language?.skinChanger_steamInfo,

        img: language?.skinChanger_img,
        name: language?.skinChanger_name,
        priceText: language?.skinChanger_priceText,
        diff: language?.skinChanger_priceDiff,
        diffButtonText: language?.skinChanger_priceDiffButtonText,
        
        steam: 'Steam',
        keydrop: 'Keydrop',
        skinport: 'Skinport',
        refreshIcon: '↻',
        infoIcon: 'ℹ'
    };

    $('div.my-4.flex.items-center.justify-between')?.eq(0)?.after($(document?.createElement('h3'))
        ?.addClass('text-left text-sm keydrop-plus-price')
        ?.text(langText?.price)
    );

    $('h3.keydrop-plus-price')?.eq(0)
        ?.after($(document?.createElement('div'))
            .addClass('my-3')
            .html(`<div class="flex max-w-sm rounded-md transition-colors duration-200 lg:mx-auto"><label class="row mb-1 flex flex-shrink-0 items-center text-base text-navy-300 py-1"><input class="customPrice steam" type="checkbox"><div class="mr-3 flex h-6 w-6 items-center justify-center overflow-hidden rounded-md border border-solid opacity-100 customPrice-checked:bg-navy-300/20 customPrice-disabled:opacity-30 border-navy-300"><svg class="icon h-2.5 w-2.5 fill-current opacity-0 transition-opacity duration-200 [.customPrice:checked~div>&amp;]:opacity-100 text-white" viewBox="0 0 13.032 10.185" fill="none"><path d="M1.06 4.157l3.908 3.908 7-7" fill="none" stroke="currentColor" stroke-width="3"></path></svg></div><p class="text-xs font-light uppercase tracking-tight text-navy-100">${langText?.steam}</p></label><abbr id="refreshButtonSteam" style="font-size: 12px;padding: 6px;height: 23px;margin-top: 3px;" class="refreshPriceButton row mb-1 flex flex-shrink-0 items-center text-base text-navy-300 py-1" title="${langText?.currency}-\n${langText?.refresh}-">${langText?.refreshIcon}</abbr><abbr style="margin-left: 10px; text-decoration: none; cursor: help; margin-top: 3px;" title="${langText?.steamInfo}">${langText?.infoIcon}</abbr></div><div class="flex max-w-sm rounded-md transition-colors duration-200 lg:mx-auto"><label class="row mb-1 flex flex-shrink-0 items-center text-base text-navy-300 py-1"><input class="customPrice skinport" type="checkbox"><div class="mr-3 flex h-6 w-6 items-center justify-center overflow-hidden rounded-md border border-solid opacity-100 customPrice-checked:bg-navy-300/20 customPrice-disabled:opacity-30 border-navy-300"><svg class="icon h-2.5 w-2.5 fill-current opacity-0 transition-opacity duration-200 [.customPrice:checked~div>&amp;]:opacity-100 text-white" viewBox="0 0 13.032 10.185" fill="none"><path d="M1.06 4.157l3.908 3.908 7-7" fill="none" stroke="currentColor" stroke-width="3"></path></svg></div><p class="text-xs font-light uppercase tracking-tight text-navy-100">${langText?.skinport}</p></label><abbr id="refreshButtonSkinport" style="font-size: 12px;padding: 6px;height: 23px;margin-top: 3px;" class="refreshPriceButton row mb-1 flex flex-shrink-0 items-center text-base text-navy-300 py-1" title="${langText?.currency}-\n${langText?.refresh}-">${langText?.refreshIcon}</abbr></div><div class="flex max-w-sm justify-between rounded-md transition-colors duration-200 lg:mx-auto"><button class="text-xs font-light uppercase tracking-tight text-navy-100 refreshPriceButton" id="skinChanger-diffButton" style="width: 190px;text-align: center;border: 1px solid slategray;padding: 5px;border-radius: 9px;cursor: pointer;">${langText?.diffButtonText}</button></div>`)
        )

    $('.customPrice.skinport')?.on('click', async(e) => {
        try {
            const config = await getConfigData();
            config.skinportPrice = e?.target?.checked;
            await chrome.storage.sync.set({ config: config });
            refreshPrices();
        } catch(e) {};
    });

    const currency = $('button.hidden.items-center.justify-center.gap-2.whitespace-nowrap.text-xs.uppercase.leading-none.text-navy-100 span.font-bold').eq(0).text()?.toString();
    $('#refreshButtonSkinport')?.on('click', () => {
        if(currency == "UAH" || currency == "ARS")
            return createToast('warning', 'skinport_currencyError');
        open(`https://api.skinport.com/keydrop+?currency=${currency}`, '_self');
    });

    $('.customPrice.steam')?.on('click', async(e) => {
        try {
            const config = await getConfigData();
            config.steamPrice = e?.target?.checked;
            await chrome.storage.sync.set({ config: config });
            refreshPrices();
        } catch(e) {};
    });

    $('#refreshButtonSteam')?.on('click', async() => {
        const steamMarket = await getStorageData('local', 'steamMarketJSON');
        if(parseInt(steamMarket?.updateTime) + (60 * 60 * 1000) >= new Date().getTime())
            return createToast('error', 'skinChanger_wait1h');
        open(`https://steamcommunity.com/market/search/render/?appid=730&norender=1&currency=6&count=0&start=50000/keydrop+`, '_self');
    });
    
    $('div#promo-code-modal').eq(0).before($(document?.createElement('div'))
        ?.addClass('bg-navy-700 pt-3 pb-3')
        ?.attr('id', 'skinChanger-best-skins-panel')
        ?.html(`<div class="scroll-container custom-scrollbar overflow-auto css-nqdl3y" style="max-height: 500px;"><table class="w-full table-fixed text-xs leading-none text-navy-200 css-s83462"><thead><tr class="text-left uppercase"><th class="px-2 py-4 text-center text-xs font-semibold" style="width: 20%;">${langText?.img}</th><th class="px-2 py-4 text-center text-xs font-semibold">${langText?.name}</th><th class="px-2 py-4 text-center text-xs font-semibold" style="width: 10%">${langText?.priceText} ${langText?.keydrop}</th><th class="px-2 py-4 text-center text-xs font-semibold" style="width: 10%">${langText?.priceText} <a id="skinChanger_priceName"></a></th><th class="px-2 py-4 text-center text-xs font-semibold" style="width: 10%">${langText?.diff}</th></tr></thead><tbody></tbody></table></div>`)
    );

    $('#skinChanger-diffButton')?.on('click', async() => {
        const steamChecked = $('.customPrice.steam')?.prop('checked');
        const skinportChecked = $('.customPrice.skinport')?.prop('checked');
        
        if(steamChecked && skinportChecked)
            return createToast('warning', 'skinChanger_diff_err1');
        else if(!steamChecked && !skinportChecked)
            return createToast('warning', 'skinChanger_diff_err2');

        const platform = steamChecked ? 'steam' : 'skinport';
        const market = await getStorageData('local', `${platform}MarketJSON`);
        if(!market?.currency)
            return createToast('warning', 'skinChanger_diff_err4');
        else if(market?.currency !== currency)
            return createToast('warning', 'skinChanger_diff_err3');
        findBestSkins(market, platform, language)
    });
};

const findBestSkins = async(market, platform, language) => {
    const minPrice = $('div.my-4.flex.items-center.justify-between input[type="number"]')?.eq(0)?.val() || null;
    const maxPrice = $('div.my-4.flex.items-center.justify-between input[type="number"]')?.eq(1)?.val() || null;

    let skinChanger_base_url = `https://wss-2096.key-drop.com`;
    await $('script')?.each(function() {
        const content = $(this).text();
        if(content?.includes('__skinChanger '))
            skinChanger_base_url = content?.split("API_BASE_URL: '")[1]?.split("'")[0];
    });

    const currency = $('button.hidden.items-center.justify-center.gap-2.whitespace-nowrap.text-xs.uppercase.leading-none.text-navy-100 span.font-bold').eq(0).text()?.toString();
    const fetch = await fetchUrl('GET', `${skinChanger_base_url}/InventoryItem?itemsPerPage=4000&currency=${currency?.toLowerCase()}&order=desc`);
    
    if(!fetch?.data?.elements?.length || !market?.skins?.length) return createToast('warning', 'skinChanger_inventoryError');
    let newItemTab = [];
    fetch?.data?.elements?.forEach(el => {
        let skinEx;
        const typeText = el?.condition;
        if(typeText?.includes('FN'))
            skinEx = "Factory New";
        else if(typeText?.includes('MW'))
            skinEx = 'Minimal Wear';
        else if(typeText?.includes('FT'))
            skinEx = 'Field-Tested';
        else if(typeText?.includes('WW'))
            skinEx = 'Well-Worn';
        else if(typeText?.includes('BS'))
            skinEx = 'Battle-Scarred';

        const skinHashName = `${el?.title} | ${el?.subtitle}${typeText ? ` (${skinEx})` : ''}`;
        const skinInfo = market?.skins?.filter(v => v.name === skinHashName);
        if(!skinInfo?.length) return;
        if(skinInfo[0]?.price <= el?.price) return;
        if(minPrice > 0 && el?.price < minPrice) return;
        if(maxPrice > 0 && el?.price > maxPrice) return;

        const item = {
            condition: skinEx,
            price_keydrop: parseFloat((el?.price)?.toFixed(2)),
            price_platform: skinInfo[0]?.price,
            img: el?.itemImg,
            name: el?.title,
            hash: skinInfo[0]?.slink || skinHashName,
            name_second: el?.subtitle,
            diff: parseFloat(((skinInfo[0]?.price * 100 / el?.price) - 100)?.toFixed(2)),
        };
        if(item?.diff <= 0) return;
        newItemTab?.push(item);
    });

    if(!newItemTab?.length)
        return createToast('warning', 'skinChanger_inventoryError');
    let tableTr, aboved100;
    newItemTab.sort((b,a) => a.diff - b.diff);
    if(newItemTab?.length > 100) {
        newItemTab = newItemTab?.slice(0, 100);
        aboved100 = true;
    }
    newItemTab?.forEach(el => {
        tableTr += `<tr class="odd:bg-navy-800"><td class="px-2 py-4 text-center"><img width="40px" style="margin: auto;" src="https://cdn.key-drop.com${el?.img}"></td><td class="px-2 py-4 text-center">${el?.name} | ${el?.name_second}${el?.condition ? ` (${el?.condition})` : ''}</td><td class="px-2 py-4 text-center">${el?.price_keydrop} ${currency}</td><td class="px-2 py-4 text-center"><a target="_blank" href="${platform == 'steam' ? `https://steamcommunity.com/market/listings/730/` : `https://skinport.com/item/`}${el?.hash}">${el?.price_platform} ${currency}</a></td><td class="px-2 py-4 text-center">+${el?.diff}%</td></tr>`
    });
    if(aboved100)
        tableTr += `<tr class="odd:bg-navy-800"><td class="px-2 py-4 text-center"></td><td class="px-2 py-4 text-center">${language?.skinChanger_limit}</td><td class="px-2 py-4 text-center"></td><td class="px-2 py-4 text-center"></td><td class="px-2 py-4 text-center"></td></tr>`;

    $('#skinChanger_priceName').text(`${platform?.charAt(0)}${platform?.slice(1)}`);
    $('#skinChanger-best-skins-panel tbody').html(tableTr);
    $('#skinChanger-best-skins-panel')?.css({ opacity: 1, 'pointer-events': 'all' });
};