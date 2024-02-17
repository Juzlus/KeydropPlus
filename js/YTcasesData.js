const cooldown = 3 * 1000;

$( document ).ready(async() => {
    const cases = [];
    const hrefLang = [
        "PL", // Poland
        "BR", // Brazil",
        "DE", // Germany",
        "ES", // Spain",
        "AR", // Argentina
        "NL", // Netherlands
        "PT", // Portugal
        "SK", // Slovakia
        "CZ", // Czechia",
        "HU", // Hungary",
        "RO", // Romania
        "TR", // Turkey
        "FR", // France",
/*
        "AD", // Andorra
        "AE", // United Arab Emirates
        "AF", // Afghanistan
        "AI", // Anguilla
        "AL", // Albania
        "AM", // Armenia
        "AO", // Angola
        "AT", // Austria
        "AU", // "Australia
        "AW", // Aruba
        "AX", // \u00c5land Islands
        "AZ", // Azerbaijan
        "BA", // Bosnia & Herzegovina
        "BB", // Barbados
        "BD", // Bangladesh
        "BE", // "Belgium",
        "BG", // Bulgaria",
        "BH", // Bahrain",
        "BM", // Bermuda",
        "BN", // Brunei",
        "BO", // Bolivia",
        "BS", // Bahamas",
        "BT", // Bhutan",
        "BY", // Belarus",
        "BZ", // Belize",
        "CA", // Canada",
        "CD", // Congo - Kinshasa",
        "CH", // Switzerland",
        "CI", // C\u00f4te d\u2019Ivoire",
        "CK", // Cook Islands",
        "CL", // Chile",
        "CN", // China",
        "CO", // Colombia",
        "CR", // Costa Rica",
        "CU", // Cuba",
        "CV", // Cape Verde",
        "CW", // Cura\u00e7ao",
        "CY", // Cyprus",
        "DK", // Denmark",
        "DM", // Dominica",
        "DO", // Dominican Republic",
        "DZ", // Algeria",
        "EC", // Ecuador",
        "EE", // Estonia",
        "EG", // Egypt",
        "ET", // Ethiopia",
        "FI", // Finland",
        "FO", // Faroe Islands",
        "GA", // Gabon",
        "GB", // United Kingdom",
        "GE", // Georgia",
        "GG", // Guernsey",
        "GH", // Ghana",
        "GI", // Gibraltar",
        "GL", // Greenland",
        "GP", // Guadeloupe",
        "GR", // Greece",
        "GT", // Guatemala",
        "GU", // Guam",
        "GY", // Guyana",
        "HK", // Hong Kong SAR China",
        "HN", // Honduras",
        "HR", // Croatia",
        "ID", // Indonesia",
        "IE", // Ireland",
        "IL", // Israel",
        "IM", // Isle of Man",
        "IN", // India",
        "IQ", // Iraq",
        "IR", // Iran",
        "IS", // Iceland",
        "IT", // Italy",
        "JE", // Jersey",
        "JM", // Jamaica",
        "JO", // Jordan",
        "JP", // Japan",
        "KE", // Kenya",
        "KG", // Kyrgyzstan",
        "KH", // Cambodia",
        "KR", // South Korea
        "KW", // Kuwait
        "KY", // Cayman Islands
        "KZ", // Kazakhstan
        "LA", // Laos
        "LB", // Lebanon
        "LC", // St. Lucia
        "LI", // Liechtenstein
        "LK", // Sri Lanka
        "LT", // Lithuania
        "LU", // Luxembourg
        "LV", // Latvia
        "LY", // Libya
        "MA", // Morocco
        "MC", // Monaco
        "MD", // Moldova
        "ME", // Montenegro
        "MF", // St. Martin
        "MG", // Madagascar
        "MK", // Macedonia
        "ML", // Mali
        "MM", // Myanmar Burma
        "MN", // Mongolia
        "MO", // Macau SAR China
        "MP", // Northern Mariana Isl
        "MQ", // Martinique
        "MR", // Mauritania
        "MT", // Malta
        "MU", // Mauritius
        "MV", // Maldives
        "MW", // Malawi
        "MX", // Mexico
        "MY", // Malaysia
        "MZ", // Mozambique
        "NA", // Namibia
        "NC", // New Caledonia
        "NG", // Nigeria
        "NI", // Nicaragua
        "NO", // Norway
        "NP", // Nepal
        "NZ", // New Zealand
        "OM", // Oman
        "PA", // Panama
        "PE", // Peru
        "PF", // French Polynesia
        "PH", // Philippines
        "PK", // Pakistan
        "PM", // St. Pierre & Miquelo
        "PR", // Puerto Rico
        "PS", // Palestinian Territor
        "PW", // Palau
        "PY", // Paraguay
        "QA", // Qatar
        "RE", // R\u00e9union
        "RS", // Serbia
        "RU", // Russia
        "RW", // Rwanda
        "SA", // Saudi Arabia
        "SC", // Seychelles
        "SD", // Sudan
        "SE", // Sweden
        "SG", // Singapore
        "SI", // Slovenia
        "SL", // Sierra Leone
        "SM", // San Marino
        "SN", // Senegal
        "SR", // Suriname
        "ST", // S\u00e3o Tom\u00e9 & Pr\u00edncipe
        "SV", // El Salvador
        "SX", // Sint Maarten
        "SY", // Syria
        "SZ", // Swaziland
        "TG", // Togo
        "TH", // Thailand
        "TJ", // Tajikistan
        "TM", // Turkmenistan
        "TN", // Tunisia
        "TT", // Trinidad & Tobago
        "TW", // Taiwan
        "TZ", // Tanzania
        "UA", // Ukraine
        "US", // United States
        "UY", // Uruguay
        "UZ", // Uzbekistan
        "VC", // St. Vincent & Grenad
        "VE", // Venezuela
        "VI", // U.S. Virgin Islands
        "VN", // Vietnam
        "YT", // Mayotte
        "ZA", // South Africa
        "ZM", // Zambia
        "ZW", // Zimbabwe
        "XK", // Kosovo"
        */
    ];

    const hrefText = window?.location?.href?.slice(44);
    const langNumber = parseInt(hrefText);
    const cookieLang = hrefLang[langNumber + 1];
    const fetchLang = hrefLang[langNumber];

    console.log(`Loading cases... ${langNumber || -1} / ${hrefLang?.length}`)

    if(hrefText == "start") {
        await Cookies.set("userCountryCode", `${hrefLang[0]}`);
        await Cookies.set("currency", "USD");
        try { chrome.storage.local.set({ allCases: null }); } catch(e) {};
        return window?.location?.replace('https://key-drop.com/pl/apiData/Cases?index=0');
    }

    if((!cookieLang && !fetchLang) || hrefText == "done") {
        let allCases = await getStorageData('local', 'allCases');
        let mainSite = await fetchUrl('GET', `https://key-drop.com/pl/`);
        if(!mainSite) return;

        while(mainSite.search('" class="case__link"') !== -1) {
            const positionUrlEnd = mainSite.search('" class="case__link"');
            const urlEnd = mainSite.slice(0, positionUrlEnd);
            const url = urlEnd.slice(urlEnd.lastIndexOf('data-href="') + 11);
            allCases.push({
                name: url.slice(url.lastIndexOf('/') + 1)?.replace(/-/g, ' ')?.toUpperCase(),
                url: url,
                odds: 0,
            });
            mainSite = mainSite.slice(positionUrlEnd + 21);
        }

        allCases = allCases.filter((value, index, self) =>
            index === self.findIndex(t => t.name === value.name)
        );

        const getCaseOdds = async(allCases, i) => {
            console.log(`Loading case ods... ${i} / ${allCases?.length}`)
            setTimeout(async() => {
                if(!allCases[i]?.url) {
                    alert('DONE');
                    console.log(allCases);
                    const link = document.createElement("a");
                    const file = new Blob([JSON.stringify(allCases, null, 4)], { type: 'text/plain' });
                    link.href = URL.createObjectURL(file);
                    link.download = "allCasesOdds.txt";
                    link.click();
                    URL.revokeObjectURL(link.href);
                    return;
                }
                let caseSite = await fetchUrl('GET', allCases[i].url);
                if(!caseSite) {
                    console.log(allCases[i]);
                    return getCaseOdds(allCases, i + 1);
                }

                caseSite = JSON?.stringify(caseSite);
                let _caseInfo = caseSite?.split("var __case = ")[1]
                    ?.replace(/'/g, '"')
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
                    ?.replace(/upgradeAll:/g, '"upgradeAll":')
                    ?.replace(/tip:/g, '"tip":')
                    ?.replace(/upgrade:/g, '"upgrade":')
                    ?.replace(/topDrops:/g, '"topDrops":')
                    ?.replace(/title:/g, '"title":')
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
                    ?.replace(/"s /g, "'s ")
                    ?.replace(/\\'s /g, "'s ")
                    ?.replace(/\\n/g, "")
                    ?.replace(/\\r/g, "")
                    ?.replace(/\\/g, "")
                    ?.replace(/  /g, '')
                    ?.replace(/  /g, '')
                    ?.replace(/, },/g, ' },')
                    ?.replace(/,},/g, '},')
                    ?.replace(/,},],/g, '}],')
                    ?.replace(/],},],"lang":/g, '],}],"lang":')
                    ?.replace(/}],},{"id":/g, '}]},{"id":')
                    ?.replace(/},]},{"id": /g, '}]},{"id": ')
                    ?.replace(/},]},],"lang":/g, '}]}],"lang":')
                    ?.replace(/,},{"rarity":/g, '},{"rarity":')
                    ?.replace(/,},"header":/g, '},"header":')
                    ?.replace(/,},"toggleSound":/g, '},"toggleSound":')
                    ?.replace(/,},"togglefastMode":/g, '},"togglefastMode":')
                    ?.replace(/,}}},"loser":/g, '}}},"loser":')
                    ?.replace(/,},"topDrops":/g, '},"topDrops":')
                    ?.replace(/,},"content"/g, '},"content"')
                    ?.replace(/,},"item":/g, '},"item":')
                    ?.replace(/,}},"shortcuts":/g, '}},"shortcuts":')
                    ?.replace(/,},},}/g, '}}}')
                    ?.replace(/},]},{"id"/, '}]},{"id"')
                    ?.replace(/}],}],"lang": {"error": {"defaultTitle":/g, '}]}],"lang": {"error": {"defaultTitle":')
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
                    ?.replace(/tttttt/g, '')
                    ?.replace(/ttt/g, '')
                    ?.replace(/tttstate:/g, '"state":')
                    ?.replace(/tttskins:/g, '"skins":')
                    ?.replace(/sellMany:/g, '"sellMany":')
                    ?.replace(/,},"layoutVariant":/g, '},"layoutVariant":')
                    ?.replace(/},]}, {"id": "/g, '}]}, {"id": "')
                    ?.replace(/"coverage": 0..2/g, '"coverage": 0.2')
                    ?.replace(/"coverage": 0../g, '"coverage": 0.0')

                _caseInfo = `${_caseInfo?.slice(0, _caseInfo?.search('"lang": {'))}"lang": {}}`;
                try {
                    let caseJSON = JSON?.parse(_caseInfo);
                    
                    let betterSkinsOdds = 0;
                    caseJSON?.items?.forEach(el => {
                        if(el?.pf?.length) {
                            el?.pf?.forEach(el2 => {
                                if(el2?.price > caseJSON?.price)
                                    betterSkinsOdds += el2?.odds;
                            });
                        }
                    });

                    allCases[i].odds = Math?.round(betterSkinsOdds);
                    getCaseOdds(allCases, i + 1);
                } catch(e)
                {
                    console.log(_caseInfo);
                    getCaseOdds(allCases, i + 1);
                }
            }, cooldown);
        };

        return getCaseOdds(allCases, 0);
    }

    if(fetchLang) {
        const fetch = await fetchUrl('GET', `https://key-drop.com/pl/apiData/Cases`);
        if(!fetch) return;

        if(fetchLang == "PL") {
            for(i = 0; i < fetch?.sections?.length; i++) {
                if(!["KINGS GAME", "Games", "GOLD AREA"]?.includes(fetch?.sections[i]?.name)) {
                    for(j = 0; j < fetch?.sections[i]?.cases?.length; j++) {
                        const data = {
                            name: fetch?.sections[i]?.cases[j]?.name,
                            url: fetch?.sections[i]?.cases[j]?.url,
                            odds: 0,
                        };
                        if(fetch?.sections[i]?.name == "YOUTUBERS CASES") {
                            if(["kacper rietz", "mateo", "isamu", "medusa", "innocent", "dmg", "nexe", "forever", "zony"]?.includes(data?.name?.toLowerCase())) data.lang = 'PL';
                            else if(["mopo"]?.includes(data?.name?.toLowerCase())) data.lang = 'NL';
                            else if(["enerqia", "vural", "rennow", "xm1nn"]?.includes(data?.name?.toLowerCase())) data.lang = 'TR';
                            else if(["elpibecs1"]?.includes(data?.name?.toLowerCase())) data.lang = 'AR';
                            else if(["jamiedrakehd", "tiagovski", "chentric", "VALEK"]?.includes(data?.name?.toLowerCase())) data.lang = 'PT';
                            else if(["tynka"]?.includes(data?.name?.toLowerCase())) data.lang = 'CZ';
                            else if(["shavo", "okta", "iraphahell", "generalu"]?.includes(data?.name?.toLowerCase())) data.lang = 'RO';
                            else if(["juanflatroo"]?.includes(data?.name?.toLowerCase())) data.lang = 'AL';
                            else if(["zolik22"]?.includes(data?.name?.toLowerCase())) data.lang = 'SK';
                            else if(["dadosch", "jorgo", "krowny", "snugtoes"]?.includes(data?.name?.toLowerCase())) data.lang = 'DE';
                            else if(["bytarifa", "sajucsgo", "black", "poker"]?.includes(data?.name?.toLowerCase())) data.lang = 'ES';
                            else if(["pietrak", "jasonplay", "narancs"]?.includes(data?.name?.toLowerCase())) data.lang = 'HU';
                            else if(["lugin", "csr"]?.includes(data?.name?.toLowerCase())) data.lang = 'BR';
                            else if(["anon"]?.includes(data?.name?.toLowerCase())) data.lang = 'EN';
                            else data.lang = fetchLang;
                            data.img = fetch?.sections[i]?.cases[j]?.coverImgUrl;
                            data.price_USD = fetch?.sections[i]?.cases[j]?.price;
                        }
                        cases?.push(data);
                    }
                }
            };
        } else {
            const findYT = fetch?.sections?.filter(e => e?.name == "YOUTUBERS CASES");
            if(!findYT) return;
            for(i = 0; i < findYT[0]?.cases?.length; i++) {
                const data = {
                    name: findYT[0]?.cases[i]?.name,
                    url: findYT[0]?.cases[i]?.url,
                    lang: fetchLang,
                    img: findYT[0]?.cases[i]?.coverImgUrl,
                    price_USD: findYT[0]?.cases[i]?.price,
                    odds: 0,
                };
                if(["kacper rietz", "mateo", "isamu", "medusa", "innocent", "dmg", "nexe", "forever", "zony"]?.includes(data?.name?.toLowerCase())) data.lang = 'PL';
                else if(["mopo"]?.includes(data?.name?.toLowerCase())) data.lang = 'NL';
                else if(["enerqia", "vural", "rennow", "xm1nn"]?.includes(data?.name?.toLowerCase())) data.lang = 'TR';
                else if(["elpibecs1"]?.includes(data?.name?.toLowerCase())) data.lang = 'AR';
                else if(["jamiedrakehd", "tiagovski", "chentric", "VALEK"]?.includes(data?.name?.toLowerCase())) data.lang = 'PT';
                else if(["tynka"]?.includes(data?.name?.toLowerCase())) data.lang = 'CZ';
                else if(["shavo", "okta", "iraphahell", "generalu"]?.includes(data?.name?.toLowerCase())) data.lang = 'RO';
                else if(["juanflatroo"]?.includes(data?.name?.toLowerCase())) data.lang = 'AL';
                else if(["zolik22"]?.includes(data?.name?.toLowerCase())) data.lang = 'SK';
                else if(["dadosch", "jorgo", "krowny", "snugtoes"]?.includes(data?.name?.toLowerCase())) data.lang = 'DE';
                else if(["bytarifa", "sajucsgo", "black", "poker"]?.includes(data?.name?.toLowerCase())) data.lang = 'ES';
                else if(["pietrak", "jasonplay", "narancs"]?.includes(data?.name?.toLowerCase())) data.lang = 'HU';
                else if(["lugin", "csr"]?.includes(data?.name?.toLowerCase())) data.lang = 'BR';
                else if(["anon"]?.includes(data?.name?.toLowerCase())) data.lang = 'EN';
                cases?.push(data);
            }
        }

        const allCases = await getStorageData('local', 'allCases');
        if(!allCases?.length) {
            try { chrome.storage.local.set({ allCases: cases }); } catch(e) {};
        } else {
            try { chrome.storage.local.set({ allCases: [...allCases, ...cases] }); } catch(e) {};
        }
    }

    if(cookieLang)
        await Cookies.set("userCountryCode", `${cookieLang}`);

    setTimeout(async() => {
        window?.location?.replace(`https://key-drop.com/pl/apiData/Cases?index=${langNumber + 1}`);
    }, cooldown);
});