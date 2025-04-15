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
                        item.stroke = "#FFCB77",
                        item.color = "rgb(255, 203, 119)";
                        item.dcolor = "rgb(255, 203, 119, 0.01)";
                        item.gradient = "linear-gradient(color-mix(in hsl, rgb(255, 203, 119) 30%, black), color-mix(in hsl, rgb(255, 203, 119) 60%, black))";
                        item.background = "data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iOSAwIDE4OC40IDE0MC40IiBzdHJva2U9IiNkY2FlNjQiIGZpbGw9Im5vbmUiPgogICAgICA8cGF0aCBzdHJva2U9Im5vbmUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIgZD0iTTEwMy4yIDk2TDY2LjcgMzIuOWg3Mi45TDEwMy4yIDk2eiIgLz4KICAgICAgPHBhdGgKICAgICAgICBvcGFjaXR5PSIwLjA1IgogICAgICAgIHN0cm9rZT0ibm9uZSIKICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgIGQ9Ik0xMzEuMyAzLjZsMTAuMyAxNy45SDEyMWwxMC4zLTE3Ljl6TTU2LjEgMzguM2wxMC4zIDE3LjlINDUuOGwxMC4zLTE3Ljl6TTEyNC4zIDg0LjZsMTAuMyAxNy45SDExNGwxMC4zLTE3Ljl6IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIHN0cm9rZS13aWR0aD0iMi41IgogICAgICAgIHN0cm9rZS1kYXNoYXJyYXk9Ijc5LDQwIgogICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0PSIxNSIKICAgICAgICBkPSJNMTYzLjQgMjAuNkwxMDMuMiAxMjEgNDMgMjAuNmgxMjAuNHoiCiAgICAgIC8+CiAgICAgIAogICAgPC9zdmc+";
                        break;
                    case "red":
                        item.stroke = "#FE4760",
                        item.color = "rgb(254, 71, 96)";
                        item.dcolor = "rgb(254, 71, 96, 0.01)";
                        item.gradient = "linear-gradient(color-mix(in hsl, rgb(254, 71, 96) 30%, black), color-mix(in hsl, rgb(254, 71, 96) 60%, black))";
                        item.background = "data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iOSAwIDE4OC40IDE0MC40IiBzdHJva2U9IiNmZjQ0NWQiIGZpbGw9Im5vbmUiPgogICAgICA8cGF0aCBzdHJva2U9Im5vbmUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIgZD0iTTEwMy4yIDk2TDY2LjcgMzIuOWg3Mi45TDEwMy4yIDk2eiIgLz4KICAgICAgPHBhdGgKICAgICAgICBvcGFjaXR5PSIwLjA1IgogICAgICAgIHN0cm9rZT0ibm9uZSIKICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgIGQ9Ik0xMzEuMyAzLjZsMTAuMyAxNy45SDEyMWwxMC4zLTE3Ljl6TTU2LjEgMzguM2wxMC4zIDE3LjlINDUuOGwxMC4zLTE3Ljl6TTEyNC4zIDg0LjZsMTAuMyAxNy45SDExNGwxMC4zLTE3Ljl6IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIHN0cm9rZS13aWR0aD0iMi41IgogICAgICAgIHN0cm9rZS1kYXNoYXJyYXk9Ijc5LDQwIgogICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0PSIxNSIKICAgICAgICBkPSJNMTYzLjQgMjAuNkwxMDMuMiAxMjEgNDMgMjAuNmgxMjAuNHoiCiAgICAgIC8+CiAgICAgIAogICAgPC9zdmc+";
                        break;
                    case "pink":
                        item.stroke = "#C164DC",
                        item.color = "rgb(193, 100, 220)";
                        item.dcolor = "rgb(193, 100, 220, 0.01)";
                        item.gradient = "linear-gradient(color-mix(in hsl, rgb(193, 100, 220) 30%, black), color-mix(in hsl, rgb(193, 100, 220) 60%, black))";
                        item.background = "data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iOSAwIDE4OC40IDE0MC40IiBzdHJva2U9IiNERjVERUUiIGZpbGw9Im5vbmUiPgogICAgICA8cGF0aCBzdHJva2U9Im5vbmUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIgZD0iTTEwMy4yIDk2TDY2LjcgMzIuOWg3Mi45TDEwMy4yIDk2eiIgLz4KICAgICAgPHBhdGgKICAgICAgICBvcGFjaXR5PSIwLjA1IgogICAgICAgIHN0cm9rZT0ibm9uZSIKICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgIGQ9Ik0xMzEuMyAzLjZsMTAuMyAxNy45SDEyMWwxMC4zLTE3Ljl6TTU2LjEgMzguM2wxMC4zIDE3LjlINDUuOGwxMC4zLTE3Ljl6TTEyNC4zIDg0LjZsMTAuMyAxNy45SDExNGwxMC4zLTE3Ljl6IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIHN0cm9rZS13aWR0aD0iMi41IgogICAgICAgIHN0cm9rZS1kYXNoYXJyYXk9Ijc5LDQwIgogICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0PSIxNSIKICAgICAgICBkPSJNMTYzLjQgMjAuNkwxMDMuMiAxMjEgNDMgMjAuNmgxMjAuNHoiCiAgICAgIC8+CiAgICAgIAogICAgPC9zdmc+";
                        break;
                    case "violet":
                        item.stroke = "#8148EA",
                        item.color = "rgb(129, 72, 234)";
                        item.dcolor = "rgb(129, 72, 234, 0.01)";
                        item.gradient = "linear-gradient(color-mix(in hsl, rgb(129, 72, 234) 30%, black), color-mix(in hsl, rgb(129, 72, 234) 60%, black))";
                        item.background = "data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iOSAwIDE4OC40IDE0MC40IiBzdHJva2U9IiNhNDFhZmYiIGZpbGw9Im5vbmUiPgogICAgICA8cGF0aCBzdHJva2U9Im5vbmUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIgZD0iTTEwMy4yIDk2TDY2LjcgMzIuOWg3Mi45TDEwMy4yIDk2eiIgLz4KICAgICAgPHBhdGgKICAgICAgICBvcGFjaXR5PSIwLjA1IgogICAgICAgIHN0cm9rZT0ibm9uZSIKICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgIGQ9Ik0xMzEuMyAzLjZsMTAuMyAxNy45SDEyMWwxMC4zLTE3Ljl6TTU2LjEgMzguM2wxMC4zIDE3LjlINDUuOGwxMC4zLTE3Ljl6TTEyNC4zIDg0LjZsMTAuMyAxNy45SDExNGwxMC4zLTE3Ljl6IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIHN0cm9rZS13aWR0aD0iMi41IgogICAgICAgIHN0cm9rZS1kYXNoYXJyYXk9Ijc5LDQwIgogICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0PSIxNSIKICAgICAgICBkPSJNMTYzLjQgMjAuNkwxMDMuMiAxMjEgNDMgMjAuNmgxMjAuNHoiCiAgICAgIC8+CiAgICAgIAogICAgPC9zdmc+";
                        break;
                    case "blue":
                        item.stroke = "#4B69FF",
                        item.color = "rgb(75, 105, 255)";
                        item.dcolor = "rgb(75, 105, 255, 0.01)";
                        item.gradient = "linear-gradient(color-mix(in hsl, rgb(75, 105, 255) 30%, black), color-mix(in hsl, rgb(75, 105, 255) 60%, black))";
                        item.background = "data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iOSAwIDE4OC40IDE0MC40IiBzdHJva2U9IiM0NDgyZmYiIGZpbGw9Im5vbmUiPgogICAgICA8cGF0aCBzdHJva2U9Im5vbmUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIgZD0iTTEwMy4yIDk2TDY2LjcgMzIuOWg3Mi45TDEwMy4yIDk2eiIgLz4KICAgICAgPHBhdGgKICAgICAgICBvcGFjaXR5PSIwLjA1IgogICAgICAgIHN0cm9rZT0ibm9uZSIKICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgIGQ9Ik0xMzEuMyAzLjZsMTAuMyAxNy45SDEyMWwxMC4zLTE3Ljl6TTU2LjEgMzguM2wxMC4zIDE3LjlINDUuOGwxMC4zLTE3Ljl6TTEyNC4zIDg0LjZsMTAuMyAxNy45SDExNGwxMC4zLTE3Ljl6IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIHN0cm9rZS13aWR0aD0iMi41IgogICAgICAgIHN0cm9rZS1kYXNoYXJyYXk9Ijc5LDQwIgogICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0PSIxNSIKICAgICAgICBkPSJNMTYzLjQgMjAuNkwxMDMuMiAxMjEgNDMgMjAuNmgxMjAuNHoiCiAgICAgIC8+CiAgICAgIAogICAgPC9zdmc+";
                        break;
                    default: 
                        item.stroke = "#858DAD",
                        item.color = "rgb(153, 170, 255)";
                        item.dcolor = "rgb(153, 170, 255, 0.01)";
                        item.gradient = "linear-gradient(color-mix(in hsl, rgb(153, 170, 255) 30%, black), color-mix(in hsl, rgb(153, 170, 255) 60%, black))";
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
    
    waitForElm('ul.grid.gap-3').then(async() => {
        if ($('#main-view div.container section').length > 1)
            $('#main-view div.container section').eq(0).remove();
        $('#main-view div.container section').eq(0)
            .before($(document?.createElement('section'))
                .addClass('mb-8 py-8')
                .attr('id', 'caseInfoPanel')
                .html(`<div class="flex grid-cols-3 flex-col items-center space-y-4 border-b border-solid border-navy-500 md:grid md:items-start md:space-y-0"><div class="order-1 flex items-center space-x-4"></div><h2 class="order-3 mx-auto -mb-px inline-block border-b border-solid border-gold px-10 py-5 text-center text-xl font-semibold uppercase leading-tight text-white md:order-2">${languageText?.caseInfoTitle}</h2></div><div class="mt-8 relative flex"><ul class="hide-scrollbar flex w-full snap-x snap-mandatory overflow-x-auto rounded-lg ring-navy-400/20" style=" display: flex; justify-content: space-between;"><li class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12" style="border-radius: .5rem;border: 5px solid rgb(66 66 84/0.2);padding: 0px;flex-basis: 243px;"><a title="${languageText?.profitTitle} | ${profitPercentText}" class="group grid aspect-[1/1.2] items-center justify-center justify-items-center border-navy-400 bg-cover bg-center" style="height: 100%; background-image: linear-gradient(transparent 55%, rgb(0 224 239 / 8%)), url(https://key-drop.com/web/KD/static/images/case-item-bg.webp?v=137);"><div class="z-10 col-start-1 row-start-1 mb-auto mr-auto p-[7%] text-2xs font-semibold uppercase leading-none text-navy-200 [text-shadow:_0px_0px_3px_#1f1f27]" style=" width: 200%; margin-left: -50%; text-align: center;"><div class="-mb-2 text-sm font-bold text-gold" style=" font-size: 15px; margin-top: 53px;">${languageText?.profitTitle}</div><br><div style=" font-size: 59px; color: ghostwhite; padding: 30px 0;" class="pointer-events-none duration-300 ease-in-out real-group-hover:scale-75">${profitPercentText}</div><div>${languageText?.profitDesc}</div></div></a></li><li class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12" style="border-radius: .5rem;border: 5px solid rgb(66 66 84/0.2);padding: 0px;flex-basis: 243px;"><a title="${languageText?.avgPriceTitle} | ${avgPriceText}" class="group grid aspect-[1/1.2] items-center justify-center justify-items-center border-navy-400 bg-cover bg-center" style="height: 100%; background-image: linear-gradient(transparent 55%, rgb(0 224 239 / 8%)), url(https://key-drop.com/web/KD/static/images/case-item-bg.webp?v=137);"><div class="z-10 col-start-1 row-start-1 mb-auto mr-auto p-[7%] text-2xs font-semibold uppercase leading-none text-navy-200 [text-shadow:_0px_0px_3px_#1f1f27]" style=" width: 200%; margin-left: -50%; text-align: center;"><div class="-mb-2 text-sm font-bold text-gold" style=" font-size: 15px; margin-top: 53px;">${languageText?.avgPriceTitle}</div><br><div style=" font-size: 41px; color: ghostwhite; padding: 37px 0;" class="pointer-events-none duration-300 ease-in-out real-group-hover:scale-75">${avgPriceText}</div><div>${languageText?.avgPriceDesc}</div></div></a></li><li class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12" style="border-radius: .5rem;border: 5px solid rgb(66 66 84/0.2);margin: 0 47px;padding: 0px;flex-basis: 0px;"></li>`
                    + `<li data-testid="case-content-card" class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12"><div class="group relative z-0 flex aspect-[177/200] min-h-0 w-full flex-col rounded-lg border border-navy-500 bg-gradient-to-b from-navy-600 to-navy-700 transition-colors duration-[400ms] ease-expo will-change-transform hover:border-transparent @[14rem]:aspect-[230/200]"><div class="absolute -inset-px z-[-1] rounded-[inherit] opacity-1 transition-opacity duration-[400ms] ease-expo will-change-transform real-group-hover:opacity-100" style="background-image:${worstSkin?.gradient}"></div><a href="${worstSkin?.url}" title="${worstSkin?.name} | ${worstSkin?.name_s} ${worstSkin?.rarityFull?.length ? `(${worstSkin?.rarityFull})` : ''}" class="absolute inset-0 z-20"></a><div class="flex items-start justify-between p-3 pb-0"><div class="z-10 text-left text-10px uppercase leading-tight text-navy-200"><div class="flex flex-col css-5dt5vx"><span class="text-sm font-bold text-gold">${languageText?.worstSkinTitle}</span><span data-testid="case-content-cards-grid-item-odds-percentage" class="font-semibold">${languageText?.possibleText}</span></div></div><div class="z-10 ml-auto text-right text-10px uppercase leading-tight text-navy-200"><div class="flex flex-col css-5dt5vx"><span class="font-medium">${languageText?.chance}</span><span data-testid="case-content-cards-grid-item-odds-percentage" class="font-semibold">${worstSkin?.chance?.toFixed(3)}%</span></div></div></div><div class="grid-stack relative m-auto grid min-h-0 w-10/12 flex-1 place-items-center"><svg width="136" height="136" viewBox="0 0 136 136" fill="none" class="h-full w-8/12"><g filter="url(#filter0_d_3528_6694)"><path d="M64 5.3094C66.4752 3.88034 69.5248 3.88034 72 5.3094L120.292 33.1906C122.767 34.6197 124.292 37.2607 124.292 40.1188V95.8812C124.292 98.7393 122.767 101.38 120.292 102.809L72 130.691C69.5248 132.12 66.4752 132.12 64 130.691L15.7083 102.809C13.2331 101.38 11.7083 98.7393 11.7083 95.8812V40.1188C11.7083 37.2607 13.2331 34.6197 15.7083 33.1906L64 5.3094Z" class="fill-[#282832] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" style="fill: ${worstSkin?.dcolor}"></path></g><g data-hex-emblem-stroke="true" filter="url(#filter1_d_3528_6694)"><path d="M71.75 5.74241L120.042 33.6236C122.362 34.9634 123.792 37.4393 123.792 40.1188V95.8812C123.792 98.5607 122.362 101.037 120.042 102.376L71.75 130.258C69.4295 131.597 66.5705 131.597 64.25 130.258L15.9583 102.376C13.6378 101.037 12.2083 98.5607 12.2083 95.8812V40.1188C12.2083 37.4393 13.6378 34.9634 15.9583 33.6236L64.25 5.74241C66.5705 4.40267 69.4295 4.40267 71.75 5.74241Z" stroke="${worstSkin?.stroke}"></path></g><path data-hex-emblem-inner="true" d="M64.0001 27.2948C66.4753 25.8657 69.5249 25.8657 72.0001 27.2948L101.252 44.1833C103.727 45.6124 105.252 48.2534 105.252 51.1115V84.8886C105.252 87.7467 103.727 90.3878 101.252 91.8168L72.0001 108.705C69.5249 110.134 66.4753 110.134 64.0001 108.705L34.7482 91.8168C32.273 90.3878 30.7482 87.7467 30.7482 84.8886V51.1115C30.7482 48.2534 32.273 45.6124 34.7482 44.1833L64.0001 27.2948Z" class="fill-[#21212B] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" fill-opacity="0.18" style="fill:${worstSkin?.dcolor}"></path><path data-hex-emblem-inner="true" d="M64.0001 27.2948C66.4753 25.8657 69.5249 25.8657 72.0001 27.2948L101.252 44.1833C103.727 45.6124 105.252 48.2534 105.252 51.1115V84.8886C105.252 87.7467 103.727 90.3878 101.252 91.8168L72.0001 108.705C69.5249 110.134 66.4753 110.134 64.0001 108.705L34.7482 91.8168C32.273 90.3878 30.7482 87.7467 30.7482 84.8886V51.1115C30.7482 48.2534 32.273 45.6124 34.7482 44.1833L64.0001 27.2948Z" class="fill-[#21212B] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" fill-opacity="0.18" style="fill: ${worstSkin?.dcolor}"></path><path data-hex-emblem-inner="true" d="M64.0001 27.2948C66.4753 25.8657 69.5249 25.8657 72.0001 27.2948L101.252 44.1833C103.727 45.6124 105.252 48.2534 105.252 51.1115V84.8886C105.252 87.7467 103.727 90.3878 101.252 91.8168L72.0001 108.705C69.5249 110.134 66.4753 110.134 64.0001 108.705L34.7482 91.8168C32.273 90.3878 30.7482 87.7467 30.7482 84.8886V51.1115C30.7482 48.2534 32.273 45.6124 34.7482 44.1833L64.0001 27.2948Z" class="fill-[#21212B] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" style="fill: ${worstSkin?.dcolor}"></path><path data-hex-emblem-signet="true" fill-rule="evenodd" clip-rule="evenodd" d="M73.7742 51.0885L68.8627 60.7734H68.8713C68.597 61.3266 69.0341 61.9819 69.6427 61.9309L79.4485 60.3905C79.9456 60.3309 80.2199 59.7266 79.9456 59.233L75.0428 51.0374C74.7685 50.5353 74.0485 50.5353 73.7742 51.0885ZM65.7728 61.9051L57.0546 59.4554C56.421 59.288 56.305 58.3715 56.8226 58.0278L62.7835 53.8773C63.185 53.5953 63.7026 53.7628 63.8721 54.221L66.683 60.7684C66.915 61.394 66.3975 62.0814 65.7639 61.9051H65.7728ZM63.6666 69.1036H54.9672C53.5708 69.1036 52.3999 67.9914 52.3999 66.543C52.3999 65.0946 53.5188 63.9824 54.9672 63.9824H63.6666V69.1036ZM65.7148 63.9824H69.8118V69.1036H65.7148V63.9824ZM65.7148 71.1514H69.8118V84.4665H65.7148V71.1514ZM55.4727 76.2066C55.4727 80.7739 59.1377 84.4665 63.6666 84.4665V71.1514H55.4727V76.2066ZM71.8604 69.1036H80.5597C81.9561 69.1036 83.127 67.9914 83.127 66.543C83.127 65.0946 82.0082 63.9824 80.5597 63.9824H71.8604V69.1036ZM80.0543 76.2066C80.0543 80.7739 76.3892 84.4665 71.8604 84.4665V71.1514H80.0543V76.2066Z" class="fill-[#454A56] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" style="fill: ${worstSkin?.stroke}"></path><defs><filter id="filter0_d_3528_6694" x="11.7085" y="4.2373" width="112.583" height="131.525" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="4"></feOffset><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3528_6694"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3528_6694" result="shape"></feBlend></filter><filter id="filter1_d_3528_6694" x="11.7085" y="4.2373" width="112.583" height="131.525" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="4"></feOffset><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3528_6694"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3528_6694" result="shape"></feBlend></filter></defs></svg><img loading="lazy" alt="" class="pointer-events-none absolute w-10/12 object-contain transition duration-[400ms] ease-back will-change-transform real-group-hover:scale-90" src="${worstSkin?.icon}"></div><div class="z-10 w-full self-end p-3 pt-0 font-semibold leading-tight"><div data-testid="case-content-cards-grid-item-category" class="truncate text-xs text-navy-200">${worstSkin?.name} ${worstSkin?.rarity?.length ? `(${worstSkin?.rarity})` : '' }</div><div data-testid="case-content-cards-grid-item-name" class="truncate text-sm text-white">${worstSkin?.name_s}</div><div data-testid="case-content-cards-grid-item-price" class="mt-2 rounded bg-gold-800 py-[0.4375rem] text-center text-sm font-semibold leading-none text-gold-400">${parseFloat(worstSkin?.price)?.toFixed(2)} ${currency}</div></div><div class="absolute inset-x-7 -bottom-px h-px" style="background-color: ${worstSkin?.color}"></div></div></li>`
                    + `<li data-testid="case-content-card" class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12"><div class="group relative z-0 flex aspect-[177/200] min-h-0 w-full flex-col rounded-lg border border-navy-500 bg-gradient-to-b from-navy-600 to-navy-700 transition-colors duration-[400ms] ease-expo will-change-transform hover:border-transparent @[14rem]:aspect-[230/200]"><div class="absolute -inset-px z-[-1] rounded-[inherit] opacity-1 transition-opacity duration-[400ms] ease-expo will-change-transform real-group-hover:opacity-100" style="background-image:${commonSkin?.gradient}"></div><a href="${commonSkin?.url}" title="${commonSkin?.name} | ${commonSkin?.name_s} ${commonSkin?.rarityFull?.length ? `(${commonSkin?.rarityFull})` : ''}" class="absolute inset-0 z-20"></a><div class="flex items-start justify-between p-3 pb-0"><div class="z-10 text-left text-10px uppercase leading-tight text-navy-200"><div class="flex flex-col css-5dt5vx"><span class="text-sm font-bold text-gold">${languageText?.commonSkinTitle}</span><span data-testid="case-content-cards-grid-item-odds-percentage" class="font-semibold">${languageText?.possibleText}</span></div></div><div class="z-10 ml-auto text-right text-10px uppercase leading-tight text-navy-200"><div class="flex flex-col css-5dt5vx"><span class="font-medium">${languageText?.chance}</span><span data-testid="case-content-cards-grid-item-odds-percentage" class="font-semibold">${commonSkin?.chance?.toFixed(3)}%</span></div></div></div><div class="grid-stack relative m-auto grid min-h-0 w-10/12 flex-1 place-items-center"><svg width="136" height="136" viewBox="0 0 136 136" fill="none" class="h-full w-8/12"><g filter="url(#filter0_d_3528_6694)"><path d="M64 5.3094C66.4752 3.88034 69.5248 3.88034 72 5.3094L120.292 33.1906C122.767 34.6197 124.292 37.2607 124.292 40.1188V95.8812C124.292 98.7393 122.767 101.38 120.292 102.809L72 130.691C69.5248 132.12 66.4752 132.12 64 130.691L15.7083 102.809C13.2331 101.38 11.7083 98.7393 11.7083 95.8812V40.1188C11.7083 37.2607 13.2331 34.6197 15.7083 33.1906L64 5.3094Z" class="fill-[#282832] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" style="fill: ${commonSkin?.dcolor}"></path></g><g data-hex-emblem-stroke="true" filter="url(#filter1_d_3528_6694)"><path d="M71.75 5.74241L120.042 33.6236C122.362 34.9634 123.792 37.4393 123.792 40.1188V95.8812C123.792 98.5607 122.362 101.037 120.042 102.376L71.75 130.258C69.4295 131.597 66.5705 131.597 64.25 130.258L15.9583 102.376C13.6378 101.037 12.2083 98.5607 12.2083 95.8812V40.1188C12.2083 37.4393 13.6378 34.9634 15.9583 33.6236L64.25 5.74241C66.5705 4.40267 69.4295 4.40267 71.75 5.74241Z" stroke="${commonSkin?.stroke}"></path></g><path data-hex-emblem-inner="true" d="M64.0001 27.2948C66.4753 25.8657 69.5249 25.8657 72.0001 27.2948L101.252 44.1833C103.727 45.6124 105.252 48.2534 105.252 51.1115V84.8886C105.252 87.7467 103.727 90.3878 101.252 91.8168L72.0001 108.705C69.5249 110.134 66.4753 110.134 64.0001 108.705L34.7482 91.8168C32.273 90.3878 30.7482 87.7467 30.7482 84.8886V51.1115C30.7482 48.2534 32.273 45.6124 34.7482 44.1833L64.0001 27.2948Z" class="fill-[#21212B] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" fill-opacity="0.18" style="fill:${commonSkin?.dcolor}"></path><path data-hex-emblem-inner="true" d="M64.0001 27.2948C66.4753 25.8657 69.5249 25.8657 72.0001 27.2948L101.252 44.1833C103.727 45.6124 105.252 48.2534 105.252 51.1115V84.8886C105.252 87.7467 103.727 90.3878 101.252 91.8168L72.0001 108.705C69.5249 110.134 66.4753 110.134 64.0001 108.705L34.7482 91.8168C32.273 90.3878 30.7482 87.7467 30.7482 84.8886V51.1115C30.7482 48.2534 32.273 45.6124 34.7482 44.1833L64.0001 27.2948Z" class="fill-[#21212B] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" fill-opacity="0.18" style="fill: ${commonSkin?.dcolor}"></path><path data-hex-emblem-inner="true" d="M64.0001 27.2948C66.4753 25.8657 69.5249 25.8657 72.0001 27.2948L101.252 44.1833C103.727 45.6124 105.252 48.2534 105.252 51.1115V84.8886C105.252 87.7467 103.727 90.3878 101.252 91.8168L72.0001 108.705C69.5249 110.134 66.4753 110.134 64.0001 108.705L34.7482 91.8168C32.273 90.3878 30.7482 87.7467 30.7482 84.8886V51.1115C30.7482 48.2534 32.273 45.6124 34.7482 44.1833L64.0001 27.2948Z" class="fill-[#21212B] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" style="fill: ${commonSkin?.dcolor}"></path><path data-hex-emblem-signet="true" fill-rule="evenodd" clip-rule="evenodd" d="M73.7742 51.0885L68.8627 60.7734H68.8713C68.597 61.3266 69.0341 61.9819 69.6427 61.9309L79.4485 60.3905C79.9456 60.3309 80.2199 59.7266 79.9456 59.233L75.0428 51.0374C74.7685 50.5353 74.0485 50.5353 73.7742 51.0885ZM65.7728 61.9051L57.0546 59.4554C56.421 59.288 56.305 58.3715 56.8226 58.0278L62.7835 53.8773C63.185 53.5953 63.7026 53.7628 63.8721 54.221L66.683 60.7684C66.915 61.394 66.3975 62.0814 65.7639 61.9051H65.7728ZM63.6666 69.1036H54.9672C53.5708 69.1036 52.3999 67.9914 52.3999 66.543C52.3999 65.0946 53.5188 63.9824 54.9672 63.9824H63.6666V69.1036ZM65.7148 63.9824H69.8118V69.1036H65.7148V63.9824ZM65.7148 71.1514H69.8118V84.4665H65.7148V71.1514ZM55.4727 76.2066C55.4727 80.7739 59.1377 84.4665 63.6666 84.4665V71.1514H55.4727V76.2066ZM71.8604 69.1036H80.5597C81.9561 69.1036 83.127 67.9914 83.127 66.543C83.127 65.0946 82.0082 63.9824 80.5597 63.9824H71.8604V69.1036ZM80.0543 76.2066C80.0543 80.7739 76.3892 84.4665 71.8604 84.4665V71.1514H80.0543V76.2066Z" class="fill-[#454A56] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" style="fill: ${commonSkin?.stroke}"></path><defs><filter id="filter0_d_3528_6694" x="11.7085" y="4.2373" width="112.583" height="131.525" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="4"></feOffset><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3528_6694"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3528_6694" result="shape"></feBlend></filter><filter id="filter1_d_3528_6694" x="11.7085" y="4.2373" width="112.583" height="131.525" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="4"></feOffset><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3528_6694"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3528_6694" result="shape"></feBlend></filter></defs></svg><img loading="lazy" alt="" class="pointer-events-none absolute w-10/12 object-contain transition duration-[400ms] ease-back will-change-transform real-group-hover:scale-90" src="${commonSkin?.icon}"></div><div class="z-10 w-full self-end p-3 pt-0 font-semibold leading-tight"><div data-testid="case-content-cards-grid-item-category" class="truncate text-xs text-navy-200">${commonSkin?.name} ${commonSkin?.rarity?.length ? `(${commonSkin?.rarity})` : '' }</div><div data-testid="case-content-cards-grid-item-name" class="truncate text-sm text-white">${commonSkin?.name_s}</div><div data-testid="case-content-cards-grid-item-price" class="mt-2 rounded bg-gold-800 py-[0.4375rem] text-center text-sm font-semibold leading-none text-gold-400">${parseFloat(commonSkin?.price)?.toFixed(2)} ${currency}</div></div><div class="absolute inset-x-7 -bottom-px h-px" style="background-color: ${commonSkin?.color}"></div></div></li>`
                    + `<li data-testid="case-content-card" class="flex-shrink-0 basis-10/12 snap-start overflow-hidden px-px sm:basis-6/12 md:basis-4/12 lg:basis-3/12 xl:basis-2/12"><div class="group relative z-0 flex aspect-[177/200] min-h-0 w-full flex-col rounded-lg border border-navy-500 bg-gradient-to-b from-navy-600 to-navy-700 transition-colors duration-[400ms] ease-expo will-change-transform hover:border-transparent @[14rem]:aspect-[230/200]"><div class="absolute -inset-px z-[-1] rounded-[inherit] opacity-1 transition-opacity duration-[400ms] ease-expo will-change-transform real-group-hover:opacity-100" style="background-image:${bestSkin?.gradient}"></div><a href="${bestSkin?.url}" title="${bestSkin?.name} | ${bestSkin?.name_s} ${bestSkin?.rarityFull?.length ? `(${bestSkin?.rarityFull})` : ''}" class="absolute inset-0 z-20"></a><div class="flex items-start justify-between p-3 pb-0"><div class="z-10 text-left text-10px uppercase leading-tight text-navy-200"><div class="flex flex-col css-5dt5vx"><span class="text-sm font-bold text-gold">${languageText?.bestSkinTitle}</span><span data-testid="case-content-cards-grid-item-odds-percentage" class="font-semibold">${languageText?.possibleText}</span></div></div><div class="z-10 ml-auto text-right text-10px uppercase leading-tight text-navy-200"><div class="flex flex-col css-5dt5vx"><span class="font-medium">${languageText?.chance}</span><span data-testid="case-content-cards-grid-item-odds-percentage" class="font-semibold">${bestSkin?.chance?.toFixed(3)}%</span></div></div></div><div class="grid-stack relative m-auto grid min-h-0 w-10/12 flex-1 place-items-center"><svg width="136" height="136" viewBox="0 0 136 136" fill="none" class="h-full w-8/12"><g filter="url(#filter0_d_3528_6694)"><path d="M64 5.3094C66.4752 3.88034 69.5248 3.88034 72 5.3094L120.292 33.1906C122.767 34.6197 124.292 37.2607 124.292 40.1188V95.8812C124.292 98.7393 122.767 101.38 120.292 102.809L72 130.691C69.5248 132.12 66.4752 132.12 64 130.691L15.7083 102.809C13.2331 101.38 11.7083 98.7393 11.7083 95.8812V40.1188C11.7083 37.2607 13.2331 34.6197 15.7083 33.1906L64 5.3094Z" class="fill-[#282832] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" style="fill: ${bestSkin?.dcolor}"></path></g><g data-hex-emblem-stroke="true" filter="url(#filter1_d_3528_6694)"><path d="M71.75 5.74241L120.042 33.6236C122.362 34.9634 123.792 37.4393 123.792 40.1188V95.8812C123.792 98.5607 122.362 101.037 120.042 102.376L71.75 130.258C69.4295 131.597 66.5705 131.597 64.25 130.258L15.9583 102.376C13.6378 101.037 12.2083 98.5607 12.2083 95.8812V40.1188C12.2083 37.4393 13.6378 34.9634 15.9583 33.6236L64.25 5.74241C66.5705 4.40267 69.4295 4.40267 71.75 5.74241Z" stroke="${bestSkin?.stroke}"></path></g><path data-hex-emblem-inner="true" d="M64.0001 27.2948C66.4753 25.8657 69.5249 25.8657 72.0001 27.2948L101.252 44.1833C103.727 45.6124 105.252 48.2534 105.252 51.1115V84.8886C105.252 87.7467 103.727 90.3878 101.252 91.8168L72.0001 108.705C69.5249 110.134 66.4753 110.134 64.0001 108.705L34.7482 91.8168C32.273 90.3878 30.7482 87.7467 30.7482 84.8886V51.1115C30.7482 48.2534 32.273 45.6124 34.7482 44.1833L64.0001 27.2948Z" class="fill-[#21212B] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" fill-opacity="0.18" style="fill:${bestSkin?.dcolor}"></path><path data-hex-emblem-inner="true" d="M64.0001 27.2948C66.4753 25.8657 69.5249 25.8657 72.0001 27.2948L101.252 44.1833C103.727 45.6124 105.252 48.2534 105.252 51.1115V84.8886C105.252 87.7467 103.727 90.3878 101.252 91.8168L72.0001 108.705C69.5249 110.134 66.4753 110.134 64.0001 108.705L34.7482 91.8168C32.273 90.3878 30.7482 87.7467 30.7482 84.8886V51.1115C30.7482 48.2534 32.273 45.6124 34.7482 44.1833L64.0001 27.2948Z" class="fill-[#21212B] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" fill-opacity="0.18" style="fill: ${bestSkin?.dcolor}"></path><path data-hex-emblem-inner="true" d="M64.0001 27.2948C66.4753 25.8657 69.5249 25.8657 72.0001 27.2948L101.252 44.1833C103.727 45.6124 105.252 48.2534 105.252 51.1115V84.8886C105.252 87.7467 103.727 90.3878 101.252 91.8168L72.0001 108.705C69.5249 110.134 66.4753 110.134 64.0001 108.705L34.7482 91.8168C32.273 90.3878 30.7482 87.7467 30.7482 84.8886V51.1115C30.7482 48.2534 32.273 45.6124 34.7482 44.1833L64.0001 27.2948Z" class="fill-[#21212B] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" style="fill: ${bestSkin?.dcolor}"></path><path data-hex-emblem-signet="true" fill-rule="evenodd" clip-rule="evenodd" d="M73.7742 51.0885L68.8627 60.7734H68.8713C68.597 61.3266 69.0341 61.9819 69.6427 61.9309L79.4485 60.3905C79.9456 60.3309 80.2199 59.7266 79.9456 59.233L75.0428 51.0374C74.7685 50.5353 74.0485 50.5353 73.7742 51.0885ZM65.7728 61.9051L57.0546 59.4554C56.421 59.288 56.305 58.3715 56.8226 58.0278L62.7835 53.8773C63.185 53.5953 63.7026 53.7628 63.8721 54.221L66.683 60.7684C66.915 61.394 66.3975 62.0814 65.7639 61.9051H65.7728ZM63.6666 69.1036H54.9672C53.5708 69.1036 52.3999 67.9914 52.3999 66.543C52.3999 65.0946 53.5188 63.9824 54.9672 63.9824H63.6666V69.1036ZM65.7148 63.9824H69.8118V69.1036H65.7148V63.9824ZM65.7148 71.1514H69.8118V84.4665H65.7148V71.1514ZM55.4727 76.2066C55.4727 80.7739 59.1377 84.4665 63.6666 84.4665V71.1514H55.4727V76.2066ZM71.8604 69.1036H80.5597C81.9561 69.1036 83.127 67.9914 83.127 66.543C83.127 65.0946 82.0082 63.9824 80.5597 63.9824H71.8604V69.1036ZM80.0543 76.2066C80.0543 80.7739 76.3892 84.4665 71.8604 84.4665V71.1514H80.0543V76.2066Z" class="fill-[#454A56] transition-[fill] duration-200 group-hover:fill-[var(--fill)]" style="fill: ${bestSkin?.stroke}"></path><defs><filter id="filter0_d_3528_6694" x="11.7085" y="4.2373" width="112.583" height="131.525" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="4"></feOffset><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3528_6694"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3528_6694" result="shape"></feBlend></filter><filter id="filter1_d_3528_6694" x="11.7085" y="4.2373" width="112.583" height="131.525" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="4"></feOffset><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3528_6694"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3528_6694" result="shape"></feBlend></filter></defs></svg><img loading="lazy" alt="" class="pointer-events-none absolute w-10/12 object-contain transition duration-[400ms] ease-back will-change-transform real-group-hover:scale-90" src="${bestSkin?.icon}"></div><div class="z-10 w-full self-end p-3 pt-0 font-semibold leading-tight"><div data-testid="case-content-cards-grid-item-category" class="truncate text-xs text-navy-200">${bestSkin?.name} ${bestSkin?.rarity?.length ? `(${bestSkin?.rarity})` : '' }</div><div data-testid="case-content-cards-grid-item-name" class="truncate text-sm text-white">${bestSkin?.name_s}</div><div data-testid="case-content-cards-grid-item-price" class="mt-2 rounded bg-gold-800 py-[0.4375rem] text-center text-sm font-semibold leading-none text-gold-400">${parseFloat(bestSkin?.price)?.toFixed(2)} ${currency}</div></div><div class="absolute inset-x-7 -bottom-px h-px" style="background-color: ${bestSkin?.color}"></div></div></li>`
                    + `</ul></div>`)
            )
            .end();
    
        CreateCaseDropMenu(dropList, languageText, caseJSON?.price, caseJSON?.priceFrom);
    });
};



