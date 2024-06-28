let caseJSON;

$( document ).ready(async() => {
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
    getCaseData(languageText, server);
});

function getCaseData(languageText, server) {
    $('script')?.each(function() {
        const content = $(this).text();
        if(content?.includes('__case ')) {
            let _caseInfo = 
                content?.split("var __case = ")[1]
                ?.replace(/'/g, '"')
                ?.replace(/Ramese"s/g, "Ramese's")
                ?.replace(/Chantico"s/g, "Chantico's")
                ?.replace(/Man-o"-war/g, "Man-o'-war")
                ?.replace(/Sobek"s/g, "Sobek's")
                ?.replace(/Apep"s/g, "Apep's")
                ?.replace(/Ol"/g, "Ol'")
                ?.replace(/Death"s/g, "Death's")
                ?.replace(/Mummy"s/g, "Mummy's")            
                ?.replace(/Minotaur"s/g, "Minotaur's")
                ?.replace(/"Blueberries"/g, "'Blueberries'")
                ?.replace(/"Medium Rare"/g, "'Medium Rare'")
                ?.replace(/"The Doctor"/g, "'The Doctor'")
                ?.replace(/"Two Times"/g, "'Two Times'")
                ?.replace(/d"Escadron/g, "d'Escadron")
                ?.replace(/"Goggles"/g, "'Goggles'")
                ?.replace(/"Wet Sox"/g, "'Wet Sox'")
                ?.replace(/"Dead Cold"/g, "'Dead Cold'")
                ?.replace(/"Van Healen"/g, "'Van Healen'")
                ?.replace(/"Tree Hugger"/g, "'Tree Hugger'")
                ?.replace(/Pandora"s/g, "Pandora's")
                ?.replace(/isLoggedIn:/g, '"isLoggedIn":')
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
                ?.replace(/"coverage": 0./g, '"coverage": 0.0');
            
            server?.customCaseInfoReplace?.forEach(el => {
                const [target, newValue] = el?.split("|") || [];
                console.log(target, newValue);
                if(target && newValue)
                    _caseInfo = _caseInfo?.replace(new RegExp(target, 'g'), newValue);
            });

            _caseInfo = `${_caseInfo?.slice(0, _caseInfo?.search('.\n"lang": {'))}}`;
            caseJSON = JSON?.parse(_caseInfo);
        }
    });
    caseDataCombine(caseJSON, languageText);
};

const caseDataCombine = async(caseJSON, languageText) => {
    const currency = await getCurrency();
    const casePrice = caseJSON?.price || 999999;
    const dropList = [];
    let betterSkinsOdds = 0;
    caseJSON?.items?.forEach(el => {
        if(el?.pf?.length) {
            el?.pf?.forEach(el2 => {
                const item = {
                    name: el?.title?.trim(),
                    name_s: el?.subtitle?.trim(), 
                    icon: el?.icon,
                    url: el?.url || '/skins/product/Sealed-Graffiti-Sorry',
                    background: null,
                    color: null,
                    rarity: el2?.rarity,
                    rarityFull: null,
                    price: (el2?.price).toFixed(2) || 0,
                    chance: el2?.odds || 0,
                    intervalFrom: el2?.intervalFrom || 0,
                    intervalTo: el2?.intervalTo || 0,
                }

                if(el2?.price > casePrice)
                    betterSkinsOdds += el2?.odds;
                
                switch(el2?.rarity) {
                    case "FN":
                        item.rarityFull = "FACTORY NEW";
                        break;
                    case "MW":
                        item.rarityFull = "MINIMAL WEAR";
                        break;
                    case "FT":
                        item.rarityFull = "FIELD TESTED";
                        break;
                    case "WW":
                        item.rarityFull = "WELL-WORN";
                        break;
                    case "BS":
                        item.rarityFull = "BATTLE-SCARRED";
                        break;
                    default:
                        item.rarityFull = "";
                        break;
                }

                switch(el?.color) {
                    case "gold":
                        item.color = "rgba(220, 174, 100, 0.08)";
                        item.background = "data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iOSAwIDE4OC40IDE0MC40IiBzdHJva2U9IiNkY2FlNjQiIGZpbGw9Im5vbmUiPgogICAgICA8cGF0aCBzdHJva2U9Im5vbmUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIgZD0iTTEwMy4yIDk2TDY2LjcgMzIuOWg3Mi45TDEwMy4yIDk2eiIgLz4KICAgICAgPHBhdGgKICAgICAgICBvcGFjaXR5PSIwLjA1IgogICAgICAgIHN0cm9rZT0ibm9uZSIKICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgIGQ9Ik0xMzEuMyAzLjZsMTAuMyAxNy45SDEyMWwxMC4zLTE3Ljl6TTU2LjEgMzguM2wxMC4zIDE3LjlINDUuOGwxMC4zLTE3Ljl6TTEyNC4zIDg0LjZsMTAuMyAxNy45SDExNGwxMC4zLTE3Ljl6IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIHN0cm9rZS13aWR0aD0iMi41IgogICAgICAgIHN0cm9rZS1kYXNoYXJyYXk9Ijc5LDQwIgogICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0PSIxNSIKICAgICAgICBkPSJNMTYzLjQgMjAuNkwxMDMuMiAxMjEgNDMgMjAuNmgxMjAuNHoiCiAgICAgIC8+CiAgICAgIAogICAgPC9zdmc+";
                        break;
                    case "red":
                        item.color = "rgba(255, 68, 93, 0.08)";
                        item.background = "data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iOSAwIDE4OC40IDE0MC40IiBzdHJva2U9IiNmZjQ0NWQiIGZpbGw9Im5vbmUiPgogICAgICA8cGF0aCBzdHJva2U9Im5vbmUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIgZD0iTTEwMy4yIDk2TDY2LjcgMzIuOWg3Mi45TDEwMy4yIDk2eiIgLz4KICAgICAgPHBhdGgKICAgICAgICBvcGFjaXR5PSIwLjA1IgogICAgICAgIHN0cm9rZT0ibm9uZSIKICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgIGQ9Ik0xMzEuMyAzLjZsMTAuMyAxNy45SDEyMWwxMC4zLTE3Ljl6TTU2LjEgMzguM2wxMC4zIDE3LjlINDUuOGwxMC4zLTE3Ljl6TTEyNC4zIDg0LjZsMTAuMyAxNy45SDExNGwxMC4zLTE3Ljl6IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIHN0cm9rZS13aWR0aD0iMi41IgogICAgICAgIHN0cm9rZS1kYXNoYXJyYXk9Ijc5LDQwIgogICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0PSIxNSIKICAgICAgICBkPSJNMTYzLjQgMjAuNkwxMDMuMiAxMjEgNDMgMjAuNmgxMjAuNHoiCiAgICAgIC8+CiAgICAgIAogICAgPC9zdmc+";
                        break;
                    case "pink":
                        item.color = "rgba(223, 93, 238, 0.08)";
                        item.background = "data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iOSAwIDE4OC40IDE0MC40IiBzdHJva2U9IiNERjVERUUiIGZpbGw9Im5vbmUiPgogICAgICA8cGF0aCBzdHJva2U9Im5vbmUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIgZD0iTTEwMy4yIDk2TDY2LjcgMzIuOWg3Mi45TDEwMy4yIDk2eiIgLz4KICAgICAgPHBhdGgKICAgICAgICBvcGFjaXR5PSIwLjA1IgogICAgICAgIHN0cm9rZT0ibm9uZSIKICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgIGQ9Ik0xMzEuMyAzLjZsMTAuMyAxNy45SDEyMWwxMC4zLTE3Ljl6TTU2LjEgMzguM2wxMC4zIDE3LjlINDUuOGwxMC4zLTE3Ljl6TTEyNC4zIDg0LjZsMTAuMyAxNy45SDExNGwxMC4zLTE3Ljl6IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIHN0cm9rZS13aWR0aD0iMi41IgogICAgICAgIHN0cm9rZS1kYXNoYXJyYXk9Ijc5LDQwIgogICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0PSIxNSIKICAgICAgICBkPSJNMTYzLjQgMjAuNkwxMDMuMiAxMjEgNDMgMjAuNmgxMjAuNHoiCiAgICAgIC8+CiAgICAgIAogICAgPC9zdmc+";
                        break;
                    case "violet":
                        item.color = "rgba(164, 26, 255, 0.08)";
                        item.background = "data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iOSAwIDE4OC40IDE0MC40IiBzdHJva2U9IiNhNDFhZmYiIGZpbGw9Im5vbmUiPgogICAgICA8cGF0aCBzdHJva2U9Im5vbmUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIgZD0iTTEwMy4yIDk2TDY2LjcgMzIuOWg3Mi45TDEwMy4yIDk2eiIgLz4KICAgICAgPHBhdGgKICAgICAgICBvcGFjaXR5PSIwLjA1IgogICAgICAgIHN0cm9rZT0ibm9uZSIKICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgIGQ9Ik0xMzEuMyAzLjZsMTAuMyAxNy45SDEyMWwxMC4zLTE3Ljl6TTU2LjEgMzguM2wxMC4zIDE3LjlINDUuOGwxMC4zLTE3Ljl6TTEyNC4zIDg0LjZsMTAuMyAxNy45SDExNGwxMC4zLTE3Ljl6IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIHN0cm9rZS13aWR0aD0iMi41IgogICAgICAgIHN0cm9rZS1kYXNoYXJyYXk9Ijc5LDQwIgogICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0PSIxNSIKICAgICAgICBkPSJNMTYzLjQgMjAuNkwxMDMuMiAxMjEgNDMgMjAuNmgxMjAuNHoiCiAgICAgIC8+CiAgICAgIAogICAgPC9zdmc+";
                        break;
                    case "blue":
                        item.color = "rgba(68, 130, 255, 0.08)";
                        item.background = "data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iOSAwIDE4OC40IDE0MC40IiBzdHJva2U9IiM0NDgyZmYiIGZpbGw9Im5vbmUiPgogICAgICA8cGF0aCBzdHJva2U9Im5vbmUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIgZD0iTTEwMy4yIDk2TDY2LjcgMzIuOWg3Mi45TDEwMy4yIDk2eiIgLz4KICAgICAgPHBhdGgKICAgICAgICBvcGFjaXR5PSIwLjA1IgogICAgICAgIHN0cm9rZT0ibm9uZSIKICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgIGQ9Ik0xMzEuMyAzLjZsMTAuMyAxNy45SDEyMWwxMC4zLTE3Ljl6TTU2LjEgMzguM2wxMC4zIDE3LjlINDUuOGwxMC4zLTE3Ljl6TTEyNC4zIDg0LjZsMTAuMyAxNy45SDExNGwxMC4zLTE3Ljl6IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIHN0cm9rZS13aWR0aD0iMi41IgogICAgICAgIHN0cm9rZS1kYXNoYXJyYXk9Ijc5LDQwIgogICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0PSIxNSIKICAgICAgICBkPSJNMTYzLjQgMjAuNkwxMDMuMiAxMjEgNDMgMjAuNmgxMjAuNHoiCiAgICAgIC8+CiAgICAgIAogICAgPC9zdmc+";
                        break;
                    default: 
                        item.color = "rgba(194, 194, 194, 0.08)";
                        item.background = "data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iOSAwIDE4OC40IDE0MC40IiBzdHJva2U9IiM2NjY2NjYiIGZpbGw9Im5vbmUiPgogICAgICA8cGF0aCBzdHJva2U9Im5vbmUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIgZD0iTTEwMy4yIDk2TDY2LjcgMzIuOWg3Mi45TDEwMy4yIDk2eiIgLz4KICAgICAgPHBhdGgKICAgICAgICBvcGFjaXR5PSIwLjA1IgogICAgICAgIHN0cm9rZT0ibm9uZSIKICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgIGQ9Ik0xMzEuMyAzLjZsMTAuMyAxNy45SDEyMWwxMC4zLTE3Ljl6TTU2LjEgMzguM2wxMC4zIDE3LjlINDUuOGwxMC4zLTE3Ljl6TTEyNC4zIDg0LjZsMTAuMyAxNy45SDExNGwxMC4zLTE3Ljl6IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIHN0cm9rZS13aWR0aD0iMi41IgogICAgICAgIHN0cm9rZS1kYXNoYXJyYXk9Ijc5LDQwIgogICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0PSIxNSIKICAgICAgICBkPSJNMTYzLjQgMjAuNkwxMDMuMiAxMjEgNDMgMjAuNmgxMjAuNHoiCiAgICAgIC8+CiAgICAgIAogICAgPC9zdmc+";
                        break;
                }
                dropList?.push(item);
            });
        }
    });

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

    if(caseJSON?.priceFrom == "gold") {
        const goldAreaData = [];

        const casesFetch = await fetchUrl('GET', `${githubUrl}/cases.json`)
        if(!casesFetch) return;
        const cases = JSON.parse(`{"cases": ${casesFetch}}`)?.cases;
        if(!cases?.length) return;

        const goldenCases = cases?.filter(el => el?.goldProfit !== undefined);
        if(!goldenCases || !goldenCases?.length) return;

        goldenCases?.sort((a, b) => b.goldProfit - a.goldProfit);
        for(i = 0; i < goldenCases?.length; i++) {
            const data = {
                rank: i+1,
                lvl: 0
            };
            const profit = goldenCases[i]?.goldProfit;
            if(profit <= 11111111)
                data.lvl = 0;
            else if(profit <= 13209876)
                data.lvl = 0.5;
            else if(profit <= 15308641)
                data.lvl = 1;
            else if(profit <= 17407407)
                data.lvl = 1.5;
            else if(profit <= 19506172)
                data.lvl = 2;
            else if(profit <= 21604937)
                data.lvl = 2.5;
            else if(profit <= 23703703)
                data.lvl = 3;
            else if(profit <= 25802468)
                data.lvl = 3.5;
            else if(profit <= 27901233)
                data.lvl = 4;
            else if(profit <= 29999999)
                data.lvl = 4.5;
            else
                data.lvl = 5;
            goldAreaData[goldenCases[i]?.name] = data;
        };
        languageText.profitTitle = languageText?.profitTitleGold,
        languageText.profitDesc = `#${goldAreaData[caseJSON?.title]?.rank} ${languageText?.profitDescGold}`,
        profitPercentText = `${goldAreaData[caseJSON?.title]?.lvl}/5`;
    }
    
    waitForElm('.flex.grid-cols-3.flex-col.items-center.space-y-4.border-b.border-solid.border-navy-500').then(async() => {
        $('#main-view .container section.mb-8.py-8').remove();
        $('#main-view .container section').eq(0)
            .before($(document?.createElement('section'))
                .addClass('mb-8 py-8')
                .attr('id', 'caseInfoPanel')
                .html(`<div class="flex grid-cols-3 flex-col items-center space-y-4 border-b border-solid border-navy-500 md:grid md:items-start md:space-y-0"><div class="order-1 flex items-center space-x-4"></div><h2 class="order-3 mx-auto -mb-px inline-block border-b border-solid border-gold px-10 py-5 text-center text-xl font-semibold uppercase leading-tight text-white md:order-2">${languageText?.caseInfoTitle}</h2></div><div class="mt-8 relative flex"><ul class="hide-scrollbar flex w-full snap-x snap-mandatory overflow-x-auto rounded-lg ring-navy-400/20" style=" display: flex; justify-content: space-between;"><li class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12" style="border-radius: .5rem;border: 5px solid rgb(66 66 84/0.2);padding: 0px;flex-basis: 243px;"><a title="${languageText?.profitTitle} | ${profitPercentText}" class="group grid aspect-[1/1.2] items-center justify-center justify-items-center border-navy-400 bg-cover bg-center" style="background-image: linear-gradient(transparent 55%, rgb(0 224 239 / 8%)), url(https://key-drop.com/web/KD/static/images/case-item-bg.webp?v=137);"><div class="z-10 col-start-1 row-start-1 mb-auto mr-auto p-[7%] text-2xs font-semibold uppercase leading-none text-navy-200 [text-shadow:_0px_0px_3px_#1f1f27]" style=" width: 200%; margin-left: -50%; text-align: center;"><div class="-mb-2 text-sm font-bold text-gold" style=" font-size: 15px; margin-top: 53px;">${languageText?.profitTitle}</div><br><div style=" font-size: 59px; color: ghostwhite; padding: 30px 0;" class="pointer-events-none duration-300 ease-in-out real-group-hover:scale-75">${profitPercentText}</div><div>${languageText?.profitDesc}</div></div></a></li><li class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12" style="border-radius: .5rem;border: 5px solid rgb(66 66 84/0.2);padding: 0px;flex-basis: 243px;"><a title="${languageText?.avgPriceTitle} | ${avgPriceText}" class="group grid aspect-[1/1.2] items-center justify-center justify-items-center border-navy-400 bg-cover bg-center" style="background-image: linear-gradient(transparent 55%, rgb(0 224 239 / 8%)), url(https://key-drop.com/web/KD/static/images/case-item-bg.webp?v=137);"><div class="z-10 col-start-1 row-start-1 mb-auto mr-auto p-[7%] text-2xs font-semibold uppercase leading-none text-navy-200 [text-shadow:_0px_0px_3px_#1f1f27]" style=" width: 200%; margin-left: -50%; text-align: center;"><div class="-mb-2 text-sm font-bold text-gold" style=" font-size: 15px; margin-top: 53px;">${languageText?.avgPriceTitle}</div><br><div style=" font-size: 41px; color: ghostwhite; padding: 37px 0;" class="pointer-events-none duration-300 ease-in-out real-group-hover:scale-75">${avgPriceText}</div><div>${languageText?.avgPriceDesc}</div></div></a></li><li class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12" style="border-radius: .5rem;border: 5px solid rgb(66 66 84/0.2);margin: 0 47px;padding: 0px;flex-basis: 0px;"></li><li class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12" style="border-radius: .5rem;border: 5px solid rgb(66 66 84/0.2);padding: 0px;flex-basis: 243px;"><a title="${worstSkin?.name} | ${worstSkin?.name_s} ${worstSkin?.rarity?.length ? `(${worstSkin?.rarity})` : ''}" class="group grid aspect-[1/1.2] items-center justify-center justify-items-center border-navy-400 bg-cover bg-center" style="background-image: linear-gradient(transparent 55%, ${worstSkin?.color}), url(&quot;https://key-drop.com/web/KD/static/images/case-item-bg.webp?v=137&quot;);" href="https://key-drop.com/pl${worstSkin?.url}"><div class="z-10 col-start-1 row-start-1 mb-auto mr-auto p-[7%] text-2xs font-semibold uppercase leading-none text-navy-200 [text-shadow:_0px_0px_3px_#1f1f27]"><div class="-mb-2 text-sm font-bold text-gold">${languageText?.worstSkinTitle}</div><br><div>${languageText?.possibleText}</div></div><div class="z-10 col-start-1 row-start-1 mb-auto ml-auto p-[7%] text-right text-2xs font-semibold uppercase leading-none text-navy-200 [text-shadow:_0px_0px_3px_#1f1f27]">${languageText?.chance}<br><span style="font-size: 95%">${worstSkin?.chance?.toFixed(3)}%</span></div><img alt="" class="col-start-1 row-start-1 h-full w-[77%] -translate-y-5 rotate-180 transform object-contain duration-300 ease-in-out real-group-hover:scale-125 text-red" src="${worstSkin?.background}" style="--transitionDuration:1s;"><img src="${worstSkin?.icon}" alt="" class="pointer-events-none col-start-1 row-start-1 aspect-[3/2] h-full w-3/4 transform object-contain duration-300 ease-in-out real-group-hover:scale-75"><div class="z-10 col-start-1 row-start-1 min-w-0 max-w-full self-end justify-self-start p-[7%] font-semibold uppercase leading-tight [text-shadow:_0px_0px_3px_#1f1f27]"><div class="truncate text-[11px] text-navy-200">${worstSkin?.name_s}&shy;</div><div class="truncate text-sm font-bold text-white">${worstSkin?.name}&shy;</div><div class="truncate text-[11px] text-navy-200"> ${worstSkin?.rarityFull}&shy;</div><div class="-mb-1 text-sm font-bold text-gold">${worstSkin?.price} ${currency}</div></div></a></li><li class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12" style="border-radius: .5rem;border: 5px solid rgb(66 66 84/0.2);padding: 0px;flex-basis: 243px;"><a title="${commonSkin?.name} | ${commonSkin?.name_s} ${commonSkin?.rarity?.length ? `(${commonSkin?.rarity})` : ''}" class="group grid aspect-[1/1.2] items-center justify-center justify-items-center border-navy-400 bg-cover bg-center" style="background-image: linear-gradient(transparent 55%, ${commonSkin?.color}), url(&quot;https://key-drop.com/web/KD/static/images/case-item-bg.webp?v=137&quot;);" href="https://key-drop.com/pl${commonSkin?.url}"><div class="z-10 col-start-1 row-start-1 mb-auto mr-auto p-[7%] text-2xs font-semibold uppercase leading-none text-navy-200 [text-shadow:_0px_0px_3px_#1f1f27]"><div class="-mb-2 text-sm font-bold text-gold">${languageText?.commonSkinTitle}</div><br><div>${languageText?.possibleText}</div></div><div class="z-10 col-start-1 row-start-1 mb-auto ml-auto p-[7%] text-right text-2xs font-semibold uppercase leading-none text-navy-200 [text-shadow:_0px_0px_3px_#1f1f27]">${languageText?.chance}<br><span style="font-size: 95%">${commonSkin?.chance?.toFixed(3)}%</span></div><img alt="" class="col-start-1 row-start-1 h-full w-[77%] -translate-y-5 rotate-180 transform object-contain duration-300 ease-in-out real-group-hover:scale-125 text-red" src="${commonSkin?.background}" style="--transitionDuration:1s;"><img src="${commonSkin?.icon}" alt="" class="pointer-events-none col-start-1 row-start-1 aspect-[3/2] h-full w-3/4 transform object-contain duration-300 ease-in-out real-group-hover:scale-75"><div class="z-10 col-start-1 row-start-1 min-w-0 max-w-full self-end justify-self-start p-[7%] font-semibold uppercase leading-tight [text-shadow:_0px_0px_3px_#1f1f27]"><div class="truncate text-[11px] text-navy-200">${commonSkin?.name_s}&shy;</div><div class="truncate text-sm font-bold text-white">${commonSkin?.name}&shy;</div><div class="truncate text-[11px] text-navy-200"> ${commonSkin?.rarityFull}&shy;</div><div class="-mb-1 text-sm font-bold text-gold">${commonSkin?.price} ${currency}</div></div></a></li><li class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12" style="border-radius: .5rem;border: 5px solid rgb(66 66 84/0.2);padding: 0px;flex-basis: 243px;"><a title="${bestSkin?.name} | ${bestSkin?.name_s} ${bestSkin?.rarity?.length ? `(${bestSkin?.rarity})` : ''}" class="group grid aspect-[1/1.2] items-center justify-center justify-items-center border-navy-400 bg-cover bg-center" style="background-image: linear-gradient(transparent 55%, ${bestSkin?.color}), url(&quot;https://key-drop.com/web/KD/static/images/case-item-bg.webp?v=137&quot;);" href="https://key-drop.com/pl${bestSkin?.url}"><div class="z-10 col-start-1 row-start-1 mb-auto mr-auto p-[7%] text-2xs font-semibold uppercase leading-none text-navy-200 [text-shadow:_0px_0px_3px_#1f1f27]"><div class="-mb-2 text-sm font-bold text-gold">${languageText?.bestSkinTitle}</div><br><div>${languageText?.possibleText}</div></div><div class="z-10 col-start-1 row-start-1 mb-auto ml-auto p-[7%] text-right text-2xs font-semibold uppercase leading-none text-navy-200 [text-shadow:_0px_0px_3px_#1f1f27]">${languageText?.chance}<br><span style="font-size: 95%">${bestSkin?.chance?.toFixed(3)}%</span></div><img alt="" class="col-start-1 row-start-1 h-full w-[77%] -translate-y-5 rotate-180 transform object-contain duration-300 ease-in-out real-group-hover:scale-125 text-red" src="${bestSkin?.background}" style="--transitionDuration:1s;"><img src="${bestSkin?.icon}" alt="" class="pointer-events-none col-start-1 row-start-1 aspect-[3/2] h-full w-3/4 transform object-contain duration-300 ease-in-out real-group-hover:scale-75"><div class="z-10 col-start-1 row-start-1 min-w-0 max-w-full self-end justify-self-start p-[7%] font-semibold uppercase leading-tight [text-shadow:_0px_0px_3px_#1f1f27]"><div class="truncate text-[11px] text-navy-200">${bestSkin?.name_s}&shy;</div><div class="truncate text-sm font-bold text-white">${bestSkin?.name}&shy;</div><div class="truncate text-[11px] text-navy-200"> ${bestSkin?.rarityFull}&shy;</div><div class="-mb-1 text-sm font-bold text-gold">${bestSkin?.price} ${currency}</div></div></a></li></ul></div>`)
            )
            .end();
    
        CreateCaseDropMenu(dropList, languageText, caseJSON?.price, caseJSON?.priceFrom);
    });
};