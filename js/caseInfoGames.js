$( document ).ready(async() => {
    if(window.location.href.includes('/skins/category/')) return;
    
    $('#main-view .container section.mb-8.py-8').remove();

    const config = await getConfigData();
    const server = await getServerData();
    if(!config || !config?.active || !server) return;
    const language = await getLanguageData(config?.lang);
    
    const languageText = {
        caseInfoTitle: language?.caseInfo_caseInfoTitle,
        profitTitle: language?.caseInfo_profitTitle,
        profitDesc: language?.caseInfo_profitDesc,
        profitTitleGold: language?.caseInfo_profitTitleGold,
        profitDescGold: language?.caseInfo_profitDescGold,
        avgPriceTitle: language?.caseInfo_avgPriceTitle,
        avgPriceDesc: language?.caseInfo_avgPriceDesc,
        worstSkinTitle: language?.caseInfo_worstSkinTitle,
        commonSkinTitle: language?.caseInfo_commonSkinTitle,
        bestSkinTitle: language?.caseInfo_bestSkinTitle,
        possibleText: language?.caseInfo_possibleText,
        chance: language?.caseInfo_chance,
        testDrops: language?.freeOpen_testDrops,
        caseCount: language?.freeOpen_caseCount,
        caseSum: language?.freeOpen_caseSum,
        skinsSum: language?.freeOpen_skinsSum,
        profit: language?.freeOpen_profit
    };

    waitForElm('h2.mr-auto.px-6.text-center.text-base.font-semibold.uppercase.leading-tight.text-white').then(()=>{
        getGamesCaseData(languageText, server);
    });
});

const getGamesCaseData = async(languageText, server) => {
    let caseData = null;

    $('script')?.each(function() {
        const content = $(this).text();
        if(content?.includes('__case ')) {
            let _caseInfo = 
                content?.split("var __case = ")[1]
                ?.replace(/'/g, '"')
                ?.replace(/isLoggedIn:/g, '"isLoggedIn":')
                ?.replace(/inventoryUrl:/g, '"inventoryUrl":')
                ?.replace(/requireCaptcha:/g, '"requireCaptcha":')
                ?.replace(/type:/g, '"type":')
                ?.replace(/endpoints:/g, '"endpoints":')
                ?.replace(/createdInCooperation:/g, '"createdInCooperation":')
                ?.replace(/addFundsButton:/g, '"addFundsButton":')
                ?.replace(/balance:/g, '"balance":')
                ?.replace(/open:/g, '"open":')
                ?.replace(/sell:/g, '"sell":')
                ?.replace(/sellAll:/g, '"sellAll":')
                ?.replace(/layoutVariant:/g, '"layoutVariant":')
                ?.replace(/loginUrl:/g, '"loginUrl":')
                ?.replace(/depositUrl:/g, '"depositUrl":')
                ?.replace(/eventCoin:/g, '"eventCoin":')
                ?.replace(/maxRollsLength:/g, '"maxRollsLength":')
                ?.replace(/id:/g, '"id":')
                ?.replace(/title:/g, '"title":')
                ?.replace(/coverImg:/g, '"coverImg":')
                ?.replace(/price:/g, '"price":')
                ?.replace(/priceFrom:/g, '"priceFrom":')
                ?.replace(/iconSize:/g, '"iconSize":')
                ?.replace(/iconFilter:/g, '"iconFilter":')
                ?.replace(/topDrops:/g, '"topDrops":')
                ?.replace(/pfUpdatedAt:/g, '"pfUpdatedAt":')
                ?.replace(/items:/g, '"items":')
                ?.replace(/item:/g, '"item":')
                ?.replace(/rarity:/g, '"rarity":')
                ?.replace(/price:/g, '"price":')
                ?.replace(/intervalFrom:/g, '"intervalFrom":')
                ?.replace(/intervalTo:/g, '"intervalTo":')
                ?.replace(/odds:/g, '"odds":')
                ?.replace(/lang:/g, '"lang":')
                ?.replace(/error:/g, '"error":')
                ?.replace(/defaultTitle:/g, '"defaultTitle":')
                ?.replace(/defaultMessage:/g, '"defaultMessage":')
                ?.replace(/header:/g, '"header":')
                ?.replace(/actions:/g, '"actions":')
                ?.replace(/goBack:/g, '"goBack":')
                ?.replace(/short:/g, '"short":')
                ?.replace(/full:/g, '"full":')
                ?.replace(/toggleSound:/g, '"toggleSound":')
                ?.replace(/togglefastMode:/g, '"togglefastMode":')
                ?.replace(/loser:/g, '"loser":')
                ?.replace(/loginToOpenFor:/g, '"loginToOpenFor":')
                ?.replace(/checkingBalance:/g, '"checkingBalance":')
                ?.replace(/goBack:/g, '"goBack":')
                ?.replace(/openFor:/g, '"openFor":')
                ?.replace(/openAgain:/g, '"openAgain":')
                ?.replace(/sellFor:/g, '"sellFor":')
                ?.replace(/sellOne:/g, '"sellOne":')
                ?.replace(/selling:/g, '"selling":')
                ?.replace(/sold:/g, '"sold":')
                ?.replace(/state:/g, '"state":')
                ?.replace(/skins:/g, '"skins":')
                ?.replace(/upgradeAll:/g, '"upgradeAll":')
                ?.replace(/caseOpeningAnimationState:/g, '"caseOpeningAnimationState":')
                ?.replace(/tip:/g, '"tip":')
                ?.replace(/upgrade:/g, '"upgrade":')
                ?.replace(/topDrops:/g, '"topDrops":')
                ?.replace(/title:/g, '"title":')
                ?.replace(/origin:/g, '"origin":')
                ?.replace(/openForFree:/g, '"openForFree":')
                ?.replace(/addFundsWithPromocode:/g, '"addFundsWithPromocode":')
                ?.replace(/getBonus:/g, '"getBonus":')
                ?.replace(/addFundsToOpenFor:/g, '"addFundsToOpenFor":')
                ?.replace(/content:/g, '"content":')
                ?.replace(/updated:/g, '"updated":')
                ?.replace(/checkOddsRange:/g, '"checkOddsRange":')
                ?.replace(/chance:/g, '"chance":')
                ?.replace(/range:/g, '"range":')
                ?.replace(/shortcuts:/g, '"shortcuts":')
                ?.replace(/opening:/g, '"opening":')
                ?.replace(/values:/g, '"values":')
                ?.replace(/coverage:/g, '"coverage":')
                ?.replace(/drawingOrder:/g, '"drawingOrder":')
                ?.replace(/acceleration:/g, '"acceleration":')
                ?.replace(/muteSound:/g, '"muteSound":')
                ?.replace(/workShopDrop:/g, '"workShopDrop":')
                ?.replace(/workShopCarChoosen:/g, '"workShopCarChoosen":')
                ?.replace(/on:/g, '"on":')
                ?.replace(/off:/g, '"off":')
                ?.replace(/coverage": ./g, 'coverage": 0.')
                ?.replace(/  /g, '')
                ?.replace(/  /g, '')
                ?.replace(/, },/g, ' },')
                ?.replace(/,},/g, '},')
                ?.replace(/,\n},\n],/g, '\n}\n],')
                ?.replace(/],\n},\n],\n"lang":/g, '],\n}\n],\n"lang":')
                ?.replace(/}\n],\n},\n{\n"id":/g, '}\n]\n},\n{\n"id":')
                ?.replace(/,\n},\n{\n"rarity":/g, '\n},\n{\n"rarity":')
                ?.replace(/,\n},\n"header":/g, '\n},\n"header":')
                ?.replace(/,\n},\n"toggleSound":/g, '\n},\n"toggleSound":')
                ?.replace(/,\n},\n"togglefastMode":/g, '\n},\n"togglefastMode":')
                ?.replace(/,\n}\n}\n},\n"loser":/g, '\n}\n}\n},\n"loser":')
                ?.replace(/,\n},\n"topDrops":/g, '\n},\n"topDrops":')
                ?.replace(/,\n},\n"content"/g, '\n},\n"content"')
                ?.replace(/,\n},\n"item":/g, '\n},\n"item":')
                ?.replace(/,\n}\n},\n"shortcuts":/g, '\n}\n},\n"shortcuts":')
                ?.replace(/,\n},\n},\n}/g, '\n}\n}\n}')
                ?.replace(/}\n],\n}\n],\n"lang": {\n"error": {\n"defaultTitle":/g, '}\n]\n}\n],\n"lang": {\n"error": {\n"defaultTitle":')
                ?.replace(/\n}\n],\n},\n {\n"id":/g, '\n}\n]\n},\n {\n"id":')
                ?.replace(/,\n						},\n			"layoutVariant":/g, '\n},\n"layoutVariant":')
                ?.replace(/,\n},\n {\n"rarity"/g, '\n},\n {\n"rarity"')
                ?.replace(/"s /g, "'s ")
                ?.replace(/\\'s /g, "'s ")

                ?.replace(/,\n},\n {/g, '\n},\n {')

                ?.replace(/"coverage": 0./g, '"coverage": 0.0');
            
            server?.customCaseInfoReplace?.forEach(el => {
                const [target, newValue] = el?.split("|") || [];
                if(target && newValue)
                    _caseInfo = _caseInfo?.replace(new RegExp(target, 'g'), newValue);
            });
            
            _caseInfo = `${_caseInfo?.slice(0, _caseInfo?.search('.\n"lang": {'))}}`;
            let caseJSON = JSON?.parse(_caseInfo);

            let ods = 100000;
            const caseItems = [];
            caseJSON.items.forEach(el => {
                const item = {
                    colorBg: "",
                    chance: el.pfPercent,
                    color: el.color,
                    cover: el.cover,
                    intervalFrom: ods - (el.pfPercent * 1000),
                    intervalTo: ods,
                    platform: el.platform,
                    price: parseFloat(el.price),
                    title: el.title
                }
                ods -= (el.pfPercent * 1000);
                caseItems.push(item);
            });

            caseData = {
                casePrice: caseJSON.price,
                coverImg: caseJSON.coverImg,
                items: caseItems
            }
        }
    });

    const currency = $('button.hidden.items-center.justify-center.gap-2.whitespace-nowrap.text-xs.uppercase.leading-none.text-navy-100 span.font-bold').eq(0).text()?.toString() || 'USD';
    gamesCaseDataCombine(caseData, languageText, currency);
};

const gamesCaseDataCombine = async(caseJSON, languageText, currency) => {
    const casePrice = caseJSON?.casePrice || 999999;

    let betterSkinsOdds = 0;
    caseJSON?.items?.forEach(el => {
        if(el?.price > casePrice)
            betterSkinsOdds += el?.chance;

        switch(el?.color) {
            case "gold":
                el.colorBg = "rgba(220, 174, 100, 0.08)";
                break;
            case "red":
                el.colorBg = "rgba(255, 68, 93, 0.08)";
                break;
            case "pink":
                el.colorBg = "rgba(223, 93, 238, 0.08)";
                break;
            case "violet":
                el.colorBg = "rgba(164, 26, 255, 0.08)";
                break;
            case "blue":
                el.colorBg = "rgba(68, 130, 255, 0.08)";
                break;
            default: 
                el.colorBg = "rgba(194, 194, 194, 0.08)";
                break;
        }
    });

    dropList = caseJSON?.items;
    dropList.sort((a, b) => b.chance - a.chance);
    const commonSkin = dropList[0];

    dropList.sort((a,b) => parseFloat(a.price) - parseFloat(b.price));
    const worstSkin = dropList[0];
    const bestSkin = dropList[dropList?.length-1];

    let drawsPriceSum = 0;
    const drawsCount = rolls?.length;
    for(i=0; i<drawsCount; i++) {
        const drop = dropList?.filter(item => {
            return (rolls[i] >= item?.intervalFrom && rolls[i] <= item?.intervalTo)
        });
        drawsPriceSum += parseFloat(drop[0]?.price);
    }

    const avgPriceText = `${drawsPriceSum == 0 ? 0 : (drawsPriceSum / drawsCount)?.toFixed(2)} ${currency}`;
    let profitPercentText = `${Math?.round(betterSkinsOdds) || 0}%`;

    $('#main-view .container').eq(2)
        .prepend($(document?.createElement('section'))
            .addClass('mb-8 py-8')
            .attr('id', 'caseInfoPanel')
            .html(`<div class="flex grid-cols-3 flex-col items-center space-y-4 border-b border-solid border-navy-500 md:grid md:items-start md:space-y-0"><div class="order-1 flex items-center space-x-4"></div><h2 class="order-3 mx-auto -mb-px inline-block border-b border-solid border-gold px-10 py-5 text-center text-xl font-semibold uppercase leading-tight text-white md:order-2">${languageText?.caseInfoTitle}</h2></div><div class="mt-8 relative flex"><ul class="hide-scrollbar flex w-full snap-x snap-mandatory overflow-x-auto rounded-lg ring-navy-400/20" style=" display: flex; justify-content: space-between;"><li class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12" style="border-radius: .5rem;border: 5px solid rgb(66 66 84/0.2);padding: 0px;flex-basis: 243px;"><a title="${languageText?.profitTitle} | ${profitPercentText}" class="group grid aspect-[1/1.2] items-center justify-center justify-items-center border-navy-400 bg-cover bg-center" style="background-image: linear-gradient(transparent 55%, rgb(0 224 239 / 8%)), url(https://key-drop.com/web/KD/static/images/winner-top-drop-bg.png?v61); height: 100%; margin-left: -14px; padding-top: 18px;"><div class="z-10 col-start-1 row-start-1 mb-auto mr-auto p-[7%] text-2xs font-semibold uppercase leading-none text-navy-200 [text-shadow:_0px_0px_3px_#1f1f27]" style=" width: 200%; margin-left: -50%; text-align: center;"><div class="-mb-2 text-sm font-bold text-gold" style=" font-size: 15px; margin-top: 53px;">${languageText?.profitTitle}</div><br><div style=" font-size: 59px; color: ghostwhite; padding: 30px 0;" class="pointer-events-none duration-300 ease-in-out real-group-hover:scale-75">${profitPercentText}</div><div>${languageText?.profitDesc}</div></div></a></li><li class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12" style="border-radius: .5rem;border: 5px solid rgb(66 66 84/0.2);padding: 0px;flex-basis: 243px;"><a title="${languageText?.avgPriceTitle} | ${avgPriceText}" class="group grid aspect-[1/1.2] items-center justify-center justify-items-center border-navy-400 bg-cover bg-center" style="background-image: linear-gradient(transparent 55%, rgb(0 224 239 / 8%)), url(https://key-drop.com/web/KD/static/images/winner-top-drop-bg.png?v61); height: 100%; margin-left: -14px; padding-top: 18px;"><div class="z-10 col-start-1 row-start-1 mb-auto mr-auto p-[7%] text-2xs font-semibold uppercase leading-none text-navy-200 [text-shadow:_0px_0px_3px_#1f1f27]" style=" width: 200%; margin-left: -50%; text-align: center;"><div class="-mb-2 text-sm font-bold text-gold" style=" font-size: 15px; margin-top: 53px;">${languageText?.avgPriceTitle}</div><br><div style=" font-size: 41px; color: ghostwhite; padding: 37px 0;" class="pointer-events-none duration-300 ease-in-out real-group-hover:scale-75">${avgPriceText}</div><div>${languageText?.avgPriceDesc}</div></div></a></li><li class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12" style="border-radius: .5rem;border: 5px solid rgb(66 66 84/0.2);margin: 0 47px;padding: 0px;flex-basis: 0px;"></li><li class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12" style="border-radius: .5rem;border: 5px solid rgb(66 66 84/0.2);padding: 0px;flex-basis: 243px;"><div title="${worstSkin?.title}" class="group relative mt-px grid aspect-[1/1.35] grid-cols-1 grid-rows-1 border-navy-400 bg-navy-600 bg-cover bg-center" style="background-image: linear-gradient(transparent 55%, ${worstSkin?.colorBg}), url(&quot;https://key-drop.com/web/KD/static/images/winner-top-drop-bg.png?v61&quot;);"><div class="col-start-1 row-start-1 flex flex-col"><div class="flex items-center justify-between p-3 text-navy-200"><div class="z-10 col-start-1 row-start-1 mb-auto mr-auto p-[7%] text-2xs font-semibold uppercase leading-none text-navy-200 [text-shadow:_0px_0px_3px_#1f1f27]" style="margin: -11px;"><div class="-mb-2 text-sm font-bold text-gold">${languageText?.worstSkinTitle}</div><br><div>${languageText?.possibleText}</div></div><div class="flex items-center"><div role="tooltip" aria-label="${worstSkin?.platform}" data-microtip-position="right" class="css-1su536m"><svg class="block h-5 w-5"><use xlink:href="https://key-drop.com/web/KD/static/icons.svg?38#${worstSkin?.platform == "Steam" ? "steam-circle" : worstSkin?.platform?.toLowerCase()?.replace('.com', '')?.replace(' ', '-')?.replace('.', '')}"></use></svg></div><div class="ml-2 uppercase tracking-wide css-fqa9bi"><span class="css-oq0xea">${languageText?.chance}</span><br>5.756%</div></div></div><div class="relative mx-auto flex-1 css-1x97c6v"><img src="${worstSkin?.cover}" alt="" class="absolute left-0 top-0 h-full w-full object-contain real-group-hover:scale-75 duration-300 ease-in-out transform pointer-events-none"></div><div class="z-10 col-start-1 row-start-2 w-full self-end justify-self-start rounded-b text-center font-semibold uppercase leading-tight sm:rounded-b-lg md:row-start-1 css-hed01d"><div class="truncate font-bold text-white css-6plnry" title="${worstSkin?.title}">${worstSkin?.title}</div><div class="flex items-center justify-center truncate rounded-md font-bold leading-none text-gold css-6plnry" style="margin-top: 2px;margin-bottom: -9px;">${(worstSkin?.price)?.toFixed(2)} ${currency}</div></div></div></div></li><li class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12" style="border-radius: .5rem;border: 5px solid rgb(66 66 84/0.2);padding: 0px;flex-basis: 243px;"><div title="${commonSkin?.title}" class="group relative mt-px grid aspect-[1/1.35] grid-cols-1 grid-rows-1 border-navy-400 bg-navy-600 bg-cover bg-center" style="background-image: linear-gradient(transparent 55%, ${commonSkin?.colorBg}), url(&quot;https://key-drop.com/web/KD/static/images/winner-top-drop-bg.png?v61&quot;);"><div class="col-start-1 row-start-1 flex flex-col"><div class="flex items-center justify-between p-3 text-navy-200"><div class="z-10 col-start-1 row-start-1 mb-auto mr-auto p-[7%] text-2xs font-semibold uppercase leading-none text-navy-200 [text-shadow:_0px_0px_3px_#1f1f27]" style="margin: -11px;"><div class="-mb-2 text-sm font-bold text-gold">${languageText?.commonSkinTitle}</div><br><div>${languageText?.possibleText}</div></div><div class="flex items-center"><div role="tooltip" aria-label="${commonSkin?.platform}" data-microtip-position="right" class="css-1su536m"><svg class="block h-5 w-5"><use xlink:href="https://key-drop.com/web/KD/static/icons.svg?38#${commonSkin?.platform == "Steam" ? "steam-circle" : commonSkin?.platform?.toLowerCase()?.replace('.com', '')?.replace(' ', '-')?.replace('.', '')}"></use></svg></div><div class="ml-2 uppercase tracking-wide css-fqa9bi"><span class="css-oq0xea">${languageText?.chance}</span><br>5.756%</div></div></div><div class="relative mx-auto flex-1 css-1x97c6v"><img src="${commonSkin?.cover}" alt="" class="absolute left-0 top-0 h-full w-full object-contain real-group-hover:scale-75 duration-300 ease-in-out transform pointer-events-none"></div><div class="z-10 col-start-1 row-start-2 w-full self-end justify-self-start rounded-b text-center font-semibold uppercase leading-tight sm:rounded-b-lg md:row-start-1 css-hed01d"><div class="truncate font-bold text-white css-6plnry" title="${commonSkin?.title}">${commonSkin?.title}</div><div class="flex items-center justify-center truncate rounded-md font-bold leading-none text-gold css-6plnry" style="margin-top: 2px;margin-bottom: -9px;">${(commonSkin?.price)?.toFixed(2)} ${currency}</div></div></div></div></li><li class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12" style="border-radius: .5rem;border: 5px solid rgb(66 66 84/0.2);padding: 0px;flex-basis: 243px;"><div title="${bestSkin?.title}" class="group relative mt-px grid aspect-[1/1.35] grid-cols-1 grid-rows-1 border-navy-400 bg-navy-600 bg-cover bg-center" style="background-image: linear-gradient(transparent 55%, ${bestSkin?.colorBg}), url(&quot;https://key-drop.com/web/KD/static/images/winner-top-drop-bg.png?v61&quot;);"><div class="col-start-1 row-start-1 flex flex-col"><div class="flex items-center justify-between p-3 text-navy-200"><div class="z-10 col-start-1 row-start-1 mb-auto mr-auto p-[7%] text-2xs font-semibold uppercase leading-none text-navy-200 [text-shadow:_0px_0px_3px_#1f1f27]" style="margin: -11px;"><div class="-mb-2 text-sm font-bold text-gold">${languageText?.bestSkinTitle}</div><br><div>${languageText?.possibleText}</div></div><div class="flex items-center"><div role="tooltip" aria-label="${bestSkin?.platform}" data-microtip-position="right" class="css-1su536m"><svg class="block h-5 w-5"><use xlink:href="https://key-drop.com/web/KD/static/icons.svg?38#${bestSkin?.platform == "Steam" ? "steam-circle" : bestSkin?.platform?.toLowerCase()?.replace('.com', '')?.replace(' ', '-')?.replace('.', '')}"></use></svg></div><div class="ml-2 uppercase tracking-wide css-fqa9bi"><span class="css-oq0xea">${languageText?.chance}</span><br>5.756%</div></div></div><div class="relative mx-auto flex-1 css-1x97c6v"><img src="${bestSkin?.cover}" alt="" class="absolute left-0 top-0 h-full w-full object-contain real-group-hover:scale-75 duration-300 ease-in-out transform pointer-events-none"></div><div class="z-10 col-start-1 row-start-2 w-full self-end justify-self-start rounded-b text-center font-semibold uppercase leading-tight sm:rounded-b-lg md:row-start-1 css-hed01d"><div class="truncate font-bold text-white css-6plnry" title="${bestSkin?.title}">${bestSkin?.title}</div><div class="flex items-center justify-center truncate rounded-md font-bold leading-none text-gold css-6plnry" style="margin-top: 2px;margin-bottom: -9px;">${(bestSkin?.price)?.toFixed(2)} ${currency}</div></div></div></div></li></ul></div>`)
        )
        .end();

    createGamesCaseDropMenu(dropList, languageText, caseJSON?.casePrice);
};